# Datawave: English website

English version of [data-wave.ru](https://data-wave.ru/). All 30 public pages of the live site were downloaded, translated from their Russian text and rebuilt as a static site in the original design: the same theme markup, styles, fonts, scripts and images.

Read [TRANSLATION_NOTES.md](TRANSLATION_NOTES.md) before publishing. It lists what differs from the Russian site, what could not be translated (text inside images, the videos) and problems found on the Russian site itself. Every translated string is in [translation/ru-en.csv](translation/ru-en.csv) next to its Russian original, so it can be reviewed in a spreadsheet.

## Pages

| English page | Russian page |
| --- | --- |
| `/` | [/](https://data-wave.ru/) |
| `/about/` | [/o-nas/](https://data-wave.ru/o-nas/) |
| `/blog/` | [/blog/](https://data-wave.ru/blog/) |
| `/contacts/` | [/kontakty/](https://data-wave.ru/kontakty/) |
| `/products/scoring/` | [/products/scoring/](https://data-wave.ru/products/scoring/) |
| `/products/campaign-manager/` | [/products/sobstvennyj-vizualnyjkonstruktor-kampanij/](https://data-wave.ru/products/sobstvennyj-vizualnyjkonstruktor-kampanij/) |
| `/products/analytics/` | [/products/uznajte-bolsheo-svoih-klientah/](https://data-wave.ru/products/uznajte-bolsheo-svoih-klientah/) |
| `/products/content-personalization/` | [/products/unikalnyj-kontent-dlya-kazhdogo-polzovatelya/](https://data-wave.ru/products/unikalnyj-kontent-dlya-kazhdogo-polzovatelya/) |
| `/products/dynamic-pricing/` | [/products/dinamicheskoe-czenoobrazovanie-s-datawave/](https://data-wave.ru/products/dinamicheskoe-czenoobrazovanie-s-datawave/) |
| `/solutions/horeca/` | [/solutions/horeca/](https://data-wave.ru/solutions/horeca/) |
| `/solutions/fmcg/` | [/solutions/fmcg/](https://data-wave.ru/solutions/fmcg/) |
| `/solutions/real-estate/` | [/solutions/nedvizhimost/](https://data-wave.ru/solutions/nedvizhimost/) |
| `/solutions/retail/` | [/solutions/ritejl/](https://data-wave.ru/solutions/ritejl/) |
| `/solutions/telecom/` | [/solutions/telekom/](https://data-wave.ru/solutions/telekom/) |
| `/solutions/pharma/` | [/solutions/farmaczevtika/](https://data-wave.ru/solutions/farmaczevtika/) |
| `/solutions/finance/` | [/solutions/finansovyj-sektor/](https://data-wave.ru/solutions/finansovyj-sektor/) |
| `/solutions/finance-2/` | [/solutions/finansovyj-sektor-2/](https://data-wave.ru/solutions/finansovyj-sektor-2/) |
| `/blog/etalon-case-study/` | [/blog/client_case_etalon/](https://data-wave.ru/blog/client_case_etalon/) |
| `/blog/platform-design-update/` | [/blog/obnovlenie-dizajna-platformy/](https://data-wave.ru/blog/obnovlenie-dizajna-platformy/) |
| `/blog/zavidovo-implementation/` | [/blog/zavidovo_datawave/](https://data-wave.ru/blog/zavidovo_datawave/) |
| `/blog/website-personalization-release/` | [/blog/release_pers/](https://data-wave.ru/blog/release_pers/) |
| `/blog/it-company-status/` | [/blog/it_status/](https://data-wave.ru/blog/it_status/) |
| `/blog/russian-software-registry/` | [/blog/the-legendary-and-highest-paid-software-engineer-from-google-4/](https://data-wave.ru/blog/the-legendary-and-highest-paid-software-engineer-from-google-4/) |
| `/blog/polymatica-partnership/` | [/blog/polimatika-i-datawave-obedinyayut-ekspertizu/](https://data-wave.ru/blog/polimatika-i-datawave-obedinyayut-ekspertizu/) |
| `/blog/first-bit-partnership/` | [/blog/pervybit_datawave/](https://data-wave.ru/blog/pervybit_datawave/) |
| `/docs/installation/` | [/poryadok-ustanovki-resheniya-data-wave-cdp/](https://data-wave.ru/poryadok-ustanovki-resheniya-data-wave-cdp/) |
| `/docs/functional-characteristics/` | [/doc/](https://data-wave.ru/doc/) |
| `/docs/operation/` | [/informacziya-neobhodimaya-dlya-ekspluataczii-programmnogo-obespecheniya/](https://data-wave.ru/informacziya-neobhodimaya-dlya-ekspluataczii-programmnogo-obespecheniya/) |
| `/privacy-policy/` | [/politika-v-otnoshenii-obrabotki-personalnyh-dannyh/](https://data-wave.ru/politika-v-otnoshenii-obrabotki-personalnyh-dannyh/) |
| `/it-activities/` | [/informacziya-o-deyatelnosti-osushhestvlyaemoj-organizacziej-v-oblasti-it/](https://data-wave.ru/informacziya-o-deyatelnosti-osushhestvlyaemoj-organizacziej-v-oblasti-it/) |

Every page links to its Russian twin: an `RU` item at the end of the main menu and an `hreflang="ru"` tag in the page head.

## Publishing

The site is published at **https://data-wave.tech** by GitHub Pages.

Every push to the `main` branch runs `.github/workflows/pages.yml`: GitHub builds the pages with `build.py` and publishes `site/` within a minute or two. Progress and errors show in the repository's **Actions** tab. You can also start a deploy by hand there ("Deploy to GitHub Pages", then "Run workflow").

### One-time setup

1. **Default branch:** Settings, General, Default branch: switch to `main`.
2. **Pages:** Settings, Pages. Under "Build and deployment", set Source to **GitHub Actions**. Under "Custom domain", enter `data-wave.tech` and save.
3. **DNS at Squarespace:** Domains, `data-wave.tech`, DNS settings. Delete the Squarespace default records for `@` and `www`, then add:

   | Host | Type | Data |
   | --- | --- | --- |
   | `@` | A | `185.199.108.153` |
   | `@` | A | `185.199.109.153` |
   | `@` | A | `185.199.110.153` |
   | `@` | A | `185.199.111.153` |
   | `www` | CNAME | `andrey-51.github.io` |

4. **First deploy:** Actions, "Deploy to GitHub Pages", "Run workflow" on `main`.
5. **HTTPS:** once GitHub shows the DNS check as successful (minutes to a few hours), tick **Enforce HTTPS** in Settings, Pages.

Optional but recommended: verify the domain under your GitHub account's Settings, Pages, "Add a domain". It adds one TXT record at Squarespace and stops anyone else from using `data-wave.tech` on GitHub Pages.

Afterwards, add `<link rel="alternate" hreflang="en" href="https://data-wave.tech/...">` to the matching pages on data-wave.ru so search engines pair the two versions.

## Editing the site

**Small text changes, in the browser:** open the page in `src/pages/` on github.com, click the pencil icon, edit the text between the tags, then "Commit changes" to `main`. The site updates itself.

**Larger changes, on your computer:**

1. Install [GitHub Desktop](https://desktop.github.com/) (it includes Git) and Python 3.8 or newer.
2. In GitHub Desktop: File, Clone repository, `andrey-51/DW`.
3. Edit files in `src/`, then preview: `python3 build.py --serve` and open http://localhost:8000.
4. In GitHub Desktop: write a short summary, "Commit to main", then "Push origin". GitHub publishes it.

```
src/layout.html      header, footer, pop-ups and scripts shared by every page
src/pages/           the English pages, in the theme's original HTML
site/assets/         static files: theme styles, scripts and fonts, images,
                     WordPress block styles, the form script
site/**/index.html   generated by build.py (not stored in Git)
translation/         every Russian string next to its English translation
```

Keep the existing tags and classes when editing: the theme's CSS and JavaScript depend on them. `build.py` stops with an error if a link or `#anchor` points to a page that does not exist; the deploy then fails and the live site stays as it was.

Each page starts with front matter:

```html
<!--
title: Scoring
description: Sentence for search results and link previews.
body_class: wp-singular single single-products wp-theme-clean_template
ru: https://data-wave.ru/products/scoring/
-->
```

`body_class` is the class list WordPress put on `<body>`, which the theme's CSS uses. `{{root}}` in a page expands to the relative path of the site root, so the site also works from a sub-folder. `SITE_URL` at the top of `build.py` sets the address used for canonical links, the sitemap and robots.txt.

## Forms

The forms keep the Contact Form 7 markup of the Russian site. `site/assets/js/forms.js` replaces the WordPress plugin script: it validates in English and posts to the Contact Form 7 API on data-wave.ru, which accepts requests from other domains. English leads therefore arrive in the same inbox as Russian ones.

| Form | Where | Contact Form 7 id |
| --- | --- | --- |
| Demo request (name, phone, industry, comment) | home, blog, contacts, most product pages, three solution pages | 134 |
| Demo request | Scoring | 649 |
| "Book a demo" pop-up and "Book a demonstration" | every page (pop-up), About | 204 |
| Demo request, long form | About | 271 |
| Callback pop-up | every page | 349 |
| Newsletter | footer | 149 |
| Newsletter | home, blog, contacts, Dynamic pricing | 140 |
| Newsletter | blog posts, solution pages, three product pages | 465 |

Dropdown values stay in Russian (`<option value="Ритейл">Retail</option>`) because Contact Form 7 rejects values it does not know.

To send forms elsewhere, set `window.DW_FORMS_API` in a script placed before `forms.js` in `src/layout.html`. Set it to `""` to open the visitor's email app with the filled-in form instead.

## Videos

The two videos (174 MB and 25 MB, in Russian) are too large for the repository. The pages play them from data-wave.ru.
