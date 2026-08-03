# Maharnab Naha — Academic Website

A lightweight, four-page academic website built with plain HTML, CSS, and JavaScript.

## Project structure

```text
my-website/
├── 01-pages/
│   ├── 01-about.html
│   ├── 02-research.html
│   ├── 03-work-in-progress.html
│   └── 04-resources.html
├── 02-assets/
│   ├── favicon.svg
│   ├── profile.png
│   ├── site.css
│   ├── site.js
│   ├── social-preview.png
│   └── woven-background.jpg
├── _uploads/
│   └── README.md
├── .openai/hosting.json
├── 03-build.mjs
├── package.json
└── README.md
```

The numbered page files stay easy to find without changing the public URLs. The deployed pages remain `/`, `/research/`, `/work-in-progress/`, and `/resources/`.

## Adding new material

Place new PDFs, Markdown files, or text files directly in `_uploads/`. Prefix filenames with `cv-`, `abstract-`, `note-`, or `writing-` to identify their purpose. This private intake folder is not deployed or committed automatically.

When a download is approved for public use, move it into `02-assets/`. It will then be published under `/assets/` after the website is rebuilt.

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
