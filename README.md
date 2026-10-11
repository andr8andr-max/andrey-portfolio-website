# Vibe-Coder Portfolio

Сайт-портфолио фрилансера-разработчика для малого бизнеса (Vibe-Coder): услуги, кейсы, AI-подход, цены, FAQ и сбор заявок.

## Что делает сайт

- показывает услуги (лендинги, чат-боты, калькуляторы, трекеры, автоматизации);
- показывает кейсы с демо и GitHub-ссылками;
- блок «Обо мне» с фото автора;
- объясняет AI-подход;
- собирает заявки через форму (Netlify Forms);
- показывает контакты в футере (иконки GitHub, Telegram, ВКонтакте, MAX, Email);
- готов к деплою на Netlify.

## Стек

- **Astro** — статический сайт
- **Tailwind CSS** — стилизация
- **Netlify** — хостинг, Forms, редиректы/заголовки через `netlify.toml`
- **Яндекс.Метрика** — placeholder (ID подставляется через `.env`, см. `YandexMetrika.astro`)

## Локальный запуск

```bash
npm install        # установка зависимостей
npm run dev        # dev-сервер
npm run build      # production-сборка в dist/
npm run preview    # превью production-сборки
```

## Деплой на Netlify

1. Залейте код в GitHub и подключите репозиторий к Netlify (Add new site → Import an existing project).
2. Build command: `npm run build` (уже задан в `netlify.toml`).
3. Publish directory: `dist` (уже задан в `netlify.toml`).
4. Включите **Forms** (Site settings → Forms) — форма на странице уже имеет атрибуты `data-netlify="true"`, `method="POST"`, `name`, honeypot.
5. Добавьте домен (Settings → Domain management).
6. Проверьте отправку формы: после деплоя submit должен показывать «Заявка отправлена» (локально ожидается ошибка — Netlify Forms работают только на Netlify).
7. При необходимости добавьте переменную `YANDEX_METRIKA_ID` в Environment variables.

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
- Email: andr8andr@gmail.com

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
