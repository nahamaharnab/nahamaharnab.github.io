import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const client = join(dist, "client");
const uploads = join(root, "_uploads");
const publishedUploads = join(client, "uploads");
const pages = [
  {
    source: join("pages", "01-about.html"),
    output: "index.html",
  },
  {
    source: join("pages", "02-current-work.html"),
    output: join("current-work", "index.html"),
  },
  {
    source: join("pages", "03-research.html"),
    output: join("research", "index.html"),
  },
];
const redirects = [
  {
    destination: "/current-work/",
    output: join("work-in-progress", "index.html"),
  },
];

const uploadFiles = (await readdir(uploads, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);
const cvFilename = "cv-maharnab-naha.pdf";
const hasCv = uploadFiles.includes(cvFilename);

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

const extractTextBody = (contents, extension) => {
  const normalized = contents.replace(/\r\n?/g, "\n").trim();

  if (extension !== ".md") {
    return normalized;
  }

  const lines = normalized.split("\n");
  const abstractHeading = lines.findIndex((line) =>
    /^#{1,6}\s+abstract\s*$/i.test(line.trim()),
  );

  if (abstractHeading >= 0) {
    return lines.slice(abstractHeading + 1).join("\n").trim();
  }

  if (/^#\s+/.test(lines[0] ?? "")) {
    return lines.slice(1).join("\n").trim();
  }

  return normalized;
};

const renderParagraphs = (contents, className) =>
  contents
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((paragraph) => `<p class="${className}">${escapeHtml(paragraph)}</p>`)
    .join("\n");

const renderAbstract = async (slug) => {
  const candidates = [`abstract-${slug}.md`, `abstract-${slug}.txt`].filter(
    (name) => uploadFiles.includes(name),
  );

  if (candidates.length > 1) {
    throw new Error(
      `Use either Markdown or text for abstract-${slug}, not both.`,
    );
  }

  if (candidates.length === 0) {
    return '<p class="abstract-text">Abstract coming soon.</p>';
  }

  const filename = candidates[0];
  const contents = await readFile(join(uploads, filename), "utf8");
  const body = extractTextBody(contents, extname(filename).toLowerCase());

  if (!body) {
    throw new Error(`${filename} does not contain any abstract text.`);
  }

  return renderParagraphs(body, "abstract-text");
};

const cvLink = hasCv
  ? `<a href="/uploads/${cvFilename}" target="_blank" rel="noreferrer">CV</a>`
  : '<a href="#" data-placeholder-message="CV coming soon." title="CV coming soon">CV</a>';

const renderPage = async (source) => {
  let html = await readFile(join(root, source), "utf8");
  const abstractTokens = [
    ...html.matchAll(/\{\{abstract:([a-z0-9][a-z0-9-]*)\}\}/g),
  ];

  for (const [token, slug] of abstractTokens) {
    html = html.replaceAll(token, await renderAbstract(slug));
  }

  html = html.replaceAll("{{cv-link}}", cvLink);

  const unresolvedToken = html.match(/\{\{[^{}]+\}\}/)?.[0];
  if (unresolvedToken) {
    throw new Error(`${source} contains an unresolved token: ${unresolvedToken}`);
  }

  return html;
};

const renderRedirect = (destination) =>
  [
    "<!doctype html>",
    '<html lang="en">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    '    <meta http-equiv="refresh" content="0; url=' + destination + '" />',
    '    <link rel="canonical" href="https://nahamaharnab.github.io' +
      destination +
      '" />',
    "    <title>Redirecting to current work</title>",
    "  </head>",
    "  <body>",
    '    <p><a href="' + destination + '">Continue to current work</a></p>',
    "  </body>",
    "</html>",
  ].join("\n");

// Render every page before replacing the last successful build. This keeps
// dist intact if an upload or page template contains an error.
const renderedPages = await Promise.all(
  pages.map(async ({ source, output }) => ({
    html: await renderPage(source),
    output,
  })),
);
const renderedRedirects = redirects.map(({ destination, output }) => ({
  html: renderRedirect(destination),
  output,
}));

await rm(dist, { force: true, recursive: true });
await Promise.all([
  mkdir(client, { recursive: true }),
  mkdir(publishedUploads, { recursive: true }),
]);

await Promise.all(
  [...pages, ...redirects].map(({ output }) =>
    mkdir(dirname(join(client, output)), { recursive: true }),
  ),
);

await Promise.all([
  ...renderedPages.map(({ html, output }) =>
    writeFile(join(client, output), html),
  ),
  ...renderedRedirects.map(({ html, output }) =>
    writeFile(join(client, output), html),
  ),
  ...(hasCv
    ? [cp(join(uploads, cvFilename), join(publishedUploads, cvFilename))]
    : []),
  cp(join(root, "assets"), join(client, "assets"), { recursive: true }),
]);
