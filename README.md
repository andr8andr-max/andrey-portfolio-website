# Vibe-Coder Portfolio

Сайт-портфолио фрилансера-разработчика для малого бизнеса (Vibe-Coder): услуги, кейсы, AI-подход, цены, FAQ и сбор заявок.

## Что делает сайт

- показывает услуги (лендинги, чат-боты, калькуляторы, трекеры, автоматизации);
- показывает кейсы с демо и GitHub-ссылками;
- блок «Обо мне» с фото автора;
- объясняет AI-подход;
- собирает заявки через форму и отправляет их на почту;
- показывает контакты в футере (иконки GitHub, Telegram, ВКонтакте, MAX, Email);
- готов к деплою на Yandex Cloud.

## Стек

- **Astro** — статический сайт
- **Tailwind CSS** — стилизация
- **Yandex Object Storage** — хостинг статики
- **Yandex Cloud Functions** — обработчик формы
- **Яндекс.Метрика** — placeholder (ID подставляется через `.env`, см. `YandexMetrika.astro`)

## Локальный запуск

```bash
npm install        # установка зависимостей
npm run dev        # dev-сервер
npm run build      # production-сборка в dist/
npm run preview    # превью production-сборки
```

## Деплой на Yandex Cloud

Схема:
- **Сайт** — статика в Yandex Object Storage (бакет с включённым статическим хостингом). Загрузку делает GitHub Actions (`.github/workflows/deploy-yandex.yml`) при пуше в `master`.
- **Форма** — Yandex Cloud Function (`yandex-function/index.py`). Она отправляет заявку на почту `prof8888@yandex.ru` через SMTP Яндекс Почты.

### 1. Object Storage (сайт)
1. Создайте бакет (например, `kaunov-site`) в облаке, включите **Static website hosting**: index `index.html`, error `404.html`.
2. Сделайте бакет публичным для чтения (только `GetObject`).
3. Создайте сервисный аккаунт с ролью `storage.editor` на бакет и статический ключ доступа (Access key).
4. Подключите домен: Certificate Manager (сертификат Let's Encrypt) и CDN или DNS-запись на адрес сайта (уточните в инструкции облака).

### 2. Cloud Function (форма)
1. Создайте функцию (Python 3.11+), точка входа `index.handler`, загрузите `yandex-function/index.py`.
2. Создайте HTTP-триггер или включите публичный доступ к функции. Скопируйте её URL.
3. В переменных окружения функции задайте (значения секретные, в репозиторий не коммитить):
   - `SMTP_USER` = `prof8888@yandex.ru`
   - `SMTP_PASSWORD` = пароль приложения Яндекс Почты (Яндекс ID → Безопасность → Пароли приложений)
   - `MAIL_TO` = `prof8888@yandex.ru`
   - `ALLOWED_ORIGIN` = `https://kaunov.com`
4. URL функции передайте сборке как переменную репозитория `PUBLIC_FORM_ENDPOINT` (это не секрет).

### 3. GitHub
В настройках репозитория (Settings → Secrets and variables → Actions):
- Secrets: `YC_ACCESS_KEY_ID`, `YC_SECRET_ACCESS_KEY`
- Variables: `YC_BUCKET` (имя бакета), `PUBLIC_FORM_ENDPOINT` (URL функции)

Пуш в `master` запускает деплой сайта.

### 4. Проверка
- Откройте сайт по домену, отправьте тестовую заявку.
- Письмо должно прийти на `prof8888@yandex.ru`.
- Если ошибка: код статуса покажется под формой (например, 403 — неверный origin, 500 — не заданы переменные функции).

После деплоя пройдите `TODO-deploy-checklist.md`.

## Кейсы и ссылки

| Кейс | Ссылка |
|---|---|
| Fitness landing | https://shuya.space/body-sculptor/ |
| Festival AI bot | https://vk.ru/club241767034 |
| KuboTorg calculator | https://github.com/andr8andr-max/kubotorg-calculator |
| Auto service kanban | https://github.com/andr8andr-max/tracker-kanban-car-service |

## Контакты

- GitHub: https://github.com/andr8andr-max
- Telegram: https://t.me/andres0874
- ВКонтакте: https://vk.ru/andr8andr
- MAX: https://max.ru/u/f9LHodD0cOISP17jyw9Ud6MqLa4bMyCq7FDcqKCrQH1qsl4NGx_zK3fBdCk
- Email: prof8888@yandex.ru

**WhatsApp не используется на сайте.**

## Фото автора

В проекте два разных фото:

- `public/images/hero-author.jpg` (+ `.webp`) — компактное квадратное фото в Hero (1:1, 800×800);
- `public/images/about-author.jpg` (+ `.webp`) — вертикальное фото в блоке «Обо мне» (4:5, 800×1000).

Запрещено: одно фото в Hero и About, стоковые изображения, случайные картинки из интернета.

## Иконки контактов

Нормализованный ряд в футере: `public/icons/` — `github-mark.svg`, `telegram_amber.png`, `vk-logo.png`, `max_black.png`, `email-envelope.svg`.

- контейнер каждой иконки: 44×44 px;
- оптические размеры индивидуальны (CSS `mask-image` + `currentColor`), база из ТЗ: VK 36, Telegram 24, MAX 26, GitHub 28, Email 26 px ±2 — сейчас уточнены под заказчика: VK 44, Telegram 30, MAX 30, GitHub 26, Email 26;
- единый цвет, hover/focus, aria-label, без горизонтального скролла на мобильном.

## TODO для наполнения

См. `TODO-deploy-checklist.md`. Кратко: фото автора (если понадобится замена), иконки-плейсхолдеры, скриншоты кейсов, недостающие GitHub-репозитории, демо канбана, установщик KuboTorg, Яндекс.Метрика ID, OG-изображение, favicon, домен, финальная политика конфиденциальности.

Контакты (Telegram / VK / MAX / Email / GitHub) уже реальные и не являются TODO.
