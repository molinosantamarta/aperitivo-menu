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
  "ordine",
  "visibile",
  "nome",
  "descrizione",
  "categoria",
  ...Array.from({ length: MAX_SIMPLE_OPTIONS }, (_, index) => [`variante_${index + 1}`, `prezzo_${index + 1}`]).flat(),
  "varianti_extra",
];

const menu = JSON.parse(await readFile(inputPath, "utf8"));

const rows = menu.sections.flatMap((section) =>
  section.items.map((item, index) => {
    const row = {
      id: item.id,
      sezione: section.id,
      ordine: index,
      visibile: "TRUE",
      nome: item.name ?? "",
      descrizione: item.description ?? "",
      categoria: item.category ?? "",
      varianti_extra: buildExtraVariants(item.options || []),
    };

    (item.options || []).slice(0, MAX_SIMPLE_OPTIONS).forEach((option, optionIndex) => {
      row[`variante_${optionIndex + 1}`] = option.label ?? "";
      row[`prezzo_${optionIndex + 1}`] = option.price ?? "";
    });

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

function escapeCsv(value) {
  const text = String(value);
  if (!/[",\n]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}
