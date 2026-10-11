# План реализации MVP сайта-портфолио Vibe-Coder

---

## 1. Подтверждение понимания проекта

**Проект:** Сайт-портфолио Vibe-Coder / Freelancer для малого бизнеса.

**Ниша:** Малый бизнес и микробизнес (фитнес-тренеры, спортивные залы, салоны красоты, барбершопы, автосервисы, мастерские, строительные компании, доставка сыпучих материалов, локальные магазины, организаторы мероприятий, эксперты и консультанты, небольшие офисы продаж, production-студии, сервисные компании).

**Основные услуги:**
1. Лендинги / сайты с заявками — от 5 000 ₽
2. Чат-боты для заявок и первичной коммуникации — от 10 000 ₽
3. AI-чат-боты с базой знаний и характером — от 25 000 ₽
4. Десктоп-приложения / калькуляторы для бизнеса — от 8 000 ₽
5. Веб-трекеры / канбан для управления заказами — от 7 000 ₽
6. Пакетные решения — по договорённости

**Цель сайта:** Конвертировать владельца малого бизнеса в заявку через понимание его болей, кейсов, цен, блока «Обо мне», контактов и процесса работы. Показать, что разработчик решает бизнес-задачи (заявки, порядок в процессах, скорость расчётов, контроль заказов, автоматизацию рутины, запуск под ключ), а не просто «делает сайты».

**Позиционирование:** Vibe-Coder — разработчик, который использует AI для скорости, но лично отвечает за архитектуру, бизнес-логику, интеграции, тестирование и рабочий результат.

---

## 2. Предлагаемый стек

- **Astro** — статический сайт, отличный SEO, быстрая загрузка, удобен для контента в Markdown/JSON
- **Tailwind CSS** — utility-first стилизация, mobile-first, тёмная тема из коробки
- **Одностраничный сайт с якорными секциями** — без лишних страниц для MVP
- **Деплой на Netlify** — автоматический CI/CD из GitHub, превью-деплои, Netlify Forms / Functions для обработки заявок
- **Тёмная тема как основная** — light-режим опционально
- **Mobile-first** — бургер-меню, крупные тач-таргеты, адаптивные фото
- **Без лишней сложности** — никаких CMS, блога, личного кабинета, мультиязычности, калькулятора стоимости

---

## 3. Структура файлов

```
vibe-coder-portfolio/
├── public/
│   ├── images/
│   │   ├── hero-author.jpg          # Фото автора №1 (Hero) — TODO: заменить на реальное
│   │   ├── hero-author.webp         # WebP версия Hero фото
│   │   ├── about-author.jpg         # Фото автора №2 (Обо мне) — TODO: заменить на реальное
│   │   ├── about-author.webp        # WebP версия About фото
│   │   ├── hero-placeholder.svg     # Placeholder для Hero (если нет фото)
│   │   ├── about-placeholder.svg    # Placeholder для Обо мне (отличается от Hero)
│   │   └── cases/
│   │       ├── fitness-landing-1.jpg
│   │       ├── fitness-landing-2.jpg
│   │       ├── festival-bot-1.jpg
│   │       ├── kubotorg-1.jpg
│   │       └── kanban-1.jpg
│   ├── icons/
│   │   ├── github-mark.png          # GitHub Octocat mark (монохром, alpha)
│   │   ├── telegram_amber.png       # Telegram logo
│   │   ├── vk-logo.png              # VK logo
│   │   ├── max_black.png            # MAX logo
│   │   └── email-envelope.png       # Envelope icon
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-image.jpg                 # Open Graph изображение — TODO
│   ├── robots.txt
│   └── sitemap.xml                  # Генерируется автоматически
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Layout.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Pains.astro
│   │   │   ├── Services.astro
│   │   │   ├── Cases.astro
│   │   │   ├── About.astro
│   │   │   ├── AiApproach.astro
│   │   │   ├── Trust.astro
│   │   │   ├── Pricing.astro
│   │   │   ├── Process.astro
│   │   │   ├── FAQ.astro
│   │   │   └── Contact.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── IconLink.astro       # Нормализованная иконка контакта
│   │   │   ├── AuthorPhoto.astro    # Компонент фото автора (Hero / About)
│   │   │   ├── CaseCard.astro
│   │   │   ├── ServiceCard.astro
│   │   │   ├── FAQItem.astro
│   │   │   └── FormField.astro
│   │   └── forms/
│   │       └── ContactForm.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   └── index.astro              # Главная страница (MVP)
│   ├── styles/
│   │   ├── global.css
│   │   ├── icons.css                # Стили для нормализованных иконок футера
│   │   └── variables.css
│   ├── data/
│   │   ├── services.json
│   │   ├── cases.json
│   │   ├── pricing.json
│   │   ├── faq.json
│   │   └── contacts.json
│   ├── utils/
│   │   ├── schema.ts                # Schema.org JSON-LD генерация
│   │   └── analytics.ts             # Яндекс.Метрика события
│   └── scripts/
│       └── main.js                  # Мобильное меню, smooth scroll, форма
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
└── netlify.toml
```

