import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

const copies = [
  ["public/data/menu-data.json", "public/menu-data.json"],
  ["public/data/menu-data.json", "public/menu-data-fallback.json"],
  ["public/data/sheet-config.json", "public/sheet-config.json"],
  ["public/data/sheet-config.json", "public/sheet-config-fallback.json"],
  ["public/menu-data.json", "menu-data.json"],
  ["public/menu-data-fallback.json", "menu-data-fallback.json"],
  ["public/sheet-config.json", "sheet-config.json"],
  ["public/sheet-config-fallback.json", "sheet-config-fallback.json"],
  ["public/generated/main.runtime.js", "generated/main.runtime.js"],
  ["public/manifest.webmanifest", "manifest.webmanifest"],
  ["public/service-worker.js", "service-worker.js"],
  ["public/pwa", "pwa"],
  ["public/menu-assets", "menu-assets"],
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
  const generatedDirs = [
    resolve(projectRoot, "generated"),
    resolve(projectRoot, "public/generated"),
  ];

  for (const directory of generatedDirs) {
    if (!existsSync(directory)) {
      continue;
    }

    for (const fileName of readdirSync(directory)) {
      if (
        /^main\.runtime\.[A-Za-z0-9_-]+\.js$/.test(fileName) &&
        fileName !== `main.runtime.${appVersion}.js`
      ) {
        rmSync(resolve(directory, fileName), { force: true });
      }
    }
  }

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
