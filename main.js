const priceFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const APP_VERSION = "20260317b";
const LOADER_MIN_DURATION = 7000;
const FONT_LOAD_TIMEOUT = 20000;
const MENU_DATA_URL = buildVersionedPath("./data/menu-data.json");
const SHEET_CONFIG_URL = buildVersionedPath("./data/sheet-config.json");
const LOADER_MESSAGE_INTERVAL = 1900;
const LOADER_MESSAGE_FADE_DURATION = 420;
const LOADER_PROGRESS_WEIGHTS = {
  boot: 6,
  menuData: 20,
  render: 16,
  fonts: 14,
  deferredFonts: 8,
  menuAssets: 28,
  shellAssets: 8,
  timeGate: 8,
};
const LOADER_SHELL_ASSET_URLS = [
  "./menu-assets/footer.png",
  "./menu-assets/instagram-logo.webp",
  "./menu-assets/sgb-molino-black.png",
];
const SHEET_OPTION_INDEXES = Array.from({ length: 12 }, (_, index) => index + 1);
const LOADER_MESSAGES = [
  "sistemando i tavoli nel parco",
  "tagliando il prato",
  "caricando le birre in frigo",
  "affettando il salame",
  "assaggiando lo spritz",
  "caricando i gelati nel carretto",
  "scoppiettando i popcorn",
];

let sections = [];
let itemLookup = {};
let itemSectionLookup = {};
let sideVisualObserver;
let deferredPhotoPanelObserver;
let loaderProgressFrame = null;
let loaderMessageIntervalId = null;
const loaderStartedAt = performance.now();
let appHasRevealed = false;
let lastFocusedElement = null;
const BLOCKING_FONT_DESCRIPTORS = [
  '700 1rem "Lulo Clean"',
  '400 1rem "Housky Demo"',
  '400 1rem "Factually Handwriting"',
  '500 1rem "Montserrat"',
  '700 1rem "Montserrat"',
];
const DEFERRED_FONT_DESCRIPTORS = [
  '400 1rem "SignPainter"',
  '500 1rem "Caveat"',
];

const state = {
  selectedItemId: null,
  selectedOptionIndex: 0,
  selectedSelections: {},
  selectedQuantity: 1,
  cart: loadCart(),
};

const saveSummaryLabel = "Salva e continua";

const sectionNav = document.querySelector("#sectionNav");
const menuSections = document.querySelector("#menuSections");
const cartFab = document.querySelector("#cartFab");
const detailSheet = document.querySelector("#detailSheet");
const cartSheet = document.querySelector("#cartSheet");
const detailPanel = detailSheet.querySelector(".sheet-panel--detail");
const cartPanel = cartSheet.querySelector(".sheet-panel--cart");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailDescription = document.querySelector("#detailDescription");
const detailOptions = document.querySelector("#detailOptions");
const detailQuantity = document.querySelector("#detailQuantity");
const addToCartButton = document.querySelector("#addToCart");
const closeDetailButton = document.querySelector("#closeDetail");
const closeCartButton = document.querySelector("#closeCart");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartFooter = document.querySelector("#cartFooter");
const cartTotal = document.querySelector("#cartTotal");
const copySummaryButton = document.querySelector("#copySummary");
const clearCartButton = document.querySelector("#clearCart");
const detailPreview = document.querySelector("#detailPreview");
const appLoader = document.querySelector("#appLoader");
const appLoaderBar = document.querySelector("#appLoaderBar");
const appLoaderBarFill = document.querySelector("#appLoaderBarFill");
const appLoaderPercent = document.querySelector("#appLoaderPercent");
const appLoaderMessage = document.querySelector("#appLoaderMessage");
const heroButterflyImage = document.querySelector(".hero-butterfly__image");
const loaderProgressState = {
  boot: 0,
  menuData: 0,
  render: 0,
  fonts: 0,
  deferredFonts: 0,
  menuAssets: 0,
  shellAssets: 0,
  timeGate: 0,
};

cartFab.addEventListener("click", openCart);
closeDetailButton.addEventListener("click", closeDetail);
closeCartButton.addEventListener("click", closeCart);
detailSheet.addEventListener("click", (event) => {
  if (event.target === detailSheet) {
    closeDetail();
  }
});
cartSheet.addEventListener("click", (event) => {
  if (event.target === cartSheet) {
    closeCart();
  }
});

addToCartButton.addEventListener("click", () => {
  const item = itemLookup[state.selectedItemId];
  if (!item) {
    return;
  }

  const option = getSelectedOption(item);
  const entryId = buildCartEntryId(item, option);
  const existing = state.cart.find((entry) => entry.entryId === entryId);
  const configurationLabel = buildSelectionSummaryLabel(item, option);

  if (existing) {
    existing.quantity += state.selectedQuantity;
  } else {
    state.cart.push({
      entryId,
      itemId: item.id,
      name: item.name,
      category: item.category,
      optionLabel: configurationLabel,
      price: option.price,
      quantity: state.selectedQuantity,
    });
  }

  persistCart();
  renderCart();
  closeDetail();
  openCart();
});

copySummaryButton.addEventListener("click", async () => {
  const summary = buildSummary();
  blurActiveElement();
  closeCart();

  if (!summary) {
    copySummaryButton.textContent = saveSummaryLabel;
    return;
  }

  const saved = await saveSummary(summary);
  copySummaryButton.textContent = saved ? "Salvato" : "Continua";
  window.setTimeout(() => {
    copySummaryButton.textContent = saveSummaryLabel;
  }, 1600);
});

clearCartButton.addEventListener("click", () => {
  state.cart = [];
  persistCart();
  renderCart();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetail();
    closeCart();
    return;
  }

  if (event.key === "Tab") {
    const openModalPanel = getOpenModalPanel();
    if (openModalPanel) {
      trapFocus(event, openModalPanel);
    }
  }
});

initLoaderProgress();
init();

async function init() {
  let menuAssetsReadyPromise = Promise.resolve();
  const menuDataPromise = loadMenuData().then((menuData) => {
    setLoaderTaskProgress("menuData", 1);
    return menuData;
  });
  const fontsReadyPromise = waitForRequiredFonts().then(() => {
    setLoaderTaskProgress("fonts", 1);
  });
  const deferredFontsReadyPromise = waitForDeferredFonts().then(() => {
    setLoaderTaskProgress("deferredFonts", 1);
  });
  const shellAssetsReadyPromise = waitForShellAssets().then(() => {
    setLoaderTaskProgress("shellAssets", 1);
  });
  const minimumLoaderPromise = waitMinimumLoaderTime(LOADER_MIN_DURATION).then(() => {
    setLoaderTaskProgress("timeGate", 1);
  });

  try {
    const menuData = await menuDataPromise;
    menuAssetsReadyPromise = waitForMenuAssets(menuData).then(() => {
      setLoaderTaskProgress("menuAssets", 1);
    });
    applyMenuData(menuData);
    await waitForMenuRender();
    setLoaderTaskProgress("render", 1);
    await Promise.all([
      fontsReadyPromise,
      deferredFontsReadyPromise,
      menuAssetsReadyPromise,
      shellAssetsReadyPromise,
      minimumLoaderPromise,
    ]);
    revealApp();
    warmNonCriticalAssets(menuData);
  } catch (error) {
    console.error("Errore durante il caricamento del menu:", error);
    await promiseAllSettledCompat([
      fontsReadyPromise,
      deferredFontsReadyPromise,
      menuAssetsReadyPromise,
      shellAssetsReadyPromise,
      minimumLoaderPromise,
    ]);
    syncLoaderProgress("Menu non disponibile");
    renderMenuLoadingState("retry");
    revealApp();
  }
}

