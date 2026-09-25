# Translation notes

## How the English text was produced

data-wave.ru could not be opened from the environment this site was built in: the network policy blocked the domain. The English copy was therefore written from what search engines have indexed for data-wave.ru (page titles, descriptions and text excerpts), not from a line-by-line reading of the live pages.

What that means in practice:

- Product claims, figures, channel lists, contacts and quotes come from data-wave.ru as indexed.
- Section headings, linking sentences, button labels, form labels and the small "Illustration" mockups were written for the English layout. They are not translations.
- Some Russian pages were only partly visible. Those English pages are shorter than their originals or are summaries that link to the Russian text.
- The visual design, logo and imagery of the Russian site were not available. The English site uses its own design and a placeholder logo.

A final line-by-line check against the Russian pages is still needed before publishing.

## Coverage by page

| English page | Russian source | Coverage |
| --- | --- | --- |
| Home | `/` | Main messages, modules, results, channels, ML, industries. Full page structure unknown. |
| About | `/o-nas/` | Platform description, approach, results. "Project team" and "Partners" sections not reproduced (content not available). |
| Analytics | `/products/uznajte-bolsheo-svoih-klientah/` | Main text. |
| Content personalization | `/products/unikalnyj-kontent-dlya-kazhdogo-polzovatelya/` | Main text. |
| Campaign Manager | products menu, home page | Built from short descriptions; the Russian site may have a fuller page. |
| Scoring | products menu, home page, `/doc/` | Built from short descriptions. |
| Dynamic pricing | products menu, home page | Built from short descriptions. |
| Solutions | solutions menu, home page | FMCG, real estate and retail have real content. HoReCa, telecom, pharma and financial services have one line each. |
| FMCG | `/solutions/fmcg/` | Challenge, objectives, solution, results. |
| Etalon case study | `/blog/client_case_etalon/` | English summary with a link to the full Russian case. |
| Website personalization release | `/blog/release_pers/` | Full translation of the announcement text. Publication date unknown, so none is shown. |
| Documentation | `/doc/`, `/poryadok-ustanovki-resheniya-data-wave-cdp/`, `/informacziya-neobhodimaya-dlya-ekspluataczii-programmnogo-obespecheniya/` | Summaries with links to the Russian documents. |
| Contacts | site footer | Phone, email, address. |

## Check before publishing

1. **Figures.** Home and About: +32% sales conversion, +50% customer loyalty, +30% basket assortment. FMCG: +30% consumption frequency, +20% basket size, +5% new users, -40% time to first purchase. Scoring: +5% users with an average check of RUB 5,000, -40% time to first purchase. Confirm each number and whether "basket assortment" is the right English for "ассортимент корзины".
2. **Contacts.** Phone +7 495 256-89-90, email info@datawave.ru (the email domain is datawave.ru, not data-wave.ru), office at 26 Malaya Bronnaya St., Bldg. 2, Moscow.
3. **Russian Software Registry.** The site says Data Wave CDP is listed. Consider adding the registry entry number. Also decide whether this belongs so prominently on an English site.
4. **Brand spelling.** The Russian site mixes Data Wave, DataWave, DATAWAVE and Datawave. The English site uses "Data Wave" for the company and platform, "Data Wave CDP" for the registered product and "Data Wave RTDM" for dynamic pricing.
5. **RTDM** is expanded as "real-time decision management". Confirm.
6. **Etalon.** Confirm the client name may be used in English materials and the date (March 10, 2025).
7. **Missing content** to add if it exists in Russian: project team, partners, full product pages for Campaign Manager, Scoring and Dynamic pricing, full industry pages, newsletter subscription.
8. **Legal.** The demo form asks for consent to personal data processing but there is no English privacy policy to link to. Add one (or link the Russian policy) and the legal entity details for the footer.
9. **Visuals.** Replace the placeholder logo in `src/layout.html` and `src/assets/img/favicon.svg` with the official one. Replace the "Illustration" mockups with real product screenshots. Add an Open Graph image for link previews.
10. **SEO.** After publishing, add `<link rel="alternate" hreflang="en" href="...">` to the matching Russian pages so search engines pair the two versions. Then set `SITE_URL` in `build.py`.

## Glossary

Terms used consistently across the English site.

| Russian | English |
| --- | --- |
| комплексная автоматизация маркетинга | comprehensive marketing automation |
| безграничный рост бизнеса | limitless business growth |
| клиентоориентированная платформа | customer-centric platform |
| многоканальное проведение кампаний | multichannel campaign execution |
| единый профиль клиента | single customer profile |
| сегментация в реальном времени | real-time segmentation |
| обогащение данных | data enrichment |
| персонализация контента | content personalization |
| персонификация элементов сайта | website element personalization |
| no-code / zero-code конструктор | no-code / zero-code builder |
| триггерные цепочки | trigger chains |
| динамическое ценообразование | dynamic pricing |
| скоринг, «теплота» лида | scoring, lead warmth |
| демо-показ | demo |
| кейс | case study |
| реестр российского ПО | Russian Software Registry |