---

## 4. Порядок реализации по этапам

### Этап 1: Каркас, layout, навигация, Hero с фото №1 или placeholder, базовый footer с контактными иконками
- Инициализация Astro + Tailwind проекта
- Настройка `astro.config.mjs`, `tailwind.config.mjs` (dark mode: class)
- Базовый `Layout.astro` с `Header` (якорное меню, бургер) и `Footer` (контактные иконки)
- Компонент `IconLink.astro` — нормализованный контейнер 44×44 px, CSS mask-image, индивидуальные оптические размеры
- Проверка наличия файлов иконок в `public/icons/` — при необходимости копирование/переименование
- `Hero.astro` с H1, подзаголовком, CTA-кнопками, бейджами, фото автора №1 (`AuthorPhoto` компонент, проп `variant="hero"`)
- Placeholder для Hero фото (`hero-placeholder.svg` с монограммой VC), если реального фото нет
- SEO-метатеги, Open Graph, фавикон, `robots.txt`, `sitemap.xml` (auto)
- Адаптивность: mobile-first breakpoints
- Деплой на Netlify (preview)

### Этап 2: Боли малого бизнеса и услуги
- `Pains.astro` — 5 карточек болей по ТЗ (заголовок, подзаголовок, 5 пунктов)
- `Services.astro` — 5 карточек услуг с ценами, списком «что решает», «что входит», CTA-кнопкой
- Данные в `src/data/services.json` и `src/data/pains.json`
- Компоненты `ServiceCard.astro`, `PainCard.astro`
- Типографика, отступы, hover-состояния

### Этап 3: Кейсы
- `Cases.astro` — 4 кейса по структуре: название, ниша, боль, задача, решение, технологии, результат, ссылки (демо, GitHub), фрагмент промпта/ТЗ
- Данные в `src/data/cases.json`
- Компонент `CaseCard.astro` с тегами, кнопками «Демо», «GitHub», «Обсудить похожий»
- Placeholder-скриншоты в `public/images/cases/` с пометкой TODO
- Lazy load для изображений кейсов

### Этап 4: Блок «Обо мне» с фото №2, AI-подход, доверие, цены
- `About.astro` — заголовок, подзаголовок, основной текст, мини-факты, CTA, фото автора №2 (`AuthorPhoto` с `variant="about"`)
- Placeholder для About фото (`about-placeholder.svg` — отличный от Hero, например workspace-визуал)
- `AiApproach.astro` — 5 этапов работы с AI + ключевая фраза
- `Trust.astro` — 6 карточек «Почему выгодно»
- `Pricing.astro` — таблица цен + оговорка + CTA

### Этап 5: Процесс, FAQ, контакты и форма, обновление футера при необходимости
- `Process.astro` — 7 шагов работы
- `FAQ.astro` — 8 вопросов-ответов (accordion на JS)
- `Contact.astro` — форма заявки (8 полей + чекбокс согласия), альтернативные контакты, быстрый CTA
- `ContactForm.astro` — отправка через Netlify Functions / Telegram Bot / Google Apps Script
- Honeypot защита, валидация, rate limiting (Netlify)
- `Footer.astro` — нормализованный ряд иконок + копирайт + ссылки навигации + политика конфиденциальности

### Этап 6: SEO, аналитика, безопасность, изображения, иконки, полировка
- Schema.org: `Person`, `ProfessionalService`, `WebSite`, `FAQPage`, `CreativeWork` (кейсы), `Offer` (услуги)
- Яндекс.Метрика (placeholder ID в `.env`), события: клики по CTA, контактам, кейсам, форме, скролл до контактов
- Оптимизация изображений: WebP/AVIF, явные width/height, aspect-ratio, lazy load, LCP optimization для Hero
- Проверка доступности: aria-label, focus-visible, area target 44×44 px, контрастность
- Полировка: hover/focus состояния, smooth scroll, кнопка «наверх», sticky CTA на мобильном
- 404 страница, политика конфиденциальности (отдельная страница или модалка)

