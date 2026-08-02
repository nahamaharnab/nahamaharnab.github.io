# Maharnab Naha — Academic Website

A lightweight, four-page academic website built with plain HTML, CSS, and JavaScript.

## Project structure

- `index.html` — about
- `research/index.html` — research
- `work-in-progress/index.html` — work in progress
- `resources/index.html` — resources and study notes
- `styles.css` — shared layout and design
- `public/site.js` — pronunciation and placeholder-link behavior
- `public/images/` — profile, background, and social-preview images
- `build.mjs` — creates the deployable site and route configuration

## Local development

```sh
npm run dev
```

Open `http://localhost:4173`.

## Production build

```sh
npm run build
```

The generated site is written to `dist/`. This folder is intentionally ignored by Git because it can always be rebuilt from the source files.

The repository is ready to use as the source for a GitHub-hosted deployment. Add the GitHub Pages workflow when moving the live site to GitHub.
