import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
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

function getAppVersion() {
  const sourcePath = resolve(projectRoot, "src/main.js");
  const source = readFileSync(sourcePath, "utf8");
  const match = source.match(/const APP_VERSION = "([^"]+)";/);
  return match ? match[1] : null;
}

for (const [sourceRel, destinationRel] of copies) {
  const source = resolve(projectRoot, sourceRel);
  const destination = resolve(projectRoot, destinationRel);

  if (!existsSync(source)) {
    continue;
  }

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}

const appVersion = getAppVersion();

if (appVersion) {
  const runtimeSource = resolve(projectRoot, "public/generated/main.runtime.js");
  const versionedPublicRuntime = resolve(
    projectRoot,
    `public/generated/main.runtime.${appVersion}.js`
  );
  const versionedRootRuntime = resolve(projectRoot, `generated/main.runtime.${appVersion}.js`);

  if (existsSync(runtimeSource)) {
    cpSync(runtimeSource, versionedPublicRuntime);
    cpSync(runtimeSource, versionedRootRuntime);
  }
}

console.log("root compatibility assets synced");