### Этап 7: Подготовка к деплою на Netlify и финальная проверка
- `.env` с production переменными (Яндекс.Метрика ID, Telegram Bot token для формы)
- `netlify.toml` — headers, redirects, functions
- Проверка Lighthouse Mobile ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1
- Финальный аудит: все контакты работают, форма отправляется, иконки нормализованы, фото разные, нет WhatsApp, нет стоков
- Production деплой, настройка кастомного домена (если куплен)
- README.md с инструкцией по разработке и деплою

---

## 5. Список запретов (что делать НЕЛЬЗЯ)

- Не делать блог
- Не делать личный кабинет
- Не делать CRM
- Не делать мультиязычность
- Не делать калькулятор стоимости проекта
- Не делать сложные анимации (только мягкие hover/focus)
- Не делать лишние страницы (MVP — один лендинг)
- Не придумывать кейсы, цифры, отзывы, метрики — использовать только то, что в ТЗ
- Не использовать реальные секретные ключи во фронтенде
- Не подставлять выдуманные ссылки вместо недостающих данных — ставить TODO
- **Не использовать одно и то же фото в Hero и в блоке «Обо мне»**
- **Не использовать стоковые фотографии**
- Не использовать случайные картинки из интернета
- Не делать фото главным элементом вместо оффера, кейсов и CTA
- **Не использовать WhatsApp**
- **Не вставлять разноцветные иконки разного оптического размера без нормализации**
- **Не полагаться на intrinsic size PNG-иконок**
- **Не ломать footer из-за разных размеров иконок**

---

## 6. Список TODO-заглушек

### Фото автора
- [ ] `public/images/hero-author.jpg` / `.webp` — фото автора №1 (Hero): компактный, спокойный, современный, доверительный портрет или tech-placeholder
- [ ] `public/images/about-author.jpg` / `.webp` — фото автора №2 (Обо мне): другой кадр, более lifestyle, но не отпускное селфи и не стоковое
- [ ] `public/images/hero-placeholder.svg` — placeholder для Hero (монограмма VC / tech-аватар) с пометкой `TODO: заменить на реальное фото автора`
- [ ] `public/images/about-placeholder.svg` — placeholder для Обо мне (отличный от Hero, например абстрактный workspace) с пометкой `TODO: заменить на второе фото автора`

### Иконки контактов (проверить наличие и при необходимости подготовить монохромные alpha-PNG или inline SVG)
- [ ] `public/icons/github-mark.png` — GitHub Octocat mark (монохром, без текста)
- [ ] `public/icons/telegram_amber.png` — Telegram logo
- [ ] `public/icons/vk-logo.png` — VK logo
- [ ] `public/icons/max_black.png` — MAX logo
- [ ] `public/icons/email-envelope.png` — простой конверт / envelope icon

### Кейсы
- [ ] Скриншоты лендинга фитнес-тренера (2–3 шт.)
- [ ] Скриншоты AI-чат-бота фестиваля (диалоги, меню, анкета, уведомления, таблица)
- [ ] Скриншоты КубоТорг (3–5 шт.: интерфейс, карточки товаров, расчёт доставки, Word-документ)
- [ ] Скриншоты канбана автосервиса (доска, карточка заказа, чек-лист, статистика, админка, уведомления)

### Репозитории GitHub (создать/дополнить, если ещё нет)
- [ ] `https://github.com/andr8andr-max/vibe-coder-portfolio` — код портфолио
- [ ] `https://github.com/andr8andr-max/body-sculptor-landing` — лендинг тренера
- [ ] `https://github.com/andr8andr-max/zvonky-bereg-vk-bot` — AI-бот фестиваля
- [ ] `https://github.com/andr8andr-max/kubotorg-calculator` — десктоп-калькулятор
- [ ] `https://github.com/andr8andr-max/tracker-kanban-car-service` — канбан (уже есть, дополнить README)

### Аналитика и домен
- [ ] Яндекс.Метрика ID (добавить в `.env`)
- [ ] OG-изображение (`public/og-image.jpg`) — 1200×630 px
- [ ] Favicon (`public/favicon.ico`, `public/favicon.svg`)
- [ ] Домен (если куплен: `vibecoder.ru`, `vibe-coder.dev` или другой)

### Юридическое
- [ ] Финальная политика конфиденциальности (текст для футера и отдельной страницы)

**Контакты уже известны** — Telegram / VK / MAX / Email / GitHub **НЕ** являются TODO.  
TODO только по файлам иконок, фото, скриншотам, аналитике, домену и юридическому тексту.

