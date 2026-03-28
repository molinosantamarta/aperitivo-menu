import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");
const distRoot = resolve(projectRoot, "dist");

function getAppVersion() {
  const sourcePath = resolve(projectRoot, "src/main.js");
  const source = readFileSync(sourcePath, "utf8");
  const match = source.match(/const APP_VERSION = "([^"]+)";/);
  return match ? match[1] : null;
}

function removeNoiseFiles(directory) {
  if (!existsSync(directory)) {
    return;
  }

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const targetPath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      removeNoiseFiles(targetPath);
      continue;
    }

    if (entry.name === ".DS_Store" || / 2(?=\.[^.]+$)/.test(entry.name)) {
      rmSync(targetPath, { force: true });
    }
  }
}

if (!existsSync(distRoot)) {
  console.log("dist postprocess skipped (dist mancante)");
  process.exit(0);
}

const copies = [
  ["public/data/menu-data.json", "dist/menu-data.json"],
  ["public/data/menu-data.json", "dist/menu-data-fallback.json"],
  ["public/data/sheet-config.json", "dist/sheet-config.json"],
  ["public/data/sheet-config.json", "dist/sheet-config-fallback.json"],
  ["public/service-worker.js", "dist/service-worker.js"],
  ["public/manifest.webmanifest", "dist/manifest.webmanifest"],
  ["public/generated/main.runtime.js", "dist/generated/main.runtime.js"],
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

const appVersion = getAppVersion();
if (appVersion) {
  const runtimeSource = resolve(projectRoot, "public/generated/main.runtime.js");
  const versionedRuntime = resolve(projectRoot, `dist/generated/main.runtime.${appVersion}.js`);

  if (existsSync(runtimeSource)) {
    mkdirSync(dirname(versionedRuntime), { recursive: true });
    cpSync(runtimeSource, versionedRuntime);
  }
}

removeNoiseFiles(distRoot);

console.log("dist compatibility assets synced");
