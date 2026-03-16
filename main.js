const priceFormatter = new Intl.NumberFormat("it-IT", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const APP_VERSION = "20260316n";
const LOADER_HARD_TIMEOUT = 4000;
const LOADER_MIN_DURATION = 4000;
const MENU_LOADING_SLOW_DELAY = 4200;
const MENU_DATA_URL = buildVersionedPath("./data/menu-data.json");
const SHEET_CONFIG_URL = buildVersionedPath("./data/sheet-config.json");

let sections = [];
let itemLookup = {};
let itemSectionLookup = {};
let sideVisualObserver;
const loaderStartedAt = performance.now();
let appHasRevealed = false;

const state = {
  selectedItemId: null,
  selectedOptionIndex: 0,
  selectedQuantity: 1,
  cart: loadCart(),
};

const saveSummaryLabel = "Salva e continua";

const sectionNav = document.querySelector("#sectionNav");
const menuSections = document.querySelector("#menuSections");
const cartFab = document.querySelector("#cartFab");
const detailSheet = document.querySelector("#detailSheet");
const cartSheet = document.querySelector("#cartSheet");
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
const heroButterflyImage = document.querySelector(".hero-butterfly__image");

window.setTimeout(() => {
  revealApp();
}, LOADER_HARD_TIMEOUT);

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

  const option = item.options[state.selectedOptionIndex];
  const entryId = `${item.id}:${option.label}`;
  const existing = state.cart.find((entry) => entry.entryId === entryId);

  if (existing) {
    existing.quantity += state.selectedQuantity;
  } else {
    state.cart.push({
      entryId,
      itemId: item.id,
      name: item.name,
      category: item.category,
      optionLabel: option.label,
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
  if (!summary) {
    return;
  }

  closeCart();
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
  }
});

init();

async function init() {
  renderMenuLoadingState("loading");
  const menuDataPromise = loadMenuData();
  const slowLoadingTimer = window.setTimeout(() => {
    if (!sections.length) {
      renderMenuLoadingState("slow");
    }
  }, MENU_LOADING_SLOW_DELAY);

  try {
    await Promise.all([waitForCoreFonts(), waitMinimumLoaderTime(LOADER_MIN_DURATION)]);
    revealApp();
    warmSecondaryFonts();
    loadDeferredHeroMedia();

    const menuData = await menuDataPromise;
    window.clearTimeout(slowLoadingTimer);
    applyMenuData(menuData);

    scheduleNonCriticalWork(() => waitForCriticalAssets(menuData));
  } catch (error) {
    window.clearTimeout(slowLoadingTimer);
    console.error("Errore durante il caricamento del menu:", error);
    renderMenuLoadingState("retry");
    revealApp();
  }
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
  return value.trim().toLowerCase().replace(/\s+/g, "_");
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

  const options = parseSheetOptions(row);
  if (options.length) {
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
  return [1, 2, 3]
    .map((index) => {
      const price = parseSheetNumber(row[`option_${index}_price`]);
      const label = row[`option_${index}_label`] || "";
      const displayLabel = row[`option_${index}_display_label`] || "";

      if (price == null && !label && !displayLabel) {
        return null;
      }

      if (price == null) {
        return null;
      }

      return {
        label: label || `Opzione ${index}`,
        displayLabel,
        price,
      };
    })
    .filter(Boolean);
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

function waitForCoreFonts() {
  if (!("fonts" in document)) {
    return Promise.resolve();
  }

  const fontLoads = [
    document.fonts.load('700 1rem "Lulo Clean"'),
    document.fonts.load('400 1rem "Factually Handwriting"'),
  ];

  return Promise.race([
    Promise.all(fontLoads),
    new Promise((resolve) => window.setTimeout(resolve, 1800)),
  ]);
}

function warmSecondaryFonts() {
  if (!("fonts" in document)) {
    return;
  }

  scheduleNonCriticalWork(() =>
    Promise.all([
      document.fonts.load('400 1rem "Housky Demo"'),
      document.fonts.load('400 1rem "SignPainter"'),
    ]).catch(() => {})
  );
}

function waitMinimumLoaderTime(duration) {
  const elapsed = performance.now() - loaderStartedAt;
  const remaining = Math.max(0, duration - elapsed);
  return new Promise((resolve) => window.setTimeout(resolve, remaining));
}

async function waitForCriticalAssets(menuData) {
  const criticalUrls = collectCriticalAssetUrls(menuData);
  if (!criticalUrls.length) {
    return;
  }

  await promiseAllSettledCompat(criticalUrls.map((url) => preloadImage(url)));
}

function collectCriticalAssetUrls(menuData) {
  const urls = new Set(["./farfalla-bianca.gif"]);
  const criticalSections = menuData.sections.slice(0, 3);

  criticalSections.forEach((section) => {
    section.items.slice(0, 4).forEach((item) => {
      if (!hasCustomVisual(item)) {
        urls.add(getItemImage(item));
      }

      if (getVisualType(item) === "photo-panel" && item.visual && item.visual.asset) {
        urls.add(getVisualAsset(item.visual.asset));
      }

      getAllSideVisuals(item).forEach((visual) => {
        if (visual.asset) {
          urls.add(getSideVisualImage(visual));
        }
      });
    });
  });

  const allItems = menuData.sections.reduce((items, section) => items.concat(section.items), []);
  const gelatoItem = allItems.find((item) => item.id === "agri-gelato");

  if (gelatoItem && gelatoItem.visual && gelatoItem.visual.asset) {
    urls.add(getVisualAsset(gelatoItem.visual.asset));
  }

  return Array.from(urls).slice(0, 14);
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
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

function promiseTimeout(promise, duration) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      window.setTimeout(() => reject(new Error("Tempo scaduto durante il caricamento del menu")), duration)
    ),
  ]);
}