---

## 7. Два фото автора: требования и правила

### Hero photo (фото №1)
- **Назначение:** Быстрое доверие, показать что с клиентом работает живой человек
- **Стиль:** Компактный портрет или tech-аватар, спокойный, современный, неформальный developer/freelancer
- **Фон:** Нейтральный, тёмный или мягкий городской/домашний/офисный
- **Лицо:** Хорошо читается
- **Форма:** Квадратная, круглая или скруглённый прямоугольник
- **Размер:** Десктоп ~220–320 px по большей стороне, мобильный ~96–140 px
- **Файл:** `public/images/hero-author.jpg` или `.webp`
- **Placeholder:** `public/images/hero-placeholder.svg` (монограмма VC / tech-аватар) с подписью `TODO: заменить на реальное фото автора`
- **Alt:** `Фото Vibe-Coder — разработчик для малого бизнеса`

### About photo (фото №2)
- **Назначение:** Человечность, контекст, расположение к специалисту
- **Стиль:** Более lifestyle-формат, спокойный, можно фон моря/набережной/города/кафе/дома/коворкинга — если уместно и не выглядит как «отпускной альбом»
- **Важно:** **Другое фото**, не та же съёмка в том же кропе
- **Лицо:** Хорошо видно
- **Одежда:** Не шорты/пляжная, если подрывает деловой тон
- **Форма:** Квадрат, вертикальный прямоугольник 4:5 или скруглённый прямоугольник
- **Размер:** Десктоп ~360–520 px по большей стороне, мобильный до 100% ширины контейнера (не более 420 px)
- **Файл:** `public/images/about-author.jpg` или `.webp`
- **Placeholder:** `public/images/about-placeholder.svg` (отличный от Hero, например workspace-визуал) с подписьью `TODO: заменить на второе фото автора`
- **Alt:** `Фото Vibe-Coder — фрилансер-разработчик для малого бизнеса`

### Запреты на фото
- ❌ Использовать одно и то же фото в двух местах
- ❌ Делать оба фото одинакового размера
- ❌ Превращать блок «Обо мне» в фотосессию
- ❌ Ставить фото, которое отвлекает от текста и CTA
- ❌ Использовать стоковые фотографии
- ❌ Использовать откровенно отпускные/пляжные селфи
- ❌ Использовать случайные картинки из интернета

---

## 8. Контакты: точный список

Использовать **только** эти контакты (из ТЗ):

| Контакт | Ссылка | Примечание |
|---------|--------|------------|
| **GitHub** | `https://github.com/andr8andr-max` | Открывать в новой вкладке |
| **Telegram** | `https://t.me/andres0874` | Открывать в новой вкладке |
| **ВКонтакте** | `https://vk.ru/andr8andr` | Открывать в новой вкладке |
| **MAX** | `https://max.ru/u/f9LHodD0cOISP17jyw9Ud6MqLa4bMyCq7FDcqKCrQH1qsl4NGx_zK3fBdCk` | Открывать в новой вкладке |
| **Email** | `mailto:andr8andr@gmail.com` | mailto: ссылка |

**Запрещено:** WhatsApp на сайте не использовать ни в каком виде.

Все внешние ссылки: `target="_blank" rel="noopener noreferrer"`.

---

## 9. Футер и иконки: детальная спецификация

### Ожидаемые пути файлов иконок
```
public/icons/github-mark.png
public/icons/telegram_amber.png
public/icons/vk-logo.png
public/icons/max_black.png
public/icons/email-envelope.png
```
Если файлы лежат в проекте под другими именами — скопировать/переименовать в указанные пути.

### Требования к исходникам
- Формат: PNG с альфа-каналом
- Без лишнего белого фона, без обрезанных краёв, без теней (если не часть силуэта)
- Читаемые на тёмном фоне
- Изначально разные по размеру и цвету — **нельзя вставлять как обычные `<img>` с одинаковым CSS-размером**

### Нормализация: единый контейнер 44×44 px
```css
.footer-contact-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex: 0 0 auto;
}
```
Контейнер **не зависит** от внутреннего размера PNG.

### Индивидуальные оптические размеры внутри контейнера
| Иконка | Оптический размер |
|--------|------------------|
| VK | 36×36 px |
| Telegram | 24×24 px |
| MAX | 26×26 px |
| GitHub | 28×28 px (стартовый) |
| Email | 26×26 px (стартовый) |

Значения можно微调 ±2 px, контейнер остаётся 44×44 px.

