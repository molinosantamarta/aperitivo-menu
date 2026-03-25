import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

const copies = [
  ["public/generated/main.runtime.js", "generated/main.runtime.js"],
  ["public/manifest.webmanifest", "manifest.webmanifest"],
  ["public/service-worker.js", "service-worker.js"],
  ["public/pwa", "pwa"],
];

for (const [sourceRel, destinationRel] of copies) {
  const source = resolve(projectRoot, sourceRel);
  const destination = resolve(projectRoot, destinationRel);

  if (!existsSync(source)) {
    continue;
  }

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}

console.log("root compatibility assets synced");
