# Maharnab Naha — Academic Website

A lightweight, dependency-free academic website built with plain HTML, CSS,
JavaScript, and a small Node.js build script.

Live site: [maharnab-naha-academic.nahamaharnab11.chatgpt.site](https://maharnab-naha-academic.nahamaharnab11.chatgpt.site)

## Pages

- `/` — about
- `/research/` — research
- `/work-in-progress/` — work in progress
- `/resources/` — resources

## Project structure

```text
my-website/
├── .github/
│   └── workflows/
│       └── validate.yml
├── pages/
│   ├── 01-about.html
│   ├── 02-research.html
│   ├── 03-work-in-progress.html
│   └── 04-resources.html
├── assets/
│   ├── favicon.png
│   ├── profile.png
│   ├── site.css
│   ├── site.js
│   ├── social-preview.png
│   └── woven-background.jpg
├── _uploads/
│   └── abstract-chessproject.md
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

Edit `_uploads/abstract-chessproject.md`. The build reads the text following
the `## Abstract` heading and places it inside the expandable abstract on the
Research page.

The build also accepts `_uploads/abstract-chessproject.txt`. Keep only one of
the Markdown or text versions; the build stops with a clear error if both are
present.

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

## Uploading to GitHub

The repository is ready to use as a GitHub source repository: generated files,
local system files, and non-approved uploads are excluded by `.gitignore`.
Every push and pull request also runs the production build automatically through
`.github/workflows/validate.yml`, so GitHub will report whether the website can
be built successfully.

After creating an empty GitHub repository, connect and upload this project:

```sh
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not initialize the GitHub repository with another README, `.gitignore`, or
license when creating it, because this local repository already contains its
own history and documentation.

The current site uses root-based URLs such as `/research/` and `/assets/`.
These work on the current site and on a custom domain. If the website will be
served from a GitHub Pages project subpath such as
`username.github.io/repository/`, add base-path support before enabling GitHub
Pages.

## Before each upload

1. Run `npm run build` and resolve any reported error.
2. Check that the About, Research, Work in Progress, and Resources pages open.
3. Confirm that only intended files from `_uploads` are being tracked.
4. Review the changes, then commit and push them.

## Hosting note

`.openai/hosting.json` belongs to the current Sites deployment and contains no
website content. Keep it while this project is also published through Sites.
