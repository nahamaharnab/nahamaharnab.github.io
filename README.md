# Maharnab Naha — Academic Website

A lightweight, dependency-free academic website built with plain HTML, CSS,
JavaScript, and a small Node.js build script.

Live site: [nahamaharnab.github.io](https://nahamaharnab.github.io)

## Pages

- `/` — about
- `/current-work/` — current work
- `/research/` — research

## Project structure

```text
my-website/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── pages/
│   ├── 01-about.html
│   ├── 02-current-work.html
│   └── 03-research.html
├── assets/
│   ├── favicon.png
│   ├── profile.png
│   ├── site.css
│   ├── site.js
│   ├── social-preview.png
│   └── woven-background.jpg
├── _uploads/
│   ├── abstract-policy-diffusion.md
│   ├── abstract-status-incentives.md
│   ├── cv-maharnab.pdf
│   └── impact-language-barrier-print-version.pdf
├── .gitignore
├── build.mjs
├── package.json
└── README.md
```

The numbered source pages are kept easy to identify while the public URLs stay
short and readable.

## Updating website content

### Current Work abstracts

Edit `_uploads/abstract-status-incentives.md`. The build reads the text following
the `## Abstract` heading and places it inside the expandable abstract on the
Current Work page.

Edit `_uploads/abstract-policy-diffusion.md` for the Work in Progress abstract.
Both abstracts are visible by default and can be collapsed by visitors. Their
text is justified with automatic hyphenation disabled.

The build also accepts `_uploads/abstract-status-incentives.txt`. Keep only one of
the Markdown or text versions; the build stops with a clear error if both are
present.

The `working draft` control on the Current Work page is currently a clickable
placeholder. Replace its placeholder link in `pages/02-current-work.html` when
the paper PDF is ready to publish.

### CV

Add the CV as `_uploads/cv-maharnab.pdf`. The next build activates the CV
link on the About page and publishes the file at
`/uploads/cv-maharnab.pdf`.

### Publication print version

The first publication on the Research page has a `[print version]` link to
`_uploads/impact-language-barrier-print-version.pdf`. The build publishes this
PDF at `/uploads/impact-language-barrier-print-version.pdf`. Replace that file
to update the linked PDF.

Files in `_uploads` are excluded from Git by default; `.gitignore` explicitly
allows the two abstracts and the two PDFs above. The build inserts the abstract
text into the pages and copies only those two PDFs into the public `uploads/`
directory. Review newly allowed files before pushing to the public repository.

## Local preview

Requirements:

- Node.js 18 or newer
- Python 3 for the local preview server

Start the website with:

```sh
npm run dev
```

Then open [http://localhost:4173](http://localhost:4173). Stop the preview with
`Ctrl+C`.

## Production build

```sh
npm run build
```

The build recreates `dist/client/`, which contains the deployable static
website, on every run.

For a manual upload, upload the **contents** of `dist/client/` to the web root.
This includes the three pages, the legacy `/work-in-progress/` redirect, assets,
both PDFs, `robots.txt`, and the two sitemaps. Do not upload the whole project
folder or `_uploads/` directly. macOS `.DS_Store` files are excluded from the
generated assets.

The generated `dist/` folder is ignored by Git because it can always be rebuilt
from the tracked source files.

## GitHub Pages deployment

The public repository is named `nahamaharnab.github.io`, matching the GitHub
account name so the website is available at the root address
`https://nahamaharnab.github.io`.

Every push to `main` runs `.github/workflows/deploy-pages.yml`, builds the site,
and publishes `dist/client/` to GitHub Pages. Pull requests run the same build
as a validation check without deploying.

The source stays on `main`; generated files remain outside Git because GitHub
rebuilds them automatically.

## Search discovery

The build generates `/sitemap.xml` from the three public pages and `/robots.txt`
with a link to that sitemap. Redirects and uploads are not listed in the sitemap.
Keep each page's title, description, and canonical URL aligned with its content.
An equivalent `/sitemap.txt` is also generated from the same URL list. Google
supports this one-URL-per-line format; it provides an alternative submission
when investigating a fetch problem with the XML sitemap.

Google Search Console uses the URL-prefix property
`https://nahamaharnab.github.io/`. The homepage includes its HTML verification
tag; keep that tag in place after verification so ownership remains verified.

After deployment, submit `sitemap.xml` in Search Console's Sitemaps section.
Use URL Inspection to check the homepage, `/current-work/`, and `/research/`,
and request indexing when eligible. Check the reported reason for any page
that remains unindexed. Submission does not guarantee indexing or ranking.

## Before each upload

1. Run `npm run build` and resolve any reported error.
2. Check that the About, Current Work, and Research pages open.
3. Confirm that only intended files from `_uploads` are being tracked.
4. Include new files such as the publication PDF when committing source changes.
5. Review the changes, then commit and push them.
