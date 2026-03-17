import { access, cp, mkdir, rm } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

const entriesToCopy = [
  { src: "main.js", dest: "main.js" },
  { src: "main.runtime.js", dest: "main.runtime.js" },
  { src: "farfalla-bianca.gif", dest: "farfalla-bianca.gif" },
  { src: "data", dest: "data" },
  { src: "carosello format", dest: "carosello format" },
  { src: "menu-assets", dest: "menu-assets" },
];

async function pathExists(targetPath) {
  try {
    await access(targetPath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyEntry(entry) {
  const sourcePath = path.join(rootDir, entry.src);
  const destinationPath = path.join(distDir, entry.dest);

  if (!(await pathExists(sourcePath))) {
    throw new Error(`Risorsa mancante per il deploy: ${entry.src}`);
  }

  await rm(destinationPath, { recursive: true, force: true });
  await cp(sourcePath, destinationPath, { recursive: true, force: true });
}

async function main() {
  await mkdir(distDir, { recursive: true });

  for (const entry of entriesToCopy) {
    await copyEntry(entry);
  }

  console.log("Prepared dist runtime assets.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
