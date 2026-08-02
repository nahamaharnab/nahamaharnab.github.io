import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");
const pages = [
  { source: "index.html", output: "index.html", paths: ["/"] },
  {
    source: "research",
    output: "research",
    paths: ["/research", "/research/"],
  },
  {
    source: "work-in-progress",
    output: "work-in-progress",
    paths: ["/work-in-progress", "/work-in-progress/"],
  },
  {
    source: "resources",
    output: "resources",
    paths: ["/resources", "/resources/"],
  },
];

const routes = Object.fromEntries(
  pages.flatMap(({ output, paths }) => {
    const assetPath = output.endsWith(".html")
      ? `/${output}`
      : `/${output}/index.html`;

    return paths.map((path) => [path, assetPath]);
  }),
);

await rm(dist, { force: true, recursive: true });
await Promise.all([
  mkdir(client, { recursive: true }),
  mkdir(server, { recursive: true }),
  mkdir(join(dist, ".openai"), { recursive: true }),
]);

await Promise.all([
  ...pages.map(({ source, output }) =>
    cp(join(root, source), join(client, output), { recursive: true }),
  ),
  cp(join(root, "styles.css"), join(client, "styles.css")),
  cp(join(root, "public"), client, { recursive: true }),
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
