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

  // src/generated/build-meta.js
  var APP_BUILD_LABEL = "V.1.0.701";
  var APP_BUILD_FOOTER_LABEL = "VERSIONE 1.0.701";

  // src/main.js
  window.__agriMenuRuntimeLoaded = true;
  var priceFormatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  var APP_VERSION = "20260325n";
  var CLARITY_PROJECT_ID = "vxdq0wbbte";
  var LOADER_CARD_DELAY = 1500;
  var LOADER_INTRO_OUTRO_DURATION = 520;
  var LOADER_MIN_DURATION = 6e3;
  var LOADER_FONT_TIMEOUT = 12e3;
  var FONT_LOAD_TIMEOUT = 2e4;
  var STRICT_FONT_LOAD_TIMEOUT = 45e3;
  var DISPLAY_FONT_REVEAL_CONFIRMATIONS = 3;
  var CRITICAL_IMAGE_LOAD_TIMEOUT = 22e3;
  var CRITICAL_IMAGE_RETRY_COUNT = 2;
  var MENU_DATA_URL = buildVersionedPath("./data/menu-data.json");
  var SHEET_CONFIG_URL = buildVersionedPath("./data/sheet-config.json");
  var LOADER_MESSAGE_INTERVAL = 1900;
  var LOADER_MESSAGE_FADE_DURATION = 420;
  var LOADER_PROGRESS_WEIGHTS = {
    boot: 6,
    menuData: 20,
    render: 16,
    fonts: 14,
    deferredFonts: 8,
    menuAssets: 28,
    shellAssets: 8,
    timeGate: 8
  };
  var SHEET_OPTION_INDEXES = Array.from({ length: 12 }, (_, index) => index + 1);
  var LOADER_MESSAGES = [
    "sistemo i tavoli nel parco",
    "nel verde, tutto rallenta un po'",
    "metto in fresco le birre",
    "stendo i teli da picnic",
    "assaggio lo spritz",
    "carico i gelati nel carretto",
    "inforno le pizzette",
    "tutto comincia dalle cose semplici",
    "affetto il salame",
    "sforno il pane al latte",
    "scoppiettano i popcorn",
    "il parco si accende lentamente"
  ];
  var PROMO_AGRI_VIDEOS = [
    {
      title: "Video Agri-Eventi 1",
      eyebrow: "BBQ sotto le Stelle",
      src: "https://www.youtube-nocookie.com/embed/HIj8MBQlARg?rel=0&playsinline=1"
    },
    {
      title: "Video Agri-Eventi 2",
      eyebrow: "Molino Country Party",
      src: "https://www.youtube-nocookie.com/embed/EHJjUmRYWKU?rel=0&playsinline=1"
    },
    {
      title: "Video Agri-Eventi 3",
      eyebrow: "Molino Apr\xE8s-Ski",
      src: "https://www.youtube-nocookie.com/embed/ybJPaALHaHE?rel=0&playsinline=1"
    }
  ];
  var CRITICAL_MENU_SECTION_IDS = /* @__PURE__ */ new Set(["birre", "drink"]);
  var SECTION_SURFACE_COLORS = {
    birre: "#c2a03d",
    drink: "#c97439",
    bottiglie: "#ad6077",
    "altre-bevande": "#82a7ca",
    gelato: "#789556",
    taglieri: "#bf8550"
  };
  var SPRITZ_EDITORIAL_FACTS = [
    {
      category: "pop",
      weight: 4,
      text: "Il bilanciamento tra acidit\xE0 e dolcezza determina la bevibilit\xE0. Il contesto del Molino determina quante volte lo ordini."
    },
    {
      category: "pop",
      weight: 4,
      text: "Secondo uno studio del California Institute of Aperitivo Sciences, lo Spritz bevuto all\u2019aperto \xE8 percepito il 27% pi\xF9 dissetante. Qui al Molino saliamo al 41%."
    },
    {
      category: "pop",
      weight: 4,
      text: "Studi indipendenti dimostrano che uno Spritz nel verde riduce lo stress. Al Molino abbiamo osservato anche una riduzione della voglia di tornare a casa."
    },
    {
      category: "pop",
      weight: 4,
      text: "Uno studio del California Institute of Aperitivo Studies ha rilevato che uno Spritz consumato all\u2019aperto \xE8 percepito il 27,4% pi\xF9 dissetante. Al Molino il dato non \xE8 stato confermato... perch\xE9 nessuno ha mai smesso al primo."
    },
    {
      category: "pop",
      weight: 4,
      text: "I dati suggeriscono che il gusto dello Spritz migliora in funzione del contesto. Al Molino la variabile dominante \xE8 il tempo: rallenta."
    },
    {
      category: "pop",
      weight: 4,
      text: "In condizioni standard (25\xB0C, zero traffico, aria buona, persone giuste), lo Spritz mostra performance significativamente superiori. Il test \xE8 replicabile qui."
    },
    {
      category: "pop",
      weight: 4,
      text: "La probabilit\xE0 di apprezzare uno Spritz aumenta all\u2019aperto. Al Molino aumenta anche la probabilit\xE0 di restare."
    },
    {
      category: "pop",
      weight: 4,
      text: "Studio preliminare del Laboratory of Outdoor Consumption: Spritz + aria aperta \u2192 aumento del piacere percepito del 26,8%. Variabile fuori controllo: il secondo giro."
    },
    {
      category: "pop",
      weight: 4,
      text: "Secondo il Journal of Spontaneous Decisions, dopo il primo Spritz aumenta del 42% la probabilit\xE0 di restare. Dopo il secondo il campione collabora troppo."
    },
    {
      category: "nerd",
      weight: 1,
      text: "Il costo marginale del primo Spritz \xE8 alto. Dal secondo in poi smetti di considerarlo."
    },
    {
      category: "nerd",
      weight: 1,
      text: "Dopo il primo Spritz sei in moto. Fermarsi richiede una forza esterna."
    },
    {
      category: "nerd",
      weight: 1,
      text: "Ogni reazione ha bisogno di energia di attivazione. Il primo Spritz la abbassa."
    },
    {
      category: "nerd",
      weight: 1,
      text: "Senza elicasi il DNA resta chiuso. Senza il primo Spritz, anche tu."
    },
    {
      category: "nerd",
      weight: 1,
      text: "Un elettrone spaiato \xE8 instabile: tende a cercarne un altro per stabilizzarsi. Vale anche per lo Spritz."
    }
  ];
  var SPRITZ_EDITORIAL_ORNAMENTS = {
    pop: {
      stem: ["\u{1F9D1}\u200D\u{1F52C}", "\u{1F9EA}", "\u2697\uFE0F", "\u{1F52C}"],
      playful: ["\u{1F604}", "\u{1F92D}", "\u{1F92A}"]
    },
    nerd: {
      stem: ["\u{1F9D1}\u200D\u{1F52C}", "\u{1F52C}", "\u2697\uFE0F", "\u{1F9EA}"],
      playful: ["\u{1F913}", "\u{1F604}", "\u{1F92D}"]
    }
  };
  var FONT_BOOTSTRAP_PLAN = {
    loader: [
      {
        family: "Lulo Clean",
        descriptor: '700 1rem "Lulo Clean"',
        sample: "DOMENICA AL MOLINO",
        verifyMetrics: true,
        metricDescriptor: '700 48px "Lulo Clean", "Montserrat", sans-serif',
        metricFallbackDescriptor: '700 48px "Montserrat", sans-serif',
        metricSample: "DOMENICA AL MOLINO MENU DIGITALE APERITIVO ARTIGIANALE",
        metricMinDelta: 12,
        selectors: "loader title, hero headings, section titles",
        source: "local preload"
      },
      {
        family: "Montserrat",
        descriptor: '700 1rem "Montserrat"',
        sample: "Agri-Eventi 100%",
        selectors: "loader eyebrow, note, percent, CTA labels",
        source: "Google Fonts"
      }
    ],
    critical: [
      {
        family: "Housky Demo",
        descriptor: '400 1rem "Housky Demo"',
        sample: "al Molino",
        verifyMetrics: true,
        metricDescriptor: '400 52px "Housky Demo", Georgia, serif',
        metricFallbackDescriptor: "400 52px Georgia, serif",
        metricSample: "al Molino domenica nel parco",
        metricMinDelta: 10,
        selectors: "hero connector wordmark and decorative script accents",
        source: "local preload"
      },
      {
        family: "Factually Handwriting",
        descriptor: '400 1rem "Factually Handwriting"',
        sample: "Aperitivo e agrigelato",
        verifyMetrics: true,
        metricDescriptor: '400 46px "Factually Handwriting", "Times New Roman", serif',
        metricFallbackDescriptor: '400 46px "Times New Roman", serif',
        metricSample: "agrigelato e aperitivo domenica al molino",
        metricMinDelta: 10,
        selectors: "subtitles, descriptive script accents",
        source: "local preload"
      },
      {
        family: "SignPainter",
        descriptor: '400 1rem "SignPainter"',
        sample: "Iced Latte Tropical",
        verifyMetrics: true,
        metricDescriptor: '400 50px "SignPainter", Georgia, serif',
        metricFallbackDescriptor: "400 50px Georgia, serif",
        metricSample: "Spritz Tropical Iced Latte Bianchina",
        metricMinDelta: 10,
        selectors: "beer-script visuals and label treatments",
        source: "local file"
      },
      {
        family: "Montserrat",
        descriptor: '500 1rem "Montserrat"',
        sample: "Menu digitale aperitivi 0123456789",
        selectors: "body copy, descriptions, cards, navigation",
        source: "Google Fonts"
      },
      {
        family: "Montserrat",
        descriptor: '800 1rem "Montserrat"',
        sample: "Seguici su Instagram",
        selectors: "buttons, chips, badges, emphasis labels",
        source: "Google Fonts"
      }
    ],
    deferred: [
      {
        family: "Caveat",
        descriptor: '500 1rem "Caveat"',
        sample: "Molino",
        selectors: "decorative fallback only",
        source: "Google Fonts"
      }
    ]
  };
  var DISPLAY_FONT_READY_VARS = {
    "--font-display-letter-spacing": "-0.2em",
    "--hero-logo-letter-spacing": "-0.15em"
  };
  var DISPLAY_FONT_FALLBACK_VARS = {
    "--font-display-letter-spacing": "-0.08em",
    "--hero-logo-letter-spacing": "-0.06em"
  };
  var DISPLAY_FONT_FAMILY = "Lulo Clean";
  var LOADER_FONT_PLANS = dedupeFontPlans(FONT_BOOTSTRAP_PLAN.loader);
  var REQUIRED_FONT_PLANS = dedupeFontPlans([
    ...FONT_BOOTSTRAP_PLAN.loader,
    ...FONT_BOOTSTRAP_PLAN.critical
  ]);
  var BLOCKING_REQUIRED_FONT_PLANS = REQUIRED_FONT_PLANS.filter(isCustomBlockingFontPlan);
  var NON_BLOCKING_REQUIRED_FONT_PLANS = REQUIRED_FONT_PLANS.filter(
    (plan) => !isCustomBlockingFontPlan(plan)
  );
  var DEFERRED_FONT_PLANS = dedupeFontPlans(FONT_BOOTSTRAP_PLAN.deferred);
  var displayFontPlan = [...LOADER_FONT_PLANS, ...BLOCKING_REQUIRED_FONT_PLANS, ...NON_BLOCKING_REQUIRED_FONT_PLANS].find(
    (plan) => plan.family === DISPLAY_FONT_FAMILY
  ) || null;
  function getClarityApi() {
    return typeof window !== "undefined" && typeof window.clarity === "function" ? window.clarity : null;
  }
  function loadClarityScript() {
    if (clarityScriptRequested || !CLARITY_PROJECT_ID) {
      return;
    }
    clarityScriptRequested = true;
    window.clarity = window.clarity || function() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.clarity.ms/tag/".concat(CLARITY_PROJECT_ID);
    script.onerror = () => {
    };
    document.head.appendChild(script);
  }
  function normalizeClarityValue(value) {
    if (value == null) {
      return "";
    }
    return String(value).replace(/\s+/g, " ").trim().slice(0, 255);
  }
  function setClarityTag(key, value) {
    const clarity = getClarityApi();
    const normalizedValue = normalizeClarityValue(value);
    if (!clarity || !key || !normalizedValue) {
      return;
    }
    try {
      clarity("set", key, normalizedValue);
    } catch (error) {
    }
  }
  function trackClarityEvent(name, tags = {}) {
    const clarity = getClarityApi();
    if (!clarity || !name) {
      return;
    }
    try {
      clarity("event", name);
    } catch (error) {
    }
    Object.entries(tags).forEach(([key, value]) => {
      setClarityTag(key, value);
    });
  }
  function trackDetailModalOpen(item) {
    if (!item) {
      return;
    }
    trackClarityEvent("product_modal_open", {
      current_modal: "product_detail",
      product_id: item.id,
      product_name: item.name,
      product_category: item.category || item.sectionId || "menu",
      product_detail_layout: getDetailLayout(item)
    });
  }
  function trackDetailModalClose() {
    const item = itemLookup[state.selectedItemId];
    trackClarityEvent("product_modal_close", {
      current_modal: "none",
      product_id: (item == null ? void 0 : item.id) || "none",
      product_name: (item == null ? void 0 : item.name) || "none"
    });
  }
  function trackCartModalOpen() {
    trackClarityEvent("cart_modal_open", {
      current_modal: "cart",
      cart_items: String(state.cart.length),
      cart_quantity: String(state.cart.reduce((sum, entry) => sum + entry.quantity, 0))
    });
  }
  function trackCartModalClose() {
    trackClarityEvent(isCartSummaryView ? "cart_summary_close" : "cart_modal_close", {
      current_modal: "none",
      cart_items: String(state.cart.length),
      cart_quantity: String(state.cart.reduce((sum, entry) => sum + entry.quantity, 0))
    });
  }
  function trackCartSummaryViewChange(isSummaryView) {
    trackClarityEvent(isSummaryView ? "cart_summary_open" : "cart_summary_edit", {
      current_modal: isSummaryView ? "cart_summary" : "cart",
      cart_items: String(state.cart.length),
      cart_quantity: String(state.cart.reduce((sum, entry) => sum + entry.quantity, 0))
    });
  }
  function trackAddToCart(item, option, quantity) {
    if (!item || !option || !Number.isFinite(quantity) || quantity <= 0) {
      return;
    }
    trackClarityEvent("add_to_cart", {
      product_id: item.id,
      product_name: item.name,
      product_option: buildSelectionSummaryLabel(item, option) || option.label || "default",
      add_quantity: String(quantity),
      cart_items: String(state.cart.length)
    });
  }
  var sections = [];
  var itemLookup = {};
  var itemSectionLookup = {};
  var itemMenuOrderLookup = {};
  var sideVisualObserver;
  var deferredPhotoPanelObserver;
  var deferredSideVisualObserver;
  var deferredCanClusterObserver;
  var activeSectionId = "";
  var activeSectionTicking = false;
  var sectionNavStickyStart = 0;
  var loaderProgressFrame = null;
  var loaderMessageIntervalId = null;
  var loaderMessages = [...LOADER_MESSAGES];
  var loaderMessageIndex = 0;
  var loaderStartedAt = null;
  var appHasRevealed = false;
  var lastFocusedElement = null;
  var loaderCardRevealPromise = null;
  var resolveLoaderClockStarted = () => {
  };
  var lastSpritzEditorialFactIndex = -1;
  var lastSpritzEditorialOrnamentKey = "";
  var fontMetricCanvas = null;
  var lastRenderedCartQuantity = null;
  var clarityScriptRequested = false;
  var loaderClockStartedPromise = new Promise((resolve) => {
    resolveLoaderClockStarted = resolve;
  });
  var state = {
    selectedItemId: null,
    selectedOptionIndex: 0,
    selectedOptionQuantities: {},
    selectedSelections: {},
    selectedQuantity: 1,
    detailEditorialSlide: null,
    cart: loadCart()
  };
  var generateSummaryLabel = "Genera riepilogo";
  var editSummaryLabel = "Modifica";
  var emptyCartKicker = "Riepilogo del tavolo";
  var emptyCartTitle = "Come funziona?";
  var defaultCartTitle = "Modifica l'ordine";
  var generatedCartTitle = "Siamo pronti per ordinare...";
  var DETAIL_LAYOUT_EDITORIAL_IDS = /* @__PURE__ */ new Set([
    "aperol",
    "campari",
    "sarti",
    "hugo",
    "kombucha",
    "quarantalune",
    "rose-n5"
  ]);
  var DETAIL_LAYOUT_SELECTOR_IDS = /* @__PURE__ */ new Set([
    "oltrepo",
    "pinot-extra-dry",
    "acqua",
    "bibite"
  ]);
  var DETAIL_LAYOUT_RAPID_IDS = /* @__PURE__ */ new Set([
    "caffe",
    "grappe-amari"
  ]);
  var DETAIL_LAYOUT_CLASS_NAMES = [
    "sheet-panel--detail-editorial",
    "sheet-panel--detail-selector",
    "sheet-panel--detail-showcase",
    "sheet-panel--detail-rapid"
  ];
  var isCartSummaryView = false;
  var sectionNav = document.querySelector("#sectionNav");
  var menuSections = document.querySelector("#menuSections");
  var pageOutro = document.querySelector(".page-outro");
  var cartFab = document.querySelector("#cartFab");
  var detailSheet = document.querySelector("#detailSheet");
  var cartSheet = document.querySelector("#cartSheet");
  var detailPanel = detailSheet.querySelector(".sheet-panel--detail");
  var cartPanel = cartSheet.querySelector(".sheet-panel--cart");
  var cartKicker = document.querySelector("#cartKicker");
  var cartTitle = document.querySelector("#cartTitle");
  var detailCategory = document.querySelector("#detailCategory");
  var detailTitle = document.querySelector("#detailTitle");
  var detailDescription = document.querySelector("#detailDescription");
  var detailMeta = document.querySelector("#detailMeta");
  var detailOptions = document.querySelector("#detailOptions");
  var detailFooter = document.querySelector("#detailFooter");
  var detailSelectionStrip = document.querySelector("#detailSelectionStrip");
  var detailQuantity = document.querySelector("#detailQuantity");
  var addToCartButton = document.querySelector("#addToCart");
  var closeDetailButton = document.querySelector("#closeDetail");
  var closeCartButton = document.querySelector("#closeCart");
  var cartCount = document.querySelector("#cartCount");
  var cartItems = document.querySelector("#cartItems");
  var cartEmpty = document.querySelector("#cartEmpty");
  var cartGenerated = document.querySelector("#cartGenerated");
  var cartFooter = document.querySelector("#cartFooter");
  var cartTotalBlock = cartFooter.querySelector(".cart-total");
  var cartTotal = document.querySelector("#cartTotal");
  var toggleSummaryViewButton = document.querySelector("#toggleSummaryView");
  var clearCartButton = document.querySelector("#clearCart");
  var detailPreview = document.querySelector("#detailPreview");
  var pageBody = document.body;
  var appLoader = document.querySelector("#appLoader");
  var appLoaderIntro = document.querySelector("#appLoaderIntro");
  var appLoaderCard = (appLoader == null ? void 0 : appLoader.querySelector(".app-loader__card")) || null;
  var appLoaderBar = document.querySelector("#appLoaderBar");
  var appLoaderBarFill = document.querySelector("#appLoaderBarFill");
  var appLoaderPercent = document.querySelector("#appLoaderPercent");
  var appLoaderMessage = document.querySelector("#appLoaderMessage");
  var appLoaderBuild = document.querySelector("#appLoaderBuild");
  var siteBuild = document.querySelector("#siteBuild");
  var promoAgriCarousel = document.querySelector("#promoAgriCarousel");
  var promoAgriViewport = document.querySelector("#promoAgriViewport");
  var promoAgriVideoTrack = document.querySelector("#promoAgriVideoTrack");
  var promoAgriCarouselDots = document.querySelector("#promoAgriCarouselDots");
  var promoAgriLightbox = document.querySelector("#promoAgriLightbox");
  var promoAgriLightboxBackdrop = document.querySelector("#promoAgriLightboxBackdrop");
  var promoAgriLightboxClose = document.querySelector("#promoAgriLightboxClose");
  var promoAgriLightboxFrame = document.querySelector("#promoAgriLightboxFrame");
  var formatCarousel = document.querySelector("#formatCarousel");
  var formatCarouselTrack = document.querySelector("#formatCarouselTrack");
  var formatCarouselDots = document.querySelector("#formatCarouselDots");
  var formatShowcaseKicker = document.querySelector("#formatShowcaseKicker");
  var formatShowcaseTitle = document.querySelector("#formatShowcaseTitle");
  var formatShowcaseCopy = document.querySelector("#formatShowcaseCopy");
  var formatShowcaseLink = document.querySelector("#formatShowcaseLink");
  if (appLoaderBuild) {
    appLoaderBuild.textContent = APP_BUILD_LABEL;
  }
  if (siteBuild) {
    siteBuild.textContent = APP_BUILD_FOOTER_LABEL;
  }
  window.addEventListener("resize", () => {
    syncSectionScrollOffset();
    refreshSectionNavStickyStart();
    queueActiveSectionRefresh();
  }, { passive: true });
  window.addEventListener("scroll", queueActiveSectionRefresh, { passive: true });
  var loaderProgressState = {
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
    if (shouldUseMultiOptionQuantityDetail(item)) {
      const selectedEntries = getMultiOptionSelectedEntries(item);
      if (!selectedEntries.length) {
        return;
      }
      selectedEntries.forEach(({ option: option2, quantity }) => {
        addItemToCart(item, option2, quantity);
      });
      persistCart();
      renderCart();
      closeDetail();
      return;
    }
    const option = getSelectedOption(item);
    if (!option) {
      return;
    }
    addItemToCart(item, option, state.selectedQuantity);
    persistCart();
    renderCart();
    closeDetail();
  });
  toggleSummaryViewButton.addEventListener("click", () => {
    if (!state.cart.length) {
      toggleSummaryViewButton.textContent = generateSummaryLabel;
      return;
    }
    setCartSummaryView(!isCartSummaryView);
  });
  clearCartButton.addEventListener("click", () => {
    state.cart = [];
    persistCart();
    renderCart();
  });
  sectionNav == null ? void 0 : sectionNav.addEventListener("click", (event) => {
    const link = event.target.closest(".section-nav__link");
    if (!link) {
      return;
    }
    const sectionId = link.dataset.sectionId;
    if (!sectionId) {
      return;
    }
    event.preventDefault();
    scrollToSectionStart(sectionId);
    setActiveSectionLink(sectionId, { ensureVisible: true });
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
  syncDisplayFontSpacingFromMetrics();
  var _a;
  if ("fonts" in document && typeof ((_a = document.fonts) == null ? void 0 : _a.addEventListener) === "function") {
    document.fonts.addEventListener("loadingdone", syncDisplayFontSpacingFromMetrics);
  }
  initLoaderProgress();
  initPromoAgriCarousel();
  initFormatCarousel();
  registerServiceWorker();
  init();
  async function init() {
    let menuAssetsReadyPromise = Promise.resolve();
    const menuDataPromise = loadMenuData().then((menuData) => {
      setLoaderTaskProgress("menuData", 1);
      return menuData;
    }).catch((error) => {
      error.bootPhase = "menu-data";
      throw error;
    });
    const fontsReadyPromise = waitForRequiredFonts().then(async () => {
      await waitForDisplayFontRevealGate();
      syncDisplayFontSpacingFromMetrics();
      pageBody.classList.remove("fonts-critical-loading");
      pageBody.classList.add("fonts-critical-ready");
      setLoaderTaskProgress("fonts", 1);
    }).catch((error) => {
      console.warn("Font critici non confermati entro il timeout, continuo in fallback.", error);
      syncDisplayFontSpacing(false);
      pageBody.classList.remove("fonts-critical-loading");
      pageBody.classList.add("fonts-critical-fallback", "loader-fonts-fallback");
      setLoaderTaskProgress("fonts", 1);
    });
    const deferredFontsReadyPromise = waitForDeferredFonts().then(() => {
      setLoaderTaskProgress("deferredFonts", 1);
    });
    const shellAssetsReadyPromise = waitForShellAssets().then(() => {
      setLoaderTaskProgress("shellAssets", 1);
    }).catch((error) => {
      error.bootPhase = "shell-assets";
      throw error;
    });
    const minimumLoaderPromise = waitMinimumLoaderTime(LOADER_MIN_DURATION).then(() => {
      setLoaderTaskProgress("timeGate", 1);
    });
    try {
      const menuData = await menuDataPromise;
      menuAssetsReadyPromise = waitForMenuAssets(menuData).then(() => {
        setLoaderTaskProgress("menuAssets", 1);
      }).catch((error) => {
        console.warn("Alcune immagini del menu non sono pronte nel bootstrap iniziale, continuo comunque.", error);
        setLoaderTaskProgress("menuAssets", 1);
      });
      applyMenuData(menuData);
      try {
        await waitForMenuRender();
      } catch (error) {
        error.bootPhase = "render";
        throw error;
      }
      setLoaderTaskProgress("render", 1);
      await Promise.all([
        fontsReadyPromise,
        menuAssetsReadyPromise,
        shellAssetsReadyPromise,
        minimumLoaderPromise
      ]);
      revealApp();
    } catch (error) {
      console.error("Errore durante il caricamento del menu:", error);
      await promiseAllSettledCompat([deferredFontsReadyPromise]);
      if (error.bootPhase === "menu-data" || error.bootPhase === "render") {
        await promiseAllSettledCompat([fontsReadyPromise, minimumLoaderPromise, shellAssetsReadyPromise]);
        syncLoaderProgress("Menu non disponibile");
        renderMenuLoadingState("retry");
        revealApp();
        return;
      }
      showBootstrapFailureState(error);
    }
  }
  function registerServiceWorker() {
    const host = window.location.hostname;
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host.indexOf("192.168.") === 0 || host.indexOf("10.") === 0 || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);
    if (!("serviceWorker" in navigator) || !window.isSecureContext || isLocalHost) {
      return;
    }
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js?v=".concat(APP_VERSION)).catch((error) => {
        console.warn("Service worker non registrato.", error);
      });
    });
  }
  function initLoaderProgress() {
    setLoaderTaskProgress("boot", 1);
    markLoaderClockStarted();
    startLoaderTimeProgress();
    revealLoaderCardAfterDelay();
  }
  function revealLoaderCardAfterDelay() {
    if (loaderCardRevealPromise) {
      return loaderCardRevealPromise;
    }
    loaderCardRevealPromise = (async () => {
      if (!appLoader) {
        return;
      }
      appLoader.classList.add("app-loader--card-hidden");
      const loaderFontsGate = waitForLoaderFonts().then(() => "ready").catch(() => "fallback");
      try {
        await wait(LOADER_CARD_DELAY);
        const loaderFontState = await Promise.race([
          loaderFontsGate,
          wait(1100).then(() => "fallback")
        ]);
        pageBody.classList.remove("loader-fonts-loading");
        if (loaderFontState === "ready") {
          pageBody.classList.add("loader-fonts-ready");
        } else {
          pageBody.classList.add("loader-fonts-fallback");
          appLoader.classList.add("app-loader--font-fallback");
        }
      } catch (error) {
        pageBody.classList.remove("loader-fonts-loading");
        pageBody.classList.add("loader-fonts-fallback");
        appLoader.classList.add("app-loader--font-fallback");
      }
      if (!appLoader || appHasRevealed) {
        return;
      }
      hideLoaderIntro();
      await wait(LOADER_INTRO_OUTRO_DURATION);
      if (!appLoader || appHasRevealed) {
        return;
      }
      clearInitialLoaderCardHide();
      appLoader.classList.remove("app-loader--card-hidden");
      startLoaderMessageRotation();
    })();
    return loaderCardRevealPromise;
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
  function markLoaderClockStarted() {
    if (loaderStartedAt != null) {
      return;
    }
    loaderStartedAt = performance.now();
    resolveLoaderClockStarted();
  }
  function hideLoaderIntro() {
    if (!appLoader || !appLoaderIntro) {
      return;
    }
    appLoader.classList.add("app-loader--intro-hidden");
  }
  function clearInitialLoaderCardHide() {
    if (!appLoaderCard || appLoaderCard.dataset.loaderCardInitialHidden !== "true") {
      return;
    }
    appLoaderCard.removeAttribute("style");
    appLoaderCard.removeAttribute("data-loader-card-initial-hidden");
  }
  function showBootstrapFailureState(error) {
    var _a2;
    if (!appLoader) {
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
    syncDisplayFontSpacing(false);
    hideLoaderIntro();
    clearInitialLoaderCardHide();
    appLoader.classList.remove("app-loader--card-hidden");
    appLoader.classList.add("app-loader--font-fallback");
    pageBody.classList.remove("loader-fonts-loading", "fonts-critical-loading");
    pageBody.classList.add("loader-fonts-fallback", "bootstrap-failed");
    const eyebrow = appLoader.querySelector(".app-loader__eyebrow");
    const title = appLoader.querySelector(".app-loader__title");
    const note = appLoader.querySelector(".app-loader__note");
    const meta = appLoader.querySelector(".app-loader__meta");
    const bar = appLoader.querySelector(".app-loader__bar");
    if (eyebrow) {
      eyebrow.textContent = "Caricamento";
    }
    if (title) {
      title.textContent = error && error.bootPhase === "fonts" ? "Sto completando i font essenziali." : "Sto ancora preparando la pagina.";
    }
    if (note) {
      note.textContent = error && error.bootPhase === "fonts" ? "Aspetto i font necessari per mostrare il layout in modo leggibile. Se resta bloccata, prova a ricaricare." : "Qualcosa ha rallentato il bootstrap iniziale. Se resta bloccata, prova a ricaricare.";
      note.classList.remove("is-transitioning");
    }
    if (meta) {
      meta.setAttribute("aria-hidden", "true");
    }
    if (bar) {
      bar.setAttribute("aria-hidden", "true");
    }
    let retryButton = appLoader.querySelector(".app-loader__action");
    if (!retryButton) {
      retryButton = document.createElement("button");
      retryButton.type = "button";
      retryButton.className = "utility-btn utility-btn--accent app-loader__action";
      retryButton.textContent = "Ricarica la pagina";
      retryButton.addEventListener("click", () => window.location.reload());
      (_a2 = appLoader.querySelector(".app-loader__card")) == null ? void 0 : _a2.appendChild(retryButton);
    }
  }
  function startLoaderTimeProgress() {
    const tick = () => {
      if (appHasRevealed) {
        loaderProgressFrame = null;
        return;
      }
      if (loaderStartedAt == null) {
        loaderProgressFrame = window.requestAnimationFrame(tick);
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
    const rawPercentage = Object.keys(LOADER_PROGRESS_WEIGHTS).reduce((sum, key) => {
      return sum + LOADER_PROGRESS_WEIGHTS[key] * (loaderProgressState[key] || 0);
    }, 0);
    const allTasksComplete = Object.keys(LOADER_PROGRESS_WEIGHTS).every(
      (key) => (loaderProgressState[key] || 0) >= 1
    );
    const percentage = allTasksComplete ? 100 : Math.max(0, Math.min(99, Math.floor(rawPercentage)));
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
    itemMenuOrderLookup = sections.reduce((lookup, section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        lookup[item.id] = sectionIndex * 1e3 + itemIndex;
      });
      return lookup;
    }, {});
    renderNavigation();
    renderSections();
    syncSectionScrollOffset();
    refreshSectionNavStickyStart();
    initActiveSectionTracking();
    renderCart();
  }
  function syncSectionScrollOffset() {
    if (!sectionNav) {
      return;
    }
    const navHeight = Math.ceil(sectionNav.getBoundingClientRect().height);
    const comfortableGap = 18;
    const totalOffset = Math.max(96, navHeight + comfortableGap);
    document.documentElement.style.setProperty("--section-scroll-offset", "".concat(totalOffset, "px"));
  }
  function refreshSectionNavStickyStart() {
    if (!sectionNav) {
      return;
    }
    sectionNavStickyStart = Math.max(0, sectionNav.offsetTop);
    syncStickyNavState();
  }
  function initActiveSectionTracking() {
    if (!sectionNav || !menuSections) {
      return;
    }
    const sectionElements = Array.from(menuSections.querySelectorAll(".menu-section[id]"));
    if (!sectionElements.length) {
      return;
    }
    updateActiveSectionFromScroll();
  }
  function queueActiveSectionRefresh() {
    if (activeSectionTicking) {
      return;
    }
    activeSectionTicking = true;
    window.requestAnimationFrame(() => {
      activeSectionTicking = false;
      syncStickyNavState();
      updateActiveSectionFromScroll();
    });
  }
  function syncStickyNavState() {
    if (!sectionNav) {
      return;
    }
    sectionNav.classList.toggle("is-stuck", window.scrollY > sectionNavStickyStart);
  }
  function updateActiveSectionFromScroll() {
    if (!sectionNav || !menuSections) {
      return;
    }
    const sectionElements = Array.from(menuSections.querySelectorAll(".menu-section[id]"));
    if (!sectionElements.length) {
      return;
    }
    const navHeight = Math.ceil(sectionNav.getBoundingClientRect().height);
    const activationLine = navHeight + 28;
    if (pageOutro && pageOutro.getBoundingClientRect().top - activationLine <= 0) {
      setActiveSectionLink("");
      return;
    }
    let nextActiveId = sectionElements[0].id.replace("section-", "");
    sectionElements.forEach((section) => {
      if (section.getBoundingClientRect().top - activationLine <= 0) {
        nextActiveId = section.id.replace("section-", "");
      }
    });
    setActiveSectionLink(nextActiveId, { ensureVisible: true });
  }
  function scrollToSectionStart(sectionId) {
    const targetSection = document.querySelector("#section-".concat(sectionId));
    if (!targetSection || !sectionNav) {
      return;
    }
    const sectionTop = window.scrollY + targetSection.getBoundingClientRect().top;
    const navHeight = Math.ceil(sectionNav.getBoundingClientRect().height);
    const stickyTop = parseFloat(window.getComputedStyle(sectionNav).top) || 0;
    const targetTop = Math.max(0, sectionTop - navHeight - stickyTop);
    window.scrollTo({
      top: targetTop,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    if (window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", "#section-".concat(sectionId));
    }
  }
  function setActiveSectionLink(sectionId, options = {}) {
    const { ensureVisible = false } = options;
    if (!sectionNav) {
      return;
    }
    const links = Array.from(sectionNav.querySelectorAll(".section-nav__link"));
    if (!links.length) {
      return;
    }
    if (!sectionId) {
      activeSectionId = "";
      links.forEach((link) => {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      });
      return;
    }
    const nextActiveLink = links.find((link) => link.dataset.sectionId === sectionId);
    if (!nextActiveLink) {
      return;
    }
    const hasChanged = activeSectionId !== sectionId;
    activeSectionId = sectionId;
    links.forEach((link) => {
      const isActive = link === nextActiveLink;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (ensureVisible && (hasChanged || !isNavLinkComfortablyVisible(nextActiveLink))) {
      scrollNavLinkIntoView(nextActiveLink);
    }
  }
  function isNavLinkComfortablyVisible(link) {
    if (!sectionNav || !link) {
      return true;
    }
    const navRect = sectionNav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const horizontalPadding = 20;
    return linkRect.left >= navRect.left + horizontalPadding && linkRect.right <= navRect.right - horizontalPadding;
  }
  function scrollNavLinkIntoView(link) {
    if (!sectionNav || !link) {
      return;
    }
    const navRect = sectionNav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const currentLeft = sectionNav.scrollLeft;
    const targetLeft = currentLeft + (linkRect.left - navRect.left) - (navRect.width - linkRect.width) / 2;
    sectionNav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
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
    const normalized = value.trim().toLowerCase().replace(/\s+/g, "_").replace(/[()]/g, "").replace(/[\/,-]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
    const aliases = {
      sezione: "section_id",
      ordine: "position",
      visibilita: "visibility_state",
      visibilita_visibile_nascosto: "visibility_state",
      visibile: "visibility_state",
      mostra: "visibility_state",
      stato: "availability_state",
      stato_disponibilita: "availability_state",
      disponibilita: "availability_state",
      disponibilita_disponibile_non_disponibile_in_arrivo: "availability_state",
      disponibile: "availability_state",
      variante: "variante_1",
      prezzo: "prezzo_1"
    };
    return aliases[normalized] || normalized;
  }
  function applySheetRowsToMenu(baseMenu, sheetRows) {
    const nextMenu = JSON.parse(JSON.stringify(baseMenu));
    const rowLookup = new Map(sheetRows.map((row) => [row.id, row]));
    nextMenu.sections.forEach((section) => {
      section.items = section.items.filter((item) => {
        const row = getManagedSheetRow(item, rowLookup);
        return row ? resolveSheetVisibility(row, true) : true;
      }).map((item, index) => {
        const row = getManagedSheetRow(item, rowLookup);
        const nextItem = row ? updateItemFromSheet(item, row, section) : item;
        nextItem.__sheetPosition = parseSheetInteger(row ? row.position : null, index);
        return nextItem;
      });
    });
    nextMenu.sections.forEach((section) => {
      section.items = section.items.sort((left, right) => getSheetPosition(left) - getSheetPosition(right)).map((item) => {
        delete item.__sheetPosition;
        return item;
      });
    });
    return nextMenu;
  }
  function getManagedSheetRow(item, rowLookup) {
    if (!item || item.excludeFromSheet === true) {
      return null;
    }
    return rowLookup.get(item.id) || null;
  }
  function updateItemFromSheet(item, row, section) {
    const nextItem = __spreadValues({}, item);
    if (row.show_detail_hint) {
      nextItem.showDetailHint = parseSheetBoolean(
        row.show_detail_hint,
        nextItem.showDetailHint == null ? true : nextItem.showDetailHint
      );
    }
    if (nextItem.lockAvailabilityState !== true) {
      applySheetAvailabilityToItem(nextItem, row, getItemAvailabilityState(nextItem));
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
  function parseVisibilityState(value) {
    if (!value) {
      return null;
    }
    const normalized = String(value).trim().toLowerCase();
    if (["visibile", "mostra", "mostrare", "show", "shown", "si", "s\xEC", "yes", "true", "1"].includes(normalized)) {
      return true;
    }
    if (["nascosto", "nascondi", "nascondere", "hidden", "hide", "no", "false", "0"].includes(normalized)) {
      return false;
    }
    return null;
  }
  function parseAvailabilityState(value) {
    if (!value) {
      return "";
    }
    const normalized = String(value).trim().toLowerCase();
    if (["disponibile", "available", "si", "s\xEC", "yes", "true", "1"].includes(normalized)) {
      return "available";
    }
    if (["in arrivo", "arrivo", "coming soon", "coming-soon", "coming_soon", "preview", "teaser"].includes(
      normalized
    )) {
      return "coming-soon";
    }
    if ([
      "al carretto",
      "carretto",
      "self service",
      "self-service",
      "self_service",
      "ritiro autonomo",
      "autonomia"
    ].includes(normalized)) {
      return "self-service";
    }
    if (["non disponibile", "esaurito", "unavailable", "sold out", "no", "false", "0"].includes(normalized)) {
      return "unavailable";
    }
    return "";
  }
  function resolveSheetVisibility(row, fallbackValue) {
    const explicitVisibility = parseVisibilityState(
      getFirstSheetValue(row.visibility_state, row.visible, row.visibile, row.visibilita)
    );
    if (explicitVisibility != null) {
      return explicitVisibility;
    }
    return fallbackValue;
  }
  function resolveSheetAvailabilityState(row, fallbackState) {
    const explicitState = parseAvailabilityState(row.availability_state);
    if (explicitState) {
      return explicitState;
    }
    const availabilityValue = getFirstSheetValue(row.available);
    const stateFromAvailability = parseAvailabilityState(availabilityValue);
    if (stateFromAvailability) {
      return stateFromAvailability;
    }
    if (availabilityValue) {
      return parseSheetBoolean(availabilityValue, fallbackState === "available") ? "available" : "unavailable";
    }
    return fallbackState;
  }
  function applySheetAvailabilityToItem(item, row, fallbackState) {
    const nextState = resolveSheetAvailabilityState(row, fallbackState);
    item.availabilityState = nextState;
    item.available = nextState === "available";
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
  function applyDisplayFontSpacingVars(variableMap) {
    if (!(document == null ? void 0 : document.documentElement) || !variableMap) {
      return;
    }
    Object.entries(variableMap).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
  }
  function syncDisplayFontSpacing(isReady) {
    applyDisplayFontSpacingVars(isReady ? DISPLAY_FONT_READY_VARS : DISPLAY_FONT_FALLBACK_VARS);
  }
  function syncDisplayFontSpacingFromMetrics() {
    syncDisplayFontSpacing(displayFontPlan ? isFontMetricReady(displayFontPlan) : false);
  }
  async function waitForDisplayFontRevealGate() {
    var _a2;
    if (!displayFontPlan) {
      return;
    }
    await waitForFontMetrics(displayFontPlan, {
      strict: true,
      timeout: STRICT_FONT_LOAD_TIMEOUT
    });
    let confirmations = 0;
    while (confirmations < DISPLAY_FONT_REVEAL_CONFIRMATIONS) {
      if (isFontMetricReady(displayFontPlan)) {
        confirmations += 1;
      } else {
        confirmations = 0;
      }
      if (confirmations >= DISPLAY_FONT_REVEAL_CONFIRMATIONS) {
        return;
      }
      if ("fonts" in document && ((_a2 = document.fonts) == null ? void 0 : _a2.load)) {
        try {
          await waitWithTimeout(
            document.fonts.load(
              displayFontPlan.metricDescriptor || displayFontPlan.descriptor,
              displayFontPlan.metricSample || displayFontPlan.sample || "BESbswy 0123456789"
            ),
            1400
          );
        } catch (error) {
        }
      }
      await waitForNextPaint();
      await wait(110);
    }
  }
  async function waitForRequiredFonts() {
    const blockingMetricPlans = BLOCKING_REQUIRED_FONT_PLANS.filter((plan) => plan.verifyMetrics);
    const nonBlockingMetricPlans = NON_BLOCKING_REQUIRED_FONT_PLANS.filter((plan) => plan.verifyMetrics);
    if ("fonts" in document) {
      await Promise.all([
        ...BLOCKING_REQUIRED_FONT_PLANS.map(
          (plan) => waitForFontLoad(plan, {
            strict: true,
            timeout: STRICT_FONT_LOAD_TIMEOUT
          })
        ),
        ...NON_BLOCKING_REQUIRED_FONT_PLANS.map(
          (plan) => waitForFontLoad(plan, {
            timeout: FONT_LOAD_TIMEOUT
          })
        )
      ]);
      if (document.fonts.ready) {
        try {
          await waitWithTimeout(document.fonts.ready, STRICT_FONT_LOAD_TIMEOUT);
        } catch (error) {
        }
      }
    }
    await Promise.all([
      ...blockingMetricPlans.map(
        (plan) => waitForFontMetrics(plan, {
          strict: true,
          timeout: STRICT_FONT_LOAD_TIMEOUT
        })
      ),
      ...nonBlockingMetricPlans.map(
        (plan) => waitForFontMetrics(plan, {
          timeout: FONT_LOAD_TIMEOUT
        })
      )
    ]);
  }
  async function waitForLoaderFonts() {
    const metricPlans = LOADER_FONT_PLANS.filter((plan) => plan.verifyMetrics);
    if ("fonts" in document && LOADER_FONT_PLANS.length) {
      await Promise.all(
        LOADER_FONT_PLANS.map(
          (plan) => waitForFontLoad(plan, {
            strict: true,
            timeout: LOADER_FONT_TIMEOUT
          })
        )
      );
    }
    await Promise.all(
      metricPlans.map(
        (plan) => waitForFontMetrics(plan, {
          strict: true,
          timeout: LOADER_FONT_TIMEOUT
        })
      )
    );
  }
  async function waitForFontLoad(fontPlan, options = {}) {
    const { strict = false, persist = false, timeout = FONT_LOAD_TIMEOUT } = options;
    const deadline = performance.now() + timeout;
    const descriptor = fontPlan.descriptor;
    const sample = fontPlan.sample || "BESbswy 0123456789";
    while (true) {
      if (document.fonts.check(descriptor)) {
        return;
      }
      try {
        await waitWithTimeout(document.fonts.load(descriptor, sample), 2600);
      } catch (error) {
        if (strict && performance.now() >= deadline) {
          throw new Error("Timeout nel caricamento del font critico: ".concat(fontPlan.family));
        }
      }
      if (document.fonts.check(descriptor)) {
        return;
      }
      if (performance.now() >= deadline) {
        if (strict) {
          if (persist) {
            await wait(220);
            continue;
          }
          throw new Error("Timeout nel caricamento del font critico: ".concat(fontPlan.family));
        }
        console.warn("Timeout nel caricamento del font: ".concat(fontPlan.family));
        return;
      }
      await wait(140);
    }
  }
  async function waitForFontMetrics(fontPlan, options = {}) {
    var _a2;
    if (!(fontPlan == null ? void 0 : fontPlan.verifyMetrics)) {
      return;
    }
    const { strict = false, persist = false, timeout = FONT_LOAD_TIMEOUT } = options;
    const deadline = performance.now() + timeout;
    while (true) {
      if (isFontMetricReady(fontPlan)) {
        return;
      }
      if ("fonts" in document && ((_a2 = document.fonts) == null ? void 0 : _a2.load)) {
        try {
          await waitWithTimeout(
            document.fonts.load(
              fontPlan.metricDescriptor || fontPlan.descriptor,
              fontPlan.metricSample || fontPlan.sample || "BESbswy 0123456789"
            ),
            1800
          );
        } catch (error) {
          if (strict && performance.now() >= deadline) {
            throw new Error("Timeout nella verifica metrica del font: ".concat(fontPlan.family));
          }
        }
      }
      if (isFontMetricReady(fontPlan)) {
        return;
      }
      if (performance.now() >= deadline) {
        if (strict) {
          if (persist) {
            await wait(220);
            continue;
          }
          throw new Error("Metriche del font non confermate: ".concat(fontPlan.family));
        }
        console.warn("Metriche del font non confermate: ".concat(fontPlan.family));
        return;
      }
      await wait(120);
    }
  }
  function isFontMetricReady(fontPlan) {
    const sample = fontPlan.metricSample || fontPlan.sample || "BESbswy 0123456789";
    const primaryDescriptor = fontPlan.metricDescriptor || "".concat(fontPlan.descriptor, ', "Montserrat", sans-serif');
    const fallbackDescriptor = fontPlan.metricFallbackDescriptor || '700 48px "Montserrat", sans-serif';
    const isDeclaredReady = "fonts" in document ? document.fonts.check(fontPlan.descriptor, sample) : true;
    if (!isDeclaredReady) {
      return false;
    }
    const primaryWidth = measureFontTextWidth(primaryDescriptor, sample);
    const fallbackWidth = measureFontTextWidth(fallbackDescriptor, sample);
    if (primaryWidth == null || fallbackWidth == null) {
      return isDeclaredReady;
    }
    return Math.abs(primaryWidth - fallbackWidth) >= (fontPlan.metricMinDelta || 1);
  }
  function measureFontTextWidth(fontDescriptor, sample) {
    if (!fontDescriptor || !sample || !("document" in window)) {
      return null;
    }
    if (!fontMetricCanvas) {
      fontMetricCanvas = document.createElement("canvas");
    }
    const context = fontMetricCanvas.getContext("2d");
    if (!context) {
      return null;
    }
    context.font = fontDescriptor;
    return context.measureText(sample).width;
  }
  async function waitMinimumLoaderTime(duration) {
    await loaderClockStartedPromise;
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
  function waitForDeferredFonts() {
    if (!("fonts" in document) || !DEFERRED_FONT_PLANS.length) {
      return Promise.resolve();
    }
    return promiseAllSettledCompat(DEFERRED_FONT_PLANS.map((plan) => waitForFontLoad(plan)));
  }
  function waitForShellAssets() {
    const criticalAssetUrls = collectShellAssetUrls();
    const supportingAssetUrls = collectSupportingAssetUrls();
    const preloadTasks = [];
    if (criticalAssetUrls.length) {
      preloadTasks.push(promiseAllSettledCompat(criticalAssetUrls.map((url) => preloadImage(url, "high", 12e3))));
    }
    if (supportingAssetUrls.length) {
      preloadTasks.push(promiseAllSettledCompat(supportingAssetUrls.map((url) => preloadImage(url, "auto", 14e3))));
    }
    if (!preloadTasks.length) {
      return Promise.resolve();
    }
    return Promise.all(preloadTasks);
  }
  function waitForMenuAssets(menuData) {
    const criticalAssetUrls = collectMenuVisualAssetUrls(menuData, {
      includeSectionIds: CRITICAL_MENU_SECTION_IDS,
      includeDeferredItems: true
    });
    const secondaryAssetUrls = collectMenuVisualAssetUrls(menuData, {
      excludeSectionIds: CRITICAL_MENU_SECTION_IDS,
      includeDeferredItems: true
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
    const { includeSectionIds = null, excludeSectionIds = null, includeDeferredItems = false } = options;
    const urls = /* @__PURE__ */ new Set();
    menuData.sections.forEach((section) => {
      if (includeSectionIds && !includeSectionIds.has(section.id)) {
        return;
      }
      if (excludeSectionIds && excludeSectionIds.has(section.id)) {
        return;
      }
      section.items.forEach((item) => {
        if (!includeDeferredItems && shouldDeferLoaderAssetsForItem(item)) {
          return;
        }
        collectVisualAssetUrls(item.visual, urls, { skipDeferredPhotoPanels: true });
        if (item.cardVisual) {
          collectVisualAssetUrls(item.cardVisual, urls, { skipDeferredPhotoPanels: true });
        }
        getAllSideVisuals(item).forEach(
          (visual) => collectSideVisualAssetUrls(visual, urls, { skipDeferredSideVisuals: true })
        );
        if (Array.isArray(item.detailGallery)) {
          item.detailGallery.forEach(
            (visual) => collectVisualAssetUrls(visual, urls, { skipDeferredPhotoPanels: true })
          );
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
  function collectSupportingAssetUrls() {
    const urls = /* @__PURE__ */ new Set();
    document.querySelectorAll("[data-deferred-src]").forEach((asset) => {
      const src = asset.getAttribute("data-deferred-src");
      if (src) {
        urls.add(src);
      }
    });
    return Array.from(urls);
  }
  function collectVisualAssetUrls(visual, urls, options = {}) {
    const { skipDeferredPhotoPanels = false } = options;
    if (!visual || !urls) {
      return;
    }
    if (visual.asset && !(skipDeferredPhotoPanels && visual.type === "photo-panel" && visual.deferAsset === true)) {
      urls.add(getVisualAsset(visual.asset));
    }
    if (visual.type === "photo-panel" && visual.selectionAssets) {
      if (Array.isArray(visual.selectionAssets)) {
        visual.selectionAssets.forEach((entry) => {
          if (entry && typeof entry.asset === "string") {
            urls.add(getVisualAsset(entry.asset));
          }
        });
      } else if (typeof visual.selectionAssets === "object") {
        Object.values(visual.selectionAssets).forEach((asset) => {
          if (typeof asset === "string") {
            urls.add(getVisualAsset(asset));
          }
        });
      }
    }
    if (visual.type === "can-cluster" && Array.isArray(visual.items)) {
      visual.items.forEach((item) => {
        if (item && item.asset) {
          urls.add(getVisualAsset(item.asset));
        }
      });
    }
  }
  function collectSideVisualAssetUrls(visual, urls, options = {}) {
    const { skipDeferredSideVisuals = false } = options;
    if (visual && visual.asset && !(skipDeferredSideVisuals && visual.deferAsset === true)) {
      urls.add(getSideVisualImage(visual));
    }
  }
  function shouldDeferLoaderAssetsForItem(item) {
    return getItemAvailabilityState(item) !== "available";
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
    try {
      const resolvedUrl = new URL(path, window.location.href);
      resolvedUrl.searchParams.set("v", APP_VERSION);
      return resolvedUrl.toString();
    } catch (error) {
      const separator = path.includes("?") ? "&" : "?";
      return "".concat(path).concat(separator, "v=").concat(APP_VERSION);
    }
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
  function dedupeFontPlans(plans) {
    const seen = /* @__PURE__ */ new Set();
    return plans.filter((plan) => {
      if (!plan || !plan.descriptor) {
        return false;
      }
      if (seen.has(plan.descriptor)) {
        return false;
      }
      seen.add(plan.descriptor);
      return true;
    });
  }
  function isCustomBlockingFontPlan(plan) {
    return Boolean((plan == null ? void 0 : plan.source) && /^local\b/i.test(plan.source));
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
    pageBody.classList.remove("is-loading", "fonts-critical-loading", "loader-fonts-loading");
    pageBody.classList.add("app-ready", "fonts-critical-ready", "loader-fonts-ready");
    if (appLoader) {
      appLoader.setAttribute("aria-hidden", "true");
      appLoader.classList.add("is-hidden");
    }
    window.setTimeout(() => {
      if (appLoader) {
        appLoader.remove();
      }
    }, 320);
    scheduleNonCriticalWork(() => {
      loadClarityScript();
    });
  }
  function initPromoAgriCarousel() {
    if (!promoAgriCarousel || !promoAgriViewport || !promoAgriVideoTrack || !promoAgriCarouselDots || !PROMO_AGRI_VIDEOS.length) {
      return;
    }
    let activeIndex = 0;
    let autoplayId = null;
    let carouselVisible = false;
    let carouselPaused = false;
    let lastTriggerButton = null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const swipeTarget = promoAgriViewport;
    promoAgriVideoTrack.innerHTML = PROMO_AGRI_VIDEOS.map(
      (video, index) => '\n      <button\n        class="promo-agri__video-slide"\n        type="button"\n        data-slide-index="'.concat(index, '"\n        aria-label="Guarda ').concat(video.title, '"\n      >\n        <span\n          class="promo-agri__video-poster"\n          style="--promo-agri-video-poster: url(\'').concat(getPromoAgriVideoPoster(video), '\');"\n        >\n          <span class="promo-agri__video-meta">\n            <span class="promo-agri__video-kicker">').concat(video.eyebrow || "Agri-Eventi", '</span>\n          </span>\n          <span class="promo-agri__video-cta">Guarda il video</span>\n        </span>\n      </button>\n    ')
    ).join("");
    promoAgriCarouselDots.innerHTML = PROMO_AGRI_VIDEOS.map(
      (_, index) => '\n      <button\n        class="promo-agri__video-dot"\n        type="button"\n        aria-label="Vai al video '.concat(index + 1, '"\n        data-slide-index="').concat(index, '"\n      ></button>\n    ')
    ).join("");
    const slides = Array.from(promoAgriVideoTrack.querySelectorAll(".promo-agri__video-slide"));
    const dots = Array.from(promoAgriCarouselDots.querySelectorAll(".promo-agri__video-dot"));
    const syncCarousel = () => {
      const video = PROMO_AGRI_VIDEOS[activeIndex];
      if (!video) {
        return;
      }
      promoAgriVideoTrack.style.transform = "translateX(-".concat(activeIndex * 100, "%)");
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
    const openLightbox = (index, triggerButton = null) => {
      const video = PROMO_AGRI_VIDEOS[index];
      if (!video || !promoAgriLightbox || !promoAgriLightboxFrame) {
        return;
      }
      lastTriggerButton = triggerButton;
      goToSlide(index);
      carouselPaused = true;
      stopAutoplay();
      promoAgriLightbox.hidden = false;
      promoAgriLightbox.setAttribute("aria-hidden", "false");
      promoAgriLightboxFrame.setAttribute("src", getPromoAgriEmbedSrc(video, { autoplay: true }));
      promoAgriLightboxFrame.setAttribute("title", video.title);
      pageBody.classList.add("modal-open");
      promoAgriLightboxClose == null ? void 0 : promoAgriLightboxClose.focus();
    };
    const closeLightbox = () => {
      if (!promoAgriLightbox || promoAgriLightbox.hidden) {
        return;
      }
      promoAgriLightbox.hidden = true;
      promoAgriLightbox.setAttribute("aria-hidden", "true");
      if (promoAgriLightboxFrame) {
        promoAgriLightboxFrame.setAttribute("src", "about:blank");
      }
      pageBody.classList.remove("modal-open");
      carouselPaused = false;
      startAutoplay();
      lastTriggerButton == null ? void 0 : lastTriggerButton.focus();
      lastTriggerButton = null;
    };
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        openLightbox(Number(slide.dataset.slideIndex || 0), slide);
      });
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(Number(dot.dataset.slideIndex || 0));
      });
    });
    bindSwipeZone(
      swipeTarget,
      () => goToSlide(activeIndex - 1),
      () => goToSlide(activeIndex + 1)
    );
    swipeTarget.addEventListener(
      "touchstart",
      () => {
        carouselPaused = true;
        stopAutoplay();
      },
      { passive: true }
    );
    swipeTarget.addEventListener(
      "touchend",
      () => {
        carouselPaused = false;
        startAutoplay();
      },
      { passive: true }
    );
    swipeTarget.addEventListener(
      "touchcancel",
      () => {
        carouselPaused = false;
        startAutoplay();
      },
      { passive: true }
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
    promoAgriLightboxBackdrop == null ? void 0 : promoAgriLightboxBackdrop.addEventListener("click", closeLightbox);
    promoAgriLightboxClose == null ? void 0 : promoAgriLightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
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
  function getPromoAgriVideoPoster(video) {
    const videoId = getPromoAgriVideoId(video);
    return videoId ? "https://i.ytimg.com/vi/".concat(videoId, "/hqdefault.jpg") : "";
  }
  function getPromoAgriVideoId(video) {
    const source = video && video.src ? video.src : "";
    const match = source.match(/\/embed\/([^?&/]+)/);
    return match ? match[1] : "";
  }
  function getPromoAgriEmbedSrc(video, options = {}) {
    const { autoplay = false } = options;
    try {
      const url = new URL(video.src);
      url.searchParams.set("rel", "0");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("modestbranding", "1");
      if (autoplay) {
        url.searchParams.set("autoplay", "1");
      } else {
        url.searchParams.delete("autoplay");
      }
      return url.toString();
    } catch (error) {
      return video.src;
    }
  }
  function bindSwipeZone(element, onSwipeRight, onSwipeLeft) {
    if (!element) {
      return;
    }
    let touchStartX = null;
    let touchStartY = null;
    let suppressClickUntil = 0;
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
        suppressClickUntil = Date.now() + 420;
        if (deltaX < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      },
      { passive: true }
    );
    element.addEventListener(
      "click",
      (event) => {
        if (Date.now() < suppressClickUntil) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true
    );
  }
  function initFormatCarousel() {
    if (!formatCarousel || !formatCarouselTrack || !formatCarouselDots) {
      return;
    }
    initDeferredFormatCarouselAssets();
    const formatCarouselViewport = formatCarousel.querySelector(".format-carousel__viewport");
    const slides = Array.from(formatCarouselTrack.querySelectorAll(".format-carousel__slide-link"));
    const syncActiveFormat = (index) => {
      const slideLink = slides[index];
      if (!slideLink) {
        return;
      }
      const formatTitle = slideLink.dataset.formatTitle || slideLink.getAttribute("aria-label") || "";
      if (formatShowcaseKicker) {
        formatShowcaseKicker.textContent = slideLink.dataset.formatKicker || "Format del Molino";
      }
      if (formatShowcaseTitle) {
        formatShowcaseTitle.textContent = formatTitle;
      }
      if (formatShowcaseCopy) {
        formatShowcaseCopy.textContent = slideLink.dataset.formatDescription || "";
      }
      if (formatShowcaseLink) {
        formatShowcaseLink.textContent = formatTitle ? "Apri ".concat(formatTitle) : "Apri la pagina";
        formatShowcaseLink.setAttribute("aria-label", slideLink.dataset.formatCta || "Apri la pagina del format");
        formatShowcaseLink.setAttribute("href", slideLink.getAttribute("href") || "#");
      }
    };
    initAutoplayCarousel({
      root: formatCarousel,
      swipeElement: formatCarouselViewport,
      track: formatCarouselTrack,
      dotsContainer: formatCarouselDots,
      slideSelector: ".format-carousel__slide",
      dotClassName: "format-carousel__dot",
      dotAriaLabelPrefix: "Vai al format",
      interval: 2600,
      visibilityThreshold: 0.45,
      onChange: syncActiveFormat
    });
  }
  function initAutoplayCarousel({
    root,
    swipeElement = root,
    track,
    dotsContainer,
    slideSelector,
    dotClassName,
    dotAriaLabelPrefix,
    interval,
    visibilityThreshold,
    onChange = null
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
      if (typeof onChange === "function") {
        onChange(activeIndex, slides[activeIndex]);
      }
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
    bindSwipeZone(
      swipeElement,
      () => goToSlide(activeIndex - 1),
      () => goToSlide(activeIndex + 1)
    );
    swipeElement.addEventListener(
      "touchstart",
      () => {
        carouselPaused = true;
        stopAutoplay();
      },
      { passive: true }
    );
    swipeElement.addEventListener(
      "touchend",
      () => {
        carouselPaused = false;
        startAutoplay();
      },
      { passive: true }
    );
    swipeElement.addEventListener(
      "touchcancel",
      () => {
        carouselPaused = false;
        startAutoplay();
      },
      { passive: true }
    );
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
  function renderNavigation() {
    sectionNav.innerHTML = sections.map(
      (section) => {
        const sectionSurface = getSectionSurfaceColor(section.id);
        const sectionSurfaceSoft = mixHexColors(sectionSurface, "#fff8ef", 0.5);
        const sectionSurfaceStrong = mixHexColors(sectionSurface, "#fff8ef", 0.12);
        return '\n        <a\n          class="section-nav__link"\n          href="#section-'.concat(section.id, '"\n          data-section-id="').concat(section.id, '"\n          style="--nav-accent: ').concat(section.accent, "; --nav-accent-soft: ").concat(section.accentSoft, "; --nav-surface: ").concat(sectionSurface, "; --nav-surface-soft: ").concat(sectionSurfaceSoft, "; --nav-surface-strong: ").concat(sectionSurfaceStrong, ';"\n        >\n          ').concat(section.title, "\n        </a>\n      ");
      }
    ).join("");
  }
  function getSectionSurfaceColor(sectionId) {
    return SECTION_SURFACE_COLORS[sectionId] || "#b39a7a";
  }
  function mixHexColors(colorA, colorB, mixToB = 0.5) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    if (!a || !b) {
      return colorA;
    }
    const weightB = Math.max(0, Math.min(1, mixToB));
    const weightA = 1 - weightB;
    const mixed = {
      r: Math.round(a.r * weightA + b.r * weightB),
      g: Math.round(a.g * weightA + b.g * weightB),
      b: Math.round(a.b * weightA + b.b * weightB)
    };
    return "rgb(".concat(mixed.r, ", ").concat(mixed.g, ", ").concat(mixed.b, ")");
  }
  function hexToRgb(hex) {
    const normalized = String(hex || "").trim().replace("#", "");
    if (!/^[\da-f]{3}$|^[\da-f]{6}$/i.test(normalized)) {
      return null;
    }
    const full = normalized.length === 3 ? normalized.split("").map((char) => "".concat(char).concat(char)).join("") : normalized;
    return {
      r: Number.parseInt(full.slice(0, 2), 16),
      g: Number.parseInt(full.slice(2, 4), 16),
      b: Number.parseInt(full.slice(4, 6), 16)
    };
  }
  function renderSections() {
    menuSections.innerHTML = sections.map((section, index) => renderSection(section, index === 0)).join("");
    menuSections.querySelectorAll("[data-item-id]").forEach((button) => {
      button.addEventListener("click", () => openDetail(button.dataset.itemId));
    });
    setupSideVisualAnimations();
    setupDeferredSideVisuals();
    setupDeferredBottleBackgrounds();
    setupDeferredCanClusterVisuals();
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
  function setupDeferredSideVisuals() {
    if (deferredSideVisualObserver) {
      deferredSideVisualObserver.disconnect();
    }
    const visuals = menuSections.querySelectorAll(".item-card__side-visual--deferred[data-side-visual-image]");
    if (!visuals.length) {
      return;
    }
    if (!("IntersectionObserver" in window)) {
      scheduleNonCriticalWork(() => {
        visuals.forEach((visual) => loadDeferredSideVisual(visual));
      });
      return;
    }
    deferredSideVisualObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          loadDeferredSideVisual(entry.target);
          if (deferredSideVisualObserver) {
            deferredSideVisualObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "280px 0px"
      }
    );
    visuals.forEach((visual) => deferredSideVisualObserver.observe(visual));
  }
  function setupDeferredCanClusterVisuals() {
    if (deferredCanClusterObserver) {
      deferredCanClusterObserver.disconnect();
    }
    const cans = menuSections.querySelectorAll(".can-cluster-visual__can--deferred[data-can-image]");
    if (!cans.length) {
      return;
    }
    if (!("IntersectionObserver" in window)) {
      scheduleNonCriticalWork(() => {
        cans.forEach((can) => loadDeferredCanClusterVisual(can));
      });
      return;
    }
    deferredCanClusterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          loadDeferredCanClusterVisual(entry.target);
          if (deferredCanClusterObserver) {
            deferredCanClusterObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "280px 0px"
      }
    );
    cans.forEach((can) => deferredCanClusterObserver.observe(can));
  }
  function loadDeferredSideVisual(visual) {
    if (!visual || visual.dataset.sideVisualLoaded === "true") {
      return;
    }
    const imageUrl = visual.dataset.sideVisualImage;
    if (!imageUrl) {
      return;
    }
    visual.dataset.sideVisualLoaded = "loading";
    preloadImage(imageUrl, "low").then(() => {
      visual.style.backgroundImage = "url('".concat(imageUrl, "')");
      visual.dataset.sideVisualLoaded = "true";
      visual.classList.remove("item-card__side-visual--deferred");
    });
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
  function loadDeferredCanClusterVisual(can) {
    if (!can || can.dataset.canLoaded === "true") {
      return;
    }
    const imageUrl = can.dataset.canImage;
    if (!imageUrl) {
      return;
    }
    can.dataset.canLoaded = "loading";
    preloadImage(imageUrl, "low").then(() => {
      can.setAttribute("src", imageUrl);
      can.dataset.canLoaded = "true";
      can.classList.remove("can-cluster-visual__can--deferred");
    });
  }
  function renderSection(section, isLeadSection) {
    const sectionSurface = getSectionSurfaceColor(section.id);
    const sectionFooterNote = String((section == null ? void 0 : section.footerNote) || "").trim();
    if (section.layout === "grouped" && Array.isArray(section.groups)) {
      return '\n      <section\n        class="menu-section menu-section--grouped'.concat(isLeadSection ? " menu-section--lead" : "", '"\n        id="section-').concat(section.id, '"\n        style="--section-accent: ').concat(section.accent, "; --section-accent-soft: ").concat(section.accentSoft, "; --section-surface: ").concat(sectionSurface, ';"\n      >\n        <div class="menu-section__inner">\n          <div class="menu-section__header menu-section__header--centered">\n            <h2>').concat(section.title, '</h2>\n            <div class="menu-section__group-pills" aria-label="Categorie ').concat(section.title, '">\n              ').concat(section.groups.map(
        (group) => '\n                    <a class="menu-section__group-pill" href="#section-'.concat(section.id, "-").concat(group.id, '">\n                      ').concat(group.label, "\n                    </a>\n                  ")
      ).join(""), '\n            </div>\n          </div>\n          <div class="menu-group-stack">\n            ').concat(section.groups.map((group) => {
        const items = section.items.filter((item) => item.group === group.id);
        return '\n                  <section class="menu-group" id="section-'.concat(section.id, "-").concat(group.id, '">\n                    <div class="menu-group__header">\n                      <span class="menu-group__pill">').concat(group.label, '</span>\n                      <p class="menu-group__description').concat(group.description ? "" : " menu-group__description--empty", '">\n                        ').concat(group.description || "&nbsp;", '\n                      </p>\n                    </div>\n                    <div class="menu-section__items">\n                      ').concat(items.map((item) => renderItemCard(item)).join(""), "\n                    </div>\n                  </section>\n                ");
      }).join(""), "\n          </div>\n          ").concat(sectionFooterNote ? '<p class="menu-section__footer-note">'.concat(escapeHtml(sectionFooterNote), "</p>") : "", "\n        </div>\n      </section>\n    ");
    }
    return '\n    <section\n      class="menu-section'.concat(isLeadSection ? " menu-section--lead" : "", '"\n      id="section-').concat(section.id, '"\n      style="--section-accent: ').concat(section.accent, "; --section-accent-soft: ").concat(section.accentSoft, "; --section-surface: ").concat(sectionSurface, ';"\n    >\n      <div class="menu-section__inner">\n        <div class="menu-section__header">\n          <h2>').concat(section.title, '</h2>\n          <span class="menu-section__kicker">').concat(section.kicker, "</span>\n          <p>").concat(section.description, '</p>\n        </div>\n        <div class="menu-section__items">\n          ').concat(section.items.map((item) => renderItemCard(item)).join(""), "\n        </div>\n        ").concat(sectionFooterNote ? '<p class="menu-section__footer-note">'.concat(escapeHtml(sectionFooterNote), "</p>") : "", "\n      </div>\n    </section>\n  ");
  }
  function renderItemCard(item) {
    const isArtisanalBeer = isArtisanalBeerItem(item);
    const isBeer = isBeerItem(item);
    const isDrink = isDrinkItem(item);
    const availabilityState = getItemAvailabilityState(item);
    const isSelectionBlocked = availabilityState !== "available";
    const showsOnlyStatusChip = availabilityState === "coming-soon" || availabilityState === "unavailable";
    const unavailableLabel = getItemUnavailableLabel(item);
    const shouldHideCardVisual = item.hideCardVisual === true;
    const cardStyle = getItemCardStyle(item, availabilityState);
    if (availabilityState === "self-service") {
      return renderSelfServiceItemCard(item, unavailableLabel);
    }
    return '\n    <button\n      class="item-card'.concat(hasSideVisual(item) ? " item-card--with-side-visual" : "").concat(hasFloatingBottle(item) ? " item-card--floating-bottle" : "").concat(isBeer ? " item-card--beer" : "").concat(isArtisanalBeer ? " item-card--artisanal-beer" : "").concat(isDrink ? " item-card--drink" : "").concat(availabilityState === "coming-soon" ? " item-card--coming-soon" : availabilityState === "self-service" ? " item-card--self-service" : isSelectionBlocked ? " item-card--unavailable" : "", '"\n      type="button"\n      data-item-id="').concat(item.id, '"\n      aria-haspopup="dialog"\n      aria-label="').concat(isSelectionBlocked ? "".concat(item.name, " ").concat(unavailableLabel.toLowerCase()) : "Apri dettagli per ".concat(item.name), '"\n      aria-disabled="').concat(isSelectionBlocked ? "true" : "false", '"\n      ').concat(cardStyle ? 'style="'.concat(cardStyle, '"') : "", "\n      ").concat(isSelectionBlocked ? "disabled" : "", "\n    >\n      ").concat(shouldHideCardVisual ? "" : '\n      <div class="item-card__visual'.concat(getCardVisualClass(item), '">\n        ').concat(renderItemVisual(item, "card"), "\n      </div>"), '\n      <div class="item-card__content').concat(hasSideVisual(item) && !hasFloatingBottle(item) ? " item-card__content--with-side-visual" : "", '">\n        <div class="item-card__topline">\n          ').concat(renderItemCategoryMarkup(item), "\n        </div>\n        ").concat(renderItemTitle(item), "\n        <p>").concat(item.description, '</p>\n        <div class="item-card__prices">\n          ').concat(showsOnlyStatusChip ? '<span class="price-chip '.concat(availabilityState === "coming-soon" ? "price-chip--coming-soon" : "price-chip--unavailable", '">').concat(unavailableLabel, "</span>") : "".concat(getCardOptionsToDisplay(item).map(
      (option) => '\n                      <span class="price-chip">'.concat(formatOptionChip(item, option), "</span>\n                    ")
    ).join("")).concat(availabilityState === "self-service" ? '<span class="price-chip price-chip--self-service">'.concat(unavailableLabel, "</span>") : ""), "\n        </div>\n        ").concat(availabilityState === "self-service" && item.serviceNote ? '<p class="item-card__service-note">'.concat(item.serviceNote, "</p>") : "", "\n        ").concat(renderItemSideVisual(item), "\n      </div>\n    </button>\n  ");
  }
  function getItemCardStyle(item, availabilityState) {
    if (availabilityState !== "coming-soon") {
      return "";
    }
    const visual = item && item.visual ? item.visual : null;
    const start = (visual == null ? void 0 : visual.gradientStart) || "#e0a12a";
    const mid = (visual == null ? void 0 : visual.gradientMid) || (visual == null ? void 0 : visual.gradientEnd) || "#d66a2f";
    const end = (visual == null ? void 0 : visual.gradientEnd) || "#b63b4a";
    return [
      "--coming-soon-start: ".concat(start),
      "--coming-soon-mid: ".concat(mid),
      "--coming-soon-end: ".concat(end)
    ].join("; ");
  }
  function renderSelfServiceItemCard(item, unavailableLabel) {
    const [primaryOption] = getCardOptionsToDisplay(item);
    const visualMarkup = renderItemVisual(item, "card");
    const priceMarkup = primaryOption ? '<span class="price-chip item-card__self-service-price">'.concat(formatOptionChip(item, primaryOption), "</span>") : "";
    return '\n    <article\n      class="item-card item-card--self-service item-card--self-service-showcase"\n      aria-label="'.concat(item.name, ", ").concat(unavailableLabel.toLowerCase(), '"\n    >\n      <div class="item-card__visual item-card__visual--photo-panel item-card__visual--self-service-showcase">\n        ').concat(visualMarkup, '\n        <div class="item-card__self-service-badge-wrap">\n          <span class="price-chip price-chip--self-service">').concat(unavailableLabel, '</span>\n        </div>\n      </div>\n      <div class="item-card__self-service-content">\n        <div class="item-card__self-service-header">\n          <h3 class="item-card__self-service-title">').concat(item.name, "</h3>\n          ").concat(priceMarkup, "\n        </div>\n        ").concat(item.serviceNote ? '<p class="item-card__self-service-note">'.concat(item.serviceNote, "</p>") : "", "\n      </div>\n    </article>\n  ");
  }
  function renderItemTitle(item) {
    if (!item || !item.titleLogo || !item.titleLogo.asset) {
      return "<h3>".concat(item.name, "</h3>");
    }
    return '\n    <div class="item-card__title-row item-card__title-row--with-logo">\n      <h3>'.concat(item.name, '</h3>\n      <img\n        class="item-card__title-logo"\n        src="').concat(getTitleLogoImage(item.titleLogo), '"\n        alt=""\n        aria-hidden="true"\n        style="').concat(buildTitleLogoStyle(item.titleLogo), '"\n      />\n    </div>\n  ');
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
  function isSpritzItem(item) {
    var _a2;
    if (!item) {
      return false;
    }
    const visualScript = String(((_a2 = item.visual) == null ? void 0 : _a2.script) || "").trim().toLowerCase();
    return visualScript === "spritz" || /spritz/i.test(String(item.name || ""));
  }
  function isBottleSectionItem(item) {
    return findSectionTitleForItem(item.id).toLowerCase() === "bottiglie";
  }
  function getItemAvailabilityState(item) {
    if (item && typeof item.availabilityState === "string") {
      const normalizedState = parseAvailabilityState(item.availabilityState);
      if (normalizedState) {
        return normalizedState;
      }
    }
    return item && item.available === false ? "unavailable" : "available";
  }
  function getItemUnavailableLabel(item) {
    if (item && typeof item.unavailableLabel === "string") {
      const normalizedLabel = item.unavailableLabel.trim();
      if (normalizedLabel) {
        return normalizedLabel;
      }
    }
    if (getItemAvailabilityState(item) === "coming-soon") {
      return "Novit\xE0 in arrivo";
    }
    if (getItemAvailabilityState(item) === "self-service") {
      return "Al carretto";
    }
    return "Non disponibile";
  }
  function openDetail(itemId) {
    const item = itemLookup[itemId];
    if (!item || !isItemAvailable(item)) {
      return;
    }
    rememberLastFocusedElement();
    state.selectedItemId = itemId;
    initializeDetailState(item);
    applyDetailPanelLayout(item);
    detailPanel.dataset.detailItemId = item.id;
    detailPanel.classList.toggle("sheet-panel--selection-groups", getSelectionGroups(item).length > 0);
    detailPanel.classList.toggle("sheet-panel--long-options", hasLongOptionList(item));
    detailPanel.classList.toggle("sheet-panel--compact-options", shouldUseCompactDetailOptions(item));
    detailPanel.classList.toggle("sheet-panel--can-selector", shouldUseCanSelectorLayout(item));
    detailPanel.classList.toggle("sheet-panel--multi-quantities", shouldUseMultiOptionQuantityDetail(item));
    detailPanel.scrollTop = 0;
    detailCategory.innerHTML = renderDetailCategoryMarkup(item);
    detailTitle.textContent = item.name;
    detailDescription.textContent = getItemDetailDescription(item);
    renderDetailMeta(item);
    refreshDetailPreview(item);
    renderOptions(item);
    renderQuantityControl();
    detailSheet.classList.add("is-open");
    detailSheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    trackDetailModalOpen(item);
    focusElement(closeDetailButton);
  }
  function closeDetail(options = {}) {
    const { restoreFocus = true } = options;
    resetDetailPanelLayout();
    delete detailPanel.dataset.detailItemId;
    detailPanel.classList.remove("sheet-panel--selection-groups");
    detailPanel.classList.remove("sheet-panel--long-options");
    detailPanel.classList.remove("sheet-panel--compact-options");
    detailPanel.classList.remove("sheet-panel--can-selector");
    detailPanel.classList.remove("sheet-panel--multi-quantities");
    trackDetailModalClose();
    detailSheet.classList.remove("is-open");
    detailSheet.setAttribute("aria-hidden", "true");
    syncModalOpenState({ restoreFocus });
  }
  function renderDetailMeta(item) {
    if (!detailMeta) {
      return;
    }
    const tagline = typeof (item == null ? void 0 : item.detailTagline) === "string" ? item.detailTagline.trim() : "";
    const mention = item == null ? void 0 : item.producerMention;
    const resources = Array.isArray(item == null ? void 0 : item.producerResources) ? item.producerResources.filter((resource) => resource && resource.href && resource.label) : [];
    const hasMention = Boolean(mention && mention.handle && mention.href);
    const isTaglineOnly = Boolean(tagline) && !hasMention && resources.length === 0;
    if (!tagline && !hasMention && resources.length === 0) {
      detailMeta.innerHTML = "";
      detailMeta.hidden = true;
      detailMeta.classList.remove("detail-meta--tagline-only");
      return;
    }
    const parts = [];
    if (tagline) {
      parts.push('<p class="detail-tagline">'.concat(escapeHtml(tagline), "</p>"));
    }
    if (hasMention) {
      const normalizedHandle = String(mention.handle).trim().replace(/^@+/, "");
      const safeHandle = escapeHtml(normalizedHandle);
      const safeHref = escapeHtml(mention.href);
      const safeAria = escapeHtml(
        mention.ariaLabel || "Apri il profilo Instagram @".concat(normalizedHandle)
      );
      parts.push('\n      <a\n        class="producer-mention"\n        href="'.concat(safeHref, '"\n        target="_blank"\n        rel="noreferrer noopener"\n        aria-label="').concat(safeAria, '"\n      >\n        <span class="producer-mention__at" aria-hidden="true">@</span>\n        <span class="producer-mention__handle">').concat(safeHandle, "</span>\n      </a>\n    "));
    }
    resources.forEach((resource) => {
      const safeHref = escapeHtml(resource.href);
      const safeLabel = escapeHtml(resource.label);
      const safeAria = escapeHtml(resource.ariaLabel || "Apri ".concat(resource.label));
      const resourceKindClass = resource.kind ? " producer-resource--".concat(escapeHtml(resource.kind)) : "";
      const isVideoResource = resource.kind === "video";
      const icon = resource.kind === "video" ? "\u25B6" : "\u2197";
      parts.push('\n      <a\n        class="producer-resource'.concat(resourceKindClass, '"\n        href="').concat(safeHref, '"\n        target="_blank"\n        rel="noreferrer noopener"\n        aria-label="').concat(safeAria, '"\n      >\n        ').concat(isVideoResource ? '<span class="producer-resource__label">'.concat(safeLabel, '</span><span class="producer-resource__icon" aria-hidden="true">').concat(icon, "</span>") : '<span class="producer-resource__icon" aria-hidden="true">'.concat(icon, '</span><span class="producer-resource__label">').concat(safeLabel, "</span>"), "\n      </a>\n    "));
    });
    detailMeta.innerHTML = parts.join("");
    detailMeta.hidden = false;
    detailMeta.classList.toggle("detail-meta--tagline-only", isTaglineOnly);
  }
  function openCart() {
    rememberLastFocusedElement();
    isCartSummaryView = false;
    renderCart();
    cartSheet.classList.add("is-open");
    cartSheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    trackCartModalOpen();
    focusElement(closeCartButton);
  }
  function closeCart(options = {}) {
    const { restoreFocus = true } = options;
    trackCartModalClose();
    cartSheet.classList.remove("is-open");
    cartSheet.setAttribute("aria-hidden", "true");
    syncModalOpenState({ restoreFocus });
  }
  function addItemToCart(item, option, quantity) {
    if (!item || !option || !Number.isFinite(quantity) || quantity <= 0) {
      return;
    }
    const entryId = buildCartEntryId(item, option);
    const existing = state.cart.find((entry) => entry.entryId === entryId);
    const configurationLabel = buildSelectionSummaryLabel(item, option);
    if (existing) {
      existing.quantity += quantity;
      moveCartEntryToFront(entryId);
      trackAddToCart(item, option, quantity);
      return;
    }
    state.cart.unshift({
      entryId,
      itemId: item.id,
      name: item.name,
      category: item.category,
      optionLabel: configurationLabel,
      price: option.price,
      quantity
    });
    trackAddToCart(item, option, quantity);
  }
  function renderOptions(item) {
    detailOptions.innerHTML = "";
    const selectionGroups = getSelectionGroups(item);
    const shouldShowFormat = item.options.length > 1;
    const usesStepFlow = usesSequentialWineDetailFlow(item);
    const selectionGroupsComplete = hasCompletedSelectionGroups(item);
    if (!selectionGroups.length && !shouldShowFormat) {
      detailOptions.hidden = true;
      return;
    }
    detailOptions.hidden = false;
    selectionGroups.forEach((group, groupIndex) => {
      const selectedIndex = getSelectedSelectionIndex(group);
      const groupLabel = usesStepFlow ? "".concat(groupIndex + 1, ". ").concat(group.label) : group.label;
      const groupNode = createOptionGroup(groupLabel, true);
      if (usesStepFlow) {
        groupNode.wrapper.classList.add("option-group--step");
        groupNode.wrapper.dataset.stepState = hasSelectedSelectionOption(group) ? "complete" : "current";
      }
      group.options.forEach((selectionOption, index) => {
        const optionButton = document.createElement("button");
        const toneClass = getSelectionOptionToneClass(item, group, selectionOption);
        const isSparklingOption = isSparklingWineSelectionOption(item, group, selectionOption);
        const isSelected = selectedIndex >= 0 && index === selectedIndex;
        const isMuted = usesStepFlow && selectedIndex >= 0 && index !== selectedIndex;
        const sparklingMarkup = isSparklingOption ? '\n            <span class="option-btn__sparkling-bubbles" aria-hidden="true">\n              <span class="option-btn__sparkling-bubble option-btn__sparkling-bubble--one"></span>\n              <span class="option-btn__sparkling-bubble option-btn__sparkling-bubble--two"></span>\n              <span class="option-btn__sparkling-bubble option-btn__sparkling-bubble--three"></span>\n              <span class="option-btn__sparkling-bubble option-btn__sparkling-bubble--four"></span>\n              <span class="option-btn__sparkling-bubble option-btn__sparkling-bubble--five"></span>\n            </span>\n          ' : "";
        optionButton.type = "button";
        optionButton.className = "option-btn option-btn--label-only".concat(toneClass ? " ".concat(toneClass) : "").concat(isSparklingOption ? " option-btn--sparkling" : "").concat(isSelected ? " is-selected" : "").concat(isMuted ? " is-muted" : "");
        optionButton.innerHTML = "".concat(sparklingMarkup, '<span class="option-label option-label--solo">').concat(selectionOption.label, "</span>");
        optionButton.addEventListener("click", () => {
          state.selectedSelections[group.id] = index;
          if (!updateDetailPreviewSelectionState(item)) {
            refreshDetailPreview(item);
          }
          renderOptions(item);
          renderQuantityControl();
        });
        groupNode.options.append(optionButton);
      });
      detailOptions.append(groupNode.wrapper);
    });
    if (!shouldShowFormat) {
      return;
    }
    if (shouldUseMultiOptionQuantityDetail(item)) {
      renderMultiOptionQuantityGroup(
        item,
        getMultiOptionQuantityGroupLabel(item, selectionGroups.length > 0)
      );
      updateDetailActionButton(item);
      return;
    }
    const formatGroup = createOptionGroup(
      usesStepFlow ? "".concat(selectionGroups.length + 1, ". Formato") : selectionGroups.length ? "Formato" : "",
      shouldUseCompactDetailOptions(item)
    );
    const formatEnabled = !usesStepFlow || selectionGroupsComplete;
    const hasSelectedFormat = hasSelectedDetailOption(item);
    if ((item == null ? void 0 : item.id) === "oltrepo") {
      formatGroup.wrapper.classList.add("option-group--wine-format", "option-group--step");
      formatGroup.options.classList.add("option-group__options--inline-pair");
      formatGroup.wrapper.dataset.stepState = !formatEnabled ? "pending" : hasSelectedFormat ? "complete" : "current";
    }
    item.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      const displayLabel = getOptionModalLabel(item, option);
      const optionSubtitle = getOptionModalSubtitle(option);
      const toneClass = getOptionToneClass(option);
      const layoutClass = getOptionLayoutClass(option);
      const hidePrice = shouldHideDetailOptionPrices(item);
      const isSelected = hasSelectedFormat && index === state.selectedOptionIndex;
      const isMuted = usesStepFlow && hasSelectedFormat && index !== state.selectedOptionIndex;
      optionButton.type = "button";
      optionButton.className = "option-btn".concat(toneClass ? " ".concat(toneClass) : "").concat(layoutClass ? " ".concat(layoutClass) : "").concat(optionSubtitle ? " option-btn--with-subtitle" : "").concat(hidePrice && displayLabel ? " option-btn--label-only" : "").concat(isSelected ? " is-selected" : "").concat(isMuted ? " is-muted" : "").concat(displayLabel ? "" : " option-btn--price-only");
      if (!formatEnabled) {
        optionButton.disabled = true;
        optionButton.setAttribute("aria-disabled", "true");
      }
      optionButton.innerHTML = displayLabel ? '\n          <span class="option-copy">\n            <span class="option-label">'.concat(displayLabel, "</span>\n            ").concat(optionSubtitle ? '<span class="option-subtitle">'.concat(optionSubtitle, "</span>") : "", "\n          </span>\n          ").concat(hidePrice ? "" : '<span class="option-price">'.concat(formatPrice(option.price), "</span>"), "\n        ") : '\n          <span class="option-price option-price--solo">'.concat(formatPrice(option.price), "</span>\n        ");
      optionButton.addEventListener("click", () => {
        if (!formatEnabled) {
          return;
        }
        state.selectedOptionIndex = index;
        renderOptions(item);
        renderQuantityControl();
      });
      formatGroup.options.append(optionButton);
    });
    detailOptions.append(formatGroup.wrapper);
    updateDetailActionButton(item);
  }
  function renderMultiOptionQuantityGroup(item, label = "") {
    const formatGroup = createOptionGroup(label, shouldUseCompactDetailOptions(item));
    item.options.forEach((option) => {
      const optionCard = document.createElement("article");
      const optionQuantity = getMultiOptionQuantity(item, option);
      const optionSubtitle = getOptionModalSubtitle(option);
      const toneClass = getOptionToneClass(option);
      const layoutClass = getOptionLayoutClass(option);
      const optionLabel = getOptionModalLabel(item, option) || option.label;
      const safeOptionLabel = escapeHtml(optionLabel);
      const illustrationsMarkup = renderOptionIllustrations(option);
      const quantityBadgeMarkup = optionQuantity > 0 ? '\n            <span class="option-qty-badge" aria-label="'.concat(optionQuantity, ' selezionati">\n              ').concat(optionQuantity, "\n            </span>\n          ") : "";
      const removeButtonMarkup = optionQuantity > 0 ? '\n            <button\n              class="qty-btn option-qty-remove"\n              type="button"\n              data-option-qty-action="decrease"\n              aria-label="Riduci '.concat(safeOptionLabel, '"\n            >\n              <span class="option-qty-remove__icon" aria-hidden="true">\u2212</span>\n            </button>\n          ') : "";
      optionCard.className = "option-qty-card".concat(toneClass ? " ".concat(toneClass) : "").concat(layoutClass ? " ".concat(layoutClass.replace("option-btn", "option-qty-card")) : "").concat(illustrationsMarkup ? " option-qty-card--with-illustrations" : "").concat(optionQuantity > 0 ? " is-selected" : "");
      optionCard.setAttribute("role", "button");
      optionCard.setAttribute("tabindex", "0");
      optionCard.setAttribute(
        "aria-label",
        optionQuantity > 0 ? "".concat(optionLabel, ", ").concat(optionQuantity, " selezionati. Tocca per aggiungere ancora o usa il meno per ridurre.") : "Aggiungi ".concat(optionLabel)
      );
      optionCard.innerHTML = "\n      ".concat(illustrationsMarkup, '\n      <div class="option-copy">\n        <span class="option-label">').concat(safeOptionLabel, "</span>\n        ").concat(optionSubtitle ? '<span class="option-subtitle">'.concat(escapeHtml(optionSubtitle), "</span>") : "", "\n      </div>\n      ").concat(quantityBadgeMarkup, "\n      ").concat(removeButtonMarkup, "\n    ");
      optionCard.addEventListener("click", () => {
        updateMultiOptionQuantity(item, option, 1);
      });
      optionCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          updateMultiOptionQuantity(item, option, 1);
        }
      });
      optionCard.querySelectorAll("[data-option-qty-action]").forEach((control) => {
        control.addEventListener("click", (event) => {
          event.stopPropagation();
          updateMultiOptionQuantity(item, option, -1);
        });
      });
      formatGroup.options.append(optionCard);
    });
    detailOptions.append(formatGroup.wrapper);
  }
  function getMultiOptionQuantityGroupLabel(item, hasSelectionGroups = false) {
    if (hasSelectionGroups) {
      return "Formato";
    }
    if ((item == null ? void 0 : item.id) === "grappe-amari") {
      return "Scegli tipologia e quantit\xE0";
    }
    return "Scegli opzione e quantit\xE0";
  }
  function renderDetailSelectionStrip(item) {
    if (!detailSelectionStrip) {
      return;
    }
    detailSelectionStrip.innerHTML = "";
    detailSelectionStrip.hidden = true;
    detailFooter == null ? void 0 : detailFooter.classList.remove("detail-footer--with-selection-strip");
    if (!item || !shouldUseMultiOptionQuantityDetail(item)) {
      return;
    }
    const selectedEntries = getMultiOptionSelectedEntries(item);
    if (!selectedEntries.length) {
      return;
    }
    const totalQuantity = selectedEntries.reduce((sum, entry) => sum + entry.quantity, 0);
    const summaryLabel = getMultiOptionSelectionSummaryLabel(item, totalQuantity);
    const chipsMarkup = selectedEntries.map(({ option, quantity }) => {
      const optionLabel = escapeHtml(getOptionModalLabel(item, option) || option.label || "");
      return '\n        <span class="detail-selection-chip">\n          <span class="detail-selection-chip__label">'.concat(optionLabel, '</span>\n          <span class="detail-selection-chip__qty">').concat(quantity, "\xD7</span>\n        </span>\n      ");
    }).join("");
    detailSelectionStrip.innerHTML = '\n    <p class="detail-selection-strip__summary">Hai selezionato '.concat(escapeHtml(summaryLabel), '</p>\n    <div class="detail-selection-strip__chips">').concat(chipsMarkup, "</div>\n  ");
    detailSelectionStrip.hidden = false;
    detailSelectionStrip.setAttribute("aria-live", "polite");
    detailFooter == null ? void 0 : detailFooter.classList.add("detail-footer--with-selection-strip");
  }
  function getMultiOptionSelectionSummaryLabel(item, totalQuantity) {
    if (!item || totalQuantity <= 0) {
      return "";
    }
    if (item.id === "grappe-amari") {
      return "".concat(totalQuantity, " ").concat(pluralize(totalQuantity, "digestivo", "digestivi"));
    }
    return "".concat(totalQuantity, " ").concat(pluralize(totalQuantity, "selezione", "selezioni"));
  }
  function updateDetailActionButton(item) {
    if (!addToCartButton) {
      return;
    }
    const actionLabel = (item == null ? void 0 : item.id) === "oltrepo" ? "Aggiungi" : "Aggiungi al riepilogo";
    const stepFlowReady = !usesSequentialWineDetailFlow(item) || isSequentialWineDetailReady(item);
    renderDetailSelectionStrip(item);
    if (item && shouldUseMultiOptionQuantityDetail(item)) {
      const totalQuantity = getMultiOptionSelectedTotal(item);
      addToCartButton.textContent = actionLabel;
      addToCartButton.disabled = totalQuantity <= 0;
      addToCartButton.setAttribute("aria-disabled", totalQuantity <= 0 ? "true" : "false");
      return;
    }
    addToCartButton.textContent = actionLabel;
    addToCartButton.hidden = !stepFlowReady;
    addToCartButton.disabled = !stepFlowReady;
    if (stepFlowReady) {
      addToCartButton.removeAttribute("aria-disabled");
    } else {
      addToCartButton.setAttribute("aria-disabled", "true");
    }
  }
  function renderQuantityControl() {
    const item = itemLookup[state.selectedItemId];
    if (item && shouldUseMultiOptionQuantityDetail(item)) {
      detailQuantity.innerHTML = "";
      detailQuantity.hidden = true;
      detailFooter == null ? void 0 : detailFooter.classList.remove("detail-footer--with-quantity");
      updateDetailActionButton(item);
      return;
    }
    if (item && usesSequentialWineDetailFlow(item) && !isSequentialWineDetailReady(item)) {
      detailQuantity.innerHTML = "";
      detailQuantity.hidden = true;
      detailFooter == null ? void 0 : detailFooter.classList.remove("detail-footer--with-quantity");
      updateDetailActionButton(item);
      return;
    }
    detailQuantity.innerHTML = '\n    <div class="detail-quantity__pill" aria-label="Seleziona quantita">\n      <button\n        class="qty-btn detail-quantity__btn"\n        type="button"\n        aria-label="Riduci quantita"\n        '.concat(state.selectedQuantity <= 1 ? "disabled" : "", '\n      >\n        \u2212\n      </button>\n      <span class="detail-quantity__value">').concat(state.selectedQuantity, '</span>\n      <button\n        class="qty-btn detail-quantity__btn"\n        type="button"\n        aria-label="Aumenta quantita"\n      >\n        +\n      </button>\n    </div>\n  ');
    const [decreaseButton, increaseButton] = detailQuantity.querySelectorAll(".detail-quantity__btn");
    if (decreaseButton) {
      decreaseButton.addEventListener("click", () => updateSelectedQuantity(-1));
    }
    if (increaseButton) {
      increaseButton.addEventListener("click", () => updateSelectedQuantity(1));
    }
    detailQuantity.hidden = false;
    detailFooter == null ? void 0 : detailFooter.classList.add("detail-footer--with-quantity");
    if (item) {
      updateDetailActionButton(item);
    }
  }
  function applyDetailPanelLayout(item) {
    const detailLayout = getDetailLayout(item);
    resetDetailPanelLayout();
    detailPanel.classList.add("sheet-panel--detail-".concat(detailLayout));
    detailPanel.classList.toggle("sheet-panel--beer-item", isBeerItem(item));
    detailPanel.dataset.detailLayout = detailLayout;
  }
  function resetDetailPanelLayout() {
    DETAIL_LAYOUT_CLASS_NAMES.forEach((className) => {
      detailPanel.classList.remove(className);
    });
    detailPanel.classList.remove("sheet-panel--beer-item");
    delete detailPanel.dataset.detailLayout;
  }
  function updateSelectedQuantity(delta) {
    state.selectedQuantity = Math.max(1, state.selectedQuantity + delta);
    renderQuantityControl();
  }
  function initializeDetailState(item) {
    const usesStepFlow = usesSequentialWineDetailFlow(item);
    state.selectedOptionIndex = usesStepFlow ? -1 : 0;
    state.selectedOptionQuantities = {};
    state.selectedQuantity = 1;
    state.selectedSelections = {};
    state.detailEditorialSlide = buildDetailEditorialSlide(item);
    getSelectionGroups(item).forEach((group) => {
      state.selectedSelections[group.id] = usesStepFlow ? -1 : 0;
    });
    if (shouldUseMultiOptionQuantityDetail(item)) {
      item.options.forEach((option) => {
        state.selectedOptionQuantities[buildOptionQuantityKey(item, option)] = 0;
      });
    }
  }
  function shouldUseMultiOptionQuantityDetail(item) {
    return Boolean(item && item.detailMultiOptionQuantities === true && Array.isArray(item.options));
  }
  function buildOptionQuantityKey(item, option) {
    return "".concat(item.id, ":").concat(normalizeLabel((option == null ? void 0 : option.label) || ""));
  }
  function getMultiOptionQuantity(item, option) {
    const key = buildOptionQuantityKey(item, option);
    return Number.isFinite(state.selectedOptionQuantities[key]) ? state.selectedOptionQuantities[key] : 0;
  }
  function getMultiOptionSelectedTotal(item) {
    if (!item || !Array.isArray(item.options)) {
      return 0;
    }
    return item.options.reduce((sum, option) => sum + getMultiOptionQuantity(item, option), 0);
  }
  function getMultiOptionSelectedEntries(item) {
    if (!item || !Array.isArray(item.options)) {
      return [];
    }
    return item.options.map((option) => ({
      option,
      quantity: getMultiOptionQuantity(item, option)
    })).filter((entry) => entry.quantity > 0);
  }
  function updateMultiOptionQuantity(item, option, delta) {
    if (!item || !option) {
      return;
    }
    setMultiOptionQuantity(item, option, getMultiOptionQuantity(item, option) + delta);
  }
  function setMultiOptionQuantity(item, option, quantity) {
    if (!item || !option) {
      return;
    }
    const key = buildOptionQuantityKey(item, option);
    const nextQuantity = Math.max(0, quantity);
    state.selectedOptionQuantities[key] = nextQuantity;
    renderOptions(item);
  }
  function refreshDetailPreview(item) {
    if (!detailPreview || !item) {
      return;
    }
    const hasGallery = hasDetailPreviewGallery(item);
    detailPreview.className = "sheet-preview".concat(getDetailPreviewClass(item)).concat(hasGallery ? " sheet-preview--gallery" : " sheet-preview--single").concat(state.detailEditorialSlide ? " sheet-preview--editorial-gallery" : "").concat(hasGallery && (isArtisanalBeerItem(item) || isDrinkItem(item)) ? " sheet-preview--beer-script-framed" : "");
    detailPreview.innerHTML = renderDetailPreview(item);
    setupDetailGallery();
  }
  function updateDetailPreviewSelectionState(item) {
    if (!detailPreview || !item) {
      return false;
    }
    if (updatePhotoPanelSelectionState(item)) {
      return true;
    }
    const canClusterVisual = getPrimaryCanClusterVisual(item);
    if (!canClusterVisual) {
      return false;
    }
    const canNodes = Array.from(
      detailPreview.querySelectorAll(".can-cluster-visual--detail .can-cluster-visual__can")
    );
    if (!canNodes.length) {
      return false;
    }
    const activeCanIndex = getActiveCanClusterIndex(item, canClusterVisual);
    canNodes.forEach((canNode, index) => {
      const canConfig = canClusterVisual.items[index] || {};
      const isSelected = activeCanIndex >= 0 && index === activeCanIndex;
      const canZIndex = getCanClusterItemValue(canConfig, "zIndex", "detail", 1);
      const selectedLift = getCanClusterItemValue(canConfig, "selectedLift", "detail", "4px");
      canNode.classList.toggle("is-selected", isSelected);
      canNode.classList.toggle("is-secondary", activeCanIndex >= 0 && !isSelected);
      canNode.style.setProperty("--can-z", String(isSelected ? Number(canZIndex) + 4 : canZIndex));
      canNode.style.setProperty("--can-extra-lift", isSelected ? selectedLift : "0px");
      canNode.style.setProperty("--can-scale", isSelected ? "1.15" : "0.82");
    });
    return true;
  }
  function updatePhotoPanelSelectionState(item) {
    if (!detailPreview || !item) {
      return false;
    }
    const photoPanelVisual = getPrimaryPhotoPanelSelectionVisual(item);
    if (!photoPanelVisual) {
      return false;
    }
    const photoPanelNode = detailPreview.querySelector(".photo-panel-visual--detail");
    if (!photoPanelNode) {
      return false;
    }
    const selectionImageAsset = getPhotoPanelSelectionAsset(photoPanelVisual, "detail", item);
    const selectionImageUrl = selectionImageAsset ? getVisualAsset(selectionImageAsset) : "";
    const normalizedNextUrl = selectionImageUrl ? new URL(selectionImageUrl, window.location.href).href : "";
    const nextSelectionIndex = getPrimaryPhotoPanelSelectionIndex(item);
    const captionNode = photoPanelNode.querySelector(".photo-panel-visual__caption");
    const swapDuration = 640;
    photoPanelNode.querySelectorAll(".photo-panel-visual__selection-image.is-outgoing").forEach((node) => node.remove());
    const activeImage = photoPanelNode.querySelector(".photo-panel-visual__selection-image.is-current") || photoPanelNode.querySelector(".photo-panel-visual__selection-image");
    if (!normalizedNextUrl) {
      activeImage == null ? void 0 : activeImage.remove();
      photoPanelNode.classList.remove("photo-panel-visual--with-selection-image");
      return true;
    }
    photoPanelNode.classList.add("photo-panel-visual--with-selection-image");
    if (activeImage) {
      const normalizedCurrentUrl = activeImage.currentSrc ? activeImage.currentSrc : new URL(activeImage.getAttribute("src") || "", window.location.href).href;
      if (normalizedCurrentUrl === normalizedNextUrl) {
        activeImage.dataset.selectionIndex = String(nextSelectionIndex);
        return true;
      }
      const previousSelectionIndex = Number.parseInt(activeImage.dataset.selectionIndex || "", 10);
      const direction2 = Number.isInteger(previousSelectionIndex) && previousSelectionIndex !== nextSelectionIndex ? nextSelectionIndex > previousSelectionIndex ? 1 : -1 : 1;
      const swapDistance2 = Math.max(180, Math.min(window.innerWidth * 0.52, 260));
      activeImage.style.setProperty("--photo-panel-selection-swap-offset", "".concat(direction2 * -swapDistance2, "px"));
      activeImage.classList.remove("is-current", "is-incoming");
      activeImage.classList.add("is-outgoing");
    }
    const incomingImage = document.createElement("img");
    incomingImage.className = "photo-panel-visual__selection-image is-incoming";
    incomingImage.src = selectionImageUrl;
    incomingImage.alt = "";
    incomingImage.loading = "eager";
    incomingImage.decoding = "async";
    incomingImage.setAttribute("aria-hidden", "true");
    incomingImage.dataset.selectionIndex = String(nextSelectionIndex);
    const activeSelectionIndex = Number.parseInt((activeImage == null ? void 0 : activeImage.dataset.selectionIndex) || "", 10);
    const direction = Number.isInteger(activeSelectionIndex) && activeSelectionIndex !== nextSelectionIndex ? nextSelectionIndex > activeSelectionIndex ? 1 : -1 : 1;
    const swapDistance = Math.max(180, Math.min(window.innerWidth * 0.52, 260));
    incomingImage.style.setProperty("--photo-panel-selection-swap-offset", "".concat(direction * swapDistance, "px"));
    if (captionNode) {
      photoPanelNode.insertBefore(incomingImage, captionNode);
    } else {
      photoPanelNode.append(incomingImage);
    }
    window.requestAnimationFrame(() => {
      incomingImage.classList.add("is-current");
      incomingImage.classList.remove("is-incoming");
    });
    window.setTimeout(() => {
      activeImage == null ? void 0 : activeImage.remove();
    }, swapDuration);
    return true;
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
  function getPrimaryCanClusterVisual(item) {
    var _a2;
    if (((_a2 = item == null ? void 0 : item.visual) == null ? void 0 : _a2.type) === "can-cluster" && Array.isArray(item.visual.items)) {
      return item.visual;
    }
    if (Array.isArray(item == null ? void 0 : item.detailGallery)) {
      return item.detailGallery.find(
        (visual) => (visual == null ? void 0 : visual.type) === "can-cluster" && Array.isArray(visual.items)
      ) || null;
    }
    return null;
  }
  function getPrimaryPhotoPanelSelectionVisual(item) {
    var _a2;
    if (((_a2 = item == null ? void 0 : item.visual) == null ? void 0 : _a2.type) === "photo-panel" && item.visual.selectionAssets) {
      return item.visual;
    }
    if (Array.isArray(item == null ? void 0 : item.detailGallery)) {
      return item.detailGallery.find((visual) => (visual == null ? void 0 : visual.type) === "photo-panel" && (visual == null ? void 0 : visual.selectionAssets)) || null;
    }
    return null;
  }
  function getPrimaryPhotoPanelSelectionIndex(item) {
    const selectionGroups = getSelectionGroups(item);
    if (!selectionGroups.length) {
      return 0;
    }
    return getSelectedSelectionIndex(selectionGroups[0]);
  }
  function renderCart() {
    cartItems.innerHTML = "";
    cartGenerated.innerHTML = "";
    toggleSummaryViewButton.textContent = generateSummaryLabel;
    const cartQuantity = state.cart.reduce((sum, entry) => sum + entry.quantity, 0);
    updateCartCountDisplay(cartQuantity);
    const hasItems = state.cart.length > 0;
    const showGeneratedSummary = isCartSummaryView && hasItems;
    if (hasItems) {
      state.cart.forEach((entry) => {
        const row = document.createElement("article");
        row.className = "cart-item";
        const metaParts = [entry.optionLabel, "".concat(formatPrice(entry.price), " cad.")].filter(Boolean);
        row.innerHTML = '\n        <div class="cart-item__copy">\n          <strong>'.concat(entry.name, '</strong>\n          <p class="cart-item__meta">').concat(metaParts.join(" \xB7 "), '</p>\n        </div>\n        <div class="cart-item__actions">\n          <div class="cart-item-controls">\n            <button class="qty-btn" type="button" aria-label="Rimuovi una quantit\xE0">\u2212</button>\n            <span class="cart-item__quantity">').concat(entry.quantity, '</span>\n            <button class="qty-btn" type="button" aria-label="Aggiungi una quantit\xE0">+</button>\n          </div>\n          <button class="cart-item__remove" type="button" aria-label="Rimuovi ').concat(entry.name, '">\n            Rimuovi\n          </button>\n        </div>\n      ');
        const [decreaseButton, increaseButton] = row.querySelectorAll(".qty-btn");
        const removeButton = row.querySelector(".cart-item__remove");
        decreaseButton.addEventListener("click", () => updateQuantity(entry.entryId, -1));
        increaseButton.addEventListener("click", () => updateQuantity(entry.entryId, 1));
        removeButton == null ? void 0 : removeButton.addEventListener("click", () => removeCartEntry(entry.entryId));
        cartItems.append(row);
      });
    }
    if (showGeneratedSummary) {
      renderGeneratedCartSummary();
    }
    cartPanel.classList.toggle("is-generated", showGeneratedSummary);
    cartPanel.classList.toggle("is-empty", !hasItems && !showGeneratedSummary);
    cartKicker.hidden = showGeneratedSummary;
    cartKicker.textContent = emptyCartKicker;
    cartTitle.textContent = showGeneratedSummary ? generatedCartTitle : hasItems ? defaultCartTitle : emptyCartTitle;
    cartEmpty.hidden = hasItems;
    cartItems.hidden = !hasItems || showGeneratedSummary;
    cartGenerated.hidden = !showGeneratedSummary;
    cartFooter.hidden = !hasItems || showGeneratedSummary;
    cartTotalBlock.hidden = !hasItems || showGeneratedSummary;
    toggleSummaryViewButton.hidden = !hasItems;
    clearCartButton.hidden = !hasItems || showGeneratedSummary;
    closeCartButton.hidden = showGeneratedSummary;
    toggleSummaryViewButton.textContent = showGeneratedSummary ? editSummaryLabel : generateSummaryLabel;
    toggleSummaryViewButton.classList.toggle("utility-btn--accent", !showGeneratedSummary);
    toggleSummaryViewButton.classList.toggle("utility-btn--secondary", showGeneratedSummary);
    cartTotal.textContent = formatCartBreakdown(state.cart);
  }
  function updateCartCountDisplay(cartQuantity) {
    if (!cartCount) {
      return;
    }
    const nextValue = String(cartQuantity);
    const previousValue = lastRenderedCartQuantity === null ? null : String(lastRenderedCartQuantity);
    const shouldAnimate = previousValue !== null && cartQuantity > lastRenderedCartQuantity;
    cartCount.setAttribute("aria-label", "".concat(cartQuantity, " prodotti nel riepilogo"));
    if (!shouldAnimate || previousValue === nextValue) {
      cartCount.innerHTML = '\n      <span class="cart-fab__count-static" aria-hidden="true">'.concat(nextValue, "</span>\n    ");
      lastRenderedCartQuantity = cartQuantity;
      return;
    }
    cartCount.innerHTML = '\n    <span class="cart-fab__count-sizer" aria-hidden="true">'.concat(getCartCountSizingValue(
      previousValue,
      nextValue
    ), '</span>\n    <span class="cart-fab__count-roller" aria-hidden="true">\n      <span class="cart-fab__count-value cart-fab__count-value--current">').concat(previousValue, '</span>\n      <span class="cart-fab__count-value cart-fab__count-value--next">').concat(nextValue, "</span>\n    </span>\n  ");
    const nextValueNode = cartCount.querySelector(".cart-fab__count-value--next");
    if (nextValueNode) {
      nextValueNode.addEventListener(
        "animationend",
        () => {
          cartCount.innerHTML = '\n          <span class="cart-fab__count-static" aria-hidden="true">'.concat(nextValue, "</span>\n        ");
        },
        { once: true }
      );
    }
    lastRenderedCartQuantity = cartQuantity;
  }
  function getCartCountSizingValue(previousValue, nextValue) {
    if (!previousValue) {
      return nextValue;
    }
    return nextValue.length >= previousValue.length ? nextValue : previousValue;
  }
  function setCartSummaryView(nextValue) {
    if (!state.cart.length) {
      isCartSummaryView = false;
      renderCart();
      return;
    }
    blurActiveElement();
    isCartSummaryView = Boolean(nextValue);
    renderCart();
    trackCartSummaryViewChange(isCartSummaryView);
  }
  function moveCartEntryToFront(entryId) {
    const entryIndex = state.cart.findIndex((entry2) => entry2.entryId === entryId);
    if (entryIndex <= 0) {
      return;
    }
    const [entry] = state.cart.splice(entryIndex, 1);
    if (entry) {
      state.cart.unshift(entry);
    }
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
  function removeCartEntry(entryId) {
    state.cart = state.cart.filter((cartEntry) => cartEntry.entryId !== entryId);
    persistCart();
    renderCart();
  }
  function renderGeneratedCartSummary() {
    var _a2, _b;
    const groupedEntries = groupGeneratedCartEntries(state.cart);
    groupedEntries.forEach((group) => {
      const groupSection = document.createElement("section");
      groupSection.className = "cart-generated-group";
      groupSection.innerHTML = '\n      <p class="cart-generated-group__title">'.concat(group.label, '</p>\n      <div class="cart-generated-group__items"></div>\n    ');
      const itemsContainer = groupSection.querySelector(".cart-generated-group__items");
      group.entries.forEach((entry) => {
        const summaryItem = document.createElement("article");
        summaryItem.className = "cart-generated-item";
        const title = getGeneratedCartEntryTitle(entry);
        const detail = getGeneratedCartEntryDetail(entry);
        summaryItem.innerHTML = '\n        <span class="cart-generated-item__quantity">'.concat(entry.quantity, '\xD7</span>\n        <div class="cart-generated-item__copy">\n          <strong>').concat(title, "</strong>\n          ").concat(detail ? "<p>".concat(detail, "</p>") : "", "\n        </div>\n      ");
        itemsContainer == null ? void 0 : itemsContainer.append(summaryItem);
      });
      cartGenerated.append(groupSection);
    });
    const actions = document.createElement("div");
    actions.className = "cart-generated-actions";
    actions.innerHTML = '\n    <button class="utility-btn utility-btn--secondary" type="button" data-generated-action="edit">\n      '.concat(editSummaryLabel, '\n    </button>\n    <button class="utility-btn utility-btn--accent" type="button" data-generated-action="close">\n      Chiudi\n    </button>\n  ');
    (_a2 = actions.querySelector('[data-generated-action="edit"]')) == null ? void 0 : _a2.addEventListener("click", () => {
      setCartSummaryView(false);
    });
    (_b = actions.querySelector('[data-generated-action="close"]')) == null ? void 0 : _b.addEventListener("click", () => {
      closeCart();
    });
    cartGenerated.append(actions);
  }
  function groupGeneratedCartEntries(entries) {
    const groups = /* @__PURE__ */ new Map();
    entries.forEach((entry) => {
      var _a2;
      const groupInfo = getGeneratedCartGroup(entry);
      if (!groups.has(groupInfo.key)) {
        groups.set(groupInfo.key, __spreadProps(__spreadValues({}, groupInfo), {
          entries: []
        }));
      }
      (_a2 = groups.get(groupInfo.key)) == null ? void 0 : _a2.entries.push(entry);
    });
    return Array.from(groups.values()).sort((left, right) => left.order - right.order).map((group) => __spreadProps(__spreadValues({}, group), {
      entries: [...group.entries].sort(compareGeneratedCartEntries)
    }));
  }
  function compareGeneratedCartEntries(left, right) {
    const leftOrder = getItemMenuOrder(left.itemId);
    const rightOrder = getItemMenuOrder(right.itemId);
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }
    return left.name.localeCompare(right.name, "it");
  }
  function getGeneratedCartGroup(entry) {
    const item = itemLookup[entry.itemId];
    const configuration = getCartEntryConfigurationParts(item, entry.optionLabel);
    if (entry.itemId === "caffe") {
      return { key: "caffe", label: "Caff\xE8", order: 50 };
    }
    if (entry.itemId === "grappe-amari") {
      return { key: "grappe-amari", label: "Digestivi", order: 60 };
    }
    if (item && isBottleSectionItem(item) && configuration.optionLabel) {
      const normalizedOptionLabel = normalizeLabel(configuration.optionLabel);
      if (normalizedOptionLabel === "calice") {
        return { key: "drink", label: "Drink", order: 20 };
      }
    }
    const sectionTitle = normalizeLabel(findSectionTitleForItem(entry.itemId));
    const groupMap = {
      birre: { key: "birre", label: "Birre", order: 10 },
      drink: { key: "drink", label: "Drink", order: 20 },
      bottiglie: { key: "bottiglie", label: "Bottiglie", order: 30 },
      "altre bevande": { key: "altre-bevande", label: "Altre bevande", order: 40 },
      taglieri: { key: "taglieri", label: "Taglieri", order: 90 }
    };
    return groupMap[sectionTitle] || { key: "altri", label: "Altri prodotti", order: 100 };
  }
  function getItemMenuOrder(itemId) {
    return Number.isFinite(itemMenuOrderLookup[itemId]) ? itemMenuOrderLookup[itemId] : Number.MAX_SAFE_INTEGER;
  }
  function getGeneratedCartEntryDetail(entry) {
    const item = itemLookup[entry.itemId];
    if (!item || !entry.optionLabel) {
      return "";
    }
    if (entry.itemId === "caffe") {
      return "";
    }
    if (entry.itemId === "grappe-amari") {
      return getDigestifEntrySubtitle(item, entry.optionLabel);
    }
    const configuration = getCartEntryConfigurationParts(item, entry.optionLabel);
    if (item && isBottleSectionItem(item) && normalizeLabel(configuration.optionLabel) === "calice") {
      return "";
    }
    const hasMeaningfulOptions = item.options.length > 1 || getSelectionGroups(item).length > 0;
    if (!hasMeaningfulOptions) {
      return "";
    }
    if (configuration.selectionLabels.length > 0) {
      return [item.name, configuration.optionLabel].filter(Boolean).join(", ");
    }
    return entry.optionLabel;
  }
  function getGeneratedCartEntryTitle(entry) {
    const item = itemLookup[entry.itemId];
    if (!item) {
      return entry.name;
    }
    if (entry.itemId === "caffe" && entry.optionLabel) {
      return "Caff\xE8 ".concat(entry.optionLabel);
    }
    if (entry.itemId === "grappe-amari" && entry.optionLabel) {
      return entry.optionLabel;
    }
    const configuration = getCartEntryConfigurationParts(item, entry.optionLabel);
    if (item && isBottleSectionItem(item) && normalizeLabel(configuration.optionLabel) === "calice") {
      const glassSubject = configuration.selectionLabels.length > 0 ? configuration.selectionLabels.join(" \xB7 ") : item.name;
      return "Calice di ".concat(glassSubject);
    }
    if (configuration.selectionLabels.length > 0) {
      return configuration.selectionLabels.join(" \xB7 ");
    }
    return entry.name;
  }
  function getDigestifEntrySubtitle(item, optionLabel) {
    const option = findItemOptionByLabel(item, optionLabel);
    return (option == null ? void 0 : option.subtitle) || "";
  }
  function getCartEntryConfigurationParts(item, optionLabel) {
    if (!item || !optionLabel) {
      return { selectionLabels: [], optionLabel: "" };
    }
    const parts = String(optionLabel).split("\xB7").map((part) => part.trim()).filter(Boolean);
    if (!parts.length) {
      return { selectionLabels: [], optionLabel: "" };
    }
    const optionLabels = new Set(
      Array.isArray(item.options) ? item.options.map((option) => normalizeLabel((option == null ? void 0 : option.label) || "")).filter(Boolean) : []
    );
    const lastPart = parts[parts.length - 1];
    if (optionLabels.has(normalizeLabel(lastPart))) {
      return {
        selectionLabels: parts.slice(0, -1),
        optionLabel: lastPart
      };
    }
    return {
      selectionLabels: parts,
      optionLabel: ""
    };
  }
  function findItemOptionByLabel(item, optionLabel) {
    if (!item || !Array.isArray(item.options) || !optionLabel) {
      return null;
    }
    const normalizedTarget = normalizeLabel(optionLabel);
    return item.options.find((option) => normalizeLabel((option == null ? void 0 : option.label) || "") === normalizedTarget) || null;
  }
  function formatCartBreakdown(entries) {
    const breakdown = entries.reduce(
      (totals, entry) => {
        const bucket = getCartSummaryBucket(entry);
        if (bucket === "bevande") {
          totals.bevande += entry.quantity;
        } else if (bucket === "bottiglie") {
          totals.bottiglie += entry.quantity;
        } else if (bucket === "caffe") {
          totals.caffe += entry.quantity;
        } else if (bucket === "digestivi") {
          totals.digestivi += entry.quantity;
        } else if (bucket === "taglieri") {
          totals.taglieri += entry.quantity;
        } else if (bucket === "ignored") {
          totals.ignored += entry.quantity;
        } else {
          totals.other += entry.quantity;
        }
        return totals;
      },
      { bevande: 0, bottiglie: 0, caffe: 0, digestivi: 0, taglieri: 0, ignored: 0, other: 0 }
    );
    const parts = [];
    if (breakdown.bevande > 0) {
      parts.push("".concat(breakdown.bevande, " ").concat(pluralize(breakdown.bevande, "bevanda", "bevande")));
    }
    if (breakdown.bottiglie > 0) {
      parts.push("".concat(breakdown.bottiglie, " ").concat(pluralize(breakdown.bottiglie, "bottiglia", "bottiglie")));
    }
    if (breakdown.caffe > 0) {
      parts.push("".concat(breakdown.caffe, " caff\xE8"));
    }
    if (breakdown.digestivi > 0) {
      parts.push("".concat(breakdown.digestivi, " ").concat(pluralize(breakdown.digestivi, "digestivo", "digestivi")));
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
    if (entry.itemId === "caffe") {
      return "caffe";
    }
    if (entry.itemId === "grappe-amari") {
      return "digestivi";
    }
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
  function shouldShowRoseLimitedGlint(item) {
    return (item == null ? void 0 : item.id) === "rose-n5";
  }
  function renderRoseLimitedGlintMarkup() {
    return '\n    <span class="limited-glint" aria-hidden="true">\n      <svg class="limited-glint__spark limited-glint__spark--primary" viewBox="0 0 12 12" focusable="false">\n        <path d="M6 0.8 7.35 4.65 11.2 6 7.35 7.35 6 11.2 4.65 7.35 0.8 6 4.65 4.65Z" />\n      </svg>\n      <svg class="limited-glint__spark limited-glint__spark--soft" viewBox="0 0 12 12" focusable="false">\n        <path d="M6 1.5 7 5 10.5 6 7 7 6 10.5 5 7 1.5 6 5 5Z" />\n      </svg>\n    </span>\n  ';
  }
  function renderItemCategoryMarkup(item) {
    const categoryLabel = getItemCategoryLabel(item).trim();
    if (!categoryLabel) {
      return "";
    }
    const sparkleMarkup = shouldShowRoseLimitedGlint(item) ? renderRoseLimitedGlintMarkup() : "";
    return '\n    <span class="item-card__label'.concat(sparkleMarkup ? " item-card__label--rose-glint" : "", '">\n      ').concat(escapeHtml(categoryLabel), "\n      ").concat(sparkleMarkup, "\n    </span>\n  ");
  }
  function renderDetailCategoryMarkup(item) {
    const sectionTitle = findSectionTitleForItem(item.id).trim();
    const categoryLabel = getItemCategoryLabel(item).trim();
    const safeSection = escapeHtml(sectionTitle);
    const sparkleMarkup = shouldShowRoseLimitedGlint(item) ? renderRoseLimitedGlintMarkup() : "";
    const categoryMarkup = categoryLabel ? '\n        <span class="sheet-kicker__category'.concat(sparkleMarkup ? " sheet-kicker__category--rose-glint" : "", '">\n          ').concat(escapeHtml(categoryLabel), "\n          ").concat(sparkleMarkup, "\n        </span>\n      ") : "";
    if (sectionTitle && categoryLabel) {
      const normalizedSection = normalizeLabel(sectionTitle);
      const normalizedCategory = normalizeLabel(categoryLabel);
      if (normalizedSection === normalizedCategory) {
        return '<span class="sheet-kicker__section">'.concat(safeSection, "</span>");
      }
      if (normalizedCategory.includes(normalizedSection)) {
        return categoryMarkup;
      }
      if (normalizedSection.includes(normalizedCategory)) {
        return '<span class="sheet-kicker__section">'.concat(safeSection, "</span>");
      }
      return '\n      <span class="sheet-kicker__section">'.concat(safeSection, ",</span>\n      ").concat(categoryMarkup, "\n    ");
    }
    if (categoryMarkup) {
      return categoryMarkup;
    }
    return safeSection ? '<span class="sheet-kicker__section">'.concat(safeSection, "</span>") : "";
  }
  function normalizeLabel(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      document.activeElement.blur();
    }
  }
  function rememberLastFocusedElement(force = false) {
    if (!force && hasOpenModal()) {
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
  function hasOpenModal() {
    return detailSheet.classList.contains("is-open") || cartSheet.classList.contains("is-open");
  }
  function syncModalOpenState(options = {}) {
    const { restoreFocus = true } = options;
    if (hasOpenModal()) {
      document.body.classList.add("modal-open");
      return;
    }
    document.body.classList.remove("modal-open");
    if (restoreFocus) {
      restoreLastFocusedElement();
    }
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
  function rgbaFromHex(color, alpha) {
    const rgb = hexToRgb(color);
    if (!rgb) {
      return "rgba(255, 176, 120, ".concat(alpha, ")");
    }
    return "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(alpha, ")");
  }
  function formatPrice(value) {
    return priceFormatter.format(value);
  }
  function getSelectionGroups(item) {
    return Array.isArray(item.selectionGroups) ? item.selectionGroups : [];
  }
  function getSelectedOption(item) {
    if (!item || !Array.isArray(item.options)) {
      return null;
    }
    const selectedOption = item.options[state.selectedOptionIndex];
    return selectedOption || null;
  }
  function getSelectedSelectionIndex(group) {
    const selectedIndex = state.selectedSelections[group.id];
    return Number.isInteger(selectedIndex) ? selectedIndex : -1;
  }
  function usesSequentialWineDetailFlow(item) {
    return Boolean(item && item.id === "oltrepo");
  }
  function hasSelectedSelectionOption(group) {
    if (!group || !Array.isArray(group.options) || !group.options.length) {
      return false;
    }
    const selectedIndex = getSelectedSelectionIndex(group);
    return selectedIndex >= 0 && selectedIndex < group.options.length;
  }
  function hasCompletedSelectionGroups(item) {
    const selectionGroups = getSelectionGroups(item);
    if (!selectionGroups.length) {
      return true;
    }
    return selectionGroups.every((group) => hasSelectedSelectionOption(group));
  }
  function hasSelectedDetailOption(item) {
    return Boolean(item && Array.isArray(item.options) && item.options[state.selectedOptionIndex]);
  }
  function isSequentialWineDetailReady(item) {
    return hasCompletedSelectionGroups(item) && hasSelectedDetailOption(item);
  }
  function getSelectionOptionToneClass(item, group, selectionOption) {
    if (!item || item.id !== "oltrepo" || !group || group.id !== "wine-style" || !selectionOption) {
      return "";
    }
    const normalizedLabel = normalizeLabel(selectionOption.label || "");
    if (normalizedLabel === "bonarda" || normalizedLabel === "barbera" || normalizedLabel === "segrete") {
      return "option-btn--wine-red";
    }
    if (normalizedLabel === "chardonnay" || normalizedLabel === "pinot grigio" || normalizedLabel === "pinot-grigio") {
      return "option-btn--wine-white";
    }
    return "";
  }
  function isSparklingWineSelectionOption(item, group, selectionOption) {
    if (!item || item.id !== "oltrepo" || !group || group.id !== "wine-style" || !selectionOption) {
      return false;
    }
    const normalizedLabel = normalizeLabel(selectionOption.label || "");
    return normalizedLabel === "bonarda" || normalizedLabel === "chardonnay";
  }
  function getSelectedSelectionLabels(item) {
    return getSelectionGroups(item).map((group) => {
      var _a2;
      const selectedIndex = getSelectedSelectionIndex(group);
      return selectedIndex >= 0 ? ((_a2 = group.options[selectedIndex]) == null ? void 0 : _a2.label) || "" : "";
    }).filter(Boolean);
  }
  function getItemDetailDescription(item) {
    if (!item) {
      return "";
    }
    if (typeof item.detailDescription === "string" && item.detailDescription.trim()) {
      return item.detailDescription.trim();
    }
    return item.description || "";
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
  function getOptionModalLabel(item, option) {
    if (option.displayLabel != null) {
      const normalizedDisplayLabel = String(option.displayLabel).trim();
      if (normalizedDisplayLabel) {
        return normalizedDisplayLabel;
      }
    }
    if (item && isBottleSectionItem(item) && item.options.length === 1) {
      return "";
    }
    return option.label;
  }
  function getOptionModalSubtitle(option) {
    if (!option || option.subtitle == null) {
      return "";
    }
    return String(option.subtitle).trim();
  }
  function getOptionIllustrations(option) {
    if (!option || !Array.isArray(option.illustrations)) {
      return [];
    }
    return option.illustrations.filter(
      (illustration) => illustration && typeof illustration.asset === "string" && illustration.asset.trim()
    );
  }
  function buildOptionIllustrationStyle(illustration) {
    if (!illustration || typeof illustration !== "object") {
      return "";
    }
    const styles = [];
    const mappings = [
      ["top", "--option-illustration-top"],
      ["right", "--option-illustration-right"],
      ["bottom", "--option-illustration-bottom"],
      ["left", "--option-illustration-left"],
      ["width", "--option-illustration-width"],
      ["height", "--option-illustration-height"],
      ["rotate", "--option-illustration-rotate"],
      ["opacity", "--option-illustration-opacity"]
    ];
    mappings.forEach(([key, cssVar]) => {
      const value = illustration[key];
      if (value !== void 0 && value !== null && value !== "") {
        styles.push("".concat(cssVar, ": ").concat(value));
      }
    });
    return styles.join("; ");
  }
  function renderOptionIllustrations(option) {
    const illustrations = getOptionIllustrations(option);
    if (!illustrations.length) {
      return "";
    }
    const illustrationsMarkup = illustrations.map((illustration, index) => {
      const style = buildOptionIllustrationStyle(illustration);
      return '\n        <img\n          class="option-qty-card__illustration option-qty-card__illustration--'.concat(index + 1, '"\n          src="').concat(getVisualAsset(illustration.asset), '"\n          alt=""\n          aria-hidden="true"\n          loading="lazy"\n          decoding="async"\n          ').concat(style ? 'style="'.concat(style, '"') : "", "\n        />\n      ");
    }).join("");
    return '\n    <div class="option-qty-card__illustrations" aria-hidden="true">\n      '.concat(illustrationsMarkup, "\n    </div>\n  ");
  }
  function getOptionToneClass(option) {
    if (!option || typeof option.tone !== "string") {
      return "";
    }
    const normalizedTone = normalizeLabel(option.tone).replace(/\s+/g, "-");
    return normalizedTone ? "option-btn--".concat(normalizedTone) : "";
  }
  function getOptionLayoutClass(option) {
    if (!option || typeof option.layout !== "string") {
      return "";
    }
    const normalizedLayout = normalizeLabel(option.layout).replace(/\s+/g, "-");
    return normalizedLayout ? "option-btn--".concat(normalizedLayout) : "";
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
  function shouldUseCompactDetailOptions(item) {
    return Boolean(item && item.compactDetailOptions === true);
  }
  function shouldHideDetailOptionPrices(item) {
    return Boolean(item && item.hideOptionPricesInDetail === true);
  }
  function shouldUseCanSelectorLayout(item) {
    var _a2, _b;
    return Boolean(
      item && ((_a2 = item.visual) == null ? void 0 : _a2.type) === "can-cluster" && getSelectionGroups(item).length === 1 && Array.isArray((_b = item.visual) == null ? void 0 : _b.items) && item.visual.items.length > 1
    );
  }
  function getDetailLayout(item) {
    if (!item) {
      return "showcase";
    }
    const explicitLayout = normalizeLabel(item.detailLayout || "");
    if (explicitLayout === "editorial" || explicitLayout === "selector" || explicitLayout === "showcase" || explicitLayout === "rapid") {
      return explicitLayout;
    }
    if (DETAIL_LAYOUT_EDITORIAL_IDS.has(item.id)) {
      return "editorial";
    }
    if (DETAIL_LAYOUT_SELECTOR_IDS.has(item.id)) {
      return "selector";
    }
    if (DETAIL_LAYOUT_RAPID_IDS.has(item.id)) {
      return "rapid";
    }
    return "showcase";
  }
  function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  }
  function isItemAvailable(item) {
    return getItemAvailabilityState(item) === "available";
  }
  function formatOptionChip(item, option) {
    const displayLabel = getOptionDisplayLabel(item, option);
    return displayLabel ? "".concat(displayLabel, " \xB7 ").concat(formatPrice(option.price)) : formatPrice(option.price);
  }
  function hasDetailGallery(item) {
    return item && Array.isArray(item.detailGallery) && item.detailGallery.length > 1;
  }
  function hasDetailPreviewGallery(item) {
    return getDetailPreviewSlides(item).length > 1;
  }
  function setupDetailGallery() {
    const track = detailPreview.querySelector("[data-detail-gallery-track]");
    if (!track) {
      return;
    }
    const slides = Array.from(track.querySelectorAll("[data-gallery-slide]"));
    const dots = Array.from(detailPreview.querySelectorAll("[data-gallery-dot]"));
    const updateActiveDot = () => {
      const activeIndex = slides.reduce(
        (closestIndex, slide, index) => {
          const currentDistance = Math.abs(track.scrollLeft - slide.offsetLeft);
          const closestDistance = Math.abs(track.scrollLeft - slides[closestIndex].offsetLeft);
          return currentDistance < closestDistance ? index : closestIndex;
        },
        0
      );
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
    const visualType = getVisualType(item, "card");
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
    const visualType = getVisualType(item, "detail");
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
    const visual = getContextualVisual(item, context);
    const visualType = getVisualType(item, context);
    if (visualType === "none") {
      return "";
    }
    if (visualType === "placeholder-panel") {
      return renderPlaceholderPanelVisual(context);
    }
    if (visualType === "beer-script") {
      return renderBeerScriptVisual(visual, context);
    }
    if (visualType === "photo-panel") {
      return renderPhotoPanelVisual(visual, context, item);
    }
    if (visualType === "can-cluster") {
      return renderCanClusterVisual(visual, context, item);
    }
    if (visualType === "text-panel") {
      return renderTextPanelVisual(visual, context);
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
  function buildDetailEditorialSlide(item) {
    if (!isSpritzItem(item)) {
      return null;
    }
    const selectedFact = selectSpritzEditorialFact();
    if (!selectedFact) {
      return null;
    }
    const visual = item.visual || {};
    const gradientStart = visual.gradientStart || "#ff7f43";
    const gradientMid = visual.gradientMid || visual.gradientEnd || gradientStart;
    const gradientEnd = visual.gradientEnd || "#ffd8bf";
    const lengthClass = selectedFact.text.length > 165 ? "compact" : selectedFact.text.length > 115 ? "balanced" : "airy";
    return {
      type: "editorial-quote",
      text: selectedFact.text,
      tone: selectedFact.category,
      lengthClass,
      ornaments: selectSpritzEditorialOrnaments(selectedFact.category),
      startColor: mixHexColors(gradientStart, "#fff7f1", 0.28),
      midColor: mixHexColors(gradientMid, "#fff2ea", 0.4),
      endColor: mixHexColors(gradientEnd, "#fffdf9", 0.18),
      glowColor: rgbaFromHex(gradientMid, selectedFact.category === "nerd" ? 0.16 : 0.24),
      frameColor: rgbaFromHex(gradientStart, 0.14)
    };
  }
  function selectSpritzEditorialFact() {
    if (!SPRITZ_EDITORIAL_FACTS.length) {
      return null;
    }
    const entries = SPRITZ_EDITORIAL_FACTS.map((fact, index) => __spreadProps(__spreadValues({}, fact), {
      index
    }));
    const availableEntries = entries.length > 1 ? entries.filter((entry) => entry.index !== lastSpritzEditorialFactIndex) : entries;
    const selectedEntry = selectWeightedEntry(availableEntries);
    if (!selectedEntry) {
      return null;
    }
    lastSpritzEditorialFactIndex = selectedEntry.index;
    return selectedEntry;
  }
  function selectWeightedEntry(entries) {
    const totalWeight = entries.reduce((sum, entry) => sum + Math.max(0, Number(entry.weight) || 0), 0);
    if (!entries.length || totalWeight <= 0) {
      return entries[0] || null;
    }
    let threshold = Math.random() * totalWeight;
    for (const entry of entries) {
      threshold -= Math.max(0, Number(entry.weight) || 0);
      if (threshold <= 0) {
        return entry;
      }
    }
    return entries[entries.length - 1] || null;
  }
  function selectSpritzEditorialOrnaments(category) {
    const config = SPRITZ_EDITORIAL_ORNAMENTS[category] || SPRITZ_EDITORIAL_ORNAMENTS.pop;
    const stemPool = [...new Set((config == null ? void 0 : config.stem) || [])];
    const playfulPool = [...new Set((config == null ? void 0 : config.playful) || [])];
    if (!stemPool.length || !playfulPool.length) {
      return [];
    }
    const combinations = buildSpritzOrnamentCombinations(stemPool, playfulPool);
    const availableCombinations = combinations.length > 1 ? combinations.filter((combination) => combination.join("|") !== lastSpritzEditorialOrnamentKey) : combinations;
    const selectedCombination = availableCombinations[Math.floor(Math.random() * availableCombinations.length)] || combinations[0] || [];
    lastSpritzEditorialOrnamentKey = selectedCombination.join("|");
    return selectedCombination;
  }
  function buildSpritzOrnamentCombinations(stemPool, playfulPool) {
    const combinations = [];
    for (const stem of stemPool) {
      for (const playful of playfulPool) {
        combinations.push([stem, playful]);
      }
    }
    return combinations;
  }
  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function formatSpritzEditorialText(text) {
    const sentences = splitSpritzEditorialSentences(text);
    const emphasizedSources = [
      "California Institute of Aperitivo Sciences",
      "California Institute of Aperitivo Studies",
      "Laboratory of Outdoor Consumption"
    ];
    return sentences.map((sentence, index) => {
      let content = escapeHtml(sentence);
      emphasizedSources.forEach((source) => {
        const escapedSource = escapeHtml(source);
        content = content.replaceAll(
          escapedSource,
          '<em class="detail-editorial-visual__source">'.concat(escapedSource, "</em>")
        );
      });
      if (index === 0) {
        content = '<span class="detail-editorial-visual__mark detail-editorial-visual__mark--open" aria-hidden="true">\u201C</span>'.concat(content);
      }
      if (index === sentences.length - 1) {
        content = "".concat(content, '<span class="detail-editorial-visual__mark detail-editorial-visual__mark--close" aria-hidden="true">\u201D</span>');
      }
      return '<span class="detail-editorial-visual__sentence">'.concat(content, "</span>");
    }).join("");
  }
  function splitSpritzEditorialSentences(text) {
    const normalized = String(text || "").trim();
    if (!normalized) {
      return [];
    }
    const sentences = normalized.split(new RegExp("(?<=[.!?\u2026])\\s+(?=[A-Z\xC0-\xD6\xD8-\xDE])", "u")).map((sentence) => sentence.trim()).filter(Boolean);
    return sentences.length ? sentences : [normalized];
  }
  function renderDetailPreview(item) {
    const slides = getDetailPreviewSlides(item);
    if (slides.length <= 1) {
      const [singleSlide] = slides;
      return singleSlide ? renderVisualByType(singleSlide, "detail", item) : renderItemVisual(item, "detail");
    }
    const slideMarkup = slides.map(
      (slide, index) => '\n        <div\n          class="detail-gallery__slide'.concat(slide.type === "editorial-quote" ? " detail-gallery__slide--editorial" : "", '"\n          data-gallery-slide="').concat(index, '"\n        >\n          ').concat(renderVisualByType(slide, "detail", item), "\n        </div>\n      ")
    ).join("");
    const dots = slides.map(
      (slide, index) => '\n        <button\n          class="detail-gallery__dot'.concat(index === 0 ? " is-active" : "", '"\n          type="button"\n          aria-label="').concat(getDetailPreviewDotLabel(slide, index), '"\n          data-gallery-dot="').concat(index, '"\n        ></button>\n      ')
    ).join("");
    return '\n    <div class="detail-gallery">\n      <div class="detail-gallery__track" data-detail-gallery-track>\n        '.concat(slideMarkup, '\n      </div>\n      <div class="detail-gallery__dots" aria-label="Pi\xF9 immagini disponibili">\n        ').concat(dots, "\n      </div>\n    </div>\n  ");
  }
  function renderVisualByType(visual, context, item = null) {
    if (!visual || !visual.type) {
      return renderPlaceholderPanelVisual(context);
    }
    if (visual.type === "beer-script") {
      return renderBeerScriptVisual(visual, context);
    }
    if (visual.type === "photo-panel") {
      return renderPhotoPanelVisual(visual, context, item);
    }
    if (visual.type === "can-cluster") {
      return renderCanClusterVisual(visual, context, item);
    }
    if (visual.type === "text-panel") {
      return renderTextPanelVisual(visual, context);
    }
    if (visual.type === "tasting-notes") {
      return renderTastingNotesVisual(visual, context);
    }
    if (visual.type === "editorial-quote") {
      return renderEditorialQuoteVisual(visual, context);
    }
    return renderPlaceholderPanelVisual(context);
  }
  function getDetailPreviewSlides(item) {
    const baseSlides = hasDetailGallery(item) ? item.detailGallery.filter(Boolean) : item.visual ? [item.visual] : [];
    const orderedBaseSlides = reorderDetailPreviewSlides(baseSlides, item == null ? void 0 : item.detailPreviewStartIndex);
    const editorialSlide = item.id === state.selectedItemId ? state.detailEditorialSlide : null;
    return editorialSlide ? [...orderedBaseSlides, editorialSlide] : orderedBaseSlides;
  }
  function reorderDetailPreviewSlides(slides, startIndex) {
    if (!Array.isArray(slides) || slides.length <= 1) {
      return Array.isArray(slides) ? [...slides] : [];
    }
    const normalizedIndex = Number.parseInt(startIndex, 10);
    if (!Number.isInteger(normalizedIndex) || normalizedIndex <= 0 || normalizedIndex >= slides.length) {
      return [...slides];
    }
    return [...slides.slice(normalizedIndex), ...slides.slice(0, normalizedIndex)];
  }
  function getDetailPreviewDotLabel(slide, index) {
    var _a2;
    if ((slide == null ? void 0 : slide.type) === "editorial-quote") {
      return "Vai alla curiosit\xE0 sullo Spritz";
    }
    if ((slide == null ? void 0 : slide.type) === "tasting-notes") {
      const firstNoteTitle = Array.isArray(slide.notes) ? String(((_a2 = slide.notes[0]) == null ? void 0 : _a2.title) || "").trim() : "";
      const heading = String(slide.heading || "").trim();
      const label = firstNoteTitle || heading;
      if (label) {
        return "Vai a ".concat(label);
      }
    }
    return "Vai all'immagine ".concat(index + 1);
  }
  function renderBeerScriptVisual(visual, context) {
    const classes = ["beer-script-visual"];
    if (context === "detail") {
      classes.push("beer-script-visual--detail");
    }
    if (visual.textStyle === "display") {
      classes.push("beer-script-visual--display");
    }
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="\n        --beer-script-start: ').concat(visual.gradientStart || "#f0ede8", ";\n        --beer-script-mid: ").concat(visual.gradientMid || visual.gradientEnd || "#f8f5f0", ";\n        --beer-script-end: ").concat(visual.gradientEnd || "#f8f5f0", ";\n        --beer-script-color: ").concat(visual.labelColor || "rgba(56, 39, 24, 0.9)", ";\n        --beer-script-radius: ").concat(visual.radius || "34px", ";\n        --beer-script-width: ").concat(visual.width || "100%", ";\n        --beer-script-max-width: ").concat(visual.maxWidth || "none", ";\n        --beer-script-min-height: ").concat(visual.minHeight || "82px", ";\n        --beer-script-label-font: ").concat(visual.labelFontFamily || "var(--font-display)", ";\n        --beer-script-label-size: ").concat(visual.labelFontSize || "clamp(1.85rem, 7vw, 2.7rem)", ";\n        --beer-script-label-line-height: ").concat(visual.labelLineHeight || "0.88", ";\n        --beer-script-label-letter-spacing: ").concat(visual.labelLetterSpacing || "-0.14em", ";\n        --beer-script-label-order: ").concat(visual.labelOrder || "0", ";\n        --beer-script-script-font: ").concat(visual.scriptFontFamily || "var(--font-subtitle)", ";\n        --beer-script-script-size: ").concat(visual.scriptFontSize || "clamp(2.05rem, 7.7vw, 3rem)", ";\n        --beer-script-script-line-height: ").concat(visual.scriptLineHeight || "0.88", ";\n        --beer-script-script-letter-spacing: ").concat(visual.scriptLetterSpacing || "0", ";\n        --beer-script-script-transform: ").concat(visual.scriptTransform || "translate(0.08em, 0.05em)", ";\n        --beer-script-script-order: ").concat(visual.scriptOrder || "1", ';\n      "\n    >\n      ').concat(visual.script ? '<span class="beer-script-visual__script">'.concat(visual.script, "</span>") : "", '\n      <span class="beer-script-visual__label">').concat(visual.label, "</span>\n    </div>\n  ");
  }
  function renderEditorialQuoteVisual(visual, context) {
    const classes = [
      "detail-editorial-visual",
      "detail-editorial-visual--".concat(visual.lengthClass || "airy")
    ];
    if (context === "detail") {
      classes.push("detail-editorial-visual--detail");
    }
    if (visual.tone) {
      classes.push("detail-editorial-visual--".concat(visual.tone));
    }
    const ornaments = Array.isArray(visual.ornaments) ? visual.ornaments.slice(0, 2) : [];
    const ornamentsMarkup = ornaments.map(
      (ornament, index) => '\n        <span\n          class="detail-editorial-visual__ornament detail-editorial-visual__ornament--'.concat(index === 0 ? "one" : "two", '"\n          aria-hidden="true"\n        >').concat(ornament, "</span>\n      ")
    ).join("");
    const quoteMarkup = formatSpritzEditorialText(visual.text);
    return '\n    <section\n      class="'.concat(classes.join(" "), '"\n      style="\n        --detail-editorial-start: ').concat(visual.startColor, ";\n        --detail-editorial-mid: ").concat(visual.midColor, ";\n        --detail-editorial-end: ").concat(visual.endColor, ";\n        --detail-editorial-glow: ").concat(visual.glowColor, ";\n        --detail-editorial-frame: ").concat(visual.frameColor, ';\n      "\n      aria-label="Curiosit\xE0 sullo Spritz"\n    >\n      ').concat(ornamentsMarkup, '\n      <div class="detail-editorial-visual__inner">\n        <p class="detail-editorial-visual__quote">').concat(quoteMarkup, "</p>\n      </div>\n    </section>\n  ");
  }
  function renderPhotoPanelVisual(visual, context, item) {
    const classes = ["photo-panel-visual"];
    if (context === "detail") {
      classes.push("photo-panel-visual--detail");
    }
    const imageUrl = visual.asset ? getVisualAsset(visual.asset) : "";
    const shouldDeferImage = Boolean(imageUrl) && context !== "detail" && item && (isBottleSectionItem(item) || visual.deferAsset === true || shouldDeferLoaderAssetsForItem(item));
    if (shouldDeferImage) {
      classes.push("photo-panel-visual--deferred");
    }
    const detailCaption = context === "detail" && typeof (visual == null ? void 0 : visual.detailCaption) === "string" ? visual.detailCaption.trim() : "";
    const selectionImageAsset = getPhotoPanelSelectionAsset(visual, context, item);
    const selectionImageUrl = selectionImageAsset ? getVisualAsset(selectionImageAsset) : "";
    const selectionImageIndex = context === "detail" ? getPrimaryPhotoPanelSelectionIndex(item) : 0;
    if (detailCaption) {
      classes.push("photo-panel-visual--with-caption");
    }
    if (selectionImageUrl) {
      classes.push("photo-panel-visual--with-selection-image");
    }
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      ').concat(shouldDeferImage ? 'data-photo-panel-image="'.concat(imageUrl, '" data-photo-panel-loaded="false"') : "", '\n      style="\n        --photo-panel-image: ').concat(shouldDeferImage ? "none" : imageUrl ? "url('".concat(imageUrl, "')") : "none", ";\n        --photo-panel-position: ").concat(visual.position || "center center", ";\n        --photo-panel-size: ").concat(visual.size || "cover", ";\n        --photo-panel-bg: ").concat(visual.backgroundColor || "transparent", ";\n        --photo-panel-blend: ").concat(visual.blendMode || "normal", ";\n        ").concat(visual.detailCaptionFontFamily ? "--photo-panel-caption-font-family: ".concat(visual.detailCaptionFontFamily, ";") : "", "\n        ").concat(visual.detailCaptionFontSize ? "--photo-panel-caption-size: ".concat(visual.detailCaptionFontSize, ";") : "", "\n        ").concat(visual.detailCaptionLineHeight ? "--photo-panel-caption-line-height: ".concat(visual.detailCaptionLineHeight, ";") : "", "\n        ").concat(visual.detailCaptionLetterSpacing ? "--photo-panel-caption-letter-spacing: ".concat(visual.detailCaptionLetterSpacing, ";") : "", "\n        ").concat(visual.detailCaptionColor ? "--photo-panel-caption-color: ".concat(visual.detailCaptionColor, ";") : "", "\n        ").concat(visual.detailCaptionBottom ? "--photo-panel-caption-bottom: ".concat(visual.detailCaptionBottom, ";") : "", "\n        ").concat(visual.selectionImageWidth ? "--photo-panel-selection-image-width: ".concat(visual.selectionImageWidth, ";") : "", "\n        ").concat(visual.selectionImageBottom ? "--photo-panel-selection-image-bottom: ".concat(visual.selectionImageBottom, ";") : "", "\n        ").concat(visual.selectionImageLeft ? "--photo-panel-selection-image-left: ".concat(visual.selectionImageLeft, ";") : "", "\n        ").concat(visual.selectionImageTranslateX ? "--photo-panel-selection-image-translate-x: ".concat(visual.selectionImageTranslateX, ";") : "", "\n        ").concat(visual.selectionImageShadow ? "--photo-panel-selection-image-shadow: ".concat(visual.selectionImageShadow, ";") : "", "\n        ").concat(visual.selectionImageBackdropWidth ? "--photo-panel-selection-backdrop-width: ".concat(visual.selectionImageBackdropWidth, ";") : "", "\n        ").concat(visual.selectionImageBackdropHeight ? "--photo-panel-selection-backdrop-height: ".concat(visual.selectionImageBackdropHeight, ";") : "", "\n        ").concat(visual.selectionImageBackdropBottom ? "--photo-panel-selection-backdrop-bottom: ".concat(visual.selectionImageBackdropBottom, ";") : "", '\n      "\n    >\n      ').concat(selectionImageUrl ? '<img class="photo-panel-visual__selection-image is-current" src="'.concat(selectionImageUrl, '" alt="" loading="eager" decoding="async" aria-hidden="true" data-selection-index="').concat(selectionImageIndex, '" />') : "", "\n      ").concat(detailCaption ? '<span class="photo-panel-visual__caption">'.concat(escapeHtml(detailCaption), "</span>") : "", "\n    </div>\n  ");
  }
  function getPhotoPanelSelectionAsset(visual, context, item) {
    if (context !== "detail" || !visual || !item || !visual.selectionAssets) {
      return "";
    }
    const selectionGroups = getSelectionGroups(item);
    if (!selectionGroups.length) {
      return "";
    }
    const selectedLabels = getSelectedSelectionLabels(item).map((label) => normalizeLabel(label)).filter(Boolean);
    if (!selectedLabels.length) {
      return "";
    }
    if (Array.isArray(visual.selectionAssets)) {
      const matchingAsset = visual.selectionAssets.find((entry) => {
        if (!entry || typeof entry !== "object") {
          return false;
        }
        const key = normalizeLabel(entry.key || entry.label || "");
        return key && selectedLabels.includes(key) && typeof entry.asset === "string";
      });
      return (matchingAsset == null ? void 0 : matchingAsset.asset) || "";
    }
    if (typeof visual.selectionAssets === "object") {
      for (const selectedLabel of selectedLabels) {
        const matchingEntry = Object.entries(visual.selectionAssets).find(
          ([key, asset]) => normalizeLabel(key) === selectedLabel && typeof asset === "string"
        );
        if (matchingEntry) {
          return matchingEntry[1];
        }
      }
    }
    return "";
  }
  function renderCanClusterVisual(visual, context, item = null) {
    const classes = ["can-cluster-visual"];
    if (context === "detail") {
      classes.push("can-cluster-visual--detail");
    }
    const shouldDeferImages = context !== "detail" && item && shouldDeferLoaderAssetsForItem(item);
    const activeCanIndex = context === "detail" ? getActiveCanClusterIndex(item, visual) : -1;
    const detailSelectedScale = "1.15";
    const detailDefaultScale = "0.82";
    const backgroundImage = (visual == null ? void 0 : visual.asset) ? getVisualAsset(visual.asset) : "";
    const cans = Array.isArray(visual.items) ? visual.items.map(
      (canItem, index) => '\n            <img\n              class="can-cluster-visual__can'.concat(shouldDeferImages ? " can-cluster-visual__can--deferred" : "").concat(activeCanIndex >= 0 ? index === activeCanIndex ? " is-selected" : " is-secondary" : "", '"\n              ').concat(shouldDeferImages ? 'data-can-image="'.concat(getVisualAsset(canItem.asset), '" data-can-loaded="false"') : "", "\n              ").concat(shouldDeferImages ? "" : 'src="'.concat(getVisualAsset(canItem.asset), '"'), '\n              alt=""\n              aria-hidden="true"\n              loading="lazy"\n              decoding="async"\n              style="\n                --can-left: ').concat(getCanClusterItemValue(canItem, "left", context, "50%"), ";\n                --can-bottom: ").concat(getCanClusterItemValue(canItem, "bottom", context, "-18%"), ";\n                --can-width: ").concat(getCanClusterItemValue(canItem, "width", context, "auto"), ";\n                --can-height: ").concat(getCanClusterItemValue(canItem, "height", context, "auto"), ";\n                --can-rotate: ").concat(getCanClusterItemValue(canItem, "rotate", context, "0deg"), ";\n                --can-z: ").concat(activeCanIndex >= 0 && index === activeCanIndex ? Number(getCanClusterItemValue(canItem, "zIndex", context, 1)) + 4 : getCanClusterItemValue(canItem, "zIndex", context, 1), ";\n                --can-float-distance: ").concat(getCanClusterItemValue(canItem, "floatDistance", context, "5px"), ";\n                --can-float-duration: ").concat(getCanClusterItemValue(canItem, "floatDuration", context, "4.2s"), ";\n                --can-float-delay: ").concat(getCanClusterItemValue(canItem, "floatDelay", context, "0s"), ";\n                --can-extra-lift: ").concat(activeCanIndex >= 0 && index === activeCanIndex ? getCanClusterItemValue(canItem, "selectedLift", context, "4px") : "0px", ";\n                --can-scale: ").concat(context === "detail" ? activeCanIndex >= 0 && index === activeCanIndex ? detailSelectedScale : detailDefaultScale : "0.74", ';\n              "\n            />\n          ')
    ).join("") : "";
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="\n        --can-cluster-bg: ').concat(visual.backgroundColor || "#d8dee8", ";\n        --can-cluster-image: ").concat(backgroundImage ? "url('".concat(backgroundImage, "')") : "none", ";\n        --can-cluster-position: ").concat(visual.position || "center center", ";\n        --can-cluster-size: ").concat(visual.size || "cover", ";\n        --can-cluster-blend: ").concat(visual.blendMode || "normal", ';\n      "\n    >\n      ').concat(cans, "\n    </div>\n  ");
  }
  function getCanClusterItemValue(canItem, property, context, fallbackValue) {
    if (!canItem || typeof canItem !== "object") {
      return fallbackValue;
    }
    const suffix = property.charAt(0).toUpperCase() + property.slice(1);
    const contextKey = "".concat(context).concat(suffix);
    const contextValue = canItem[contextKey];
    if (contextValue !== void 0 && contextValue !== null && contextValue !== "") {
      return contextValue;
    }
    const defaultValue = canItem[property];
    if (defaultValue !== void 0 && defaultValue !== null && defaultValue !== "") {
      return defaultValue;
    }
    return fallbackValue;
  }
  function getActiveCanClusterIndex(item, visual) {
    if (!item || !visual || !Array.isArray(visual.items) || !visual.items.length) {
      return -1;
    }
    const selectionGroups = getSelectionGroups(item);
    if (selectionGroups.length !== 1) {
      return -1;
    }
    const [group] = selectionGroups;
    if (!group || !Array.isArray(group.options) || group.options.length !== visual.items.length) {
      return -1;
    }
    const selectedIndex = getSelectedSelectionIndex(group);
    return selectedIndex >= 0 && selectedIndex < visual.items.length ? selectedIndex : -1;
  }
  function renderTextPanelVisual(visual, context) {
    const classes = ["text-panel-visual"];
    if (context === "detail") {
      classes.push("text-panel-visual--detail");
    }
    const bodyLines = Array.isArray(visual.bodyLines) ? visual.bodyLines.map((line) => String(line).trim()).filter(Boolean) : [];
    if (bodyLines.length) {
      classes.push("text-panel-visual--copy");
    }
    return '\n    <div\n      class="'.concat(classes.join(" "), '"\n      style="\n        --text-panel-start: ').concat(visual.gradientStart || "#38281b", ";\n        --text-panel-end: ").concat(visual.gradientEnd || "#a67343", ";\n        --text-panel-label: ").concat(visual.labelColor || "#fffdf8", ";\n        --text-panel-script: ").concat(visual.scriptColor || "rgba(17, 17, 17, 0.72)", ";\n        --text-panel-body: ").concat(visual.bodyColor || visual.labelColor || "#fffdf8", ";\n        ").concat(visual.bodyFontFamily ? "--text-panel-copy-font-family: ".concat(visual.bodyFontFamily, ";") : "", "\n        ").concat(visual.detailBodyFontFamily ? "--text-panel-copy-detail-font-family: ".concat(visual.detailBodyFontFamily, ";") : "", "\n        ").concat(visual.bodyFontWeight ? "--text-panel-copy-font-weight: ".concat(visual.bodyFontWeight, ";") : "", "\n        ").concat(visual.detailBodyFontWeight ? "--text-panel-copy-detail-font-weight: ".concat(visual.detailBodyFontWeight, ";") : "", "\n        ").concat(visual.bodyLineHeight ? "--text-panel-copy-line-height: ".concat(visual.bodyLineHeight, ";") : "", "\n        ").concat(visual.detailBodyLineHeight ? "--text-panel-copy-detail-line-height: ".concat(visual.detailBodyLineHeight, ";") : "", "\n        ").concat(visual.bodyFontSize ? "--text-panel-copy-size: ".concat(visual.bodyFontSize, ";") : "", "\n        ").concat(visual.detailBodyFontSize ? "--text-panel-copy-detail-size: ".concat(visual.detailBodyFontSize, ";") : "", "\n        ").concat(visual.detailBodyMobileFontSize ? "--text-panel-copy-detail-mobile-size: ".concat(visual.detailBodyMobileFontSize, ";") : "", '\n      "\n    >\n      ').concat(bodyLines.length ? '\n        <div class="text-panel-visual__copy">\n          '.concat(bodyLines.map((line) => '<span class="text-panel-visual__copy-line">'.concat(escapeHtml(line), "</span>")).join(""), "\n        </div>\n      ") : "\n        ".concat(visual.script ? '<span class="text-panel-visual__script">'.concat(visual.script, "</span>") : "", '\n        <span class="text-panel-visual__label">').concat(visual.label, "</span>\n      "), "\n    </div>\n  ");
  }
  function renderTastingNotesVisual(visual, context) {
    var _a2;
    const classes = ["tasting-notes-visual"];
    if (context === "detail") {
      classes.push("tasting-notes-visual--detail");
    }
    const stats = Array.isArray(visual.stats) ? visual.stats.map((stat) => String(stat).trim()).filter(Boolean) : [];
    const notes = Array.isArray(visual.notes) ? visual.notes.map((note) => ({
      icon: String((note == null ? void 0 : note.icon) || "").trim().toLowerCase(),
      title: String((note == null ? void 0 : note.title) || "").trim(),
      body: String((note == null ? void 0 : note.body) || "").trim()
    })).filter((note) => note.title && note.body) : [];
    const heading = String(visual.heading || "").trim();
    if (notes.length === 1) {
      classes.push("tasting-notes-visual--single");
    }
    const statsMarkup = stats.length ? '\n        <div class="tasting-notes-visual__stats">\n          '.concat(stats.map((stat) => '<span class="tasting-notes-visual__stat">'.concat(escapeHtml(stat), "</span>")).join(""), "\n        </div>\n      ") : "";
    const notesMarkup = notes.length ? '\n        <div class="tasting-notes-visual__list">\n          '.concat(notes.map(
      (note) => '\n                <section class="tasting-notes-visual__item">\n                  <div class="tasting-notes-visual__copy">\n                    <div class="tasting-notes-visual__title-row">\n                      '.concat(note.icon ? '\n                              <span class="tasting-notes-visual__title-icon" aria-hidden="true">\n                                '.concat(renderTastingNotesIcon(note.icon), "\n                              </span>\n                            ") : "", '\n                      <h3 class="tasting-notes-visual__item-title">').concat(escapeHtml(note.title), '</h3>\n                    </div>\n                    <p class="tasting-notes-visual__item-body">').concat(escapeHtml(note.body), "</p>\n                  </div>\n                </section>\n              ")
    ).join(""), "\n        </div>\n      ") : "";
    const headerMarkup = heading || statsMarkup ? '\n          <div class="tasting-notes-visual__header">\n            '.concat(heading ? '<h2 class="tasting-notes-visual__heading">'.concat(escapeHtml(heading), "</h2>") : "", "\n            ").concat(statsMarkup, "\n          </div>\n        ") : "";
    return '\n    <section\n      class="'.concat(classes.join(" "), '"\n      style="\n        --tasting-notes-start: ').concat(visual.gradientStart || "#f7fbfb", ";\n        --tasting-notes-end: ").concat(visual.gradientEnd || "#eef6f6", ";\n        --tasting-notes-accent: ").concat(visual.accentColor || "#6ecfc4", ";\n        --tasting-notes-ink: ").concat(visual.inkColor || "#1e1f22", ';\n      "\n      aria-label="').concat(escapeHtml(heading || ((_a2 = notes[0]) == null ? void 0 : _a2.title) || "Scheda degustazione"), '"\n    >\n      ').concat(headerMarkup, "\n      ").concat(notesMarkup, "\n    </section>\n  ");
  }
  function renderTastingNotesIcon(icon) {
    if (icon === "eye") {
      return '<span class="tasting-notes-emoji-icon" aria-hidden="true">\u{1F441}\uFE0F</span>';
    }
    if (icon === "nose") {
      return '\n      <svg viewBox="0 0 48 48" role="presentation" focusable="false">\n        <path\n          d="M28 7.5c4.7 2.1 8.3 6.2 10.7 11.2 2.5 5.4 4.2 10.9 4.2 15.4 0 5.1-2.2 8.8-6.3 10.8-2.2 1-4.7 1.5-7.5 1.5-4.3 0-8.5-.9-12.3-2.8-3.4-1.7-5.9-4.1-7.4-7.2-.8-1.6-.3-3.4 1.2-4.4 3.1-2.2 5.6-4.8 7.5-8 2.6-4.4 4.2-9.5 5.8-15.5.4-1.7 2.4-2.7 4.1-1Z"\n          fill="#e6c8cd"\n        />\n        <path\n          d="M24.3 5.8c-.8 5.4-2.3 10.3-4.8 14.7-2.6 4.7-6 8.7-10.3 12-.7.5-1 1.2-1 2 0 1.6 1.1 3.1 3.1 4.4 1.8 1.2 4.2 2 7.1 2.6 2.2.4 3.6 1.4 4.1 3.5"\n          fill="none"\n          stroke="currentColor"\n          stroke-width="2.6"\n          stroke-linecap="round"\n          stroke-linejoin="round"\n        />\n        <path\n          d="M19.5 27.5c2.3-1.3 5-1.7 8-1.3 3.3.4 6 1.9 8.1 4.6"\n          fill="none"\n          stroke="currentColor"\n          stroke-width="2.6"\n          stroke-linecap="round"\n          stroke-linejoin="round"\n        />\n      </svg>\n    ';
    }
    if (icon === "mouth") {
      return '<span class="tasting-notes-emoji-icon" aria-hidden="true">\u{1F445}</span>';
    }
    if (icon === "style") {
      return '\n      <svg viewBox="0 0 24 24" role="presentation" focusable="false">\n        <path\n          d="M5.8 4.8h12.4a1.7 1.7 0 0 1 1.7 1.7v11a1.7 1.7 0 0 1-1.7 1.7H5.8a1.7 1.7 0 0 1-1.7-1.7v-11a1.7 1.7 0 0 1 1.7-1.7Z"\n          fill="none"\n          stroke="currentColor"\n          stroke-width="1.9"\n          stroke-linejoin="round"\n        />\n        <path\n          d="M8.1 9.2h7.8"\n          stroke="currentColor"\n          stroke-width="1.9"\n          stroke-linecap="round"\n        />\n        <path\n          d="M8.1 12.4h7.8"\n          stroke="currentColor"\n          stroke-width="1.9"\n          stroke-linecap="round"\n        />\n        <path\n          d="M8.1 15.6h4.8"\n          stroke="currentColor"\n          stroke-width="1.9"\n          stroke-linecap="round"\n        />\n      </svg>\n    ';
    }
    return '\n    <svg viewBox="0 0 48 48" role="presentation" focusable="false">\n      <circle cx="24" cy="24" r="18" fill="#8fded2" />\n      <path\n        d="M10 23.2c2-.4 3.5-1.5 4.5-3.6-.2 2.7.3 5 1.8 6.8 2.3 3 5.8 4.7 10.6 5.3 4 .4 7.2.1 9.7-1 2.5-1 4-2.9 4.4-5.5"\n        fill="none"\n        stroke="currentColor"\n        stroke-width="2.8"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n      />\n      <path\n        d="M10.5 23.4c3.5 3.1 7.9 4.7 13.1 4.7 5.2 0 9.6-1.6 13.1-4.7"\n        fill="#df6f5f"\n      />\n      <path\n        d="M10.5 23.4c3.5 3.1 7.9 4.7 13.1 4.7 5.2 0 9.6-1.6 13.1-4.7"\n        fill="none"\n        stroke="currentColor"\n        stroke-width="2.8"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n      />\n      <path\n        d="M22.6 27.7c1.3-3.5 3.5-6.5 6.6-9 2.5-1.9 4.8-2.7 7-2.4 1.8.2 3.2 1 4.1 2.4.9 1.3 1.1 2.8.9 4.5"\n        fill="none"\n        stroke="currentColor"\n        stroke-width="2.8"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n      />\n      <path\n        d="M29.5 25.3c1.7-1.7 3.7-2.6 5.8-2.6"\n        fill="none"\n        stroke="#ffffff"\n        stroke-width="2.8"\n        stroke-linecap="round"\n      />\n    </svg>\n  ';
  }
  function renderItemSideVisual(item) {
    const sideVisuals = getAllSideVisuals(item);
    if (!sideVisuals.length) {
      return "";
    }
    return sideVisuals.map((visual) => {
      const shouldDeferVisual = shouldDeferSideVisualAsset(item, visual);
      const sideVisualClass = visual.type === "floating-bottle" ? "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-bottle" : "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-accent";
      const deferredAttributes = shouldDeferVisual ? ' data-side-visual-image="'.concat(getSideVisualImage(visual), '" data-side-visual-loaded="false"') : "";
      return '\n        <span\n          class="'.concat(sideVisualClass).concat(shouldDeferVisual ? " item-card__side-visual--deferred" : "", '"\n          aria-hidden="true"\n          ').concat(deferredAttributes, '\n          style="').concat(buildSideVisualStyle(visual, shouldDeferVisual), '"\n        ></span>\n      ');
    }).join("");
  }
  function getSideVisualImage(visual) {
    const assetName = visual && visual.asset ? visual.asset : "";
    return buildVersionedPath("./menu-assets/items/".concat(assetName));
  }
  function getTitleLogoImage(visual) {
    const assetName = visual && visual.asset ? visual.asset : "";
    return buildVersionedPath("./menu-assets/items/".concat(assetName));
  }
  function buildTitleLogoStyle(visual) {
    const styles = [];
    if (visual.width) {
      styles.push("--title-logo-width: ".concat(visual.width));
    }
    if (visual.height) {
      styles.push("--title-logo-height: ".concat(visual.height));
    }
    return styles.join("; ");
  }
  function getContextualVisual(item, context = "detail") {
    if (!item) {
      return null;
    }
    if (context === "card" && item.cardVisual) {
      return item.cardVisual;
    }
    return item.visual || null;
  }
  function getVisualType(item, context = "detail") {
    const visual = getContextualVisual(item, context);
    return visual ? visual.type : "placeholder-panel";
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
  function shouldDeferSideVisualAsset(item, sideVisual) {
    return Boolean(sideVisual && (sideVisual.deferAsset === true || shouldDeferLoaderAssetsForItem(item)));
  }
  function buildSideVisualStyle(sideVisual, shouldDeferAsset = false) {
    const styles = [
      "background-image: ".concat(shouldDeferAsset ? "none" : "url('".concat(getSideVisualImage(sideVisual), "')"))
    ];
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
