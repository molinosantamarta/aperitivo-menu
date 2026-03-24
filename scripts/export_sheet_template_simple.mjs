import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const inputPath = path.join(rootDir, "data", "menu-data.json");
const outputPath = path.join(rootDir, "data", "google-sheet-template-semplice.csv");
const VISIBILITY_HEADER = "visibilita (visibile/nascosto)";
const AVAILABILITY_HEADER = "disponibilita (disponibile/non disponibile/in arrivo)";

const columns = [
  "nome attuale (solo riferimento)",
  "id",
  VISIBILITY_HEADER,
  AVAILABILITY_HEADER,
  "prezzo",
];

const menu = JSON.parse(await readFile(inputPath, "utf8"));

const rows = menu.sections.flatMap((section) =>
  section.items
    .filter((item) => item.excludeFromSheet !== true)
    .map((item, index) => {
      const row = {
        "nome attuale (solo riferimento)": item.name,
        id: item.id,
        [VISIBILITY_HEADER]: item.visible === false ? "nascosto" : "visibile",
        [AVAILABILITY_HEADER]: getItemAvailabilityState(item),
        prezzo: resolveSimplePrice(item),
      };

      return row;
    })
);

const csv = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => escapeCsv(row[column] ?? "")).join(",")),
].join("\n");

await writeFile(outputPath, csv);
console.log(`Creato ${outputPath}`);

function getItemAvailabilityState(item) {
  if (item?.availabilityState === "coming-soon") {
    return "in arrivo";
  }

  return item?.available === false ? "non disponibile" : "disponibile";
}

function resolveSimplePrice(item) {
  const options = Array.isArray(item?.options) ? item.options : [];
  if (!options.length) {
    return "";
  }

  const firstPrice = options[0]?.price;
  if (firstPrice == null) {
    return "";
  }

  const hasUniformPrice = options.every((option) => option.price === firstPrice);
  return hasUniformPrice ? formatSheetPrice(firstPrice) : "";
}

function formatSheetPrice(value) {
  if (value == null || value === "") {
    return "";
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return Number.isInteger(numericValue)
    ? String(numericValue)
    : String(numericValue).replace(".", ",");
}

function escapeCsv(value) {
  const text = String(value);
  if (!/[",\n]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}