function buildVersionedPath(path) {
  return `${path}?v=${APP_VERSION}`;
}

function revealApp() {
  if (appHasRevealed) {
    return;
  }

  appHasRevealed = true;
  document.body.classList.remove("is-loading");
  if (appLoader) {
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
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        if (sideVisualObserver) {
          sideVisualObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  sideVisuals.forEach((visual) => sideVisualObserver.observe(visual));
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

  return `
    <button
      class="item-card${hasSideVisual(item) ? " item-card--with-side-visual" : ""}${
        hasFloatingBottle(item) ? " item-card--floating-bottle" : ""
      }${isArtisanalBeer ? " item-card--artisanal-beer" : ""}"
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
          ${item.options
            .map(
              (option) => `
                <span class="price-chip">${formatOptionChip(option)}</span>
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

function openDetail(itemId) {
  const item = itemLookup[itemId];
  if (!item) {
    return;
  }

  state.selectedItemId = itemId;
  state.selectedOptionIndex = 0;
  state.selectedQuantity = 1;
  detailCategory.textContent = formatDetailCategoryLabel(item);
  detailTitle.textContent = item.name;
  detailDescription.textContent = item.description;
  detailPreview.className = `sheet-preview${getDetailPreviewClass(item)}`;
  detailPreview.innerHTML = renderItemVisual(item, "detail");
  renderOptions(item);
  renderQuantityControl();
  detailSheet.classList.add("is-open");
  detailSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeDetail() {
  detailSheet.classList.remove("is-open");
  detailSheet.setAttribute("aria-hidden", "true");
  if (!cartSheet.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
  }
}

function openCart() {
  cartSheet.classList.add("is-open");
  cartSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeCart() {
  cartSheet.classList.remove("is-open");
  cartSheet.setAttribute("aria-hidden", "true");
  if (!detailSheet.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
  }
}

function renderOptions(item) {
  detailOptions.innerHTML = "";

  if (item.options.length === 1) {
    detailOptions.hidden = true;
    return;
  }

  detailOptions.hidden = false;

  item.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    const displayLabel = getOptionDisplayLabel(option);

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
    detailOptions.append(optionButton);
  });
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

    return `${sectionTitle} - ${categoryLabel}`;
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
  if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Continue with a fallback for browsers that block the first clipboard write.
    }
  }

  return copyTextFallback(text);
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

function getOptionDisplayLabel(option) {
  return option.displayLabel != null ? option.displayLabel : option.label;
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function formatOptionChip(option) {
  const displayLabel = getOptionDisplayLabel(option);
  return displayLabel
    ? `${displayLabel} · ${formatPrice(option.price)}`
    : formatPrice(option.price);
}

function hasCustomVisual(item) {
  const visualType = getVisualType(item);
  return (
    visualType === "placeholder-panel" ||
    visualType === "brand-pill" ||
    visualType === "beer-script" ||
    visualType === "photo-panel" ||
    visualType === "text-panel"
  );
}

function getCardVisualClass(item) {
  const visualType = getVisualType(item);

  if (visualType === "placeholder-panel") {
    return " item-card__visual--placeholder-panel";
  }

  if (visualType === "brand-pill") {
    return " item-card__visual--custom";
  }

  if (visualType === "beer-script") {
    return " item-card__visual--beer-script";
  }

  if (visualType === "photo-panel") {
    return " item-card__visual--photo-panel";
  }

  if (visualType === "text-panel") {
    return " item-card__visual--custom";
  }

  return "";
}

function getDetailPreviewClass(item) {
  const visualType = getVisualType(item);

  if (visualType === "placeholder-panel") {
    return " sheet-preview--placeholder-panel";
  }

  if (visualType === "brand-pill") {
    return " sheet-preview--custom";
  }

  if (visualType === "beer-script") {
    return " sheet-preview--beer-script";
  }

  if (visualType === "photo-panel") {
    return " sheet-preview--photo-panel";
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

  if (visualType === "placeholder-panel") {
    return renderPlaceholderPanelVisual(context);
  }

  if (visualType === "brand-pill") {
    return renderBrandPillVisual(item.visual, context);
  }

  if (visualType === "beer-script") {
    return renderBeerScriptVisual(item.visual, context);
  }

  if (visualType === "photo-panel") {
    return renderPhotoPanelVisual(item.visual, context);
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

function renderPhotoPanelVisual(visual, context) {
  const classes = ["photo-panel-visual"];
  if (context === "detail") {
    classes.push("photo-panel-visual--detail");
  }

  return `
    <div
      class="${classes.join(" ")}"
      style="
        --photo-panel-image: url('${getVisualAsset(visual.asset)}');
        --photo-panel-position: ${visual.position || "center center"};
        --photo-panel-size: ${visual.size || "cover"};
        --photo-panel-bg: ${visual.backgroundColor || "transparent"};
      "
    ></div>
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

function renderBrandPillVisual(visual, context) {
  const classes = ["brand-pill"];
  if (context === "detail") {
    classes.push("brand-pill--detail");
  }

  return `
    <div
      class="${classes.join(" ")}"
      style="
        --brand-pill-start: ${visual.gradientStart};
        --brand-pill-end: ${visual.gradientEnd};
        --brand-script-color: ${visual.scriptColor || "#111111"};
      "
    >
      <span class="brand-pill__script">${visual.script}</span>
      <span class="brand-pill__shape">
        <span class="brand-pill__label">${visual.label}</span>
      </span>
    </div>
  `;
}

function getItemImage(item) {
  return `./menu-assets/items/${item.id}.png`;
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
  const isSlow = mode === "slow";
  const isRetry = mode === "retry";

  sectionNav.innerHTML = `
    <span class="section-nav__placeholder${isSlow || isRetry ? " section-nav__placeholder--slow" : ""}">
      ${isRetry ? "Ricarico le categorie" : "Categorie in caricamento"}
    </span>
  `;

  const eyebrow = isRetry ? "Connessione lenta" : "Menu in arrivo";
  const title = isRetry
    ? "Sto ancora preparando categorie e prodotti."
    : isSlow
      ? "Sto caricando le risorse rimanenti del menu."
      : "Sto caricando categorie e prodotti.";
  const description = isRetry
    ? "Il resto dell'interfaccia e gia disponibile. Se vuoi, continua a scorrere la pagina mentre provo a completare il menu."
    : isSlow
      ? "Puoi continuare a leggere la pagina e le sezioni promo: intanto completo il caricamento del menu."
      : "Intanto puoi iniziare a leggere il resto della pagina e le informazioni sugli Agri-Eventi: il menu si completa tra poco.";

  menuSections.innerHTML = `
    <section class="menu-loading-card${isSlow || isRetry ? " menu-loading-card--slow" : ""}" aria-live="polite">
      <p class="eyebrow">${eyebrow}</p>
      <h2>${title}</h2>
      <p>
        ${description}
      </p>
      <div class="menu-loading-card__bar" aria-hidden="true">
        <span class="menu-loading-card__fill"></span>
      </div>
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
  if (sideVisual.tilt) {
    styles.push(`--side-visual-tilt: ${sideVisual.tilt}`);
  }

  return styles.join("; ");
}

function getAllSideVisuals(item) {
  return [item.sideVisual, item.accentVisual].filter(Boolean);
}
