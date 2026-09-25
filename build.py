#!/usr/bin/env python3
"""Build the English Data Wave site from src/ into site/.

Usage:
    python3 build.py            build site/ and check internal links
    python3 build.py --serve    build, then serve site/ on http://localhost:8000

Pages live in src/pages/. Each page starts with a front matter comment:

    <!--
    title: Analytics
    description: One sentence for search engines and link previews.
    section: products
    ru: https://data-wave.ru/products/uznajte-bolsheo-svoih-klientah/
    -->

src/pages/products/analytics.html is written to site/products/analytics/index.html.
Inside pages and the layout, {{root}} expands to the relative path of the site
root, so the output works on any domain or sub-path (for example /en/).
Shared blocks live in src/partials/ and are pulled into a page with
<!-- include: name -->.
"""

import html
import http.server
import re
import shutil
import sys
from functools import partial
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

# Set to the public address of the English site (for example
# "https://en.data-wave.ru") to add canonical links and a sitemap.
SITE_URL = ""

BRAND = "Data Wave"
RU_HOME = "https://data-wave.ru/"
ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
OUT = ROOT / "site"

FRONT_MATTER = re.compile(r"\A<!--\s*\n(.*?)\n\s*-->\s*\n", re.S)
PLACEHOLDER = re.compile(r"{{\s*(\w+)\s*}}")
INCLUDE = re.compile(r"<!--\s*include:\s*([\w-]+)\s*-->")
DECORATIVE_SVG = re.compile(r"<svg(?![^>]*aria-hidden)(?=[\s>])")


def include_partials(text):
    """Replace <!-- include: name --> with src/partials/name.html."""
    def load(match):
        partial = SRC / "partials" / f"{match.group(1)}.html"
        if not partial.exists():
            sys.exit(f"missing partial {partial.relative_to(ROOT)}")
        return partial.read_text(encoding="utf-8").strip()
    return INCLUDE.sub(load, text)


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
    for key in ("title", "description"):
        if not meta.get(key):
            sys.exit(f"{path}: front matter needs '{key}'")
    return meta, text[match.end():]


def page_path(rel):
    """src/pages/products/analytics.html -> 'products/analytics/'."""
    parts = rel.with_suffix("").parts
    if parts[-1] == "index":
        parts = parts[:-1]
    return "/".join(parts) + "/" if parts else ""


def render(layout, meta, body, path):
    title = meta["title"] if path == "" else f"{meta['title']} | {BRAND}"
    # "ru" names the equivalent Russian page. Pages without one still get a
    # language switch (to the Russian home page) but no hreflang alternate.
    ru = meta.get("ru") or RU_HOME
    head_extra = []
    if meta.get("ru"):
        head_extra.append(f'<link rel="alternate" hreflang="ru" href="{html.escape(ru)}">')
    if SITE_URL:
        url = f"{SITE_URL.rstrip('/')}/{path}"
        head_extra.append(f'<link rel="canonical" href="{url}">')
        head_extra.append(f'<link rel="alternate" hreflang="en" href="{url}">')
        head_extra.append(f'<meta property="og:url" content="{url}">')
    values = {
        "title": html.escape(title),
        "description": html.escape(meta["description"]),
        "section": meta.get("section", ""),
        "ru": html.escape(ru),
        "head_extra": "".join("\n  " + tag for tag in head_extra),
        "content": include_partials(body).strip(),
    }
    page = PLACEHOLDER.sub(
        lambda m: values[m.group(1)] if m.group(1) in values else m.group(0),
        layout,
    )
    # Mark links to the current page before {{root}} is resolved.
    page = page.replace(f'href="{{{{root}}}}{path}"', f'href="{{{{root}}}}{path}" aria-current="page"')
    root = "../" * path.count("/") or "./"
    page = page.replace("{{root}}", root)
    # Every inline SVG on the site is decorative; hide it from screen readers.
    page = DECORATIVE_SVG.sub('<svg aria-hidden="true"', page)
    leftover = PLACEHOLDER.search(page)
    if leftover:
        sys.exit(f"{path or 'home'}: unknown placeholder {leftover.group(0)}")
    return page


def write_sitemap(paths):
    base = SITE_URL.rstrip("/")
    urls = "\n".join(f"  <url><loc>{base}/{p}</loc></url>" for p in paths)
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n</urlset>\n",
        encoding="utf-8",
    )


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name == "id" and value:
                self.ids.add(value)
            if name in ("href", "src") and value:
                self.links.append(value)


def check_links():
    """Fail the build if a relative link points to a missing file or anchor."""
    parsed = {}
    for file in OUT.rglob("*.html"):
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
                target = (file.parent / parts.path).resolve()
                if parts.path.endswith("/"):
                    target = target / "index.html"
            if not target.exists():
                errors.append(f"{file.relative_to(OUT)}: broken link {link}")
            elif parts.fragment and target.suffix == ".html":
                if parts.fragment not in parsed[target].ids:
                    errors.append(f"{file.relative_to(OUT)}: missing anchor {link}")
    return errors


def build():
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(SRC / "assets", OUT / "assets")
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
