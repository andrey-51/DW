#!/usr/bin/env python3
"""Build the English Data Wave site: render src/ pages into site/.

Usage:
    python3 build.py            build the pages and check every internal link
    python3 build.py --serve    build, then serve site/ on http://localhost:8000

Pages live in src/pages/ and are wrapped in src/layout.html (header, footer,
pop-ups and scripts shared by every page). Each page starts with front matter:

    <!--
    title: Scoring
    description: One sentence for search engines and link previews.
    body_class: wp-singular single single-products wp-theme-clean_template
    ru: https://data-wave.ru/products/scoring/
    -->

src/pages/products/scoring.html becomes site/products/scoring/index.html.
{{root}} expands to the relative path of the site root, so the output works on
any domain or sub-path (for example /en/).

site/assets/ holds the static files (theme styles, scripts, fonts, images) and
is not generated. Every .html file elsewhere in site/ is generated and gets
replaced on each build.
"""

import html
import http.server
import re
import sys
from functools import partial
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

# Public address of the English site: used for canonical links, the English
# hreflang tag, sitemap.xml and robots.txt. Set to "" to leave them out.
SITE_URL = "https://data-wave.tech"

BRAND = "Data Wave"
RU_HOME = "https://data-wave.ru/"
ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "site"
ASSETS = OUT / "assets"

FRONT_MATTER = re.compile(r"\A<!--\s*\n(.*?)\n\s*-->\s*\n", re.S)
PLACEHOLDER = re.compile(r"{{\s*(\w+)\s*}}")
DECORATIVE_SVG = re.compile(r"<svg(?![^>]*aria-hidden)(?=[\s>])")


def parse_page(path):
    text = path.read_text(encoding="utf-8")
    match = FRONT_MATTER.match(text)
    if not match:
        sys.exit(f"{path}: missing front matter")
    meta = {}
    for line in match.group(1).splitlines():
        if line.strip():
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip()
    if not meta.get("title"):
        sys.exit(f"{path}: front matter needs 'title'")
    return meta, text[match.end():]


def page_path(rel):
    """src/pages/products/scoring.html -> 'products/scoring/'."""
    parts = rel.with_suffix("").parts
    if parts[-1] == "index":
        parts = parts[:-1]
    return "/".join(parts) + "/" if parts else ""


def mark_current(page, path):
    """Highlight menu links to the current page the way the WordPress theme does."""
    link = re.escape(f'href="{{{{root}}}}{path}"')
    page = re.sub(r'(<li\b[^>]*\bclass=")([^"]*)("[^>]*>\s*<a\b[^>]*' + link + ")",
                  r"\1\2 current-menu-item\3", page)
    return page.replace(f'href="{{{{root}}}}{path}"', f'href="{{{{root}}}}{path}" aria-current="page"')


def render(layout, meta, body, path):
    title = meta["title"] if path == "" else f"{meta['title']} | {BRAND}"
    # "ru" names the equivalent Russian page; it drives the RU switch and hreflang.
    ru = meta.get("ru") or RU_HOME
    head = []
    if meta.get("description"):
        desc = html.escape(meta["description"])
        head.append(f'<meta name="description" content="{desc}">')
        head.append(f'<meta property="og:description" content="{desc}">')
    if meta.get("ru"):
        head.append(f'<link rel="alternate" hreflang="ru" href="{html.escape(ru)}">')
    if SITE_URL:
        url = f"{SITE_URL.rstrip('/')}/{path}"
        head.append(f'<link rel="canonical" href="{url}">')
        head.append(f'<link rel="alternate" hreflang="en" href="{url}">')
        head.append(f'<meta property="og:url" content="{url}">')
    values = {
        "title": html.escape(title),
        "body_class": html.escape(meta.get("body_class", "")),
        "ru": html.escape(ru),
        "head_extra": "".join("\n  " + tag for tag in head),
        "content": body.strip(),
    }
    page = PLACEHOLDER.sub(
        lambda m: values[m.group(1)] if m.group(1) in values else m.group(0),
        layout,
    )
    # The page body may contain {{ru}} too (the RU switch lives in the layout).
    page = page.replace("{{ru}}", values["ru"])
    page = mark_current(page, path)
    root = "../" * path.count("/") or "./"
    page = page.replace("{{root}}", root)
    # Every inline SVG on the site is decorative; hide it from screen readers.
    page = DECORATIVE_SVG.sub('<svg aria-hidden="true"', page)
    leftover = PLACEHOLDER.search(page)
    if leftover:
        sys.exit(f"{path or 'home'}: unknown placeholder {leftover.group(0)}")
    return page


def clean_output():
    """Remove previously generated pages, keep site/assets."""
    if not OUT.exists():
        return
    for file in OUT.rglob("*.html"):
        if ASSETS not in file.parents:
            file.unlink()
    for name in ("sitemap.xml", "robots.txt"):
        if (OUT / name).exists():
            (OUT / name).unlink()
    for folder in sorted((p for p in OUT.rglob("*") if p.is_dir()), reverse=True):
        if folder != ASSETS and ASSETS not in folder.parents and not any(folder.iterdir()):
            folder.rmdir()


def write_sitemap(paths):
    base = SITE_URL.rstrip("/")
    urls = "\n".join(f"  <url><loc>{base}/{p}</loc></url>" for p in paths)
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n</urlset>\n",
        encoding="utf-8",
    )
    (OUT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n", encoding="utf-8"
    )


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if not value:
                continue
            if name == "id":
                self.ids.add(value)
            elif name in ("href", "src", "data-src", "poster"):
                self.links.append(value)
            elif name in ("srcset", "data-srcset"):
                self.links += [part.strip().split(" ")[0] for part in value.split(",") if part.strip()]


def check_links():
    """Fail the build if a relative link points to a missing file or anchor."""
    parsed = {}
    for file in OUT.rglob("*.html"):
        if ASSETS in file.parents:
            continue
        collector = LinkCollector()
        collector.feed(file.read_text(encoding="utf-8"))
        parsed[file.resolve()] = collector
    errors = []
    for file, collector in parsed.items():
        for link in collector.links:
            parts = urlsplit(link)
            if parts.scheme or link.startswith("//"):
                continue
            target = file
            if parts.path:
                target = (file.parent / unquote(parts.path)).resolve()
                if parts.path.endswith("/"):
                    target = target / "index.html"
            if not target.exists():
                errors.append(f"{file.relative_to(OUT)}: broken link {link}")
            elif parts.fragment and target in parsed and parts.fragment not in parsed[target].ids:
                errors.append(f"{file.relative_to(OUT)}: missing anchor {link}")
    return sorted(set(errors))


def build():
    if not ASSETS.exists():
        sys.exit("site/assets is missing")
    clean_output()
    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    paths = []
    for source in sorted((SRC / "pages").rglob("*.html")):
        meta, body = parse_page(source)
        path = page_path(source.relative_to(SRC / "pages"))
        target = OUT / path / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(render(layout, meta, body, path), encoding="utf-8")
        paths.append(path)
    if SITE_URL:
        write_sitemap(paths)
    errors = check_links()
    if errors:
        sys.exit("\n".join(errors))
    print(f"Built {len(paths)} pages into {OUT.relative_to(ROOT)}/, links OK")


def serve(port=8000):
    handler = partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
        print(f"Serving on http://localhost:{port}/ (Ctrl+C to stop)")
        server.serve_forever()


if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        serve()
