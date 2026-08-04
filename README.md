# Maharnab Naha — Academic Website

A lightweight, dependency-free academic website built with plain HTML, CSS,
JavaScript, and a small Node.js build script.

Live site: [nahamaharnab.github.io](https://nahamaharnab.github.io)

## Pages

- `/` — about
- `/current-work/` — current work
- `/research/` — research
- `/resources/` — resources

## Project structure

```text
my-website/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── pages/
│   ├── 01-about.html
│   ├── 02-current-work.html
│   ├── 03-research.html
│   └── 04-resources.html
├── assets/
│   ├── favicon.png
│   ├── profile.png
│   ├── site.css
│   ├── site.js
│   ├── social-preview.png
│   └── woven-background.jpg
├── _uploads/
│   ├── abstract-chessproject.md
│   └── abstract-status-incentives.md
├── .openai/
│   └── hosting.json
├── .gitignore
├── build.mjs
├── package.json
└── README.md
```

The numbered source pages are kept easy to identify while the public URLs stay
short and readable.

## Updating website content

### Working-paper abstract

Edit `_uploads/abstract-status-incentives.md`. The build reads the text following
the `## Abstract` heading and places it inside the expandable abstract on the
Current Work page.

The build also accepts `_uploads/abstract-status-incentives.txt`. Keep only one of
the Markdown or text versions; the build stops with a clear error if both are
present.

The `working draft` control on the Current Work page is currently a clickable
placeholder. Replace its placeholder link in `pages/02-current-work.html` when
the paper PDF is ready to publish.

### CV

Add the CV as `_uploads/cv-maharnab-naha.pdf`. The next build activates the CV
link on the About page and publishes the file at
`/uploads/cv-maharnab-naha.pdf`.

The `_uploads` folder is private by default. Only filenames explicitly allowed
in `.gitignore` are tracked and used by the website. Review every allowed file
before pushing it to a public GitHub repository.

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

The build recreates `dist/` on every run:

- `dist/client/` contains the deployable static website.
- `dist/server/` contains the small worker used by the current Sites host.

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

## Before each upload

1. Run `npm run build` and resolve any reported error.
2. Check that the About, Current Work, Research, and Resources pages open.
3. Confirm that only intended files from `_uploads` are being tracked.
4. Review the changes, then commit and push them.

## Hosting

GitHub Pages is the primary host. `.openai/hosting.json` keeps the previous
Sites deployment available as a fallback and contains no website content.
