import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..", "..");
const inputPath = path.join(rootDir, "public", "data", "menu-data.json");
const simpleTemplatePath = path.join(rootDir, "public", "data", "google-sheet-template-semplice.csv");
const outputDir = path.join(rootDir, "output", "google-sheet-admin-seed");

const sectionColumns = [
  "section_id",
  "sort_order",
  "title",
  "kicker",
  "description",
  "visible",
  "accent",
  "accent_soft",
  "footer_note",
  "source_mode",
];

const itemColumns = [
  "id",
  "section_id",
  "sort_order",
  "render_mode",
  "legacy_sheet_managed",
  "visibility_state",
  "availability_state",
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
  "image_url",
  "show_detail_hint",
  "notes",
];

const settingsColumns = ["key", "value", "notes"];
const auditColumns = ["timestamp", "actor_email", "action", "target_type", "target_id", "details_json"];

const menu = JSON.parse(await readFile(inputPath, "utf8"));
const legacyOverrides = await loadLegacyOverrides(simpleTemplatePath);
const now = new Date().toISOString();

const sections = menu.sections.map((section, index) => ({
  section_id: section.id,
  sort_order: index,
  title: section.title ?? "",
  kicker: section.kicker ?? "",
  description: section.description ?? "",
  visible: "si",
  accent: section.accent ?? "",
  accent_soft: section.accentSoft ?? "",
  footer_note: section.footerNote ?? "",
  source_mode: "legacy",
}));

const items = menu.sections.flatMap((section, sectionIndex) =>
  (section.items || []).map((item, itemIndex) => {
    const override = legacyOverrides.get(item.id) || null;
    const optionRows = normalizeOptions(item.options, override);

    return {
      id: item.id,
      section_id: section.id,
      sort_order: itemIndex,
      render_mode: "legacy",
      legacy_sheet_managed: item.excludeFromSheet === true ? "no" : "si",
      visibility_state: override?.visibility_state || "visibile",
      availability_state: override?.availability_state || resolveItemAvailabilityState(item),
      name: item.name ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      option_1_label: optionRows[0]?.label ?? "",
      option_1_display_label: optionRows[0]?.displayLabel ?? "",
      option_1_price: optionRows[0]?.price ?? "",
      option_2_label: optionRows[1]?.label ?? "",
      option_2_display_label: optionRows[1]?.displayLabel ?? "",
      option_2_price: optionRows[1]?.price ?? "",
      option_3_label: optionRows[2]?.label ?? "",
      option_3_display_label: optionRows[2]?.displayLabel ?? "",
      option_3_price: optionRows[2]?.price ?? "",
      image_url: "",
      show_detail_hint: item.showDetailHint === false ? "no" : "si",
      notes: buildItemNotes(item, override, sectionIndex),
    };
  })
);

const settings = [
  {
    key: "admin_items_tab",
    value: "admin_items",
    notes: "Base futura per CRUD prodotti dall'admin Apps Script.",
  },
  {
    key: "admin_sections_tab",
    value: "admin_sections",
    notes: "Base futura per ordine e contenuti delle sezioni.",
  },
  {
    key: "admin_audit_log_tab",
    value: "admin_audit_log",
    notes: "Storico modifiche dal backend admin.",
  },
  {
    key: "public_data_mode",
    value: "apps-script-json-endpoint",
    notes: "Il frontend pubblico legge un endpoint JSON esposto da Apps Script.",
  },
  {
    key: "migration_status",
    value: "admin-tabs-live",
    notes: "I tab admin sono la sorgente dati operativa del menu.",
  },
  {
    key: "allowed_editor_emails",
    value: "",
    notes: "Allowlist opzionale per la web app Apps Script. Separare piu email con virgola.",
  },
  {
    key: "public_menu_endpoint",
    value: "",
    notes: "URL pubblico del deployment Apps Script usato dal sito con ?mode=menu.",
  },
  {
    key: "public_menu_deployment_status",
    value: "",
    notes: "Compilare dopo il deploy pubblico dell endpoint JSON.",
  },
  {
    key: "seed_generated_at",
    value: now,
    notes: "Ultima generazione eseguita con scripts/sheets/export_admin_seed.mjs.",
  },
];

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeCsv(path.join(outputDir, "admin_sections.csv"), sectionColumns, sections),
  writeCsv(path.join(outputDir, "admin_items.csv"), itemColumns, items),
  writeCsv(path.join(outputDir, "admin_settings.csv"), settingsColumns, settings),
  writeCsv(path.join(outputDir, "admin_audit_log.csv"), auditColumns, []),
  writeFile(
    path.join(outputDir, "seed-summary.json"),
    JSON.stringify(
      {
        generatedAt: now,
        sectionCount: sections.length,
        itemCount: items.length,
        legacyOverrideCount: legacyOverrides.size,
        sectionColumns,
        itemColumns,
      },
      null,
      2
    )
  ),
]);

