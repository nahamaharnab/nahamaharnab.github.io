import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");

await rm(dist, { force: true, recursive: true });
await Promise.all([
  mkdir(client, { recursive: true }),
  mkdir(server, { recursive: true }),
  mkdir(join(dist, ".openai"), { recursive: true }),
]);

await Promise.all([
  cp(join(root, "index.html"), join(client, "index.html")),
  cp(join(root, "research"), join(client, "research"), { recursive: true }),
  cp(join(root, "work-in-progress"), join(client, "work-in-progress"), { recursive: true }),
  cp(join(root, "resources"), join(client, "resources"), { recursive: true }),
  cp(join(root, "styles.css"), join(client, "styles.css")),
  cp(join(root, "public"), client, { recursive: true }),
  cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json")),
]);

await writeFile(
  join(server, "index.js"),
  `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const routes = {
      "/": "/index.html",
      "/research": "/research/index.html",
      "/research/": "/research/index.html",
      "/work-in-progress": "/work-in-progress/index.html",
      "/work-in-progress/": "/work-in-progress/index.html",
      "/resources": "/resources/index.html",
      "/resources/": "/resources/index.html",
    };

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
