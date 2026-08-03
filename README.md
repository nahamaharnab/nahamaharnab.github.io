# Maharnab Naha — Academic Website

A lightweight, four-page academic website built with plain HTML, CSS, and JavaScript.

## Project structure

```text
my-website/
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
│   ├── abstract-status-incentives-and-career-motivation.md
│   └── README.md
├── .openai/hosting.json
├── build.mjs
├── package.json
└── README.md
```

The numbered page files stay easy to find without changing the public URLs. The deployed pages remain `/`, `/research/`, `/work-in-progress/`, and `/resources/`.

## Adding new material

The build reads `abstract-status-incentives-and-career-motivation.md` or its `.txt` alternative directly into the Research page.

Add a CV as `_uploads/cv-maharnab-naha.pdf`. The next build will activate the existing CV link and publish the PDF under `/uploads/`.

Only files explicitly listed in `_uploads/README.md` are connected to the website. Other files remain ignored until they are deliberately wired to a page.

## Local development

```sh
npm run dev
```

Open `http://localhost:4173`.

## Production build

```sh
npm run build
```

The generated website is written to `dist/`. This folder is ignored by Git because it can always be rebuilt from source.

The repository is ready to use as the source for a GitHub-hosted deployment. Add the GitHub Pages workflow when moving the live site to GitHub.