function initLoaderProgress() {
  startLoaderMessageRotation();
  setLoaderTaskProgress("boot", 1);
  startLoaderTimeProgress();
}

function startLoaderMessageRotation() {
  if (!appLoaderMessage || !LOADER_MESSAGES.length) {
    return;
  }

  let currentIndex = 0;
  appLoaderMessage.textContent = LOADER_MESSAGES[currentIndex];

  loaderMessageIntervalId = window.setInterval(() => {
    if (appHasRevealed) {
      return;
    }

    currentIndex = (currentIndex + 1) % LOADER_MESSAGES.length;
    appLoaderMessage.classList.add("is-transitioning");

    window.setTimeout(() => {
      if (!appLoaderMessage || appHasRevealed) {
        return;
      }

      appLoaderMessage.textContent = LOADER_MESSAGES[currentIndex];
      appLoaderMessage.classList.remove("is-transitioning");
    }, LOADER_MESSAGE_FADE_DURATION);
  }, LOADER_MESSAGE_INTERVAL);
}

function startLoaderTimeProgress() {
  const tick = () => {
    if (appHasRevealed) {
      loaderProgressFrame = null;
      return;
    }

    const elapsed = performance.now() - loaderStartedAt;
    const ratio = Math.max(0, Math.min(1, elapsed / LOADER_MIN_DURATION));
    setLoaderTaskProgress("timeGate", ratio);

    if (ratio < 1) {
      loaderProgressFrame = window.requestAnimationFrame(tick);
      return;
    }

    loaderProgressFrame = null;
  };

  loaderProgressFrame = window.requestAnimationFrame(tick);
}

function setLoaderTaskProgress(task, value) {
  if (!Object.prototype.hasOwnProperty.call(loaderProgressState, task)) {
    return;
  }

  const normalizedValue = Math.max(0, Math.min(1, value));
  if (normalizedValue <= loaderProgressState[task]) {
    return;
  }

  loaderProgressState[task] = normalizedValue;
  syncLoaderProgress();
}

function syncLoaderProgress(phaseOverride) {
  if (!appLoaderBarFill) {
    return;
  }

  const percentage = Math.round(
    Object.keys(LOADER_PROGRESS_WEIGHTS).reduce((sum, key) => {
      return sum + LOADER_PROGRESS_WEIGHTS[key] * (loaderProgressState[key] || 0);
    }, 0)
  );
  const phaseLabel = phaseOverride || resolveLoaderPhaseLabel(percentage);

  appLoaderBarFill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
  if (appLoaderPercent) {
    appLoaderPercent.textContent = `${Math.max(0, Math.min(100, percentage))}%`;
  }
  if (appLoaderBar) {
    appLoaderBar.setAttribute("aria-valuenow", String(Math.max(0, Math.min(100, percentage))));
    appLoaderBar.setAttribute("aria-valuetext", phaseLabel);
  }
}

function resolveLoaderPhaseLabel(percentage) {
  return `Caricamento menu ${Math.max(0, Math.min(100, percentage))}%`;
}

function applyMenuData(menuData) {
  sections = menuData.sections;
  itemLookup = sections.reduce((lookup, section) => {
    section.items.forEach((item) => {
      lookup[item.id] = item;
    });
    return lookup;
  }, {});
  itemSectionLookup = sections.reduce((lookup, section) => {
    section.items.forEach((item) => {
      lookup[item.id] = section.title;
    });
    return lookup;
  }, {});

  renderNavigation();
  renderSections();
  renderCart();
}

async function loadMenuData() {
  const response = await fetch(MENU_DATA_URL);
  if (!response.ok) {
    throw new Error(`Impossibile caricare data/menu-data.json (${response.status})`);
  }

  const baseData = await response.json();
  const sheetConfig = await loadSheetConfig();
  const sheetCsvUrl =
    sheetConfig && typeof sheetConfig.googleSheetCsvUrl === "string"
      ? sheetConfig.googleSheetCsvUrl.trim()
      : "";

  if (!sheetCsvUrl) {
    return baseData;
  }

  try {
    const sheetRows = await loadSheetRows(sheetCsvUrl);
    if (!sheetRows.length) {
      return baseData;
    }

    return applySheetRowsToMenu(baseData, sheetRows);
  } catch (error) {
    console.warn("Impossibile caricare le override dal Google Sheet:", error);
    return baseData;
  }
}

async function loadSheetConfig() {
  try {
    const response = await fetch(SHEET_CONFIG_URL);
    if (!response.ok) {
      return {};
    }

    return response.json();
  } catch (error) {
    return {};
  }
}

