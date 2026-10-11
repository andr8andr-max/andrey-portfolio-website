# TODO — чек-лист после деплоя

Что нужно заменить/добавить вручную после запуска на Netlify. Контакты (Telegram / VK / MAX / Email / GitHub) уже заданы и не являются TODO.

## 1. Перед первым деплоем (в коде)

| # | Задача | Где |
|---|---|---|
| 1 | Яндекс.Метрика ID: добавить `YANDEX_METRIKA_ID=<реальный ID>` в Environment variables Netlify (или `.env` локально) | `src/components/layout/YandexMetrika.astro` (сейчас заглушка, счётчик не грузится) |
| 2 | Политика конфиденциальности: заменить черновик на юридически выверенный текст | `src/pages/privacy.astro` (TODO-комментарий в коде) |
| 3 | OG-изображение: заменить `public/og-image.jpg` (сейчас тёмный placeholder 1200×630) на реальное | TODO-комментарий в `src/layouts/MainLayout.astro` |
| 4 | Favicon: проверить `public/favicon.svg` / `favicon.ico`, при необходимости заменить | `public/` |

## 2. Фото автора

Сейчас стоят реальные фото (подключены в `Hero.astro` / `About.astro`):

- `public/images/hero-author.jpg` / `.webp` — Hero, 800×800 (1:1)
- `public/images/about-author.jpg` / `.webp` — Обо мне, 800×1000 (4:5)

Если понадобится замена:

**Проверка после замены:**
- [ ] два разных изображения (нельзя одно фото в Hero и About);
- [ ] alt-тексты: «Фото Vibe-Coder — разработчик для малого бизнеса» / «Фото Vibe-Coder — фрилансер-разработчик для малого бизнеса»;
- [ ] вес: Hero ≤ 250 KB, About ≤ 350 KB, формат JPG/WebP;
- [ ] Hero — `loading="eager"` + `fetchpriority="high"`, About — `loading="lazy"`;
- [ ] width/height заданы, нет CLS;
- [ ] нет стоковых/случайных картинок;
- [ ] если фото нет — возвращать placeholder SVG с TODO-бейджем (`AuthorPhoto.astro`).

## 3. Иконки контактов

Сейчас: локальные файлы в `public/icons/` (github-mark.svg, telegram_amber.png, vk-logo.png, max_black.png, email-envelope.svg), приведены к единому виду через CSS mask + currentColor. Placeholder-иконок из интернета нет.

**Проверка при замене:**
- [ ] единый контейнер 44×44 px;
- [ ] индивидуальные оптические размеры (в `src/styles/icons.css`, `--icon-size`);
- [ ] единый монохромный цвет (base rgba(255,255,255,0.72), hover #ffffff);
- [ ] aria-label на каждой ссылке;
- [ ] hover / focus-visible работают;
- [ ] WhatsApp отсутствует;
- [ ] нет горизонтального скролла на мобильном.

## 4. Кейсы

Сейчас в `Cases.astro` используются ссылки из ТЗ:

- Fitness landing: https://shuya.space/body-sculptor/
- Festival AI bot: https://vk.ru/club241767034
- KuboTorg calculator: https://github.com/andr8andr-max/kubotorg-calculator
- Auto service kanban: https://github.com/andr8andr-max/tracker-kanban-car-service

**Недостающее (оставлено как заглушки в текстах кейсов):**
- [ ] скриншоты кейсов (заменить визуальные заглушки в `Cases.astro` / `public/images/`);
- [ ] GitHub-репозитории: лендинга, бота, KuboTorg — создать/открыть публичные репозитории и проставить ссылки;
- [ ] демо канбана (отдельный деплой трекера) — добавить ссылку;
- [ ] установщик KuboTorg — добавить ссылку.

## 5. После деплоя

- [ ] добавить домен (Settings → Domain management), при необходимости HTTPS + Force HTTPS;
- [ ] проверить отправку формы: форма → «Отправить заявку» → «Заявка отправлена»; заявки видны в Netlify → Forms;
- [ ] проверить, что honeypot отсекает ботов (поле `bot-field` скрыто);
- [ ] после установки домена обновить canonical/og:url (сейчас `https://vibecoder.ru/` из `astro.config.mjs` — при другом домене поправить `site` в config);
- [ ] подключить Яндекс.Метрику (переменная `YANDEX_METRIKA_ID`) и проверить события dataLayer: `cta_discuss`, `cta_cases`, `contact_*`, `case_open`, `faq_open`, `view_pricing`, `view_about`, `scroll_to_contact`, `form_submit`;
- [ ] прогнать Lighthouse Mobile (цели: Performance 90+, LCP < 2.5 c, CLS < 0.1);
- [ ] проверить 404-страницу на несуществующем URL.

## 6. Позже (не блокирует запуск)

- [ ] финальная политика конфиденциальности (юридически выверенный текст);
- [ ] отзывы клиентов (если появятся);
- [ ] отдельные страницы кейсов (если контента станет больше);
- [ ] реальное OG-изображение и favicon-брендинг.
