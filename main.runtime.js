(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const priceFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const APP_VERSION = "20260317zi";
  const LOADER_MIN_DURATION = 7e3;
  const FONT_LOAD_TIMEOUT = 2e4;
  const STRICT_FONT_LOAD_TIMEOUT = 45e3;
  const CRITICAL_IMAGE_LOAD_TIMEOUT = 22e3;
  const CRITICAL_IMAGE_RETRY_COUNT = 2;
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
    timeGate: 8
  };
  const SHEET_OPTION_INDEXES = Array.from({ length: 12 }, (_, index) => index + 1);
  const LOADER_MESSAGES = [
    "sistemo i tavoli nel parco",
    "nel verde, tutto rallenta un po'",
    "metto in fresco le birre",
    "stendo i teli da picnic",
    "assaggio lo spritz",
    "metto i gelati nel carretto",
    "scoppiettando i popcorn",
    "inforno le pizzette",
    "tutto comincia dalle cose semplici",
    "affetto il salame",
    "taglio il pane appena sfornato",
    "scoppiettano i popcorn",
    "il parco si accende lentamente"
  ];
  const PROMO_AGRI_VIDEOS = [
    {
      title: "Video Agri-Eventi 1",
      src: "https://www.youtube-nocookie.com/embed/ybJPaALHaHE?rel=0&playsinline=1"
    },
    {
      title: "Video Agri-Eventi 2",
      src: "https://www.youtube-nocookie.com/embed/HIj8MBQlARg?rel=0&playsinline=1"
    },
    {
      title: "Video Agri-Eventi 3",
      src: "https://www.youtube-nocookie.com/embed/EHJjUmRYWKU?rel=0&playsinline=1"
    }
  ];
  const CRITICAL_MENU_SECTION_IDS = /* @__PURE__ */ new Set(["birre", "drink"]);
  let sections = [];
  let itemLookup = {};
  let itemSectionLookup = {};
  let sideVisualObserver;
  let deferredPhotoPanelObserver;
  let loaderProgressFrame = null;
  let loaderMessageIntervalId = null;
  let loaderMessages = [...LOADER_MESSAGES];
  let loaderMessageIndex = 0;
  const loaderStartedAt = performance.now();
  let appHasRevealed = false;
  let lastFocusedElement = null;
  const CRITICAL_FONT_DESCRIPTORS = ['400 1rem "Housky Demo"'];
  const BLOCKING_FONT_DESCRIPTORS = [
    '700 1rem "Lulo Clean"',
    '400 1rem "Factually Handwriting"',
    '500 1rem "Montserrat"',
    '700 1rem "Montserrat"'
  ];
  const DEFERRED_FONT_DESCRIPTORS = [
    '400 1rem "SignPainter"',
    '500 1rem "Caveat"'
  ];
  const state = {
    selectedItemId: null,
    selectedOptionIndex: 0,
    selectedSelections: {},
    selectedQuantity: 1,
    cart: loadCart()
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
  const promoAgriCarousel = document.querySelector("#promoAgriCarousel");
  const promoAgriVideoFrame = document.querySelector("#promoAgriVideoFrame");
  const promoAgriCarouselDots = document.querySelector("#promoAgriCarouselDots");
  const formatCarousel = document.querySelector("#formatCarousel");
  const formatCarouselTrack = document.querySelector("#formatCarouselTrack");
  const formatCarouselDots = document.querySelector("#formatCarouselDots");
  const loaderProgressState = {
    boot: 0,
    menuData: 0,
    render: 0,
    fonts: 0,
    deferredFonts: 0,
    menuAssets: 0,
    shellAssets: 0,
    timeGate: 0
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
        quantity: state.selectedQuantity
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
  initPromoAgriCarousel();
  initFormatCarousel();
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
        minimumLoaderPromise
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
        minimumLoaderPromise
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
    if (!appLoaderMessage || !loaderMessages.length) {
      return;
    }
    appLoaderMessage.textContent = loaderMessages[loaderMessageIndex];
    loaderMessageIntervalId = window.setInterval(() => {
      if (appHasRevealed) {
        return;
      }
      loaderMessageIndex = (loaderMessageIndex + 1) % loaderMessages.length;
      appLoaderMessage.classList.add("is-transitioning");
      window.setTimeout(() => {
        if (!appLoaderMessage || appHasRevealed) {
          return;
        }
        appLoaderMessage.textContent = loaderMessages[loaderMessageIndex];
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
    appLoaderBarFill.style.width = "".concat(Math.max(0, Math.min(100, percentage)), "%");
    if (appLoaderPercent) {
      appLoaderPercent.textContent = "".concat(Math.max(0, Math.min(100, percentage)), "%");
    }
    if (appLoaderBar) {
      appLoaderBar.setAttribute("aria-valuenow", String(Math.max(0, Math.min(100, percentage))));
      appLoaderBar.setAttribute("aria-valuetext", phaseLabel);
    }
  }
  function resolveLoaderPhaseLabel(percentage) {
    return "Caricamento menu ".concat(Math.max(0, Math.min(100, percentage)), "%");
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
      throw new Error("Impossibile caricare data/menu-data.json (".concat(response.status, ")"));
    }
    const baseData = await response.json();
    const sheetConfig = await loadSheetConfig();
    const sheetCsvUrl = sheetConfig && typeof sheetConfig.googleSheetCsvUrl === "string" ? sheetConfig.googleSheetCsvUrl.trim() : "";
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
      throw new Error("Impossibile caricare il CSV del Google Sheet (".concat(response.status, ")"));
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
    return dataRows.map(
      (cells) => headers.reduce((entry, header, index) => {
        entry[normalizeSheetHeader(header)] = (cells[index] || "").trim();
        return entry;
      }, {})
    ).filter((row) => row.id);
  }
  function normalizeSheetHeader(value) {
    const normalized = value.trim().toLowerCase().replace(/\s+/g, "_");
    const aliases = {
      sezione: "section_id",
      ordine: "position",
      visibile: "visible",
      disponibile: "available",
      disponibilita: "available",
      nome: "name",
      descrizione: "description",
      categoria: "category",
      variante: "variante_1",
      prezzo: "prezzo_1"
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
      section.items = section.items.filter((item) => {
        const row = rowLookup.get(item.id);
        return row ? parseSheetBoolean(row.visible, true) : true;
      }).map((item, index) => {
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
      section.items = section.items.sort((left, right) => getSheetPosition(left) - getSheetPosition(right)).map((item) => {
        delete item.__sheetPosition;
        return item;
      });
    });
    return nextMenu;
  }
  function updateItemFromSheet(item, row, section) {
    const nextItem = __spreadValues({}, item);
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
    nextItem.available = parseSheetBoolean(row.available, nextItem.available !== false);
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
      available: parseSheetBoolean(row.available, true),
      showDetailHint: parseSheetBoolean(row.show_detail_hint, false),
      options,
      visual: buildSheetVisual(row, section, null, row.name || row.id)
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
        scriptColor: row.visual_script_color || "rgba(17, 17, 17, 0.72)"
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
        textStyle: (row.visual_text_style || "").toLowerCase() === "display" ? "display" : void 0
      };
    }
    return {
      type: "text-panel",
      label: row.visual_label || fallbackName,
      script: row.visual_script || "",
      gradientStart: row.visual_gradient_start || section.accent,
      gradientEnd: row.visual_gradient_end || section.accentSoft,
      labelColor: row.visual_label_color || "#fffdf8",
      scriptColor: row.visual_script_color || "rgba(17, 17, 17, 0.72)"
    };
  }
  function parseSheetOptions(row) {
    const compactOptions = parseCompactSheetOptions(row);
    if (compactOptions.length) {
      return compactOptions;
    }
    return SHEET_OPTION_INDEXES.map((index) => buildSheetOption(index, row)).filter(Boolean);
  }
  function mergeSheetOptions(existingOptions, row) {
    const compactOptions = parseCompactSheetOptions(row);
    if (compactOptions.length) {
      return compactOptions;
    }
    const nextOptions = (existingOptions || []).map((option) => __spreadValues({}, option));
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
        label: optionInput.label || "Opzione ".concat(index),
        displayLabel: optionInput.displayLabel || "",
        price: optionInput.price
      };
    });
    return hasOverrides ? nextOptions.filter(Boolean) : null;
  }
  function parseCompactSheetOptions(row) {
    const rawVariants = getFirstSheetValue(row.varianti);
    const sharedPrice = parseSheetNumber(getFirstSheetValue(row.prezzo_unico));
    if (!rawVariants || sharedPrice == null) {
      return [];
    }
    return rawVariants.split("|").map((label) => label.trim()).filter(Boolean).map((label) => ({
      label,
      displayLabel: "",
      price: sharedPrice
    }));
  }
  function buildSheetOption(index, row) {
    const optionInput = getSheetOptionInput(row, index);
    if (!optionInput.hasValues || optionInput.price == null) {
      return null;
    }
    return {
      label: optionInput.label || "Opzione ".concat(index),
      displayLabel: optionInput.displayLabel || "",
      price: optionInput.price
    };
  }
  function getSheetOptionInput(row, index) {
    const rawPrice = getFirstSheetValue(
      row["option_".concat(index, "_price")],
      row["prezzo_".concat(index)],
      index === 1 ? row.prezzo : ""
    );
    const label = getFirstSheetValue(
      row["option_".concat(index, "_label")],
      row["variante_".concat(index)],
      index === 1 ? row.variante : ""
    );
    const displayLabel = getFirstSheetValue(row["option_".concat(index, "_display_label")]);
    const price = parseSheetNumber(rawPrice);
    return {
      label,
      displayLabel,
      price,
      hasValues: Boolean(label || displayLabel || rawPrice)
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
    if (["true", "1", "yes", "si", "s\xEC", "y"].includes(normalized)) {
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
    await Promise.all([
      ...CRITICAL_FONT_DESCRIPTORS.map(
        (descriptor) => waitForFontLoad(descriptor, {
          strict: true,
          timeout: STRICT_FONT_LOAD_TIMEOUT
        })
      ),
      ...BLOCKING_FONT_DESCRIPTORS.map((descriptor) => waitForFontLoad(descriptor))
    ]);
    if (document.fonts.ready) {
      try {
        await waitWithTimeout(document.fonts.ready, STRICT_FONT_LOAD_TIMEOUT);
      } catch (error) {
        if (!CRITICAL_FONT_DESCRIPTORS.every((descriptor) => document.fonts.check(descriptor))) {
          throw new Error('Il font critico "Housky Demo" non e pronto.');
        }
      }
    }
  }
  async function waitForFontLoad(descriptor, options = {}) {
    const { strict = false, timeout = FONT_LOAD_TIMEOUT } = options;
    const deadline = performance.now() + timeout;
    while (true) {
      if (document.fonts.check(descriptor)) {
        return;
      }
      try {
        await waitWithTimeout(document.fonts.load(descriptor), 2600);
      } catch (error) {
        if (strict && performance.now() >= deadline) {
          throw new Error("Timeout nel caricamento del font critico: ".concat(descriptor));
        }
      }
      if (document.fonts.check(descriptor)) {
        return;
      }
      if (performance.now() >= deadline) {
        if (strict) {
          throw new Error("Timeout nel caricamento del font critico: ".concat(descriptor));
        }
        console.warn("Timeout nel caricamento del font: ".concat(descriptor));
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
    const assetUrls = collectShellAssetUrls();
    if (!assetUrls.length) {
      return Promise.resolve();
    }
    return promiseAllSettledCompat(assetUrls.map((url) => preloadImage(url, "high", 12e3)));
  }
  function waitForMenuAssets(menuData) {
    const criticalAssetUrls = collectMenuVisualAssetUrls(menuData, {
      includeSectionIds: CRITICAL_MENU_SECTION_IDS
    });
    const secondaryAssetUrls = collectMenuVisualAssetUrls(menuData, {
      excludeSectionIds: CRITICAL_MENU_SECTION_IDS
    });
    const preloadTasks = [];
    if (criticalAssetUrls.length) {
      preloadTasks.push(waitForCriticalImages(criticalAssetUrls));
    }
    if (secondaryAssetUrls.length) {
      preloadTasks.push(
        promiseAllSettledCompat(secondaryAssetUrls.map((url) => preloadImage(url, "high", 14e3)))
      );
    }
    if (!preloadTasks.length) {
      return Promise.resolve();
    }
    return Promise.all(preloadTasks);
  }
  function waitForCriticalImages(urls) {
    return Promise.all(
      urls.map(
        (url) => preloadImage(url, "high", CRITICAL_IMAGE_LOAD_TIMEOUT, {
          strict: true,
          retries: CRITICAL_IMAGE_RETRY_COUNT
        })
      )
    );
  }
  function collectMenuVisualAssetUrls(menuData, options = {}) {
    const { includeSectionIds = null, excludeSectionIds = null } = options;
    const urls = /* @__PURE__ */ new Set();
    menuData.sections.forEach((section) => {
      if (includeSectionIds && !includeSectionIds.has(section.id)) {
        return;
      }
      if (excludeSectionIds && excludeSectionIds.has(section.id)) {
        return;
      }
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
  function collectShellAssetUrls() {
    const urls = /* @__PURE__ */ new Set();
    document.querySelectorAll("[data-shell-asset]").forEach((asset) => {
      const src = asset.currentSrc || asset.getAttribute("src");
      if (src) {
        urls.add(src);
      }
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
  function preloadImage(url, priority = "auto", timeout = 12e3, options = {}) {
    const { strict = false, retries = 0 } = options;
    return new Promise((resolve, reject) => {
      let attempt = 0;
      const startAttempt = () => {
        const image = new Image();
        let settled = false;
        const finish = (result, error) => {
          if (settled) {
            return;
          }
          settled = true;
          window.clearTimeout(timeoutId);
          if (result === "load") {
            resolve();
            return;
          }
          if (attempt < retries) {
            attempt += 1;
            window.setTimeout(startAttempt, 180);
            return;
          }
          if (strict) {
            reject(error || new Error("Impossibile caricare la risorsa critica: ".concat(url)));
            return;
          }
          resolve();
        };
        const timeoutId = window.setTimeout(() => {
          finish("timeout", new Error("Timeout nel caricamento di ".concat(url)));
        }, timeout);
        image.decoding = "async";
        if ("fetchPriority" in image) {
          image.fetchPriority = priority;
        }
        image.onload = () => {
          finish("load");
        };
        image.onerror = () => {
          finish("error", new Error("Errore nel caricamento di ".concat(url)));
        };
        image.src = url;
      };
      startAttempt();
    });
  }
  function promiseAllSettledCompat(promises) {
    return Promise.all(
      promises.map(
        (promise) => Promise.resolve(promise).then(
          (value) => ({ status: "fulfilled", value }),
          (reason) => ({ status: "rejected", reason })
        )
      )
    );
  }
  function scheduleNonCriticalWork(task) {
    const runTask = () => {
      try {
        Promise.resolve(task()).catch(() => {
        });
      } catch (error) {
      }
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(runTask, { timeout: 1200 });
      return;
    }
    window.setTimeout(runTask, 180);
  }
  function buildVersionedPath(path) {
    return "".concat(path, "?v=").concat(APP_VERSION);
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
  function initPromoAgriCarousel() {
    if (!promoAgriCarousel || !promoAgriVideoFrame || !promoAgriCarouselDots || !PROMO_AGRI_VIDEOS.length) {
      return;
    }
    let activeIndex = 0;
    let autoplayId = null;
    let carouselVisible = false;
    let carouselPaused = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    promoAgriCarouselDots.innerHTML = PROMO_AGRI_VIDEOS.map(
      (_, index) => '\n      <button\n        class="promo-agri__video-dot"\n        type="button"\n        aria-label="Vai al video '.concat(index + 1, '"\n        data-slide-index="').concat(index, '"\n      ></button>\n    ')
    ).join("");
    const dots = Array.from(promoAgriCarouselDots.querySelectorAll(".promo-agri__video-dot"));
    const syncCarousel = () => {
      const video = PROMO_AGRI_VIDEOS[activeIndex];
      if (!video) {
        return;
      }
      if (promoAgriVideoFrame.getAttribute("src") !== video.src) {
        promoAgriVideoFrame.setAttribute("src", video.src);
      }
      promoAgriVideoFrame.setAttribute("title", video.title);
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };
    const goToSlide = (index) => {
      activeIndex = (index + PROMO_AGRI_VIDEOS.length) % PROMO_AGRI_VIDEOS.length;
      syncCarousel();
    };
    const stopAutoplay = () => {
      if (autoplayId != null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };
    const startAutoplay = () => {
      if (prefersReducedMotion || carouselPaused || !carouselVisible || PROMO_AGRI_VIDEOS.length < 2 || autoplayId != null) {
        return;
      }
      autoplayId = window.setInterval(() => {
        goToSlide(activeIndex + 1);
      }, 4200);
    };
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(Number(dot.dataset.slideIndex || 0));
      });
    });
    bindSwipeZone(
      promoAgriCarousel,
      () => goToSlide(activeIndex - 1),
      () => goToSlide(activeIndex + 1)
    );
    promoAgriCarousel.addEventListener("mouseenter", () => {
      carouselPaused = true;
      stopAutoplay();
    });
    promoAgriCarousel.addEventListener("mouseleave", () => {
      carouselPaused = false;
      startAutoplay();
    });
    promoAgriCarousel.addEventListener("focusin", () => {
      carouselPaused = true;
      stopAutoplay();
    });
    promoAgriCarousel.addEventListener("focusout", () => {
      carouselPaused = false;
      startAutoplay();
    });
    if ("IntersectionObserver" in window) {
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            carouselVisible = entry.isIntersecting;
            if (carouselVisible) {
              startAutoplay();
            } else {
              stopAutoplay();
            }
          });
        },
        {
          threshold: 0.35
        }
      );
      visibilityObserver.observe(promoAgriCarousel);
    } else {
      carouselVisible = true;
      startAutoplay();
    }
    syncCarousel();
  }
  function bindSwipeZone(element, onSwipeRight, onSwipeLeft) {
    if (!element) {
      return;
    }
    let touchStartX = null;
    let touchStartY = null;
    element.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) {
          return;
        }
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true }
    );
    element.addEventListener(
      "touchend",
      (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch || touchStartX == null || touchStartY == null) {
          touchStartX = null;
          touchStartY = null;
          return;
        }
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        touchStartX = null;
        touchStartY = null;
        if (Math.abs(deltaX) < 24 || Math.abs(deltaX) < Math.abs(deltaY)) {
          return;
        }
        if (deltaX < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      },
      { passive: true }
    );
  }
  function initFormatCarousel() {
    if (!formatCarousel || !formatCarouselTrack || !formatCarouselDots) {
      return;
    }
    initDeferredFormatCarouselAssets();
    initAutoplayCarousel({
      root: formatCarousel,
      track: formatCarouselTrack,
      dotsContainer: formatCarouselDots,
      slideSelector: ".format-carousel__slide",
      dotClassName: "format-carousel__dot",
      dotAriaLabelPrefix: "Vai al format",
      interval: 2600,
      visibilityThreshold: 0.45
    });
  }
  function initAutoplayCarousel({
    root,
    track,
    dotsContainer,
    slideSelector,
    dotClassName,
    dotAriaLabelPrefix,
    interval,
    visibilityThreshold
  }) {
    if (!root || !track || !dotsContainer) {
      return;
    }
    const slides = Array.from(track.querySelectorAll(slideSelector));
    if (!slides.length) {
      return;
    }
    let activeIndex = 0;
    let autoplayId = null;
    let carouselVisible = false;
    let carouselPaused = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dotsContainer.innerHTML = slides.map(
      (_, index) => '\n        <button\n          class="'.concat(dotClassName, '"\n          type="button"\n          aria-label="').concat(dotAriaLabelPrefix, " ").concat(index + 1, '"\n          data-slide-index="').concat(index, '"\n        ></button>\n      ')
    ).join("");
    const dots = Array.from(dotsContainer.querySelectorAll(".".concat(dotClassName)));
    const syncCarousel = () => {
      track.style.transform = "translateX(-".concat(activeIndex * 100, "%)");
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
      });
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };
    const goToSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      syncCarousel();
    };
    const stopAutoplay = () => {
      if (autoplayId != null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };
    const startAutoplay = () => {
      if (prefersReducedMotion || carouselPaused || !carouselVisible || slides.length < 2 || autoplayId != null) {
        return;
      }
      autoplayId = window.setInterval(() => {
        goToSlide(activeIndex + 1);
      }, interval);
    };
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(Number(dot.dataset.slideIndex || 0));
      });
    });
    root.addEventListener("mouseenter", () => {
      carouselPaused = true;
      stopAutoplay();
    });
    root.addEventListener("mouseleave", () => {
      carouselPaused = false;
      startAutoplay();
    });
    root.addEventListener("focusin", () => {
      carouselPaused = true;
      stopAutoplay();
    });
    root.addEventListener("focusout", () => {
      carouselPaused = false;
      startAutoplay();
    });
    if ("IntersectionObserver" in window) {
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            carouselVisible = entry.isIntersecting;
            if (carouselVisible) {
              startAutoplay();
            } else {
              stopAutoplay();
            }
          });
        },
        {
          threshold: visibilityThreshold
        }
      );
      visibilityObserver.observe(root);
    } else {
      carouselVisible = true;
      startAutoplay();
    }
    syncCarousel();
  }
  function initDeferredFormatCarouselAssets() {
    if (!formatCarousel) {
      return;
    }
    const deferredImages = Array.from(formatCarousel.querySelectorAll("img[data-deferred-src]"));
    if (!deferredImages.length) {
      return;
    }
    let hasLoadedDeferredImages = false;
    const loadImages = () => {
      if (hasLoadedDeferredImages) {
        return;
      }
      hasLoadedDeferredImages = true;
      deferredImages.forEach((image) => {
        const deferredSrc = image.getAttribute("data-deferred-src");
        if (!deferredSrc) {
          return;
        }
        if ("fetchPriority" in image) {
          image.fetchPriority = "low";
        }
        image.setAttribute("src", deferredSrc);
        image.removeAttribute("data-deferred-src");
      });
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            loadImages();
            observer.disconnect();
          });
        },
        {
          rootMargin: "900px 0px",
          threshold: 0.01
        }
      );
      observer.observe(formatCarousel);
    } else {
      window.setTimeout(loadImages, 0);
    }
    formatCarousel.addEventListener("focusin", loadImages, { once: true });
    formatCarousel.addEventListener("pointerenter", loadImages, { once: true });
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
    sectionNav.innerHTML = sections.map(
      (section) => '\n        <a\n          class="section-nav__link"\n          href="#section-'.concat(section.id, '"\n          style="color: ').concat(section.accent, "; background: ").concat(section.accentSoft, ';"\n        >\n          ').concat(section.title, "\n        </a>\n      ")
    ).join("");
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
        rootMargin: "0px 0px -8% 0px"
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
        rootMargin: "280px 0px"
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
      panel.style.setProperty("--photo-panel-image", "url('".concat(imageUrl, "')"));
      panel.dataset.photoPanelLoaded = "true";
      panel.classList.remove("photo-panel-visual--deferred");
    });
  }
  function renderSection(section, isLeadSection) {
    if (section.layout === "grouped" && Array.isArray(section.groups)) {
      return '\n      <section\n        class="menu-section menu-section--grouped'.concat(isLeadSection ? " menu-section--lead" : "", '"\n        id="section-').concat(section.id, '"\n        style="--section-accent: ').concat(section.accent, "; --section-accent-soft: ").concat(section.accentSoft, ';"\n      >\n        <div class="menu-section__inner">\n          <div class="menu-section__header menu-section__header--centered">\n            <h2>').concat(section.title, '</h2>\n            <div class="menu-section__group-pills" aria-label="Categorie ').concat(section.title, '">\n              ').concat(section.groups.map(
        (group) => '\n                    <a class="menu-section__group-pill" href="#section-'.concat(section.id, "-").concat(group.id, '">\n                      ').concat(group.label, "\n                    </a>\n                  ")
      ).join(""), '\n            </div>\n          </div>\n          <div class="menu-group-stack">\n            ').concat(section.groups.map((group) => {
        const items = section.items.filter((item) => item.group === group.id);
        return '\n                  <section class="menu-group" id="section-'.concat(section.id, "-").concat(group.id, '">\n                    <div class="menu-group__header">\n                      <span class="menu-group__pill">').concat(group.label, '</span>\n                      <p class="menu-group__description').concat(group.description ? "" : " menu-group__description--empty", '">\n                        ').concat(group.description || "&nbsp;", '\n                      </p>\n                    </div>\n                    <div class="menu-section__items">\n                      ').concat(items.map((item) => renderItemCard(item)).join(""), "\n                    </div>\n                  </section>\n                ");
      }).join(""), "\n          </div>\n        </div>\n      </section>\n    ");
    }
    return '\n    <section\n      class="menu-section'.concat(isLeadSection ? " menu-section--lead" : "", '"\n      id="section-').concat(section.id, '"\n      style="--section-accent: ').concat(section.accent, "; --section-accent-soft: ").concat(section.accentSoft, ';"\n    >\n      <div class="menu-section__inner">\n        <div class="menu-section__header">\n          <h2>').concat(section.title, '</h2>\n          <span class="menu-section__kicker">').concat(section.kicker, "</span>\n          <p>").concat(section.description, '</p>\n        </div>\n        <div class="menu-section__items">\n          ').concat(section.items.map((item) => renderItemCard(item)).join(""), "\n        </div>\n      </div>\n    </section>\n  ");
  }
  function renderItemCard(item) {
    const isArtisanalBeer = isArtisanalBeerItem(item);
    const isBeer = isBeerItem(item);
    const isDrink = isDrinkItem(item);
    const isUnavailable = !isItemAvailable(item);
    return '\n    <button\n      class="item-card'.concat(hasSideVisual(item) ? " item-card--with-side-visual" : "").concat(hasFloatingBottle(item) ? " item-card--floating-bottle" : "").concat(isBeer ? " item-card--beer" : "").concat(isArtisanalBeer ? " item-card--artisanal-beer" : "").concat(isDrink ? " item-card--drink" : "").concat(isUnavailable ? " item-card--unavailable" : "", '"\n      type="button"\n      data-item-id="').concat(item.id, '"\n      aria-haspopup="dialog"\n      aria-label="').concat(isUnavailable ? "".concat(item.name, " non disponibile") : "Apri dettagli per ".concat(item.name), '"\n      aria-disabled="').concat(isUnavailable ? "true" : "false", '"\n      ').concat(isUnavailable ? "disabled" : "", '\n    >\n      <div class="item-card__visual').concat(getCardVisualClass(item), '">\n        ').concat(renderItemVisual(item, "card"), '\n      </div>\n      <div class="item-card__content').concat(hasSideVisual(item) && !hasFloatingBottle(item) ? " item-card__content--with-side-visual" : "", '">\n        <div class="item-card__topline">\n          <span class="item-card__label">').concat(item.category, "</span>\n        </div>\n        <h3>").concat(item.name, "</h3>\n        <p>").concat(item.description, '</p>\n        <div class="item-card__prices">\n          ').concat(isUnavailable ? '<span class="price-chip price-chip--unavailable">Non disponibile</span>' : getCardOptionsToDisplay(item).map(
      (option) => '\n                      <span class="price-chip">'.concat(formatOptionChip(item, option), "</span>\n                    ")
    ).join(""), "\n        </div>\n        ").concat(renderItemSideVisual(item), "\n      </div>\n    </button>\n  ");
  }
  function isArtisanalBeerItem(item) {
    return findSectionTitleForItem(item.id).toLowerCase() === "birre" && getItemCategoryLabel(item).toLowerCase() === "artigianali";
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
    if (!item || !isItemAvailable(item)) {
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
    detailPreview.className = "sheet-preview".concat(getDetailPreviewClass(item)).concat(hasDetailGallery(item) ? " sheet-preview--gallery" : "").concat(isArtisanalBeerItem(item) || isDrinkItem(item) ? " sheet-preview--beer-script-framed" : "");
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
        optionButton.className = "option-btn option-btn--label-only".concat(toneClass ? " ".concat(toneClass) : "").concat(index === selectedIndex ? " is-selected" : "");
        optionButton.innerHTML = '<span class="option-label option-label--solo">'.concat(selectionOption.label, "</span>");
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
      optionButton.className = "option-btn".concat(index === state.selectedOptionIndex ? " is-selected" : "").concat(displayLabel ? "" : " option-btn--price-only");
      optionButton.innerHTML = displayLabel ? '\n          <span class="option-label">'.concat(displayLabel, '</span>\n          <span class="option-price">').concat(formatPrice(option.price), "</span>\n        ") : '\n          <span class="option-price option-price--solo">'.concat(formatPrice(option.price), "</span>\n        ");
      optionButton.addEventListener("click", () => {
        state.selectedOptionIndex = index;
        renderOptions(item);
      });
      formatGroup.options.append(optionButton);
    });
    detailOptions.append(formatGroup.wrapper);
  }
  function renderQuantityControl() {
    detailQuantity.innerHTML = '\n    <div class="detail-quantity__pill" aria-label="Seleziona quantita">\n      <button\n        class="qty-btn detail-quantity__btn"\n        type="button"\n        aria-label="Riduci quantita"\n        '.concat(state.selectedQuantity <= 1 ? "disabled" : "", '\n      >\n        \u2212\n      </button>\n      <span class="detail-quantity__value">').concat(state.selectedQuantity, '</span>\n      <button\n        class="qty-btn detail-quantity__btn"\n        type="button"\n        aria-label="Aumenta quantita"\n      >\n        +\n      </button>\n    </div>\n  ');
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
    options.className = "option-group__options".concat(compact ? " option-group__options--compact" : "");
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
        row.innerHTML = "\n        <div>\n          <strong>".concat(entry.name, "</strong>\n          <p>").concat(entry.optionLabel, " \xB7 ").concat(formatPrice(entry.price), '</p>\n        </div>\n        <div class="cart-item-controls">\n          <button class="qty-btn" type="button" aria-label="Rimuovi una quantit\xE0">\u2212</button>\n          <span>').concat(entry.quantity, '</span>\n          <button class="qty-btn" type="button" aria-label="Aggiungi una quantit\xE0">+</button>\n        </div>\n      ');
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
      (entry) => "".concat(entry.quantity, "x ").concat(entry.name, " (").concat(entry.optionLabel, ")")
    );
    lines.push("Totale: ".concat(formatCartBreakdown(state.cart)));
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
      parts.push("".concat(breakdown.bevande, " ").concat(pluralize(breakdown.bevande, "bevanda", "bevande")));
    }
    if (breakdown.bottiglie > 0) {
      parts.push("".concat(breakdown.bottiglie, " ").concat(pluralize(breakdown.bottiglie, "bottiglia", "bottiglie")));
    }
    if (breakdown.taglieri > 0) {
      parts.push("".concat(breakdown.taglieri, " ").concat(pluralize(breakdown.taglieri, "tagliere", "taglieri")));
    }
    if (parts.length > 0) {
      return parts.join(" + ");
    }
    const fallbackCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    return "".concat(fallbackCount, " ").concat(pluralize(fallbackCount, "prodotto", "prodotti"));
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
    if (sectionTitle === "bottiglie" || category === "vino" || category === "bollicine" || category === "selezione zero") {
      if (optionLabel.includes("calice")) {
        return "bevande";
      }
      return "bottiglie";
    }
    if (sectionTitle === "birre" || sectionTitle === "drink" || sectionTitle === "altre bevande" || category === "drink" || category === "altre bevande" || category === "artigianali" || category === "classiche" || category === "alla spina") {
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
      return "".concat(sectionTitle, " ").concat(categoryLabel);
    }
    return categoryLabel || sectionTitle;
  }
  function normalizeLabel(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  async function saveSummary(text) {
    blurActiveElement();
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
      }
    }
    if (shouldSkipClipboardFallback()) {
      return false;
    }
    return copyTextFallback(text);
  }
  function shouldSkipClipboardFallback() {
    const touchPoints = navigator.maxTouchPoints || 0;
    const coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
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
    if (normalizedLabel === "chardonnay" || normalizedLabel === "pinot grigio" || normalizedLabel === "pinot-grigio") {
      return "option-btn--wine-white";
    }
    return "";
  }
  function getSelectedSelectionLabels(item) {
    return getSelectionGroups(item).map((group) => {
      var _a;
      return ((_a = group.options[getSelectedSelectionIndex(group)]) == null ? void 0 : _a.label) || "";
    }).filter(Boolean);
  }
  function buildSelectionSummaryLabel(item, option) {
    const parts = [...getSelectedSelectionLabels(item)];
    if (option && option.label) {
      parts.push(option.label);
    }
    return parts.join(" \xB7 ");
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
      return (item == null ? void 0 : item.options) || [];
    }
    if (typeof item.cardPriceOverride === "number") {
      return [
        {
          label: "",
          displayLabel: "",
          price: item.cardPriceOverride
        }
      ];
    }
    const [firstOption, ...otherOptions] = item.options;
    const allSamePrice = otherOptions.every((option) => option.price === firstOption.price);
    if (allSamePrice) {
      return [
        __spreadProps(__spreadValues({}, firstOption), {
          displayLabel: ""
        })
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
  function isItemAvailable(item) {
    return item ? item.available !== false : false;
  }
  function formatOptionChip(item, option) {
    const displayLabel = getOptionDisplayLabel(item, option);
    return displayLabel ? "".concat(displayLabel, " \xB7 ").concat(formatPrice(option.price)) : formatPrice(option.price);
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
          behavior: "smooth"
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
    return '<div class="'.concat(classes.join(" "), '" aria-hidden="true"></div>');
  }
  function renderDetailPreview(item) {
    if (!hasDetailGallery(item)) {
      return renderItemVisual(item, "detail");
    }
    const slides = item.detailGallery.map(
      (visual, index) => '\n        <div class="detail-gallery__slide" data-gallery-slide="'.concat(index, '">\n          ').concat(renderVisualByType(visual, "detail"), "\n        </div>\n      ")
    ).join("");
    const dots = item.detailGallery.map(
      (_, index) => '\n        <button\n          class="detail-gallery__dot'.concat(index === 0 ? " is-active" : "", '"\n          type="button"\n          aria-label="Vai all\'immagine ').concat(index + 1, '"\n          data-gallery-dot="').concat(index, '"\n        ></button>\n      ')
    ).join("");
    return '\n    <div class="detail-gallery">\n      <div class="detail-gallery__track" data-detail-gallery-track>\n        '.concat(slides, '\n      </div>\n      <div class="detail-gallery__dots" aria-label="Pi\xF9 immagini disponibili">\n        ').concat(dots, "\n      </div>\n    </div>\n  ");
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
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="\n        --beer-script-start: ').concat(visual.gradientStart || "#f0ede8", ";\n        --beer-script-mid: ").concat(visual.gradientMid || visual.gradientEnd || "#f8f5f0", ";\n        --beer-script-end: ").concat(visual.gradientEnd || "#f8f5f0", ";\n        --beer-script-color: ").concat(visual.labelColor || "rgba(56, 39, 24, 0.9)", ';\n      "\n    >\n      ').concat(visual.script ? '<span class="beer-script-visual__script">'.concat(visual.script, "</span>") : "", '\n      <span class="beer-script-visual__label">').concat(visual.label, "</span>\n    </div>\n  ");
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
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      ').concat(shouldDeferImage ? 'data-photo-panel-image="'.concat(imageUrl, '" data-photo-panel-loaded="false"') : "", '\n      style="\n        --photo-panel-image: ').concat(shouldDeferImage ? "none" : "url('".concat(imageUrl, "')"), ";\n        --photo-panel-position: ").concat(visual.position || "center center", ";\n        --photo-panel-size: ").concat(visual.size || "cover", ";\n        --photo-panel-bg: ").concat(visual.backgroundColor || "transparent", ";\n        --photo-panel-blend: ").concat(visual.blendMode || "normal", ';\n      "\n    ></div>\n  ');
  }
  function renderCanClusterVisual(visual, context) {
    const classes = ["can-cluster-visual"];
    if (context === "detail") {
      classes.push("can-cluster-visual--detail");
    }
    const cans = Array.isArray(visual.items) ? visual.items.map(
      (item) => '\n            <img\n              class="can-cluster-visual__can"\n              src="'.concat(getVisualAsset(item.asset), '"\n              alt=""\n              aria-hidden="true"\n              loading="lazy"\n              decoding="async"\n              style="\n                --can-left: ').concat(item.left || "50%", ";\n                --can-bottom: ").concat(item.bottom || "-18%", ";\n                --can-width: ").concat(item.width || "auto", ";\n                --can-height: ").concat(item.height || "auto", ";\n                --can-rotate: ").concat(item.rotate || "0deg", ";\n                --can-z: ").concat(item.zIndex || 1, ";\n                --can-float-distance: ").concat(item.floatDistance || "5px", ";\n                --can-float-duration: ").concat(item.floatDuration || "4.2s", ";\n                --can-float-delay: ").concat(item.floatDelay || "0s", ';\n              "\n            />\n          ')
    ).join("") : "";
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="--can-cluster-bg: ').concat(visual.backgroundColor || "#d8dee8", ';"\n    >\n      ').concat(cans, "\n    </div>\n  ");
  }
  function renderTextPanelVisual(visual, context) {
    const classes = ["text-panel-visual"];
    if (context === "detail") {
      classes.push("text-panel-visual--detail");
    }
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="\n        --text-panel-start: ').concat(visual.gradientStart || "#38281b", ";\n        --text-panel-end: ").concat(visual.gradientEnd || "#a67343", ";\n        --text-panel-label: ").concat(visual.labelColor || "#fffdf8", ";\n        --text-panel-script: ").concat(visual.scriptColor || "rgba(17, 17, 17, 0.72)", ';\n      "\n    >\n      ').concat(visual.script ? '<span class="text-panel-visual__script">'.concat(visual.script, "</span>") : "", '\n      <span class="text-panel-visual__label">').concat(visual.label, "</span>\n    </div>\n  ");
  }
  function renderItemSideVisual(item) {
    const sideVisuals = getAllSideVisuals(item);
    if (!sideVisuals.length) {
      return "";
    }
    return sideVisuals.map((visual) => {
      const sideVisualClass = visual.type === "floating-bottle" ? "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-bottle" : "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-accent";
      return '\n        <span\n          class="'.concat(sideVisualClass, '"\n          aria-hidden="true"\n          style="').concat(buildSideVisualStyle(visual), '"\n        ></span>\n      ');
    }).join("");
  }
  function getSideVisualImage(visual) {
    const assetName = visual && visual.asset ? visual.asset : "";
    return buildVersionedPath("./menu-assets/items/".concat(assetName));
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
    sectionNav.innerHTML = '\n    <span class="section-nav__placeholder'.concat(isRetry ? " section-nav__placeholder--slow" : "", '">\n      ').concat(isRetry ? "Menu non disponibile" : "Categorie in caricamento", "\n    </span>\n  ");
    const eyebrow = isRetry ? "Menu non disponibile" : "Menu in arrivo";
    const title = isRetry ? "Non sono riuscito a caricare categorie e prodotti." : "Sto caricando categorie e prodotti.";
    const description = isRetry ? "Controlla la connessione e riprova. Il resto della pagina resta comunque disponibile." : "Intanto puoi iniziare a leggere il resto della pagina e le informazioni sugli Agri-Eventi: il menu si completa tra poco.";
    menuSections.innerHTML = '\n    <section class="menu-loading-card'.concat(isRetry ? " menu-loading-card--slow" : "", '" aria-live="polite">\n      <p class="eyebrow">').concat(eyebrow, "</p>\n      <h2>").concat(title, "</h2>\n      <p>\n        ").concat(description, "\n      </p>\n      ").concat(isRetry ? '\n            <button class="utility-btn utility-btn--accent menu-loading-card__action" id="retryLoad" type="button">\n              Ricarica il menu\n            </button>\n          ' : "", "\n    </section>\n  ");
    const retryButton = document.querySelector("#retryLoad");
    if (retryButton) {
      retryButton.addEventListener("click", () => window.location.reload());
    }
  }
  function getVisualAsset(assetName) {
    return buildVersionedPath("./menu-assets/items/".concat(assetName));
  }
  function buildSideVisualStyle(sideVisual) {
    const styles = ["background-image: url('".concat(getSideVisualImage(sideVisual), "')")];
    if (sideVisual.width) {
      styles.push("--side-visual-width: ".concat(sideVisual.width));
    }
    if (sideVisual.height) {
      styles.push("--side-visual-height: ".concat(sideVisual.height));
    }
    if (sideVisual.right) {
      styles.push("--side-visual-right: ".concat(sideVisual.right));
    }
    if (sideVisual.bottom) {
      styles.push("--side-visual-bottom: ".concat(sideVisual.bottom));
    }
    if (sideVisual.top) {
      styles.push("--side-visual-top: ".concat(sideVisual.top));
    }
    if (sideVisual.backgroundSize) {
      styles.push("--side-visual-size: ".concat(sideVisual.backgroundSize));
    }
    if (sideVisual.backgroundPosition) {
      styles.push("--side-visual-position: ".concat(sideVisual.backgroundPosition));
    }
    if (sideVisual.blendMode) {
      styles.push("--side-visual-blend: ".concat(sideVisual.blendMode));
    }
    if (sideVisual.zIndex) {
      styles.push("--side-visual-z: ".concat(sideVisual.zIndex));
    }
    if (sideVisual.tilt) {
      styles.push("--side-visual-tilt: ".concat(sideVisual.tilt));
    }
    return styles.join("; ");
  }
  function getAllSideVisuals(item) {
    return [item.sideVisual, item.accentVisual].filter(Boolean);
  }
})();