async function loadSheetRows(sheetCsvUrl) {
  const response = await fetch(sheetCsvUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Impossibile caricare il CSV del Google Sheet (${response.status})`);
  }

  const csvText = await response.text();
  return parseCsvRows(csvText);
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
  return dataRows
    .map((cells) =>
      headers.reduce((entry, header, index) => {
        entry[normalizeSheetHeader(header)] = (cells[index] || "").trim();
        return entry;
      }, {})
    )
    .filter((row) => row.id);
}

function normalizeSheetHeader(value) {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "_");
  const aliases = {
    sezione: "section_id",
    ordine: "position",
    visibile: "visible",
    nome: "name",
    descrizione: "description",
    categoria: "category",
    variante: "variante_1",
    prezzo: "prezzo_1",
  };

  return aliases[normalized] || normalized;
}

function applySheetRowsToMenu(baseMenu, sheetRows) {
  const nextMenu = JSON.parse(JSON.stringify(baseMenu));
  const sectionLookup = nextMenu.sections.reduce((lookup, section) => {
    lookup[section.id] = section;
    return lookup;
  }, {});
  const rowLookup = new Map(sheetRows.map((row) => [row.id, row]));

  nextMenu.sections.forEach((section) => {
    section.items = section.items
      .filter((item) => {
        const row = rowLookup.get(item.id);
        return row ? parseSheetBoolean(row.visible, true) : true;
      })
      .map((item, index) => {
        const row = rowLookup.get(item.id);
        const nextItem = row ? updateItemFromSheet(item, row, section) : item;
        nextItem.__sheetPosition = parseSheetInteger(row ? row.position : null, index);
        return nextItem;
      });
  });

  sheetRows.forEach((row) => {
    const exists = nextMenu.sections.some((section) => section.items.some((item) => item.id === row.id));
    if (exists || !parseSheetBoolean(row.visible, true)) {
      return;
    }

    const targetSection = sectionLookup[row.section_id];
    if (!targetSection) {
      return;
    }

    const newItem = createItemFromSheet(row, targetSection);
    if (!newItem) {
      return;
    }

    newItem.__sheetPosition = parseSheetInteger(row.position, targetSection.items.length);
    targetSection.items.push(newItem);
  });

  nextMenu.sections.forEach((section) => {
    section.items = section.items
      .sort((left, right) => getSheetPosition(left) - getSheetPosition(right))
      .map((item) => {
        delete item.__sheetPosition;
        return item;
      });
  });

  return nextMenu;
}

function updateItemFromSheet(item, row, section) {
  const nextItem = { ...item };

  if (row.name) {
    nextItem.name = row.name;
  }
  if (row.description) {
    nextItem.description = row.description;
  }
  if (row.category) {
    nextItem.category = row.category;
  }
  if (row.show_detail_hint) {
    nextItem.showDetailHint = parseSheetBoolean(
      row.show_detail_hint,
      nextItem.showDetailHint == null ? true : nextItem.showDetailHint
    );
  }

  const options = mergeSheetOptions(nextItem.options, row);
  if (options) {
    nextItem.options = options;
  }

  const visual = buildSheetVisual(row, section, nextItem.visual, nextItem.name);
  if (visual) {
    nextItem.visual = visual;
  }

  return nextItem;
}

function createItemFromSheet(row, section) {
  const options = parseSheetOptions(row);
  if (!options.length) {
    return null;
  }

  return {
    id: row.id,
    page: 1,
    name: row.name || row.visual_label || row.id,
    category: row.category || section.title,
    description: row.description || "",
    showDetailHint: parseSheetBoolean(row.show_detail_hint, false),
    options,
    visual: buildSheetVisual(row, section, null, row.name || row.id),
  };
}

function buildSheetVisual(row, section, existingVisual, fallbackName) {
  const visualMode = (row.visual_mode || "").toLowerCase();

  if (!visualMode) {
    if (existingVisual) {
      return existingVisual;
    }

    return {
      type: "text-panel",
      label: row.visual_label || fallbackName,
      script: row.visual_script || "",
      gradientStart: row.visual_gradient_start || section.accent,
      gradientEnd: row.visual_gradient_end || section.accentSoft,
      labelColor: row.visual_label_color || "#fffdf8",
      scriptColor: row.visual_script_color || "rgba(17, 17, 17, 0.72)",
    };
  }

  if (visualMode === "inherit") {
    return existingVisual;
  }

  if (visualMode === "beer-script") {
    return {
      type: "beer-script",
      label: row.visual_label || fallbackName,
      script: row.visual_script || "",
      gradientStart: row.visual_gradient_start || section.accent,
      gradientMid: row.visual_gradient_mid || row.visual_gradient_end || section.accentSoft,
      gradientEnd: row.visual_gradient_end || section.accentSoft,
      labelColor: row.visual_label_color || "#fffdf8",
      textStyle: (row.visual_text_style || "").toLowerCase() === "display" ? "display" : undefined,
    };
  }

  return {
    type: "text-panel",
    label: row.visual_label || fallbackName,
    script: row.visual_script || "",
    gradientStart: row.visual_gradient_start || section.accent,
    gradientEnd: row.visual_gradient_end || section.accentSoft,
    labelColor: row.visual_label_color || "#fffdf8",
    scriptColor: row.visual_script_color || "rgba(17, 17, 17, 0.72)",
  };
}

function parseSheetOptions(row) {
  return SHEET_OPTION_INDEXES.map((index) => buildSheetOption(index, row)).filter(Boolean);
}

function mergeSheetOptions(existingOptions, row) {
  const nextOptions = (existingOptions || []).map((option) => ({ ...option }));
  let hasOverrides = false;

  SHEET_OPTION_INDEXES.forEach((index) => {
    const optionInput = getSheetOptionInput(row, index);
    if (!optionInput.hasValues) {
      return;
    }

    hasOverrides = true;
    const existingOption = nextOptions[index - 1];

    if (existingOption) {
      if (optionInput.label) {
        existingOption.label = optionInput.label;
      }
      if (optionInput.displayLabel) {
        existingOption.displayLabel = optionInput.displayLabel;
      }
      if (optionInput.price != null) {
        existingOption.price = optionInput.price;
      }
      return;
    }

    if (optionInput.price == null) {
      return;
    }

    nextOptions[index - 1] = {
      label: optionInput.label || `Opzione ${index}`,
      displayLabel: optionInput.displayLabel || "",
      price: optionInput.price,
    };
  });

  return hasOverrides ? nextOptions.filter(Boolean) : null;
}

function buildSheetOption(index, row) {
  const optionInput = getSheetOptionInput(row, index);
  if (!optionInput.hasValues || optionInput.price == null) {
    return null;
  }

  return {
    label: optionInput.label || `Opzione ${index}`,
    displayLabel: optionInput.displayLabel || "",
    price: optionInput.price,
  };
}

function getSheetOptionInput(row, index) {
  const rawPrice = getFirstSheetValue(
    row[`option_${index}_price`],
    row[`prezzo_${index}`],
    index === 1 ? row.prezzo : ""
  );
  const label = getFirstSheetValue(
    row[`option_${index}_label`],
    row[`variante_${index}`],
    index === 1 ? row.variante : ""
  );
  const displayLabel = getFirstSheetValue(row[`option_${index}_display_label`]);
  const price = parseSheetNumber(rawPrice);

  return {
    label,
    displayLabel,
    price,
    hasValues: Boolean(label || displayLabel || rawPrice),
  };
}

function getFirstSheetValue(...values) {
  for (const value of values) {
    if (value == null) {
      continue;
    }

    const normalized = String(value).trim();
    if (normalized) {
      return normalized;
    }
  }

  return "";
}

function getSheetPosition(item) {
  return item && item.__sheetPosition != null ? item.__sheetPosition : 0;
}

function parseSheetBoolean(value, fallbackValue) {
  if (!value) {
    return fallbackValue;
  }

  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "si", "sì", "y"].includes(normalized)) {
    return true;
  }
  if (["false", "0", "no", "n"].includes(normalized)) {
    return false;
  }

  return fallbackValue;
}

function parseSheetInteger(value, fallbackValue) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
}

function parseSheetNumber(value) {
  if (value == null || value === "") {
    return null;
  }

  const normalized = String(value).replace(",", ".").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

async function waitForRequiredFonts() {
  if (!("fonts" in document)) {
    return;
  }

  await promiseAllSettledCompat(BLOCKING_FONT_DESCRIPTORS.map((descriptor) => waitForFontLoad(descriptor)));

  if (document.fonts.ready) {
    try {
      await waitWithTimeout(document.fonts.ready, FONT_LOAD_TIMEOUT);
    } catch (error) {
      console.warn("Timeout nel caricamento dei font bloccanti.");
    }
  }
}

async function waitForFontLoad(descriptor) {
  const deadline = performance.now() + FONT_LOAD_TIMEOUT;

  while (true) {
    let loadedFonts = [];
    try {
      loadedFonts = await waitWithTimeout(document.fonts.load(descriptor), 2600);
    } catch (error) {
      console.warn(`Impossibile verificare il font: ${descriptor}`);
      return;
    }

    if (loadedFonts && loadedFonts.length > 0) {
      return;
    }

    if (performance.now() >= deadline) {
      console.warn(`Timeout nel caricamento del font: ${descriptor}`);
      return;
    }

    await wait(140);
  }
}

function waitMinimumLoaderTime(duration) {
  const elapsed = performance.now() - loaderStartedAt;
  const remaining = Math.max(0, duration - elapsed);
  return new Promise((resolve) => window.setTimeout(resolve, remaining));
}

async function waitForMenuRender() {
  await waitForNextPaint();
  await waitForNextPaint();

  const hasCategories = sectionNav.querySelectorAll(".section-nav__link").length > 0;
  const hasSections = menuSections.querySelectorAll(".menu-section").length > 0;

  if (!hasCategories || !hasSections) {
    throw new Error("Categorie e prodotti non sono stati renderizzati correttamente.");
  }
}

function warmNonCriticalAssets(menuData) {
  scheduleNonCriticalWork(() => {
    window.setTimeout(() => {
      loadDeferredHeroMedia();
    }, 900);
  });
}

function waitForDeferredFonts() {
  if (!("fonts" in document) || !DEFERRED_FONT_DESCRIPTORS.length) {
    return Promise.resolve();
  }

  return promiseAllSettledCompat(DEFERRED_FONT_DESCRIPTORS.map((descriptor) => waitForFontLoad(descriptor)));
}

function waitForShellAssets() {
  return promiseAllSettledCompat(LOADER_SHELL_ASSET_URLS.map((url) => preloadImage(url, "high", 12000)));
}

function waitForMenuAssets(menuData) {
  const assetUrls = collectMenuVisualAssetUrls(menuData);
  if (!assetUrls.length) {
    return Promise.resolve();
  }

  return promiseAllSettledCompat(assetUrls.map((url) => preloadImage(url, "high", 14000)));
}

function collectMenuVisualAssetUrls(menuData) {
  const urls = new Set();

  menuData.sections.forEach((section) => {
    section.items.forEach((item) => {
      collectVisualAssetUrls(item.visual, urls);
      getAllSideVisuals(item).forEach((visual) => collectSideVisualAssetUrls(visual, urls));

      if (Array.isArray(item.detailGallery)) {
        item.detailGallery.forEach((visual) => collectVisualAssetUrls(visual, urls));
      }
    });
  });

  return Array.from(urls);
}

function collectVisualAssetUrls(visual, urls) {
  if (!visual || !urls) {
    return;
  }

  if (visual.asset) {
    urls.add(getVisualAsset(visual.asset));
  }

  if (visual.type === "can-cluster" && Array.isArray(visual.items)) {
    visual.items.forEach((item) => {
      if (item && item.asset) {
        urls.add(getVisualAsset(item.asset));
      }
    });
  }
}

function collectSideVisualAssetUrls(visual, urls) {
  if (visual && visual.asset) {
    urls.add(getSideVisualImage(visual));
  }
}

function preloadImage(url, priority = "auto", timeout = 12000) {
  return new Promise((resolve) => {
    const image = new Image();
    const timeoutId = window.setTimeout(() => {
      resolve();
    }, timeout);
    image.decoding = "async";
    if ("fetchPriority" in image) {
      image.fetchPriority = priority;
    }
    image.onload = () => {
      window.clearTimeout(timeoutId);
      resolve();
    };
    image.onerror = () => {
      window.clearTimeout(timeoutId);
      resolve();
    };
    image.src = url;
  });
}

function promiseAllSettledCompat(promises) {
  return Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}

function scheduleNonCriticalWork(task) {
  const runTask = () => {
    try {
      Promise.resolve(task()).catch(() => {});
    } catch (error) {
      // Ignore non-critical warmup failures.
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(runTask, { timeout: 1200 });
    return;
  }

  window.setTimeout(runTask, 180);
}

function buildVersionedPath(path) {
  return `${path}?v=${APP_VERSION}`;
}

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function waitForNextPaint() {
  return new Promise((resolve) => {
    if ("requestAnimationFrame" in window) {
      window.requestAnimationFrame(() => resolve());
      return;
    }

    window.setTimeout(resolve, 16);
  });
}

function waitWithTimeout(promise, duration) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("timeout"));
    }, duration);

    Promise.resolve(promise).then(
      (value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

function revealApp() {
  if (appHasRevealed) {
    return;
  }

  if (loaderMessageIntervalId != null) {
    window.clearInterval(loaderMessageIntervalId);
    loaderMessageIntervalId = null;
  }

  if (loaderProgressFrame != null && "cancelAnimationFrame" in window) {
    window.cancelAnimationFrame(loaderProgressFrame);
    loaderProgressFrame = null;
  }

  loaderProgressState.menuData = 1;
  loaderProgressState.render = 1;
  loaderProgressState.fonts = 1;
  loaderProgressState.deferredFonts = 1;
  loaderProgressState.menuAssets = 1;
  loaderProgressState.shellAssets = 1;
  loaderProgressState.timeGate = 1;
  syncLoaderProgress("Menu pronto");

  appHasRevealed = true;
  document.body.classList.remove("is-loading");
  if (appLoader) {
    appLoader.setAttribute("aria-hidden", "true");
    appLoader.classList.add("is-hidden");
  }

  window.setTimeout(() => {
    if (appLoader) {
      appLoader.remove();
    }
  }, 320);
}

function loadDeferredHeroMedia() {
  if (!heroButterflyImage || heroButterflyImage.getAttribute("src")) {
    return;
  }

  const deferredSrc = heroButterflyImage.getAttribute("data-src");
  if (!deferredSrc) {
    return;
  }

  if ("fetchPriority" in heroButterflyImage) {
    heroButterflyImage.fetchPriority = "low";
  }
  heroButterflyImage.setAttribute("src", deferredSrc);
}

function renderNavigation() {
  sectionNav.innerHTML = sections
    .map(
      (section) => `
        <a
          class="section-nav__link"
          href="#section-${section.id}"
          style="color: ${section.accent}; background: ${section.accentSoft};"
        >
          ${section.title}
        </a>
      `
    )
    .join("");
}

function renderSections() {
  menuSections.innerHTML = sections.map((section, index) => renderSection(section, index === 0)).join("");

  menuSections.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.itemId));
  });

  setupSideVisualAnimations();
  setupDeferredBottleBackgrounds();
}

function setupSideVisualAnimations() {
  if (sideVisualObserver) {
    sideVisualObserver.disconnect();
  }

  const sideVisuals = menuSections.querySelectorAll(".item-card__side-visual--floating");
  if (!sideVisuals.length) {
    return;
  }

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sideVisuals.forEach((visual) => visual.classList.add("is-visible"));
    return;
  }

  sideVisualObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  sideVisuals.forEach((visual) => sideVisualObserver.observe(visual));
}

function setupDeferredBottleBackgrounds() {
  if (deferredPhotoPanelObserver) {
    deferredPhotoPanelObserver.disconnect();
  }

  const panels = menuSections.querySelectorAll(".photo-panel-visual--deferred[data-photo-panel-image]");
  if (!panels.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    scheduleNonCriticalWork(() => {
      panels.forEach((panel) => loadDeferredPhotoPanel(panel));
    });
    return;
  }

  deferredPhotoPanelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        loadDeferredPhotoPanel(entry.target);
        if (deferredPhotoPanelObserver) {
          deferredPhotoPanelObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "280px 0px",
    }
  );

  panels.forEach((panel) => deferredPhotoPanelObserver.observe(panel));
}

function loadDeferredPhotoPanel(panel) {
  if (!panel || panel.dataset.photoPanelLoaded === "true") {
    return;
  }

  const imageUrl = panel.dataset.photoPanelImage;
  if (!imageUrl) {
    return;
  }

  panel.dataset.photoPanelLoaded = "loading";

  preloadImage(imageUrl, "low").then(() => {
    panel.style.setProperty("--photo-panel-image", `url('${imageUrl}')`);
    panel.dataset.photoPanelLoaded = "true";
    panel.classList.remove("photo-panel-visual--deferred");
  });
}

function renderSection(section, isLeadSection) {
  if (section.layout === "grouped" && Array.isArray(section.groups)) {
    return `
      <section
        class="menu-section menu-section--grouped${isLeadSection ? " menu-section--lead" : ""}"
        id="section-${section.id}"
        style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft};"
      >
        <div class="menu-section__inner">
          <div class="menu-section__header menu-section__header--centered">
            <h2>${section.title}</h2>
            <div class="menu-section__group-pills" aria-label="Categorie ${section.title}">
              ${section.groups
                .map(
                  (group) => `
                    <a class="menu-section__group-pill" href="#section-${section.id}-${group.id}">
                      ${group.label}
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="menu-group-stack">
            ${section.groups
              .map((group) => {
                const items = section.items.filter((item) => item.group === group.id);
                return `
                  <section class="menu-group" id="section-${section.id}-${group.id}">
                    <div class="menu-group__header">
                      <span class="menu-group__pill">${group.label}</span>
                      <p class="menu-group__description${group.description ? "" : " menu-group__description--empty"}">
                        ${group.description || "&nbsp;"}
                      </p>
                    </div>
                    <div class="menu-section__items">
                      ${items.map((item) => renderItemCard(item)).join("")}
                    </div>
                  </section>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section
      class="menu-section${isLeadSection ? " menu-section--lead" : ""}"
      id="section-${section.id}"
      style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft};"
    >
      <div class="menu-section__inner">
        <div class="menu-section__header">
          <h2>${section.title}</h2>
          <span class="menu-section__kicker">${section.kicker}</span>
          <p>${section.description}</p>
        </div>
        <div class="menu-section__items">
          ${section.items.map((item) => renderItemCard(item)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderItemCard(item) {
  const isArtisanalBeer = isArtisanalBeerItem(item);
  const isBeer = isBeerItem(item);
  const isDrink = isDrinkItem(item);

  return `
    <button
      class="item-card${hasSideVisual(item) ? " item-card--with-side-visual" : ""}${
        hasFloatingBottle(item) ? " item-card--floating-bottle" : ""
      }${isBeer ? " item-card--beer" : ""}${isArtisanalBeer ? " item-card--artisanal-beer" : ""}${
        isDrink ? " item-card--drink" : ""
      }"
      type="button"
      data-item-id="${item.id}"
      aria-haspopup="dialog"
      aria-label="Apri dettagli per ${item.name}"
    >
      <div class="item-card__visual${getCardVisualClass(item)}">
        ${renderItemVisual(item, "card")}
      </div>
      <div class="item-card__content${
        hasSideVisual(item) && !hasFloatingBottle(item) ? " item-card__content--with-side-visual" : ""
      }">
        <div class="item-card__topline">
          <span class="item-card__label">${item.category}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="item-card__prices">
          ${getCardOptionsToDisplay(item)
            .map(
              (option) => `
                <span class="price-chip">${formatOptionChip(item, option)}</span>
              `
            )
            .join("")}
        </div>
        ${renderItemSideVisual(item)}
      </div>
    </button>
  `;
}

function isArtisanalBeerItem(item) {
  return (
    findSectionTitleForItem(item.id).toLowerCase() === "birre" &&
    getItemCategoryLabel(item).toLowerCase() === "artigianali"
  );
}

function isBeerItem(item) {
  return findSectionTitleForItem(item.id).toLowerCase() === "birre";
}

function isDrinkItem(item) {
  return findSectionTitleForItem(item.id).toLowerCase() === "drink";
}

function isBottleSectionItem(item) {
  return findSectionTitleForItem(item.id).toLowerCase() === "bottiglie";
}

function openDetail(itemId) {
  const item = itemLookup[itemId];
  if (!item) {
    return;
  }

  rememberLastFocusedElement();
  state.selectedItemId = itemId;
  initializeDetailState(item);
  detailPanel.classList.toggle("sheet-panel--selection-groups", getSelectionGroups(item).length > 0);
  detailPanel.classList.toggle("sheet-panel--long-options", hasLongOptionList(item));
  detailPanel.scrollTop = 0;
  detailCategory.textContent = formatDetailCategoryLabel(item);
  detailTitle.textContent = item.name;
  detailDescription.textContent = item.description;
  detailPreview.className = `sheet-preview${getDetailPreviewClass(item)}${
    hasDetailGallery(item) ? " sheet-preview--gallery" : ""
  }${
    isArtisanalBeerItem(item) || isDrinkItem(item) ? " sheet-preview--beer-script-framed" : ""
  }`;
  detailPreview.innerHTML = renderDetailPreview(item);
  setupDetailGallery();
  renderOptions(item);
  renderQuantityControl();
  detailSheet.classList.add("is-open");
  detailSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  focusElement(closeDetailButton);
}

function closeDetail() {
  detailPanel.classList.remove("sheet-panel--selection-groups");
  detailPanel.classList.remove("sheet-panel--long-options");
  detailSheet.classList.remove("is-open");
  detailSheet.setAttribute("aria-hidden", "true");
  if (!cartSheet.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
    restoreLastFocusedElement();
  }
}

function openCart() {
  rememberLastFocusedElement();
  cartSheet.classList.add("is-open");
  cartSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  focusElement(closeCartButton);
}

function closeCart() {
  cartSheet.classList.remove("is-open");
  cartSheet.setAttribute("aria-hidden", "true");
  if (!detailSheet.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
    restoreLastFocusedElement();
  }
}

function renderOptions(item) {
  detailOptions.innerHTML = "";
  const selectionGroups = getSelectionGroups(item);
  const shouldShowFormat = item.options.length > 1;

  if (!selectionGroups.length && !shouldShowFormat) {
    detailOptions.hidden = true;
    return;
  }

  detailOptions.hidden = false;

  selectionGroups.forEach((group) => {
    const groupNode = createOptionGroup(group.label, true);

    group.options.forEach((selectionOption, index) => {
      const optionButton = document.createElement("button");
      const selectedIndex = getSelectedSelectionIndex(group);
      const toneClass = getSelectionOptionToneClass(item, group, selectionOption);

      optionButton.type = "button";
      optionButton.className = `option-btn option-btn--label-only${toneClass ? ` ${toneClass}` : ""}${
        index === selectedIndex ? " is-selected" : ""
      }`;
      optionButton.innerHTML = `<span class="option-label option-label--solo">${selectionOption.label}</span>`;
      optionButton.addEventListener("click", () => {
        state.selectedSelections[group.id] = index;
        renderOptions(item);
      });
      groupNode.options.append(optionButton);
    });

    detailOptions.append(groupNode.wrapper);
  });

  if (!shouldShowFormat) {
    return;
  }

  const formatGroup = createOptionGroup(selectionGroups.length ? "Formato" : "");

  item.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    const displayLabel = getOptionDisplayLabel(item, option);

    optionButton.type = "button";
    optionButton.className = `option-btn${index === state.selectedOptionIndex ? " is-selected" : ""}${
      displayLabel ? "" : " option-btn--price-only"
    }`;
    optionButton.innerHTML = displayLabel
      ? `
          <span class="option-label">${displayLabel}</span>
          <span class="option-price">${formatPrice(option.price)}</span>
        `
      : `
          <span class="option-price option-price--solo">${formatPrice(option.price)}</span>
        `;
    optionButton.addEventListener("click", () => {
      state.selectedOptionIndex = index;
      renderOptions(item);
    });
    formatGroup.options.append(optionButton);
  });

  detailOptions.append(formatGroup.wrapper);
}

function renderQuantityControl() {
  detailQuantity.innerHTML = `
    <div class="detail-quantity__pill" aria-label="Seleziona quantita">
      <button
        class="qty-btn detail-quantity__btn"
        type="button"
        aria-label="Riduci quantita"
        ${state.selectedQuantity <= 1 ? "disabled" : ""}
      >
        −
      </button>
      <span class="detail-quantity__value">${state.selectedQuantity}</span>
      <button
        class="qty-btn detail-quantity__btn"
        type="button"
        aria-label="Aumenta quantita"
      >
        +
      </button>
    </div>
  `;

  const [decreaseButton, increaseButton] = detailQuantity.querySelectorAll(".detail-quantity__btn");
  if (decreaseButton) {
    decreaseButton.addEventListener("click", () => updateSelectedQuantity(-1));
  }
  if (increaseButton) {
    increaseButton.addEventListener("click", () => updateSelectedQuantity(1));
  }
}

function updateSelectedQuantity(delta) {
  state.selectedQuantity = Math.max(1, state.selectedQuantity + delta);
  renderQuantityControl();
}

function initializeDetailState(item) {
  state.selectedOptionIndex = 0;
  state.selectedQuantity = 1;
  state.selectedSelections = {};

  getSelectionGroups(item).forEach((group) => {
    state.selectedSelections[group.id] = 0;
  });
}

function createOptionGroup(label, compact = false) {
  const wrapper = document.createElement("section");
  wrapper.className = "option-group";

  if (label) {
    const title = document.createElement("p");
    title.className = "option-group__label";
    title.textContent = label;
    wrapper.append(title);
  }

  const options = document.createElement("div");
  options.className = `option-group__options${compact ? " option-group__options--compact" : ""}`;
  wrapper.append(options);

  return { wrapper, options };
}

function renderCart() {
  cartItems.innerHTML = "";
  const cartQuantity = state.cart.reduce((sum, entry) => sum + entry.quantity, 0);
  cartCount.textContent = cartQuantity;

  if (state.cart.length === 0) {
    cartEmpty.hidden = false;
    cartItems.hidden = true;
    cartFooter.hidden = true;
  } else {
    cartEmpty.hidden = true;
    cartItems.hidden = false;
    cartFooter.hidden = false;

    state.cart.forEach((entry) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      row.innerHTML = `
        <div>
          <strong>${entry.name}</strong>
          <p>${entry.optionLabel} · ${formatPrice(entry.price)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" type="button" aria-label="Rimuovi una quantità">−</button>
          <span>${entry.quantity}</span>
          <button class="qty-btn" type="button" aria-label="Aggiungi una quantità">+</button>
        </div>
      `;

      const [decreaseButton, increaseButton] = row.querySelectorAll(".qty-btn");
      decreaseButton.addEventListener("click", () => updateQuantity(entry.entryId, -1));
      increaseButton.addEventListener("click", () => updateQuantity(entry.entryId, 1));

      cartItems.append(row);
    });
  }

  cartTotal.textContent = formatCartBreakdown(state.cart);
}

function updateQuantity(entryId, delta) {
  const entry = state.cart.find((cartEntry) => cartEntry.entryId === entryId);
  if (!entry) {
    return;
  }

  entry.quantity += delta;
  state.cart = state.cart.filter((cartEntry) => cartEntry.quantity > 0);
  persistCart();
  renderCart();
}

function buildSummary() {
  if (state.cart.length === 0) {
    return "";
  }

  const lines = state.cart.map(
    (entry) => `${entry.quantity}x ${entry.name} (${entry.optionLabel})`
  );
  lines.push(`Totale: ${formatCartBreakdown(state.cart)}`);
  return lines.join("\n");
}

function formatCartBreakdown(entries) {
  const breakdown = entries.reduce(
    (totals, entry) => {
      const bucket = getCartSummaryBucket(entry);

      if (bucket === "bevande") {
        totals.bevande += entry.quantity;
      } else if (bucket === "bottiglie") {
        totals.bottiglie += entry.quantity;
      } else if (bucket === "taglieri") {
        totals.taglieri += entry.quantity;
      } else if (bucket === "ignored") {
        totals.ignored += entry.quantity;
      } else {
        totals.other += entry.quantity;
      }

      return totals;
    },
    { bevande: 0, bottiglie: 0, taglieri: 0, ignored: 0, other: 0 }
  );

  const parts = [];

  if (breakdown.bevande > 0) {
    parts.push(`${breakdown.bevande} ${pluralize(breakdown.bevande, "bevanda", "bevande")}`);
  }

  if (breakdown.bottiglie > 0) {
    parts.push(`${breakdown.bottiglie} ${pluralize(breakdown.bottiglie, "bottiglia", "bottiglie")}`);
  }

  if (breakdown.taglieri > 0) {
    parts.push(`${breakdown.taglieri} ${pluralize(breakdown.taglieri, "tagliere", "taglieri")}`);
  }

  if (parts.length > 0) {
    return parts.join(" + ");
  }

  const fallbackCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  return `${fallbackCount} ${pluralize(fallbackCount, "prodotto", "prodotti")}`;
}

function getCartSummaryBucket(entry) {
  const item = itemLookup[entry.itemId];
  const category = getItemCategoryLabel(item, entry).toLowerCase();
  const sectionTitle = findSectionTitleForItem(entry.itemId).toLowerCase();
  const optionLabel = (entry.optionLabel || "").toLowerCase();

  if (sectionTitle === "agri-gelato" || category === "dolce freddo") {
    return "ignored";
  }

  if (sectionTitle === "taglieri" || category.includes("taglieri")) {
    return "taglieri";
  }

  if (
    sectionTitle === "bottiglie" ||
    category === "vino" ||
    category === "bollicine" ||
    category === "selezione zero"
  ) {
    if (optionLabel.includes("calice")) {
      return "bevande";
    }

    return "bottiglie";
  }

  if (
    sectionTitle === "birre" ||
    sectionTitle === "drink" ||
    sectionTitle === "altre bevande" ||
    category === "drink" ||
    category === "altre bevande" ||
    category === "artigianali" ||
    category === "classiche" ||
    category === "alla spina"
  ) {
    return "bevande";
  }

  return "other";
}

function findSectionTitleForItem(itemId) {
  return itemSectionLookup[itemId] || "";
}

function formatDetailCategoryLabel(item) {
  const sectionTitle = findSectionTitleForItem(item.id).trim();
  const categoryLabel = getItemCategoryLabel(item).trim();

  if (sectionTitle && categoryLabel) {
    const normalizedSection = normalizeLabel(sectionTitle);
    const normalizedCategory = normalizeLabel(categoryLabel);

    if (normalizedSection === normalizedCategory) {
      return sectionTitle;
    }

    if (normalizedCategory.includes(normalizedSection)) {
      return categoryLabel;
    }

    if (normalizedSection.includes(normalizedCategory)) {
      return sectionTitle;
    }

    return `${sectionTitle} ${categoryLabel}`;
  }

  return categoryLabel || sectionTitle;
}

function normalizeLabel(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function saveSummary(text) {
  blurActiveElement();

  if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Continue with a fallback for browsers that block the first clipboard write.
    }
  }

  if (shouldSkipClipboardFallback()) {
    return false;
  }

  return copyTextFallback(text);
}

