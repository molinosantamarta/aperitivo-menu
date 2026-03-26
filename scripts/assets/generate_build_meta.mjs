import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");
const outputPath = resolve(projectRoot, "src/generated/build-meta.js");

const BUILD_LABEL_OFFSET = 302;

function run(command) {
  return execSync(command, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function getCommitCount() {
  try {
    return Number.parseInt(run("git rev-list --count HEAD"), 10) || 0;
  } catch {
    return 0;
  }
}

function hasDirtyWorktree() {
  try {
    return run("git status --porcelain").length > 0;
  } catch {
    return false;
  }
}

const commitCount = getCommitCount();
const buildNumber = commitCount + BUILD_LABEL_OFFSET + (hasDirtyWorktree() ? 1 : 0);
const buildSemver = `1.0.${buildNumber}`;
const buildLabel = `V.${buildSemver}`;
const buildFooterLabel = `VERSIONE ${buildSemver}`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `export const APP_BUILD_NUMBER = ${buildNumber};\nexport const APP_BUILD_SEMVER = "${buildSemver}";\nexport const APP_BUILD_LABEL = "${buildLabel}";\nexport const APP_BUILD_FOOTER_LABEL = "${buildFooterLabel}";\n`,
  "utf8"
);

console.log(`build meta -> ${buildLabel}`);
