import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");
const outputPath = resolve(projectRoot, "src/generated/build-meta.js");
const gitDir = resolve(projectRoot, ".git");
const ignoredPaths = readIgnoredPaths();

const BUILD_LABEL_OFFSET = 302;

function getCommitCount() {
  try {
    const head = readGitText("HEAD");
    const headSha = head.startsWith("ref: ")
      ? readGitText(head.slice("ref: ".length))
      : head;

    if (!headSha) {
      return 0;
    }

    const seen = new Set();
    const stack = [headSha];

    while (stack.length > 0) {
      const sha = stack.pop();
      if (!sha || seen.has(sha)) {
        continue;
      }

      seen.add(sha);

      for (const parent of readCommitParents(sha)) {
        if (!seen.has(parent)) {
          stack.push(parent);
        }
      }
    }

    return seen.size;
  } catch {
    return 0;
  }
}

function hasDirtyWorktree() {
  try {
    const trackedHeadEntries = readHeadTreeEntries();
    const trackedPaths = new Set(trackedHeadEntries.keys());

    if (hasUntrackedFiles(projectRoot, trackedPaths, "")) {
      return true;
    }

    const dirtyTrackedFiles = [...trackedHeadEntries.entries()].some(([relativePath, objectSha]) => {
      const worktreePath = resolve(projectRoot, relativePath);
      if (!existsSync(worktreePath)) {
        return true;
      }

      const fileBuffer = readFileSync(worktreePath);
      const blobHeader = Buffer.from(`blob ${fileBuffer.length}\0`, "utf8");
      const worktreeSha = createHash("sha1").update(blobHeader).update(fileBuffer).digest("hex");
      return worktreeSha !== objectSha;
    });

    if (dirtyTrackedFiles) {
      return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

function readGitText(relativePath) {
  return readFileSync(resolve(gitDir, relativePath), "utf8").trim();
}

function readGitObject(sha) {
  const objectPath = resolve(gitDir, "objects", sha.slice(0, 2), sha.slice(2));
  const objectBuffer = inflateSync(readFileSync(objectPath));
  const headerEndIndex = objectBuffer.indexOf(0);
  const header = objectBuffer.subarray(0, headerEndIndex).toString("utf8");
  const [type] = header.split(" ");
  return {
    type,
    payload: objectBuffer.subarray(headerEndIndex + 1),
  };
}

function readCommitParents(sha) {
  const object = readGitObject(sha);
  if (object.type !== "commit") {
    return [];
  }

  return object.payload
    .toString("utf8")
    .split(/\r?\n/)
    .filter((line) => line.startsWith("parent "))
    .map((line) => line.slice("parent ".length).trim());
}

function readHeadTreeEntries() {
  const head = readGitText("HEAD");
  const headSha = head.startsWith("ref: ")
    ? readGitText(head.slice("ref: ".length))
    : head;

  if (!headSha) {
    return new Map();
  }

  const commitObject = readGitObject(headSha);
  const treeLine = commitObject.payload
    .toString("utf8")
    .split(/\r?\n/)
    .find((line) => line.startsWith("tree "));
  const rootTreeSha = treeLine ? treeLine.slice("tree ".length).trim() : "";

  if (!rootTreeSha) {
    return new Map();
  }

  return readTreeEntries(rootTreeSha);
}

function readTreeEntries(treeSha, basePath = "", entries = new Map()) {
  const object = readGitObject(treeSha);
  if (object.type !== "tree") {
    return entries;
  }

  let cursor = 0;
  while (cursor < object.payload.length) {
    const spaceIndex = object.payload.indexOf(0x20, cursor);
    const mode = object.payload.subarray(cursor, spaceIndex).toString("utf8");
    const nameEndIndex = object.payload.indexOf(0x00, spaceIndex + 1);
    const name = object.payload.subarray(spaceIndex + 1, nameEndIndex).toString("utf8");
    const sha = object.payload.subarray(nameEndIndex + 1, nameEndIndex + 21).toString("hex");
    const relativePath = basePath ? `${basePath}/${name}` : name;

    if (mode === "40000") {
      readTreeEntries(sha, relativePath, entries);
    } else {
      entries.set(relativePath, sha);
    }

    cursor = nameEndIndex + 21;
  }

  return entries;
}

function hasUntrackedFiles(directoryPath, trackedPaths, relativeDirectory) {
  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    if (entry.name === ".git") {
      continue;
    }

    const relativePath = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
    const absolutePath = resolve(directoryPath, entry.name);

    if (isIgnoredPath(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      if (hasUntrackedFiles(absolutePath, trackedPaths, relativePath)) {
        return true;
      }
      continue;
    }

    if (!trackedPaths.has(relativePath)) {
      return true;
    }
  }

  return false;
}

function readIgnoredPaths() {
  try {
    return readFileSync(resolve(projectRoot, ".gitignore"), "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
  } catch {
    return [];
  }
}

function isIgnoredPath(relativePath) {
  const pathSegments = relativePath.split("/");
  return ignoredPaths.some((pattern) => {
    if (pattern.includes("/")) {
      return relativePath === pattern || relativePath.startsWith(`${pattern}/`);
    }

    return (
      relativePath === pattern ||
      relativePath.startsWith(`${pattern}/`) ||
      pathSegments.includes(pattern)
    );
  });
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