function shouldSkipClipboardFallback() {
  const touchPoints = navigator.maxTouchPoints || 0;
  const coarsePointer =
    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const mobileUserAgent = /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent || "");
  return touchPoints > 0 || coarsePointer || mobileUserAgent;
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  textarea.remove();
  return copied;
}

function blurActiveElement() {
  if (document.activeElement && typeof document.activeElement.blur === "function") {
    document.activeElement.blur();
  }
}

function rememberLastFocusedElement() {
  if (detailSheet.classList.contains("is-open") || cartSheet.classList.contains("is-open")) {
    return;
  }

  if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
    lastFocusedElement = document.activeElement;
  }
}

function restoreLastFocusedElement() {
  if (!(lastFocusedElement instanceof HTMLElement) || !document.contains(lastFocusedElement)) {
    lastFocusedElement = null;
    return;
  }

  focusElement(lastFocusedElement);
  lastFocusedElement = null;
}

function focusElement(element) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  window.requestAnimationFrame(() => {
    try {
      element.focus({ preventScroll: true });
    } catch (error) {
      element.focus();
    }
  });
}

function getOpenModalPanel() {
  if (detailSheet.classList.contains("is-open")) {
    return detailPanel;
  }

  if (cartSheet.classList.contains("is-open")) {
    return cartPanel;
  }

  return null;
}

