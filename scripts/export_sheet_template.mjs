import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const inputPath = path.join(rootDir, "data", "menu-data.json");
const outputPath = path.join(rootDir, "data", "google-sheet-template.csv");

const columns = [
  "id",
  "section_id",
  "position",
  "visible",
  "available",
  "name",
  "description",
  "category",
  "option_1_label",
  "option_1_display_label",
  "option_1_price",
  "option_2_label",
  "option_2_display_label",
  "option_2_price",
  "option_3_label",
  "option_3_display_label",
  "option_3_price",
  "show_detail_hint",
  "visual_mode",
  "visual_label",
  "visual_script",
  "visual_gradient_start",
  "visual_gradient_mid",
  "visual_gradient_end",
  "visual_label_color",
  "visual_script_color",
];

const menu = JSON.parse(await readFile(inputPath, "utf8"));

const rows = menu.sections.flatMap((section) =>
  section.items.map((item, index) => {
    const row = {
      id: item.id,
      section_id: section.id,
      position: index,
      visible: "si",
      available: item.available === false ? "no" : "si",
      name: item.name ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      show_detail_hint: item.showDetailHint === false ? "no" : "si",
      visual_mode: "inherit",
      visual_label: "",
      visual_script: "",
      visual_gradient_start: "",
      visual_gradient_mid: "",
      visual_gradient_end: "",
      visual_label_color: "",
      visual_script_color: "",
    };

    item.options?.slice(0, 3).forEach((option, optionIndex) => {
      const baseKey = `option_${optionIndex + 1}`;
      row[`${baseKey}_label`] = option.label ?? "";
      row[`${baseKey}_display_label`] = option.displayLabel ?? "";
      row[`${baseKey}_price`] = option.price ?? "";
    });

    return row;
  })
);

const loaderRows = [
  "sistemando i tavoli nel parco",
  "tagliando il prato",
  "caricando le birre in frigo",
  "affettando il salame",
  "assaggiando lo spritz",
  "caricando i gelati nel carretto",
  "scoppiettando i popcorn",
].map((message, index) => ({
  id: `loader-message-${index + 1}`,
  section_id: "impostazioni",
  position: index,
  visible: "si",
  available: "si",
  name: message,
  description: "",
  category: "loader",
  show_detail_hint: "no",
  visual_mode: "inherit",
  visual_label: "",
  visual_script: "",
  visual_gradient_start: "",
  visual_gradient_mid: "",
  visual_gradient_end: "",
  visual_label_color: "",
  visual_script_color: "",
}));

const csv = [
  columns.join(","),
  ...[...rows, ...loaderRows].map((row) => columns.map((column) => escapeCsv(row[column] ?? "")).join(",")),
].join("\n");

await writeFile(outputPath, csv);
console.log(`Creato ${outputPath}`);

function escapeCsv(value) {
  const text = String(value);
  if (!/[",\n]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}
