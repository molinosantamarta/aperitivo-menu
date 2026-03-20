import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const inputPath = path.join(rootDir, "data", "menu-data.json");
const outputPath = path.join(rootDir, "data", "google-sheet-template-semplice.csv");
const MAX_SIMPLE_OPTIONS = 6;

const columns = [
  "id",
  "sezione",
  "visibile",
  "disponibile",
  "stato",
  "varianti",
  "prezzo_unico",
  ...Array.from({ length: MAX_SIMPLE_OPTIONS }, (_, index) => [`variante_${index + 1}`, `prezzo_${index + 1}`]).flat(),
  "varianti_extra",
];

const menu = JSON.parse(await readFile(inputPath, "utf8"));

const rows = menu.sections.flatMap((section) =>
  section.items.map((item, index) => {
    const row = {
      id: item.id,
      sezione: section.id,
      visibile: "si",
      disponibile: item.available === false ? "no" : "si",
      stato: getItemAvailabilityState(item),
      varianti: "",
      prezzo_unico: "",
      varianti_extra: "",
    };

    const options = item.options || [];
    const hasUniformPrice =
      options.length > 0 && options.every((option) => option.price === options[0].price);

    if (hasUniformPrice) {
      row.prezzo_unico = options[0].price ?? "";
      row.varianti = options
        .map((option) => option.label || option.displayLabel || "")
        .filter(Boolean)
        .join(" | ");
    } else {
      row.varianti_extra = buildExtraVariants(options);
      options.slice(0, MAX_SIMPLE_OPTIONS).forEach((option, optionIndex) => {
        row[`variante_${optionIndex + 1}`] = option.label ?? "";
        row[`prezzo_${optionIndex + 1}`] = option.price ?? "";
      });
    }

    return row;
  })
);

const csv = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => escapeCsv(row[column] ?? "")).join(",")),
].join("\n");

await writeFile(outputPath, csv);
console.log(`Creato ${outputPath}`);

function buildExtraVariants(options) {
  return options
    .slice(MAX_SIMPLE_OPTIONS)
    .map((option) => option.label || "")
    .filter(Boolean)
    .join(" | ");
}

function getItemAvailabilityState(item) {
  if (item?.availabilityState === "coming-soon") {
    return "in arrivo";
  }

  return item?.available === false ? "non disponibile" : "disponibile";
}

function escapeCsv(value) {
  const text = String(value);
  if (!/[",\n]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}