function getFocusableElements(container) {
  if (!(container instanceof HTMLElement)) {
    return [];
  }

  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");
}

function trapFocus(event, container) {
  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (!(activeElement instanceof HTMLElement) || !container.contains(activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem("molino-cart");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function persistCart() {
  try {
    window.localStorage.setItem("molino-cart", JSON.stringify(state.cart));
  } catch (error) {
    // Ignore storage failures on browsers with restricted storage access.
  }
}

function formatPrice(value) {
  return priceFormatter.format(value);
}

function getSelectionGroups(item) {
  return Array.isArray(item.selectionGroups) ? item.selectionGroups : [];
}

function getSelectedOption(item) {
  return item.options[state.selectedOptionIndex] || item.options[0];
}

function getSelectedSelectionIndex(group) {
  const selectedIndex = state.selectedSelections[group.id];
  return Number.isInteger(selectedIndex) ? selectedIndex : 0;
}

function getSelectionOptionToneClass(item, group, selectionOption) {
  if (!item || item.id !== "oltrepo" || !group || group.id !== "wine-style" || !selectionOption) {
    return "";
  }

  const normalizedLabel = normalizeLabel(selectionOption.label || "");

  if (normalizedLabel === "bonarda" || normalizedLabel === "barbera") {
    return "option-btn--wine-red";
  }

  if (
    normalizedLabel === "chardonnay" ||
    normalizedLabel === "pinot grigio" ||
    normalizedLabel === "pinot-grigio"
  ) {
    return "option-btn--wine-white";
  }

  return "";
}

function getSelectedSelectionLabels(item) {
  return getSelectionGroups(item)
    .map((group) => group.options[getSelectedSelectionIndex(group)]?.label || "")
    .filter(Boolean);
}

function buildSelectionSummaryLabel(item, option) {
  const parts = [...getSelectedSelectionLabels(item)];

  if (option && option.label) {
    parts.push(option.label);
  }

  return parts.join(" · ");
}

function buildCartEntryId(item, option) {
  const selectionKey = getSelectedSelectionLabels(item).map(normalizeLabel);
  const optionKey = option && option.label ? normalizeLabel(option.label) : "";

  return [item.id, ...selectionKey, optionKey].filter(Boolean).join(":");
}

function getOptionDisplayLabel(item, option) {
  if (option.displayLabel != null) {
    return option.displayLabel;
  }

  if (item && isBottleSectionItem(item) && item.options.length === 1) {
    return "";
  }

  return option.label;
}

function getCardOptionsToDisplay(item) {
  if (!item || !Array.isArray(item.options) || item.options.length <= 1) {
    return item?.options || [];
  }

  if (typeof item.cardPriceOverride === "number") {
    return [
      {
        label: "",
        displayLabel: "",
        price: item.cardPriceOverride,
      },
    ];
  }

  const [firstOption, ...otherOptions] = item.options;
  const allSamePrice = otherOptions.every((option) => option.price === firstOption.price);

  if (allSamePrice) {
    return [
      {
        ...firstOption,
        displayLabel: "",
      },
    ];
  }

  return item.options;
}

function hasLongOptionList(item) {
  return Boolean(item && Array.isArray(item.options) && item.options.length >= 6);
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function formatOptionChip(item, option) {
  const displayLabel = getOptionDisplayLabel(item, option);
  return displayLabel
    ? `${displayLabel} · ${formatPrice(option.price)}`
    : formatPrice(option.price);
}

function hasDetailGallery(item) {
  return item && Array.isArray(item.detailGallery) && item.detailGallery.length > 1;
}

function setupDetailGallery() {
  const track = detailPreview.querySelector("[data-detail-gallery-track]");
  if (!track) {
    return;
  }

  const slides = Array.from(track.querySelectorAll("[data-gallery-slide]"));
  const dots = Array.from(detailPreview.querySelectorAll("[data-gallery-dot]"));

  const updateActiveDot = () => {
    const slideWidth = track.clientWidth || 1;
    const activeIndex = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / slideWidth)));

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetSlide = slides[index];
      if (!targetSlide) {
        return;
      }

      track.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: "smooth",
      });
    });
  });

  track.addEventListener("scroll", updateActiveDot, { passive: true });
  updateActiveDot();
}