console.log(`Creato seed admin in ${outputDir}`);

async function loadLegacyOverrides(csvPath) {
  if (!(await pathExists(csvPath))) {
    return new Map();
  }

  const csvText = await readFile(csvPath, "utf8");
  const rows = parseCsvRows(csvText);
  return new Map(
    rows
      .filter((row) => row.id)
      .map((row) => [
        row.id,
        {
          visibility_state: normalizeVisibilityState(row.visibilita || row.visibilita_visibile_nascosto),
          availability_state: normalizeAvailabilityState(
            row.disponibilita || row.disponibilita_disponibile_non_disponibile_in_arrivo
          ),
          prezzo: parseSheetNumber(row.prezzo),
        },
      ])
  );
}

function normalizeOptions(options, override) {
  const nextOptions = Array.isArray(options)
    ? options.slice(0, 3).map((option) => ({
        label: option.label ?? "",
        displayLabel: option.displayLabel ?? "",
        price: formatPrice(option.price),
      }))
    : [];

  if (override?.prezzo != null) {
    if (nextOptions.length) {
      nextOptions[0].price = formatPrice(override.prezzo);
    } else {
      nextOptions.push({
        label: "",
        displayLabel: "",
        price: formatPrice(override.prezzo),
      });
    }
  }

  return nextOptions;
}

function resolveItemAvailabilityState(item) {
  if (typeof item.availabilityState === "string" && item.availabilityState.trim()) {
    switch (item.availabilityState.trim()) {
      case "coming-soon":
        return "in arrivo";
      case "unavailable":
        return "non disponibile";
      case "self-service":
        return "al carretto";
      default:
        return "disponibile";
    }
  }

  if (item.available === false) {
    return "non disponibile";
  }

  return "disponibile";
}

function buildItemNotes(item, override) {
  const notes = [];

  if (item.excludeFromSheet === true) {
    notes.push("Gestione operativa prevista via dati admin o personalizzazione nel progetto.");
  }

  if (override) {
    notes.push("Seed iniziale allineato alle override correnti del foglio semplice.");
  } else {
    notes.push("Seed iniziale derivato dal JSON del repo.");
  }

  return notes.join(" ");
}

function normalizeVisibilityState(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (["nascosto", "hidden", "hide", "no", "false", "0"].includes(normalized)) {
    return "nascosto";
  }

  return "visibile";
}

function normalizeAvailabilityState(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (["in arrivo", "arrivo", "coming soon", "coming-soon", "coming_soon"].includes(normalized)) {
    return "in arrivo";
  }

  if (["non disponibile", "unavailable", "sold out", "no", "false", "0"].includes(normalized)) {
    return "non disponibile";
  }

  if (["al carretto", "carretto", "self service", "self-service"].includes(normalized)) {
    return "al carretto";
  }

  return "disponibile";
}

function formatPrice(value) {
  if (value == null || value === "") {
    return "";
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return Number.isInteger(numericValue) ? String(numericValue) : String(numericValue).replace(".", ",");
}

function parseSheetNumber(value) {
  if (value == null || value === "") {
    return null;
  }

  const normalized = String(value)
    .trim()
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) ? numericValue : null;
}

async function writeCsv(filePath, columns, rows) {
  const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => escapeCsv(row[column] ?? "")).join(","))].join(
    "\n"
  );
  await writeFile(filePath, csv);
}

function escapeCsv(value) {
  const text = String(value);
  if (!/[",\n]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function parseCsvRows(csvText) {
  const rows = [];
  let currentCell = "";
  let currentRow = [];
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      currentRow.push(currentCell);
      currentCell = "";
      if (currentRow.some((cell) => cell !== "")) {
        rows.push(currentRow);
      }
      currentRow = [];
      continue;
    }

    currentCell += char;
  }

  currentRow.push(currentCell);
  if (currentRow.some((cell) => cell !== "")) {
    rows.push(currentRow);
  }

  if (!rows.length) {
    return [];
  }

  const [headers, ...dataRows] = rows;
  return dataRows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[normalizeHeader(header)] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function normalizeHeader(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")
    .replace(/[\/,-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}
