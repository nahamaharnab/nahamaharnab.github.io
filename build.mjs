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
  cp(join(root, "styles.css"), join(client, "styles.css")),
  cp(join(root, "public"), client, { recursive: true }),
  cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json")),
]);

await writeFile(
  join(server, "index.js"),
  `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetUrl = new URL(request.url);
    assetUrl.pathname = url.pathname === "/" ? "/index.html" : url.pathname;

    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (response.status !== 404 || url.pathname.includes(".")) return response;

    assetUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(assetUrl, request));
  },
};

export default worker;
`,
);