function getCardVisualClass(item) {
  const visualType = getVisualType(item);

  if (visualType === "none") {
    return " item-card__visual--hidden";
  }

  if (visualType === "placeholder-panel") {
    return " item-card__visual--placeholder-panel";
  }

  if (visualType === "beer-script") {
    return " item-card__visual--beer-script";
  }

  if (visualType === "photo-panel") {
    return " item-card__visual--photo-panel";
  }

  if (visualType === "can-cluster") {
    return " item-card__visual--custom";
  }

  if (visualType === "text-panel") {
    return " item-card__visual--custom";
  }

  return "";
}

function getDetailPreviewClass(item) {
  const visualType = getVisualType(item);

  if (visualType === "none") {
    return " sheet-preview--hidden";
  }

  if (visualType === "placeholder-panel") {
    return " sheet-preview--placeholder-panel";
  }

  if (visualType === "beer-script") {
    return " sheet-preview--beer-script";
  }

  if (visualType === "photo-panel") {
    return " sheet-preview--photo-panel";
  }

  if (visualType === "can-cluster") {
    return " sheet-preview--custom";
  }

  if (visualType === "text-panel") {
    return " sheet-preview--custom";
  }

  return "";
}

function hasSideVisual(item) {
  return getAllSideVisuals(item).length > 0;
}

