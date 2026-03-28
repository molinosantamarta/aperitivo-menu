import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

function read(path) {
  return readFileSync(resolve(projectRoot, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const mainSource = read("src/main.js");
const indexSource = read("index.html");
const rootManifest = read("manifest.webmanifest");
const publicManifest = read("public/manifest.webmanifest");
const distManifest = read("dist/manifest.webmanifest");
const rootServiceWorker = read("service-worker.js");
const publicServiceWorker = read("public/service-worker.js");
const distServiceWorker = read("dist/service-worker.js");
const buildMeta = read("src/generated/build-meta.js");
const publicMenuData = read("public/data/menu-data.json");
const publicSheetConfig = read("public/data/sheet-config.json");

const versionMatch = mainSource.match(/const APP_VERSION = "([^"]+)";/);
assert(versionMatch, "APP_VERSION non trovato in src/main.js");
const appVersion = versionMatch[1];

assert(
  indexSource.includes(`generated/main.runtime.${appVersion}.js`),
  "index.html non punta al runtime versionato corrente"
);
assert(
  indexSource.includes(`src/main.js?v=${appVersion}`),
  "index.html non punta al modulo src/main.js corrente"
);
assert(
  existsSync(resolve(projectRoot, `generated/main.runtime.${appVersion}.js`)),
  "Manca il runtime versionato in generated/"
);
assert(
  existsSync(resolve(projectRoot, `public/generated/main.runtime.${appVersion}.js`)),
  "Manca il runtime versionato in public/generated/"
);
for (const directory of ["generated", "public/generated"]) {
  const staleRuntimes = readdirSync(resolve(projectRoot, directory)).filter(
    (fileName) =>
      /^main\.runtime\.[A-Za-z0-9_-]+\.js$/.test(fileName) &&
      fileName !== `main.runtime.${appVersion}.js`
  );
  assert(
    staleRuntimes.length === 0,
    `Runtime vecchi presenti in ${directory}: ${staleRuntimes.join(", ")}`
  );
}
const staleDistRuntimes = readdirSync(resolve(projectRoot, "dist/generated")).filter(
  (fileName) =>
    /^main\.runtime\.[A-Za-z0-9_-]+\.js$/.test(fileName) &&
    fileName !== `main.runtime.${appVersion}.js`
);
assert(
  staleDistRuntimes.length === 0,
  `Runtime vecchi presenti in dist/generated: ${staleDistRuntimes.join(", ")}`
);
assert(rootManifest === publicManifest, "Manifest root/public non allineati");
assert(distManifest === publicManifest, "Manifest dist/public non allineati");
assert(
  rootServiceWorker === publicServiceWorker,
  "Service worker root/public non allineati"
);
assert(
  distServiceWorker === publicServiceWorker,
  "Service worker dist/public non allineati"
);
for (const [path, expected] of [
  ["data/menu-data.json", publicMenuData],
  ["menu-data.json", publicMenuData],
  ["menu-data-fallback.json", publicMenuData],
  ["dist/menu-data.json", publicMenuData],
  ["dist/menu-data-fallback.json", publicMenuData],
  ["data/sheet-config.json", publicSheetConfig],
  ["sheet-config.json", publicSheetConfig],
  ["sheet-config-fallback.json", publicSheetConfig],
  ["dist/sheet-config.json", publicSheetConfig],
  ["dist/sheet-config-fallback.json", publicSheetConfig],
]) {
  assert(read(path) === expected, `${path} non allineato con la sorgente pubblica`);
}
for (const path of [
  `dist/generated/main.runtime.${appVersion}.js`,
  "dist/generated/main.runtime.js",
]) {
  assert(existsSync(resolve(projectRoot, path)), `Manca asset richiesto: ${path}`);
}
const distNoiseFiles = [];
function collectDistNoise(directory) {
  for (const entry of readdirSync(resolve(projectRoot, directory), { withFileTypes: true })) {
    const relativePath = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      collectDistNoise(relativePath);
      continue;
    }
    if (/\.(png|js|webp)$/.test(entry.name) && / 2(?=\.[^.]+$)/.test(entry.name)) {
      distNoiseFiles.push(relativePath);
    }
    if (entry.name === ".DS_Store") {
      distNoiseFiles.push(relativePath);
    }
  }
}
collectDistNoise("dist");
assert(distNoiseFiles.length === 0, `File spuri presenti in dist: ${distNoiseFiles.join(", ")}`);
assert(
  /APP_BUILD_LABEL = "V\.1\.0\.\d+"/.test(buildMeta),
  "Build label non valido in src/generated/build-meta.js"
);

console.log(`release verified -> ${appVersion}`);