### Единый монохромный цвет через CSS mask-image
```css
.footer-contact-icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  background-color: currentColor;
  -webkit-mask-image: var(--icon-mask);
  mask-image: var(--icon-mask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
```

CSS-переменные на модификаторе ссылки:
```css
.footer-contact-link--vk {
  --icon-size: 36px;
  --icon-mask: url('/icons/vk-logo.png');
}
.footer-contact-link--telegram {
  --icon-size: 24px;
  --icon-mask: url('/icons/telegram_amber.png');
}
.footer-contact-link--max {
  --icon-size: 26px;
  --icon-mask: url('/icons/max_black.png');
}
.footer-contact-link--github {
  --icon-size: 28px;
  --icon-mask: url('/icons/github-mark.png');
}
.footer-contact-link--email {
  --icon-size: 26px;
  --icon-mask: url('/icons/email-envelope.png');
}
```

### Fallback если mask-image недоступен или PNG плохо перекрашивается
- Использовать **inline SVG** с теми же силуэтами
- Или подготовить **монохромные alpha-PNG** (детали переданы прозрачностью, а не белым цветом)
- Для GitHub — фирменный Octocat mark (без текста) в монохромном силуэте
- Для Email — простой конверт (линейный или силуэтный), читаемый в 26×26 px

### Цвета
```css
--footer-icon-color: rgba(255, 255, 255, 0.72);
--footer-icon-hover-color: #ffffff;
--footer-icon-focus-color: #ffffff;
```
Оригинальные цвета лого в общем ряду **не показывать**.

### Hover / Focus / Active
```css
.footer-contact-link:hover {
  color: var(--footer-icon-hover-color);
  background: rgba(255, 255, 255, 0.08);
}
.footer-contact-link:focus-visible {
  outline: 2px solid var(--accent-color, #22c55e);
  outline-offset: 2px;
  color: var(--footer-icon-focus-color);
}
.footer-contact-link:active {
  transform: translateY(1px);
}
```
Без сильных анимаций.

### Доступность (каждая иконка)
- `aria-label`: «GitHub», «Telegram», «ВКонтакте», «MAX», «Написать на Email»
- Видимый tooltip / title — желательно
- Область нажатия минимум 44×44 px (контейнер обеспечивает)
- Фокус-состояние для клавиатурной навигации (`:focus-visible`)

### Мобильное поведение
- `flex-wrap: wrap` для ряда иконок
- Отступ между иконками 8–12 px
- Область нажатия не меньше 44×44 px
- Ряд не вызывает горизонтальный скролл
- На очень узких экранах — перенос на вторую строку

### Чего нельзя делать в футере
- ❌ Вставлять иконки как обычные `<img>` с одинаковым `width: 24px`
- ❌ Полагаться на intrinsic size PNG
- ❌ Оставлять разные цвета лого в одном ряду
- ❌ Делать иконки кликабельными без aria-label
- ❌ Использовать WhatsApp
- ❌ Добавлять подписи под каждой иконкой, если ломает компактность
- ❌ Делать иконки слишком крупными и «кричащими»

---

## 10. Правила для следующей модели

Если после этого этапа будет смена AI-модели, новая модель **обязана**:

1. **Следовать ТЗ** (`vibe-coder-portfolio-tz.md`) — это первоисточник требований
2. **Следовать сохранённому плану** (`docs/implementation-plan.md`) — не менять архитектуру, не менять стек
3. **Не выдумывать данные** — использовать только контент из ТЗ
4. **Использовать placeholder / TODO** только для недостающих:
   - фото автора №1 и №2 (два разных placeholder-а)
   - скриншотов кейсов
   - файлов иконок (если отсутствуют — подготовить монохромные alpha-PNG или inline SVG)
   - Яндекс.Метрика ID
   - OG-изображения
   - фавикона
   - домена
   - финальной политики конфиденциальности
5. **Использовать реальные контакты из ТЗ** (GitHub, Telegram, VK, MAX, Email)
6. **Не добавлять WhatsApp** нигде
7. **Не переходить к следующим этапам без явной команды** пользователя
8. **Соблюдать требования к двум разным фото** — Hero и About должны быть разными кадрами, разными placeholder-ами
9. **Соблюдать нормализацию иконок футера** — единый контейнер 44×44, индивидуальные оптические размеры, монохром через mask-image/currentColor, доступность
10. **Писать код только по команде** — на этом этапе планирование завершено, код не писать

---

*План создан на основе ТЗ `vibe-coder-portfolio-tz.md` от 10.10.2026. Готов к началу Этапа 1 по команде.*