function hasFloatingBottle(item) {
  return getAllSideVisuals(item).some((visual) => visual.type === "floating-bottle");
}

function renderItemVisual(item, context) {
  const visualType = getVisualType(item);

  if (visualType === "none") {
    return "";
  }

  if (visualType === "placeholder-panel") {
    return renderPlaceholderPanelVisual(context);
  }

  if (visualType === "beer-script") {
    return renderBeerScriptVisual(item.visual, context);
  }

  if (visualType === "photo-panel") {
    return renderPhotoPanelVisual(item.visual, context, item);
  }

  if (visualType === "can-cluster") {
    return renderCanClusterVisual(item.visual, context);
  }

  if (visualType === "text-panel") {
    return renderTextPanelVisual(item.visual, context);
  }

  return renderPlaceholderPanelVisual(context);
}

function renderPlaceholderPanelVisual(context) {
  const classes = ["placeholder-panel-visual"];
  if (context === "detail") {
    classes.push("placeholder-panel-visual--detail");
  }

  return `<div class="${classes.join(" ")}" aria-hidden="true"></div>`;
}

function renderDetailPreview(item) {
  if (!hasDetailGallery(item)) {
    return renderItemVisual(item, "detail");
  }

  const slides = item.detailGallery
    .map(
      (visual, index) => `
        <div class="detail-gallery__slide" data-gallery-slide="${index}">
          ${renderVisualByType(visual, "detail")}
        </div>
      `
    )
    .join("");

  const dots = item.detailGallery
    .map(
      (_, index) => `
        <button
          class="detail-gallery__dot${index === 0 ? " is-active" : ""}"
          type="button"
          aria-label="Vai all'immagine ${index + 1}"
          data-gallery-dot="${index}"
        ></button>
      `
    )
    .join("");

  return `
    <div class="detail-gallery">
      <div class="detail-gallery__track" data-detail-gallery-track>
        ${slides}
      </div>
      <div class="detail-gallery__dots" aria-label="Più immagini disponibili">
        ${dots}
      </div>
    </div>
  `;
}

function renderVisualByType(visual, context) {
  if (!visual || !visual.type) {
    return renderPlaceholderPanelVisual(context);
  }

  if (visual.type === "beer-script") {
    return renderBeerScriptVisual(visual, context);
  }

  if (visual.type === "photo-panel") {
    return renderPhotoPanelVisual(visual, context, null);
  }

  if (visual.type === "can-cluster") {
    return renderCanClusterVisual(visual, context);
  }

  if (visual.type === "text-panel") {
    return renderTextPanelVisual(visual, context);
  }

  return renderPlaceholderPanelVisual(context);
}

