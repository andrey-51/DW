# Translation notes

## How the English site was made

- On September 25, 2026, all 30 public pages of data-wave.ru were downloaded with their styles, scripts, fonts and images.
- The shared header, footer and pop-ups were separated from the page content. Every piece of Russian text was then extracted: 1,154 unique strings, about 82,000 characters.
- Each string was translated into US English using one glossary. Style: no em dashes and no serial comma.
- Inline markup (highlighted words, links, line breaks) was carried through with placeholders. The English sits in exactly the same HTML as the Russian.
- Automated checks confirm there is no Russian left on the pages, every internal link and anchor resolves and no page scrolls sideways.
- Each page was compared with the original at desktop and phone width: page heights are within a few percent of the Russian.

Every string is in [translation/ru-en.csv](translation/ru-en.csv) (page, Russian, English), so a Russian speaker can review the translation in a spreadsheet. `<g1>…</g1>` and `<x1/>` in that file mark where inline markup sits.

## Deliberate differences from the Russian site

1. **Header labels are shorter:** "About", "Solutions" and "Request a call". The literal translations ("About us", "Industry solutions", "Request a callback") wrapped onto two lines in the header. The footer keeps the full names.
2. **An `RU` item ends the main menu.** It links to the same page on data-wave.ru. Each page also declares its Russian twin with `hreflang`.
3. **The "Book a demo" pop-up now sends requests.** On data-wave.ru this pop-up opens from 11 buttons, but its form has no field names and posts to `#`, so it sends nothing. The English pop-up uses the fields of Contact Form 7 form 204, the working "Book a demonstration" form on the About page. Its newsletter checkbox is optional; the Russian one is marked required but was never submitted anyway.
4. **Forms validate and answer in English.** `site/assets/js/forms.js` replaces the Contact Form 7 plugin script and posts to the same Contact Form 7 forms on data-wave.ru. See the README.
5. **Blog dates read "Mar 10, 2025"** instead of "10.03.2025".
6. **Text typed in capitals stays in capitals**, so headings keep their look whatever the CSS does.
7. **The theme script (`site/assets/theme/js/main.js`) is an English copy.** Its Russian strings are translated: "Show more"/"Show less", the dropdown placeholder and the newsletter flag sent with demo requests ("Wants the newsletter" / "Does not want the newsletter"). It also highlights the current post in the blog sidebar with relative links.
8. **Obvious typos in the Russian were translated as intended.** The list is below.

## Not translated

- **Text inside images.**
  - Product screenshots and interface mockups on the product and solution pages show the Russian interface. Examples: the HoReCa loyalty-level cards and the automation flow diagrams.
  - The Etalon case study's CJM board and automation diagram.
  - Blog cover images, which carry Russian titles.
  - The phone mockup in the "Datawave blog" block on the Contacts page.
  - The thumbnail of the About page video.

  English versions of these images need to be exported from the original design files.
- **The two videos are in Russian.** They are too large for the repository (174 MB and 25 MB), so the pages play them from data-wave.ru.
- **Dropdown values.** Labels are English, but the values sent with a form stay Russian ("Ритейл"), because Contact Form 7 rejects unknown values.
- **Pages not linked from the site's navigation:**
  - `/team/*` and `/cases/*`: the About page shows this content inline.
  - `/informacziya-o-deyatelnosti-osushhestvlyaemoj-organizacziej-v-oblasti-it-2/`
  - The default "Привет, мир!" post.
  - Blog category archives (the blog page filters categories with tabs).

## Decide or check before publishing

1. **Privacy policy.**
   - The English policy translates the Russian one. It covers visitors of https://data-wave.ru only. Clause 14.3 links to the Russian policy. Decide whether it should name the English site's address.
   - The policy gives 30 days to answer Roskomnadzor. Since the September 2022 amendments to Federal Law 152-FZ the deadline is 10 business days, so a lawyer should check it (in the Russian original too).
2. **Where leads go.** English form submissions arrive through the same Contact Form 7 forms, so the notification emails look like Russian-site leads, with English answers and Russian dropdown values. If that is not wanted, point `window.DW_FORMS_API` elsewhere (see the README).
3. **Phone number.** Neither site shows one: the Russian footer has an empty `tel:` link and the Contacts page has a "Phone" block without a number.
4. **Names and spellings to confirm.**
   - "Vasta Discovery" for «Васта Дискавери».
   - "Andrey Bushnin" and the other team members' transliterations.
   - "Zavidovo", "Etalon", "Polymatica" and "First Bit".
5. **Uncertain wording in the source**, translated literally:
   - "Fewer fly-by-night companies" (the 7% figure on the Campaign Manager page) may be a typo for campaigns.
   - "Points expiry reminder" is the example SMS in the Scoring page mockup.
6. **Brand spelling.** The Russian site mixes Datawave, DataWave, DATAWAVE and Data Wave. The translation keeps whatever each sentence used.

## Problems found on the Russian site

Worth fixing on data-wave.ru as well:

- **Broken "Book a demo" pop-up (#modal-demo):** no field names and `action="#"`, so nothing is sent. The pop-up's consent line also says "Получить" while its button says "Отправить".
- **Two "Финансовый сектор" pages** with different content (`/solutions/finansovyj-sektor/` and `-2/`), both linked from the home page and footer.
- **About page product cards are shifted.** The "Скоринг" card describes dynamic pricing; the Campaign Manager card repeats the Content personalization text.
- **About page team card:** the first name reads "Команда проекта / Андрей Бушнин", with the section title leaked into the name field.
- **Words typed with Cyrillic look-alike letters:** "В2В/В2С", "MсKinsey", "А/В", "eх.".
- **Typos:**
  - "Сознание" for "Создание", "компаний" for "кампаний", "DMB" for "DMP" and "динистором".
  - "работаты", "гипермаркеторв", "преобретению", "наружняя", "в ручную", "Частно".
  - "Крупнейшей", "цена привлечение" and "компании компания".
  - "КОМПЛЕКСНОЕ РЕШЕНИ" (cut off), "Управление обображением" and "микросервесной".
  - "look a like".
- **Documentation pages:**
  - The title fragment "программного обеспечения “ДатаВейв” и информация" is cut off.
  - "Модуль: Интеграции" sits inside the Analytics feature list.
  - "(далее - “разработчик”, “CDP”)" names the software "developer".
- **Privacy policy:** the regulator deadline noted above, a stray period in the law's date and a few grammar slips.

## Glossary

| Russian | English |
| --- | --- |
| Сервисы для управления клиентскими данными | Customer data management services |
| Комплексная автоматизация маркетинга для безграничного роста бизнеса | Comprehensive marketing automation for limitless business growth |
| Запись на демо | Book a demo |
| Обратный звонок | Request a call (header), Callback request (form) |
| Отраслевые решения | Industry solutions (Solutions in the header) |
| Менеджер кампаний / Campaign-менеджер | Campaign Manager |
| Персонализация контента | Content personalization |
| Динамическое ценообразование с DataWave | Dynamic pricing with DataWave |
| Процессинг программ лояльности | Loyalty program processing |
| единый профиль клиента | single customer profile |
| средний чек / объем продаж / возвращаемость | average check / sales volume / return rate |
| реестр отечественного ПО | Russian Software Registry |
| ООО «ДАТА ВЕЙВ» | DATA WAVE LLC |
| Оператор, субъект персональных данных | the Operator, personal data subject |
