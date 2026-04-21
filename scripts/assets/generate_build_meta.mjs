import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");
const outputPath = resolve(projectRoot, "src/generated/build-meta.js");

const BUILD_LABEL_OFFSET = 302;

function getBuildBaseNumber() {
  const runNumber = Number.parseInt(process.env.GITHUB_RUN_NUMBER || "", 10);
  if (Number.isFinite(runNumber) && runNumber > 0) {
    return BUILD_LABEL_OFFSET + runNumber;
  }

  try {
    const existingBuildMeta = readFileSync(outputPath, "utf8");
    const match = existingBuildMeta.match(/APP_BUILD_NUMBER = (\d+)/);
    if (match) {
      return Number.parseInt(match[1], 10);
    }
  } catch {
    // Fall through to the stable offset when the file is not present yet.
  }

  return BUILD_LABEL_OFFSET;
}

function hasDirtyWorktree() {
  try {
    const status = execFileSync(
      "git",
      ["status", "--porcelain", "--untracked-files=no"],
      { cwd: projectRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    );
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

const buildNumber = getBuildBaseNumber() + (hasDirtyWorktree() ? 1 : 0);
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