function renderBeerScriptVisual(visual, context) {
  const classes = ["beer-script-visual"];
  if (context === "detail") {
    classes.push("beer-script-visual--detail");
  }
  if (visual.textStyle === "display") {
    classes.push("beer-script-visual--display");
  }

  return `
    <div
      class="${classes.join(" ")}"
      style="
        --beer-script-start: ${visual.gradientStart || "#f0ede8"};
        --beer-script-mid: ${visual.gradientMid || visual.gradientEnd || "#f8f5f0"};
        --beer-script-end: ${visual.gradientEnd || "#f8f5f0"};
        --beer-script-color: ${visual.labelColor || "rgba(56, 39, 24, 0.9)"};
      "
    >
      ${visual.script ? `<span class="beer-script-visual__script">${visual.script}</span>` : ""}
      <span class="beer-script-visual__label">${visual.label}</span>
    </div>
  `;
}

function renderPhotoPanelVisual(visual, context, item) {
  const classes = ["photo-panel-visual"];
  if (context === "detail") {
    classes.push("photo-panel-visual--detail");
  }

  const shouldDeferImage = context !== "detail" && item && isBottleSectionItem(item);
  const imageUrl = getVisualAsset(visual.asset);

  if (shouldDeferImage) {
    classes.push("photo-panel-visual--deferred");
  }

  return `
    <div
      class="${classes.join(" ")}"
      ${shouldDeferImage ? `data-photo-panel-image="${imageUrl}" data-photo-panel-loaded="false"` : ""}
      style="
        --photo-panel-image: ${shouldDeferImage ? "none" : `url('${imageUrl}')`};
        --photo-panel-position: ${visual.position || "center center"};
        --photo-panel-size: ${visual.size || "cover"};
        --photo-panel-bg: ${visual.backgroundColor || "transparent"};
        --photo-panel-blend: ${visual.blendMode || "normal"};
      "
    ></div>
  `;
}

function renderCanClusterVisual(visual, context) {
  const classes = ["can-cluster-visual"];
  if (context === "detail") {
    classes.push("can-cluster-visual--detail");
  }

  const cans = Array.isArray(visual.items)
    ? visual.items
        .map(
          (item) => `
            <img
              class="can-cluster-visual__can"
              src="${getVisualAsset(item.asset)}"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              style="
                --can-left: ${item.left || "50%"};
                --can-bottom: ${item.bottom || "-18%"};
                --can-width: ${item.width || "64px"};
                --can-rotate: ${item.rotate || "0deg"};
                --can-z: ${item.zIndex || 1};
                --can-float-distance: ${item.floatDistance || "5px"};
                --can-float-duration: ${item.floatDuration || "4.2s"};
                --can-float-delay: ${item.floatDelay || "0s"};
              "
            />
          `
        )
        .join("")
    : "";

  return `
    <div
      class="${classes.join(" ")}"
      style="--can-cluster-bg: ${visual.backgroundColor || "#d8dee8"};"
    >
      ${cans}
    </div>
  `;
}

function renderTextPanelVisual(visual, context) {
  const classes = ["text-panel-visual"];
  if (context === "detail") {
    classes.push("text-panel-visual--detail");
  }

  return `
    <div
      class="${classes.join(" ")}"
      style="
        --text-panel-start: ${visual.gradientStart || "#38281b"};
        --text-panel-end: ${visual.gradientEnd || "#a67343"};
        --text-panel-label: ${visual.labelColor || "#fffdf8"};
        --text-panel-script: ${visual.scriptColor || "rgba(17, 17, 17, 0.72)"};
      "
    >
      ${visual.script ? `<span class="text-panel-visual__script">${visual.script}</span>` : ""}
      <span class="text-panel-visual__label">${visual.label}</span>
    </div>
  `;
}

function renderItemSideVisual(item) {
  const sideVisuals = getAllSideVisuals(item);
  if (!sideVisuals.length) {
    return "";
  }

  return sideVisuals
    .map((visual) => {
      const sideVisualClass =
        visual.type === "floating-bottle"
          ? "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-bottle"
          : "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-accent";

      return `
        <span
          class="${sideVisualClass}"
          aria-hidden="true"
          style="${buildSideVisualStyle(visual)}"
        ></span>
      `;
    })
    .join("");
}

function getSideVisualImage(visual) {
  const assetName = visual && visual.asset ? visual.asset : "";
  return `./menu-assets/items/${assetName}`;
}

function getVisualType(item) {
  return item && item.visual ? item.visual.type : "placeholder-panel";
}

function getItemCategoryLabel(item, entry) {
  if (item && item.category) {
    return item.category;
  }

  if (entry && entry.category) {
    return entry.category;
  }

  return "";
}

function renderMenuLoadingState(mode) {
  const isRetry = mode === "retry";

  sectionNav.innerHTML = `
    <span class="section-nav__placeholder${isRetry ? " section-nav__placeholder--slow" : ""}">
      ${isRetry ? "Menu non disponibile" : "Categorie in caricamento"}
    </span>
  `;

  const eyebrow = isRetry ? "Menu non disponibile" : "Menu in arrivo";
  const title = isRetry ? "Non sono riuscito a caricare categorie e prodotti." : "Sto caricando categorie e prodotti.";
  const description = isRetry
    ? "Controlla la connessione e riprova. Il resto della pagina resta comunque disponibile."
    : "Intanto puoi iniziare a leggere il resto della pagina e le informazioni sugli Agri-Eventi: il menu si completa tra poco.";

  menuSections.innerHTML = `
    <section class="menu-loading-card${isRetry ? " menu-loading-card--slow" : ""}" aria-live="polite">
      <p class="eyebrow">${eyebrow}</p>
      <h2>${title}</h2>
      <p>
        ${description}
      </p>
      ${
        isRetry
          ? `
            <button class="utility-btn utility-btn--accent menu-loading-card__action" id="retryLoad" type="button">
              Ricarica il menu
            </button>
          `
          : ""
      }
    </section>
  `;

  const retryButton = document.querySelector("#retryLoad");
  if (retryButton) {
    retryButton.addEventListener("click", () => window.location.reload());
  }
}

function getVisualAsset(assetName) {
  return `./menu-assets/items/${assetName}`;
}

function buildSideVisualStyle(sideVisual) {
  const styles = [`background-image: url('${getSideVisualImage(sideVisual)}')`];

  if (sideVisual.width) {
    styles.push(`--side-visual-width: ${sideVisual.width}`);
  }
  if (sideVisual.height) {
    styles.push(`--side-visual-height: ${sideVisual.height}`);
  }
  if (sideVisual.right) {
    styles.push(`--side-visual-right: ${sideVisual.right}`);
  }
  if (sideVisual.bottom) {
    styles.push(`--side-visual-bottom: ${sideVisual.bottom}`);
  }
  if (sideVisual.top) {
    styles.push(`--side-visual-top: ${sideVisual.top}`);
  }
  if (sideVisual.backgroundSize) {
    styles.push(`--side-visual-size: ${sideVisual.backgroundSize}`);
  }
  if (sideVisual.backgroundPosition) {
    styles.push(`--side-visual-position: ${sideVisual.backgroundPosition}`);
  }
  if (sideVisual.blendMode) {
    styles.push(`--side-visual-blend: ${sideVisual.blendMode}`);
  }
  if (sideVisual.zIndex) {
    styles.push(`--side-visual-z: ${sideVisual.zIndex}`);
  }
  if (sideVisual.tilt) {
    styles.push(`--side-visual-tilt: ${sideVisual.tilt}`);
  }

  return styles.join("; ");
}

function getAllSideVisuals(item) {
  return [item.sideVisual, item.accentVisual].filter(Boolean);
}
