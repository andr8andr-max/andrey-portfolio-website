"""Обработчик формы заявки для Yandex Cloud Functions (Python 3.11+).

Принимает POST (application/x-www-form-urlencoded или JSON) от сайта
и отправляет письмо на MAIL_TO через SMTP Яндекс Почты.

Переменные окружения функции (НЕ хранить в коде и в репозитории):
  SMTP_USER      - адрес отправителя, например prof8888@yandex.ru
  SMTP_PASSWORD  - пароль приложения Яндекс Почты (не основной пароль)
  MAIL_TO        - куда присылать заявки, например prof8888@yandex.ru
  ALLOWED_ORIGIN - origin сайта для CORS, например https://kaunov.com
  SMTP_HOST      - необязательно, по умолчанию smtp.yandex.ru
  SMTP_PORT      - необязательно, по умолчанию 465 (SSL)
"""

import base64
import json
import os
import re
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from urllib.parse import parse_qs

MAX_BODY_BYTES = 20_000
MAX_FIELD_LEN = 2000
REQUIRED_FIELDS = ("name", "contact", "task")
FIELD_LABELS = {
    "name": "Имя",
    "contact": "Контакт (Telegram / VK / MAX / email)",
    "niche": "Ниша бизнеса",
    "task": "Задача",
    "deadline": "Дедлайн",
    "budget": "Бюджет",
    "materials": "Ссылка на материалы",
}
CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")


def _response(status, payload, origin):
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
    }
    if origin:
        headers["Access-Control-Allow-Origin"] = origin
        headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        headers["Access-Control-Allow-Headers"] = "Content-Type"
        headers["Vary"] = "Origin"
    return {
        "statusCode": status,
        "headers": headers,
        "body": json.dumps(payload, ensure_ascii=False),
    }


def _get_body_text(event):
    body = event.get("body") or ""
    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8", errors="replace")
    return body


def _parse_fields(event):
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    content_type = headers.get("content-type", "")
    raw = _get_body_text(event)
    if len(raw.encode("utf-8")) > MAX_BODY_BYTES:
        return None
    if "application/json" in content_type:
        try:
            data = json.loads(raw or "{}")
        except json.JSONDecodeError:
            return None
        if not isinstance(data, dict):
            return None
        return {str(k): str(v) for k, v in data.items()}
    parsed = parse_qs(raw, keep_blank_values=True)
    return {k: v[0] for k, v in parsed.items()}


def _clean(value):
    value = CONTROL_CHARS.sub("", value or "").strip()
    return value[:MAX_FIELD_LEN]


def _build_email(fields, mail_to, mail_from):
    lines = []
    for key, label in FIELD_LABELS.items():
        value = fields.get(key, "")
        if value:
            lines.append(f"{label}: {value}")
    lines.append("")
    lines.append("Согласие на обработку персональных данных: да")

    msg = EmailMessage()
    msg["Subject"] = "Новая заявка с сайта"
    msg["From"] = mail_from
    msg["To"] = mail_to
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=mail_from.split("@")[-1])
    msg.set_content("\n".join(lines))
    return msg


def handler(event, context):
    origin = os.environ.get("ALLOWED_ORIGIN", "")
    method = (event.get("httpMethod") or event.get("method") or "POST").upper()

    if method == "OPTIONS":
        return _response(204, {}, origin)
    if method != "POST":
        return _response(405, {"ok": False, "error": "method_not_allowed"}, origin)

    # Проверка origin: запросы с чужих сайтов не принимаем.
    req_headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    req_origin = req_headers.get("origin", "")
    if origin and req_origin and req_origin != origin:
        return _response(403, {"ok": False, "error": "forbidden_origin"}, origin)

    fields = _parse_fields(event)
    if fields is None:
        return _response(400, {"ok": False, "error": "bad_request"}, origin)

    # Honeypot: скрытое поле заполнено — это бот. Отвечаем успехом, но не отправляем.
    if _clean(fields.get("bot-field", "")):
        return _response(200, {"ok": True}, origin)

    fields = {k: _clean(v) for k, v in fields.items()}

    if any(not fields.get(k) for k in REQUIRED_FIELDS):
        return _response(400, {"ok": False, "error": "missing_fields"}, origin)
    if fields.get("consent") not in ("on", "true", "1", "yes"):
        return _response(400, {"ok": False, "error": "no_consent"}, origin)

    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    mail_to = os.environ.get("MAIL_TO", "")
    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    if not (smtp_user and smtp_password and mail_to):
        print("config error: missing SMTP_USER/SMTP_PASSWORD/MAIL_TO")
        return _response(500, {"ok": False, "error": "server_config"}, origin)

    msg = _build_email(fields, mail_to, smtp_user)
    try:
        context_ssl = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context_ssl, timeout=15) as smtp:
            smtp.login(smtp_user, smtp_password)
            smtp.send_message(msg)
    except Exception as exc:  # в лог только тип ошибки, без содержимого формы
        print(f"smtp error: {type(exc).__name__}")
        return _response(502, {"ok": False, "error": "mail_failed"}, origin)

    return _response(200, {"ok": True}, origin)
