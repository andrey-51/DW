# Data Wave: English website

English version of [data-wave.ru](https://data-wave.ru/), built as a static site with no runtime dependencies.

Before publishing, read [TRANSLATION_NOTES.md](TRANSLATION_NOTES.md). It lists where each English page came from and the facts that still need confirming against the Russian site.

## Pages

| English page | Russian source |
| --- | --- |
| `/` Home | [data-wave.ru](https://data-wave.ru/) |
| `/about/` About | [/o-nas/](https://data-wave.ru/o-nas/) |
| `/products/analytics/` Analytics | [/products/uznajte-bolsheo-svoih-klientah/](https://data-wave.ru/products/uznajte-bolsheo-svoih-klientah/) |
| `/products/content-personalization/` Content personalization | [/products/unikalnyj-kontent-dlya-kazhdogo-polzovatelya/](https://data-wave.ru/products/unikalnyj-kontent-dlya-kazhdogo-polzovatelya/) |
| `/products/campaign-manager/` Campaign Manager | products menu and home page |
| `/products/scoring/` Scoring | products menu and home page |
| `/products/dynamic-pricing/` Dynamic pricing | products menu and home page |
| `/solutions/` Solutions by industry | solutions menu and home page |
| `/solutions/fmcg/` FMCG | [/solutions/fmcg/](https://data-wave.ru/solutions/fmcg/) |
| `/blog/` Blog | blog section |
| `/blog/etalon-case-study/` Etalon case study | [/blog/client_case_etalon/](https://data-wave.ru/blog/client_case_etalon/) |
| `/blog/website-personalization-release/` Release | [/blog/release_pers/](https://data-wave.ru/blog/release_pers/) |
| `/docs/` Documentation | [/doc/](https://data-wave.ru/doc/) and the two registry documents it links to |
| `/contacts/` Contacts | contact details from the site footer |

## Working on the site

Requires Python 3.8 or newer. Nothing to install.

```sh
python3 build.py            # build src/ into site/ and check every internal link
python3 build.py --serve    # build, then preview at http://localhost:8000
```

The build fails if any internal link or `#anchor` points to something that does not exist.

```
src/
  layout.html          header, navigation, footer and icon set shared by every page
  pages/               one file per page; the path becomes the URL
  partials/            blocks reused across pages (demo form, CTA band, hero waves)
  assets/              CSS, JavaScript and favicon, copied to site/assets/
site/                  generated output: deploy this folder, do not edit it by hand
build.py               the generator
```

Each page starts with a front matter comment:

```html
<!--
title: Analytics
description: One sentence for search results and link previews.
section: products
ru: https://data-wave.ru/products/uznajte-bolsheo-svoih-klientah/
-->
```

- `section` highlights the matching item in the main menu.
- `ru` is the equivalent Russian page. It drives the `RU` language switch and the `hreflang` tag. Leave it out when there is no exact equivalent; the switch then points to the Russian home page.
- `{{root}}` in a page expands to the relative path of the site root, so links keep working on any domain or sub-path such as `data-wave.ru/en/`.
- `<!-- include: cta-band -->` pulls in `src/partials/cta-band.html`.

## Deploying

Upload the contents of `site/` to any static host (nginx, S3, Netlify, Vercel, GitHub Pages). Links are relative, so the site also works from a sub-folder.

Once the public address is known, set `SITE_URL` at the top of `build.py` and rebuild. That adds canonical URLs, an English `hreflang` tag and `site/sitemap.xml`.

## Demo request form

The form lives in `src/partials/demo-form.html` and is used on the home and contacts pages.

- By default, submitting it opens the visitor's email app with a prefilled message to info@datawave.ru.
- To send requests to a CRM or form service instead, put its URL in `data-endpoint="..."`. The form is then POSTed as `multipart/form-data` with the fields `name`, `company`, `email`, `phone`, `message` and `consent`. The visitor sees a confirmation on the page.
