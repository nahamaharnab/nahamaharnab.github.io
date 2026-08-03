import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");
const pages = [
  {
    source: join("01-pages", "01-about.html"),
    output: "index.html",
    paths: ["/"],
  },
  {
    source: join("01-pages", "02-research.html"),
    output: join("research", "index.html"),
    paths: ["/research", "/research/"],
  },
  {
    source: join("01-pages", "03-work-in-progress.html"),
    output: join("work-in-progress", "index.html"),
    paths: ["/work-in-progress", "/work-in-progress/"],
  },
  {
    source: join("01-pages", "04-resources.html"),
    output: join("resources", "index.html"),
    paths: ["/resources", "/resources/"],
  },
];

const routes = Object.fromEntries(
  pages.flatMap(({ output, paths }) => {
    return paths.map((path) => [path, `/${output}`]);
  }),
);

await rm(dist, { force: true, recursive: true });
await Promise.all([
  mkdir(client, { recursive: true }),
  mkdir(server, { recursive: true }),
  mkdir(join(dist, ".openai"), { recursive: true }),
]);

await Promise.all(
  pages.map(({ output }) => mkdir(dirname(join(client, output)), { recursive: true })),
);

await Promise.all([
  ...pages.map(({ source, output }) =>
    cp(join(root, source), join(client, output), { recursive: true }),
  ),
  cp(join(root, "02-assets"), join(client, "assets"), { recursive: true }),
  cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json")),
]);

await writeFile(
  join(server, "index.js"),
  `const routes = ${JSON.stringify(routes, null, 2)};

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const route = routes[url.pathname];
    if (!route && !url.pathname.includes(".")) {
      return new Response("Not found", { status: 404 });
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = route ?? url.pathname;
    return env.ASSETS.fetch(new Request(assetUrl, request));
  },
};

export default worker;
`,
);
