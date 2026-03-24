const priceFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const APP_VERSION = "20260322h";
const LOADER_CARD_DELAY = 2800;
const LOADER_INTRO_OUTRO_DURATION = 760;
const LOADER_MIN_DURATION = 10000;
const LOADER_FONT_TIMEOUT = 12000;
const FONT_LOAD_TIMEOUT = 20000;
const STRICT_FONT_LOAD_TIMEOUT = 45000;
const CRITICAL_IMAGE_LOAD_TIMEOUT = 22000;
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
  timeGate: 8,
};
const SHEET_OPTION_INDEXES = Array.from({ length: 12 }, (_, index) => index + 1);
const LOADER_MESSAGES = [
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
  "il parco si accende lentamente",
];
const PROMO_AGRI_VIDEOS = [
  {
    title: "Video Agri-Eventi 1",
    eyebrow: "BBQ sotto le stelle",
    src: "https://www.youtube-nocookie.com/embed/HIj8MBQlARg?rel=0&playsinline=1",
  },
  {
    title: "Video Agri-Eventi 2",
    eyebrow: "Molino Country Party",
    src: "https://www.youtube-nocookie.com/embed/EHJjUmRYWKU?rel=0&playsinline=1",
  },
  {
    title: "Video Agri-Eventi 3",
    eyebrow: "Molino Après-ski",
    src: "https://www.youtube-nocookie.com/embed/ybJPaALHaHE?rel=0&playsinline=1",
  },
];
const CRITICAL_MENU_SECTION_IDS = new Set(["birre", "drink"]);
const SECTION_SURFACE_COLORS = {
  birre: "#c2a03d",
  drink: "#c97439",
  bottiglie: "#ad6077",
  "altre-bevande": "#82a7ca",
  gelato: "#789556",
  taglieri: "#bf8550",
};
// Weighted list so the most immediate lines surface more often,
// while the nerdier ones stay rarer and feel like a real easter egg.
const SPRITZ_EDITORIAL_FACTS = [
  {
    category: "pop",
    weight: 4,
    text: "Il bilanciamento tra acidità e dolcezza determina la bevibilità. Il contesto del Molino determina quante volte lo ordini.",
  },
  {
    category: "pop",
    weight: 4,
    text: "Secondo uno studio del California Institute of Aperitivo Sciences, lo Spritz bevuto all’aperto è percepito il 27% più buono. Qui al Molino saliamo al 41%.",
  },
  {
    category: "pop",
    weight: 4,
    text: "Studi indipendenti dimostrano che uno Spritz nel verde riduce lo stress. Al Molino abbiamo osservato anche una riduzione della voglia di tornare a casa.",
  },
  {
    category: "pop",
    weight: 4,
    text: "Uno studio del California Institute of Aperitivo Studies ha rilevato che uno Spritz consumato all’aperto è percepito il 27,4% più buono. Al Molino il dato non è stato confermato… perché nessuno ha mai smesso al primo.",
  },
  {
    category: "pop",
    weight: 4,
    text: "I dati suggeriscono che il gusto dello Spritz migliora in funzione del contesto. Al Molino la variabile dominante è il tempo: rallenta.",
  },
  {
    category: "pop",
    weight: 4,
    text: "In condizioni standard (25°C, zero traffico, aria buona, persone giuste), lo Spritz mostra performance significativamente superiori. Il test è replicabile qui.",
  },
  {
    category: "pop",
    weight: 4,
    text: "La probabilità di apprezzare uno Spritz aumenta all’aperto. Al Molino aumenta anche la probabilità di restare.",
  },
  {
    category: "pop",
    weight: 4,
    text: "Studio preliminare del Laboratory of Outdoor Consumption: Spritz + aria aperta → aumento del piacere percepito del 26,8%. Variabile fuori controllo: il secondo giro.",
  },
  {
    category: "pop",
    weight: 4,
    text: "Secondo il Journal of Spontaneous Decisions, dopo il primo Spritz aumenta del 42% la probabilità di restare. Dopo il secondo il campione collabora troppo.",
  },
  {
    category: "nerd",
    weight: 1,
    text: "Il costo marginale del primo Spritz è alto. Dal secondo in poi smetti di considerarlo.",
  },
  {
    category: "nerd",
    weight: 1,
    text: "Dopo il primo Spritz sei in moto. Fermarsi richiede una forza esterna.",
  },
  {
    category: "nerd",
    weight: 1,
    text: "Ogni reazione ha bisogno di energia di attivazione. Il primo Spritz la abbassa.",
  },
  {
    category: "nerd",
    weight: 1,
    text: "Senza elicasi il DNA resta chiuso. Senza il primo Spritz, anche tu.",
  },
  {
    category: "nerd",
    weight: 1,
    text: "Un elettrone spaiato è instabile: tende a cercarne un altro per stabilizzarsi. Vale anche per lo Spritz.",
  },
];
const SPRITZ_EDITORIAL_SOURCES = [
  "California Institute of Aperitivo Sciences",
  "California Institute of Aperitivo Studies",
  "Journal of Spontaneous Decisions",
  "Laboratory of Outdoor Consumption",
];
const SPRITZ_EDITORIAL_ORNAMENTS = {
  pop: {
    stem: ["🧑‍🔬", "🧪", "⚗️", "🔬"],
    playful: ["😄", "🤭", "🤪"],
  },
  nerd: {
    stem: ["🧑‍🔬", "🔬", "⚗️", "🧪"],
    playful: ["🤓", "😄", "🤭"],
  },
};
const SPRITZ_EDITORIAL_META_LINES = [
  "Peer review sospesa per aperitivo.",
  "Protocollo validato solo al secondo giro.",
  "Risultati alterati dal contesto troppo piacevole.",
  "Campione dichiarato poco imparziale.",
  "Osservazione replicabile solo al Molino.",
];

// Real font dependencies for the current UI. Keeping the source + selector map
// here makes the bootstrap easier to maintain when CSS evolves.
const FONT_BOOTSTRAP_PLAN = {
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
      source: "local preload",
    },
    {
      family: "Montserrat",
      descriptor: '700 1rem "Montserrat"',
      sample: "Agri-Eventi 100%",
      selectors: "loader eyebrow, note, percent, CTA labels",
      source: "Google Fonts",
    },
  ],
  critical: [
    {
      family: "Housky Demo",
      descriptor: '400 1rem "Housky Demo"',
      sample: "al Molino",
      verifyMetrics: true,
      metricDescriptor: '400 52px "Housky Demo", Georgia, serif',
      metricFallbackDescriptor: '400 52px Georgia, serif',
      metricSample: "al Molino domenica nel parco",
      metricMinDelta: 10,
      selectors: "hero connector wordmark and decorative script accents",
      source: "local preload",
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
      source: "local preload",
    },
    {
      family: "SignPainter",
      descriptor: '400 1rem "SignPainter"',
      sample: "Iced Latte Tropical",
      verifyMetrics: true,
      metricDescriptor: '400 50px "SignPainter", Georgia, serif',
      metricFallbackDescriptor: '400 50px Georgia, serif',
      metricSample: "Spritz Tropical Iced Latte Bianchina",
      metricMinDelta: 10,
      selectors: "beer-script visuals and label treatments",
      source: "local file",
    },
    {
      family: "Montserrat",
      descriptor: '500 1rem "Montserrat"',
      sample: "Menu digitale aperitivi 0123456789",
      selectors: "body copy, descriptions, cards, navigation",
      source: "Google Fonts",
    },
    {
      family: "Montserrat",
      descriptor: '800 1rem "Montserrat"',
      sample: "Seguici su Instagram",
      selectors: "buttons, chips, badges, emphasis labels",
      source: "Google Fonts",
    },
  ],
  deferred: [
    {
      family: "Caveat",
      descriptor: '500 1rem "Caveat"',
      sample: "Molino",
      selectors: "decorative fallback only",
      source: "Google Fonts",
    },
  ],
};
const LOADER_FONT_PLANS = dedupeFontPlans(FONT_BOOTSTRAP_PLAN.loader);
const REQUIRED_FONT_PLANS = dedupeFontPlans([
  ...FONT_BOOTSTRAP_PLAN.loader,
  ...FONT_BOOTSTRAP_PLAN.critical,
]);
const BLOCKING_REQUIRED_FONT_PLANS = REQUIRED_FONT_PLANS.filter(isCustomBlockingFontPlan);
const NON_BLOCKING_REQUIRED_FONT_PLANS = REQUIRED_FONT_PLANS.filter(
  (plan) => !isCustomBlockingFontPlan(plan)
);
const DEFERRED_FONT_PLANS = dedupeFontPlans(FONT_BOOTSTRAP_PLAN.deferred);

let sections = [];
let itemLookup = {};
let itemSectionLookup = {};
let sideVisualObserver;
let deferredPhotoPanelObserver;
let deferredSideVisualObserver;
let deferredCanClusterObserver;
let activeSectionId = "";
let activeSectionTicking = false;
let sectionNavStickyStart = 0;
let loaderProgressFrame = null;
let loaderMessageIntervalId = null;
let loaderMessages = [...LOADER_MESSAGES];
let loaderMessageIndex = 0;
let loaderStartedAt = null;
let appHasRevealed = false;
let lastFocusedElement = null;
let loaderCardRevealPromise = null;
let resolveLoaderClockStarted = () => {};
let lastSpritzEditorialFactIndex = -1;
let lastSpritzEditorialOrnamentKey = "";
let lastSpritzEditorialMetaIndex = -1;
let fontMetricCanvas = null;
const loaderClockStartedPromise = new Promise((resolve) => {
  resolveLoaderClockStarted = resolve;
});

const state = {
  selectedItemId: null,
  selectedOptionIndex: 0,
  selectedSelections: {},
  selectedQuantity: 1,
  detailEditorialSlide: null,
  cart: loadCart(),
};

const generateSummaryLabel = "Genera riepilogo";
const editSummaryLabel = "Modifica selezione";
const defaultCartTitle = "Da comunicare al cameriere";
const generatedCartTitle = "Siamo pronti ad ordinare...";
let isCartSummaryView = false;

const sectionNav = document.querySelector("#sectionNav");
const menuSections = document.querySelector("#menuSections");
const pageOutro = document.querySelector(".page-outro");
const cartFab = document.querySelector("#cartFab");
const detailSheet = document.querySelector("#detailSheet");
const cartSheet = document.querySelector("#cartSheet");
const detailPanel = detailSheet.querySelector(".sheet-panel--detail");
const cartPanel = cartSheet.querySelector(".sheet-panel--cart");
const cartKicker = document.querySelector("#cartKicker");
const cartTitle = document.querySelector("#cartTitle");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailDescription = document.querySelector("#detailDescription");
const detailMeta = document.querySelector("#detailMeta");
const detailOptions = document.querySelector("#detailOptions");
const detailQuantity = document.querySelector("#detailQuantity");
const addToCartButton = document.querySelector("#addToCart");
const closeDetailButton = document.querySelector("#closeDetail");
const closeCartButton = document.querySelector("#closeCart");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartGenerated = document.querySelector("#cartGenerated");
const cartFooter = document.querySelector("#cartFooter");
const cartTotalBlock = cartFooter.querySelector(".cart-total");
const cartTotal = document.querySelector("#cartTotal");
const saveCartButton = document.querySelector("#saveCart");
const toggleSummaryViewButton = document.querySelector("#toggleSummaryView");
const clearCartButton = document.querySelector("#clearCart");
const detailPreview = document.querySelector("#detailPreview");
const pageBody = document.body;
const appLoader = document.querySelector("#appLoader");
const appLoaderIntro = document.querySelector("#appLoaderIntro");
const appLoaderCard = appLoader?.querySelector(".app-loader__card") || null;
const appLoaderBar = document.querySelector("#appLoaderBar");
const appLoaderBarFill = document.querySelector("#appLoaderBarFill");
const appLoaderPercent = document.querySelector("#appLoaderPercent");
const appLoaderMessage = document.querySelector("#appLoaderMessage");
const promoAgriCarousel = document.querySelector("#promoAgriCarousel");
const promoAgriViewport = document.querySelector("#promoAgriViewport");
const promoAgriVideoTrack = document.querySelector("#promoAgriVideoTrack");
const promoAgriCarouselDots = document.querySelector("#promoAgriCarouselDots");
const promoAgriLightbox = document.querySelector("#promoAgriLightbox");
const promoAgriLightboxBackdrop = document.querySelector("#promoAgriLightboxBackdrop");
const promoAgriLightboxClose = document.querySelector("#promoAgriLightboxClose");
const promoAgriLightboxFrame = document.querySelector("#promoAgriLightboxFrame");
const formatCarousel = document.querySelector("#formatCarousel");
const formatCarouselTrack = document.querySelector("#formatCarouselTrack");
const formatCarouselDots = document.querySelector("#formatCarouselDots");
const formatShowcaseKicker = document.querySelector("#formatShowcaseKicker");
const formatShowcaseTitle = document.querySelector("#formatShowcaseTitle");
const formatShowcaseCopy = document.querySelector("#formatShowcaseCopy");
const formatShowcaseLink = document.querySelector("#formatShowcaseLink");

window.addEventListener("resize", () => {
  syncSectionScrollOffset();
  refreshSectionNavStickyStart();
  queueActiveSectionRefresh();
}, { passive: true });
window.addEventListener("scroll", queueActiveSectionRefresh, { passive: true });

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
    moveCartEntryToFront(entryId);
  } else {
    state.cart.unshift({
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

toggleSummaryViewButton.addEventListener("click", () => {
  if (!state.cart.length) {
    toggleSummaryViewButton.textContent = generateSummaryLabel;
    return;
  }

  blurActiveElement();
  isCartSummaryView = !isCartSummaryView;
  renderCart();
});

saveCartButton.addEventListener("click", () => {
  closeCart();
});

clearCartButton.addEventListener("click", () => {
  state.cart = [];
  persistCart();
  renderCart();
});

sectionNav?.addEventListener("click", (event) => {
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

initLoaderProgress();
initPromoAgriCarousel();
initFormatCarousel();
init();

async function init() {
  let menuAssetsReadyPromise = Promise.resolve();
  const menuDataPromise = loadMenuData()
    .then((menuData) => {
      setLoaderTaskProgress("menuData", 1);
      return menuData;
    })
    .catch((error) => {
      error.bootPhase = "menu-data";
      throw error;
    });
  const fontsReadyPromise = waitForRequiredFonts()
    .then(() => {
      pageBody.classList.remove("fonts-critical-loading");
      pageBody.classList.add("fonts-critical-ready");
      setLoaderTaskProgress("fonts", 1);
    })
    .catch((error) => {
      error.bootPhase = "fonts";
      throw error;
    });
  const deferredFontsReadyPromise = waitForDeferredFonts().then(() => {
    setLoaderTaskProgress("deferredFonts", 1);
  });
  const shellAssetsReadyPromise = waitForShellAssets()
    .then(() => {
      setLoaderTaskProgress("shellAssets", 1);
    })
    .catch((error) => {
      error.bootPhase = "shell-assets";
      throw error;
    });
  const minimumLoaderPromise = waitMinimumLoaderTime(LOADER_MIN_DURATION).then(() => {
    setLoaderTaskProgress("timeGate", 1);
  });

  try {
    const menuData = await menuDataPromise;
    menuAssetsReadyPromise = waitForMenuAssets(menuData)
      .then(() => {
        setLoaderTaskProgress("menuAssets", 1);
      })
      .catch((error) => {
        error.bootPhase = "menu-assets";
        throw error;
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
      minimumLoaderPromise,
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

function initLoaderProgress() {
  setLoaderTaskProgress("boot", 1);
  revealLoaderCardAfterDelay();
}

function revealLoaderCardAfterDelay() {
  if (loaderCardRevealPromise) {
    return loaderCardRevealPromise;
  }

  loaderCardRevealPromise = (async () => {
    if (!appLoader) {
      markLoaderClockStarted();
      startLoaderMessageRotation();
      startLoaderTimeProgress();
      return;
    }

    appLoader.classList.add("app-loader--card-hidden");

    try {
      await Promise.all([wait(LOADER_CARD_DELAY), waitForLoaderFonts()]);
      pageBody.classList.remove("loader-fonts-loading");
      pageBody.classList.add("loader-fonts-ready");
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
    markLoaderClockStarted();
    startLoaderMessageRotation();
    startLoaderTimeProgress();
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

function setLoaderMessages(messages) {
  loaderMessages = Array.isArray(messages) && messages.length ? messages : [...LOADER_MESSAGES];
  loaderMessageIndex = 0;

  if (appLoaderMessage && !appHasRevealed) {
    appLoaderMessage.classList.remove("is-transitioning");
    appLoaderMessage.textContent = loaderMessages[0] || "";
  }
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
  if (!appLoader) {
    return;
  }

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
    title.textContent =
      error && error.bootPhase === "fonts"
        ? "Sto completando i font essenziali."
        : "Sto ancora preparando la pagina.";
  }

  if (note) {
    note.textContent =
      error && error.bootPhase === "fonts"
        ? "Aspetto i font necessari per mostrare il layout in modo leggibile. Se resta bloccata, prova a ricaricare."
        : "Qualcosa ha rallentato il bootstrap iniziale. Se resta bloccata, prova a ricaricare.";
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
    appLoader.querySelector(".app-loader__card")?.appendChild(retryButton);
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

  const rawPercentage =
    Object.keys(LOADER_PROGRESS_WEIGHTS).reduce((sum, key) => {
      return sum + LOADER_PROGRESS_WEIGHTS[key] * (loaderProgressState[key] || 0);
    }, 0);
  const allTasksComplete = Object.keys(LOADER_PROGRESS_WEIGHTS).every(
    (key) => (loaderProgressState[key] || 0) >= 1
  );
  const percentage = allTasksComplete
    ? 100
    : Math.max(0, Math.min(99, Math.floor(rawPercentage)));
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

  document.documentElement.style.setProperty("--section-scroll-offset", `${totalOffset}px`);
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
  const targetSection = document.querySelector(`#section-${sectionId}`);
  if (!targetSection || !sectionNav) {
    return;
  }

  const sectionTop = window.scrollY + targetSection.getBoundingClientRect().top;
  const navHeight = Math.ceil(sectionNav.getBoundingClientRect().height);
  const stickyTop = parseFloat(window.getComputedStyle(sectionNav).top) || 0;
  const targetTop = Math.max(0, sectionTop - navHeight - stickyTop);

  window.scrollTo({
    top: targetTop,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });

  if (window.history && typeof window.history.replaceState === "function") {
    window.history.replaceState(null, "", `#section-${sectionId}`);
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

  return (
    linkRect.left >= navRect.left + horizontalPadding &&
    linkRect.right <= navRect.right - horizontalPadding
  );
}

function scrollNavLinkIntoView(link) {
  if (!sectionNav || !link) {
    return;
  }

  const navRect = sectionNav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const currentLeft = sectionNav.scrollLeft;
  const targetLeft =
    currentLeft + (linkRect.left - navRect.left) - (navRect.width - linkRect.width) / 2;

  sectionNav.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
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
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")
    .replace(/[\/,-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
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
    prezzo: "prezzo_1",
  };

  return aliases[normalized] || normalized;
}

function applySheetRowsToMenu(baseMenu, sheetRows) {
  const nextMenu = JSON.parse(JSON.stringify(baseMenu));
  const rowLookup = new Map(sheetRows.map((row) => [row.id, row]));

  nextMenu.sections.forEach((section) => {
    section.items = section.items
      .filter((item) => {
        const row = getManagedSheetRow(item, rowLookup);
        return row ? resolveSheetVisibility(row, true) : true;
      })
      .map((item, index) => {
        const row = getManagedSheetRow(item, rowLookup);
        const nextItem = row ? updateItemFromSheet(item, row, section) : item;
        nextItem.__sheetPosition = parseSheetInteger(row ? row.position : null, index);
        return nextItem;
      });
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

function getManagedSheetRow(item, rowLookup) {
  if (!item || item.excludeFromSheet === true) {
    return null;
  }

  return rowLookup.get(item.id) || null;
}

function updateItemFromSheet(item, row, section) {
  const nextItem = { ...item };

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

function parseCompactSheetOptions(row) {
  const rawVariants = getFirstSheetValue(row.varianti);
  const sharedPrice = parseSheetNumber(getFirstSheetValue(row.prezzo_unico));

  if (!rawVariants || sharedPrice == null) {
    return [];
  }

  return rawVariants
    .split("|")
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({
      label,
      displayLabel: "",
      price: sharedPrice,
    }));
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

function parseVisibilityState(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();

  if (
    ["visibile", "mostra", "mostrare", "show", "shown", "si", "sì", "yes", "true", "1"].includes(normalized)
  ) {
    return true;
  }

  if (
    ["nascosto", "nascondi", "nascondere", "hidden", "hide", "no", "false", "0"].includes(normalized)
  ) {
    return false;
  }

  return null;
}

function parseAvailabilityState(value) {
  if (!value) {
    return "";
  }

  const normalized = String(value).trim().toLowerCase();

  if (["disponibile", "available", "si", "sì", "yes", "true", "1"].includes(normalized)) {
    return "available";
  }

  if (
    ["in arrivo", "arrivo", "coming soon", "coming-soon", "coming_soon", "preview", "teaser"].includes(
      normalized
    )
  ) {
    return "coming-soon";
  }

  if (
    [
      "al carretto",
      "carretto",
      "self service",
      "self-service",
      "self_service",
      "ritiro autonomo",
      "autonomia",
    ].includes(normalized)
  ) {
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
    return parseSheetBoolean(availabilityValue, fallbackState === "available")
      ? "available"
      : "unavailable";
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

async function waitForRequiredFonts() {
  const blockingMetricPlans = BLOCKING_REQUIRED_FONT_PLANS.filter((plan) => plan.verifyMetrics);
  const nonBlockingMetricPlans = NON_BLOCKING_REQUIRED_FONT_PLANS.filter((plan) => plan.verifyMetrics);

  if ("fonts" in document) {
    await Promise.all([
      ...BLOCKING_REQUIRED_FONT_PLANS.map((plan) =>
        waitForFontLoad(plan, {
          strict: true,
          persist: true,
          timeout: STRICT_FONT_LOAD_TIMEOUT,
        })
      ),
      ...NON_BLOCKING_REQUIRED_FONT_PLANS.map((plan) =>
        waitForFontLoad(plan, {
          timeout: FONT_LOAD_TIMEOUT,
        })
      ),
    ]);

    if (document.fonts.ready) {
      try {
        await waitWithTimeout(document.fonts.ready, STRICT_FONT_LOAD_TIMEOUT);
      } catch (error) {
        // Keep going: the blocking custom fonts are verified with dedicated
        // metric checks below and must resolve before reveal.
      }
    }
  }

  await Promise.all([
    ...blockingMetricPlans.map((plan) =>
      waitForFontMetrics(plan, {
        strict: true,
        persist: true,
        timeout: STRICT_FONT_LOAD_TIMEOUT,
      })
    ),
    ...nonBlockingMetricPlans.map((plan) =>
      waitForFontMetrics(plan, {
        timeout: FONT_LOAD_TIMEOUT,
      })
    ),
  ]);
}

async function waitForLoaderFonts() {
  const metricPlans = LOADER_FONT_PLANS.filter((plan) => plan.verifyMetrics);

  if ("fonts" in document && LOADER_FONT_PLANS.length) {
    await Promise.all(
      LOADER_FONT_PLANS.map((plan) =>
        waitForFontLoad(plan, {
          strict: true,
          timeout: LOADER_FONT_TIMEOUT,
        })
      )
    );
  }

  await Promise.all(
    metricPlans.map((plan) =>
      waitForFontMetrics(plan, {
        strict: true,
        timeout: LOADER_FONT_TIMEOUT,
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
        throw new Error(`Timeout nel caricamento del font critico: ${fontPlan.family}`);
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

        throw new Error(`Timeout nel caricamento del font critico: ${fontPlan.family}`);
      }

      console.warn(`Timeout nel caricamento del font: ${fontPlan.family}`);
      return;
    }

    await wait(140);
  }
}

async function waitForFontMetrics(fontPlan, options = {}) {
  if (!fontPlan?.verifyMetrics) {
    return;
  }

  const { strict = false, persist = false, timeout = FONT_LOAD_TIMEOUT } = options;
  const deadline = performance.now() + timeout;

  while (true) {
    if (isFontMetricReady(fontPlan)) {
      return;
    }

    if ("fonts" in document && document.fonts?.load) {
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
          throw new Error(`Timeout nella verifica metrica del font: ${fontPlan.family}`);
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

        throw new Error(`Metriche del font non confermate: ${fontPlan.family}`);
      }

      console.warn(`Metriche del font non confermate: ${fontPlan.family}`);
      return;
    }

    await wait(120);
  }
}

function isFontMetricReady(fontPlan) {
  const sample = fontPlan.metricSample || fontPlan.sample || "BESbswy 0123456789";
  const primaryDescriptor =
    fontPlan.metricDescriptor || `${fontPlan.descriptor}, "Montserrat", sans-serif`;
  const fallbackDescriptor =
    fontPlan.metricFallbackDescriptor || '700 48px "Montserrat", sans-serif';
  const isDeclaredReady =
    "fonts" in document ? document.fonts.check(fontPlan.descriptor, sample) : true;

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
  const assetUrls = collectShellAssetUrls();
  if (!assetUrls.length) {
    return Promise.resolve();
  }

  return promiseAllSettledCompat(assetUrls.map((url) => preloadImage(url, "high", 12000)));
}

function waitForMenuAssets(menuData) {
  const criticalAssetUrls = collectMenuVisualAssetUrls(menuData, {
    includeSectionIds: CRITICAL_MENU_SECTION_IDS,
  });
  const secondaryAssetUrls = collectMenuVisualAssetUrls(menuData, {
    excludeSectionIds: CRITICAL_MENU_SECTION_IDS,
  });
  const preloadTasks = [];

  if (criticalAssetUrls.length) {
    preloadTasks.push(waitForCriticalImages(criticalAssetUrls));
  }

  if (secondaryAssetUrls.length) {
    preloadTasks.push(
      promiseAllSettledCompat(secondaryAssetUrls.map((url) => preloadImage(url, "high", 14000)))
    );
  }

  if (!preloadTasks.length) {
    return Promise.resolve();
  }

  return Promise.all(preloadTasks);
}

function waitForCriticalImages(urls) {
  return Promise.all(
    urls.map((url) =>
      preloadImage(url, "high", CRITICAL_IMAGE_LOAD_TIMEOUT, {
        strict: true,
        retries: CRITICAL_IMAGE_RETRY_COUNT,
      })
    )
  );
}

function collectMenuVisualAssetUrls(menuData, options = {}) {
  const { includeSectionIds = null, excludeSectionIds = null } = options;
  const urls = new Set();

  menuData.sections.forEach((section) => {
    if (includeSectionIds && !includeSectionIds.has(section.id)) {
      return;
    }

    if (excludeSectionIds && excludeSectionIds.has(section.id)) {
      return;
    }

    section.items.forEach((item) => {
      if (shouldDeferLoaderAssetsForItem(item)) {
        return;
      }

      collectVisualAssetUrls(item.visual, urls, { skipDeferredPhotoPanels: true });
      getAllSideVisuals(item).forEach((visual) =>
        collectSideVisualAssetUrls(visual, urls, { skipDeferredSideVisuals: true })
      );

      if (Array.isArray(item.detailGallery)) {
        item.detailGallery.forEach((visual) =>
          collectVisualAssetUrls(visual, urls, { skipDeferredPhotoPanels: true })
        );
      }
    });
  });

  return Array.from(urls);
}

function collectShellAssetUrls() {
  const urls = new Set();

  document.querySelectorAll("[data-shell-asset]").forEach((asset) => {
    const src = asset.currentSrc || asset.getAttribute("src");
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

function preloadImage(url, priority = "auto", timeout = 12000, options = {}) {
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
          reject(error || new Error(`Impossibile caricare la risorsa critica: ${url}`));
          return;
        }

        resolve();
      };

      const timeoutId = window.setTimeout(() => {
        finish("timeout", new Error(`Timeout nel caricamento di ${url}`));
      }, timeout);

      image.decoding = "async";
      if ("fetchPriority" in image) {
        image.fetchPriority = priority;
      }
      image.onload = () => {
        finish("load");
      };
      image.onerror = () => {
        finish("error", new Error(`Errore nel caricamento di ${url}`));
      };
      image.src = url;
    };

    startAttempt();
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

function dedupeFontPlans(plans) {
  const seen = new Set();

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
  return Boolean(plan?.source && /^local\b/i.test(plan.source));
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
    (video, index) => `
      <button
        class="promo-agri__video-slide"
        type="button"
        data-slide-index="${index}"
        aria-label="Guarda ${video.title}"
      >
        <span
          class="promo-agri__video-poster"
          style="--promo-agri-video-poster: url('${getPromoAgriVideoPoster(video)}');"
        >
          <span class="promo-agri__video-meta">
            <span class="promo-agri__video-kicker">${video.eyebrow || "Agri-Eventi"}</span>
          </span>
          <span class="promo-agri__video-cta">Guarda il video</span>
        </span>
      </button>
    `
  ).join("");

  promoAgriCarouselDots.innerHTML = PROMO_AGRI_VIDEOS.map(
    (_, index) => `
      <button
        class="promo-agri__video-dot"
        type="button"
        aria-label="Vai al video ${index + 1}"
        data-slide-index="${index}"
      ></button>
    `
  ).join("");

  const slides = Array.from(promoAgriVideoTrack.querySelectorAll(".promo-agri__video-slide"));
  const dots = Array.from(promoAgriCarouselDots.querySelectorAll(".promo-agri__video-dot"));

  const syncCarousel = () => {
    const video = PROMO_AGRI_VIDEOS[activeIndex];
    if (!video) {
      return;
    }

    promoAgriVideoTrack.style.transform = `translateX(-${activeIndex * 100}%)`;

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
    if (
      prefersReducedMotion ||
      carouselPaused ||
      !carouselVisible ||
      PROMO_AGRI_VIDEOS.length < 2 ||
      autoplayId != null
    ) {
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
    promoAgriLightboxClose?.focus();
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
    lastTriggerButton?.focus();
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

  promoAgriLightboxBackdrop?.addEventListener("click", closeLightbox);
  promoAgriLightboxClose?.addEventListener("click", closeLightbox);
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
        threshold: 0.35,
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
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
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
      formatShowcaseLink.textContent = formatTitle ? `Apri ${formatTitle}` : "Apri la pagina";
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
    onChange: syncActiveFormat,
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
  onChange = null,
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

  dotsContainer.innerHTML = slides
    .map(
      (_, index) => `
        <button
          class="${dotClassName}"
          type="button"
          aria-label="${dotAriaLabelPrefix} ${index + 1}"
          data-slide-index="${index}"
        ></button>
      `
    )
    .join("");

  const dots = Array.from(dotsContainer.querySelectorAll(`.${dotClassName}`));

  const syncCarousel = () => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
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
        threshold: visibilityThreshold,
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
        threshold: 0.01,
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
  sectionNav.innerHTML = sections
    .map(
      (section) => {
        const sectionSurface = getSectionSurfaceColor(section.id);
        const sectionSurfaceSoft = mixHexColors(sectionSurface, "#fff8ef", 0.5);
        const sectionSurfaceStrong = mixHexColors(sectionSurface, "#fff8ef", 0.12);
        return `
        <a
          class="section-nav__link"
          href="#section-${section.id}"
          data-section-id="${section.id}"
          style="--nav-accent: ${section.accent}; --nav-accent-soft: ${section.accentSoft}; --nav-surface: ${sectionSurface}; --nav-surface-soft: ${sectionSurfaceSoft}; --nav-surface-strong: ${sectionSurfaceStrong};"
        >
          ${section.title}
        </a>
      `;
      }
    )
    .join("");
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
    b: Math.round(a.b * weightA + b.b * weightB),
  };

  return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
}

function hexToRgb(hex) {
  const normalized = String(hex || "").trim().replace("#", "");
  if (!/^[\da-f]{3}$|^[\da-f]{6}$/i.test(normalized)) {
    return null;
  }

  const full = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
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
      rootMargin: "280px 0px",
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
      rootMargin: "280px 0px",
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
    visual.style.backgroundImage = `url('${imageUrl}')`;
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
    panel.style.setProperty("--photo-panel-image", `url('${imageUrl}')`);
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

  if (section.layout === "grouped" && Array.isArray(section.groups)) {
    return `
      <section
        class="menu-section menu-section--grouped${isLeadSection ? " menu-section--lead" : ""}"
        id="section-${section.id}"
        style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft}; --section-surface: ${sectionSurface};"
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
      style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft}; --section-surface: ${sectionSurface};"
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
  const availabilityState = getItemAvailabilityState(item);
  const isSelectionBlocked = availabilityState !== "available";
  const showsOnlyStatusChip = availabilityState === "coming-soon" || availabilityState === "unavailable";
  const unavailableLabel = getItemUnavailableLabel(item);
  const shouldHideCardVisual = item.hideCardVisual === true;
  const cardStyle = getItemCardStyle(item, availabilityState);

  if (availabilityState === "self-service") {
    return renderSelfServiceItemCard(item, unavailableLabel);
  }

  return `
    <button
      class="item-card${hasSideVisual(item) ? " item-card--with-side-visual" : ""}${
        hasFloatingBottle(item) ? " item-card--floating-bottle" : ""
      }${isBeer ? " item-card--beer" : ""}${isArtisanalBeer ? " item-card--artisanal-beer" : ""}${
        isDrink ? " item-card--drink" : ""
      }${
        availabilityState === "coming-soon"
          ? " item-card--coming-soon"
          : availabilityState === "self-service"
            ? " item-card--self-service"
            : isSelectionBlocked
            ? " item-card--unavailable"
            : ""
      }"
      type="button"
      data-item-id="${item.id}"
      aria-haspopup="dialog"
      aria-label="${
        isSelectionBlocked ? `${item.name} ${unavailableLabel.toLowerCase()}` : `Apri dettagli per ${item.name}`
      }"
      aria-disabled="${isSelectionBlocked ? "true" : "false"}"
      ${cardStyle ? `style="${cardStyle}"` : ""}
      ${isSelectionBlocked ? "disabled" : ""}
    >
      ${
        shouldHideCardVisual
          ? ""
          : `
      <div class="item-card__visual${getCardVisualClass(item)}">
        ${renderItemVisual(item, "card")}
      </div>`
      }
      <div class="item-card__content${
        hasSideVisual(item) && !hasFloatingBottle(item) ? " item-card__content--with-side-visual" : ""
      }">
        <div class="item-card__topline">
          <span class="item-card__label">${item.category}</span>
        </div>
        ${renderItemTitle(item)}
        <p>${item.description}</p>
        <div class="item-card__prices">
          ${
            showsOnlyStatusChip
              ? `<span class="price-chip ${
                  availabilityState === "coming-soon"
                    ? "price-chip--coming-soon"
                    : "price-chip--unavailable"
                }">${unavailableLabel}</span>`
              : `${getCardOptionsToDisplay(item)
                  .map(
                    (option) => `
                      <span class="price-chip">${formatOptionChip(item, option)}</span>
                    `
                  )
                  .join("")}${
                  availabilityState === "self-service"
                    ? `<span class="price-chip price-chip--self-service">${unavailableLabel}</span>`
                    : ""
                }`
          }
        </div>
        ${
          availabilityState === "self-service" && item.serviceNote
            ? `<p class="item-card__service-note">${item.serviceNote}</p>`
            : ""
        }
        ${renderItemSideVisual(item)}
      </div>
    </button>
  `;
}

function getItemCardStyle(item, availabilityState) {
  if (availabilityState !== "coming-soon") {
    return "";
  }

  const visual = item && item.visual ? item.visual : null;
  const start = visual?.gradientStart || "#e0a12a";
  const mid = visual?.gradientMid || visual?.gradientEnd || "#d66a2f";
  const end = visual?.gradientEnd || "#b63b4a";

  return [
    `--coming-soon-start: ${start}`,
    `--coming-soon-mid: ${mid}`,
    `--coming-soon-end: ${end}`,
  ].join("; ");
}

function renderSelfServiceItemCard(item, unavailableLabel) {
  const [primaryOption] = getCardOptionsToDisplay(item);
  const visualMarkup = renderItemVisual(item, "card");
  const priceMarkup = primaryOption
    ? `<span class="price-chip item-card__self-service-price">${formatOptionChip(item, primaryOption)}</span>`
    : "";

  return `
    <article
      class="item-card item-card--self-service item-card--self-service-showcase"
      aria-label="${item.name}, ${unavailableLabel.toLowerCase()}"
    >
      <div class="item-card__visual item-card__visual--photo-panel item-card__visual--self-service-showcase">
        ${visualMarkup}
        <div class="item-card__self-service-badge-wrap">
          <span class="price-chip price-chip--self-service">${unavailableLabel}</span>
        </div>
      </div>
      <div class="item-card__self-service-content">
        <div class="item-card__self-service-header">
          <h3 class="item-card__self-service-title">${item.name}</h3>
          ${priceMarkup}
        </div>
        ${
          item.serviceNote
            ? `<p class="item-card__self-service-note">${item.serviceNote}</p>`
            : ""
        }
      </div>
    </article>
  `;
}

function renderItemTitle(item) {
  if (!item || !item.titleLogo || !item.titleLogo.asset) {
    return `<h3>${item.name}</h3>`;
  }

  return `
    <div class="item-card__title-row item-card__title-row--with-logo">
      <h3>${item.name}</h3>
      <img
        class="item-card__title-logo"
        src="${getTitleLogoImage(item.titleLogo)}"
        alt=""
        aria-hidden="true"
        style="${buildTitleLogoStyle(item.titleLogo)}"
      />
    </div>
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

function isSpritzItem(item) {
  if (!item) {
    return false;
  }

  const visualScript = String(item.visual?.script || "").trim().toLowerCase();
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
    return "Novità in arrivo";
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
  detailPanel.classList.toggle("sheet-panel--selection-groups", getSelectionGroups(item).length > 0);
  detailPanel.classList.toggle("sheet-panel--long-options", hasLongOptionList(item));
  detailPanel.classList.toggle("sheet-panel--compact-options", shouldUseCompactDetailOptions(item));
  detailPanel.classList.toggle("sheet-panel--can-selector", shouldUseCanSelectorLayout(item));
  detailPanel.scrollTop = 0;
  detailCategory.textContent = formatDetailCategoryLabel(item);
  detailTitle.textContent = item.name;
  detailDescription.textContent = item.description;
  renderDetailMeta(item);
  refreshDetailPreview(item);
  renderOptions(item);
  renderQuantityControl();
  detailSheet.classList.add("is-open");
  detailSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  focusElement(closeDetailButton);
}

function closeDetail(options = {}) {
  const { restoreFocus = true } = options;
  detailPanel.classList.remove("sheet-panel--selection-groups");
  detailPanel.classList.remove("sheet-panel--long-options");
  detailPanel.classList.remove("sheet-panel--compact-options");
  detailPanel.classList.remove("sheet-panel--can-selector");
  detailSheet.classList.remove("is-open");
  detailSheet.setAttribute("aria-hidden", "true");
  syncModalOpenState({ restoreFocus });
}

function renderDetailMeta(item) {
  if (!detailMeta) {
    return;
  }

  const mention = item?.producerMention;
  const resources = Array.isArray(item?.producerResources)
    ? item.producerResources.filter((resource) => resource && resource.href && resource.label)
    : [];

  if ((!mention || !mention.handle || !mention.href) && resources.length === 0) {
    detailMeta.innerHTML = "";
    detailMeta.hidden = true;
    return;
  }

  const parts = [];

  if (mention && mention.handle && mention.href) {
    const normalizedHandle = String(mention.handle).trim().replace(/^@+/, "");
    const safeHandle = escapeHtml(normalizedHandle);
    const safeHref = escapeHtml(mention.href);
    const safeAria = escapeHtml(
      mention.ariaLabel || `Apri il profilo Instagram @${normalizedHandle}`
    );

    parts.push(`
      <a
        class="producer-mention"
        href="${safeHref}"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="${safeAria}"
      >
        <span class="producer-mention__at" aria-hidden="true">@</span>
        <span class="producer-mention__handle">${safeHandle}</span>
      </a>
    `);
  }

  resources.forEach((resource) => {
    const safeHref = escapeHtml(resource.href);
    const safeLabel = escapeHtml(resource.label);
    const safeAria = escapeHtml(resource.ariaLabel || `Apri ${resource.label}`);
    const resourceKindClass = resource.kind
      ? ` producer-resource--${escapeHtml(resource.kind)}`
      : "";
    const icon = resource.kind === "video" ? "▶" : "↗";

    parts.push(`
      <a
        class="producer-resource${resourceKindClass}"
        href="${safeHref}"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="${safeAria}"
      >
        <span class="producer-resource__icon" aria-hidden="true">${icon}</span>
        <span class="producer-resource__label">${safeLabel}</span>
      </a>
    `);
  });

  detailMeta.innerHTML = parts.join("");
  detailMeta.hidden = false;
}

function openCart() {
  rememberLastFocusedElement();
  isCartSummaryView = false;
  renderCart();
  cartSheet.classList.add("is-open");
  cartSheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  focusElement(closeCartButton);
}

function closeCart(options = {}) {
  const { restoreFocus = true } = options;
  cartSheet.classList.remove("is-open");
  cartSheet.setAttribute("aria-hidden", "true");
  syncModalOpenState({ restoreFocus });
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
        refreshDetailPreview(item);
        renderOptions(item);
      });
      groupNode.options.append(optionButton);
    });

    detailOptions.append(groupNode.wrapper);
  });

  if (!shouldShowFormat) {
    return;
  }

  const formatGroup = createOptionGroup(
    selectionGroups.length ? "Formato" : "",
    shouldUseCompactDetailOptions(item)
  );

  item.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    const displayLabel = getOptionModalLabel(item, option);
    const optionSubtitle = getOptionModalSubtitle(option);
    const toneClass = getOptionToneClass(option);
    const layoutClass = getOptionLayoutClass(option);

    optionButton.type = "button";
    optionButton.className = `option-btn${toneClass ? ` ${toneClass}` : ""}${
      layoutClass ? ` ${layoutClass}` : ""
    }${
      optionSubtitle ? " option-btn--with-subtitle" : ""
    }${index === state.selectedOptionIndex ? " is-selected" : ""}${
      displayLabel ? "" : " option-btn--price-only"
    }`;
    optionButton.innerHTML = displayLabel
      ? `
          <span class="option-copy">
            <span class="option-label">${displayLabel}</span>
            ${optionSubtitle ? `<span class="option-subtitle">${optionSubtitle}</span>` : ""}
          </span>
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
  state.detailEditorialSlide = buildDetailEditorialSlide(item);

  getSelectionGroups(item).forEach((group) => {
    state.selectedSelections[group.id] = 0;
  });
}

function refreshDetailPreview(item) {
  if (!detailPreview || !item) {
    return;
  }

  detailPreview.className = `sheet-preview${getDetailPreviewClass(item)}${
    hasDetailPreviewGallery(item) ? " sheet-preview--gallery" : ""
  }${
    state.detailEditorialSlide ? " sheet-preview--editorial-gallery" : ""
  }${
    isArtisanalBeerItem(item) || isDrinkItem(item) ? " sheet-preview--beer-script-framed" : ""
  }`;
  detailPreview.innerHTML = renderDetailPreview(item);
  setupDetailGallery();
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
  cartGenerated.innerHTML = "";
  toggleSummaryViewButton.textContent = generateSummaryLabel;
  const cartQuantity = state.cart.reduce((sum, entry) => sum + entry.quantity, 0);
  cartCount.textContent = cartQuantity;
  const hasItems = state.cart.length > 0;
  const showGeneratedSummary = isCartSummaryView && hasItems;

  if (hasItems) {
    state.cart.forEach((entry) => {
      const row = document.createElement("article");
      row.className = "cart-item";
      const metaParts = [entry.optionLabel, `${formatPrice(entry.price)} cad.`].filter(Boolean);
      row.innerHTML = `
        <div class="cart-item__copy">
          <strong>${entry.name}</strong>
          <p class="cart-item__meta">${metaParts.join(" · ")}</p>
        </div>
        <div class="cart-item__actions">
          <div class="cart-item-controls">
            <button class="qty-btn" type="button" aria-label="Rimuovi una quantità">−</button>
            <span class="cart-item__quantity">${entry.quantity}</span>
            <button class="qty-btn" type="button" aria-label="Aggiungi una quantità">+</button>
          </div>
          <button class="cart-item__remove" type="button" aria-label="Rimuovi ${entry.name}">
            Rimuovi
          </button>
        </div>
      `;

      const [decreaseButton, increaseButton] = row.querySelectorAll(".qty-btn");
      const removeButton = row.querySelector(".cart-item__remove");
      decreaseButton.addEventListener("click", () => updateQuantity(entry.entryId, -1));
      increaseButton.addEventListener("click", () => updateQuantity(entry.entryId, 1));
      removeButton?.addEventListener("click", () => removeCartEntry(entry.entryId));

      cartItems.append(row);
    });
  }

  if (showGeneratedSummary) {
    renderGeneratedCartSummary();
  }

  cartPanel.classList.toggle("is-generated", showGeneratedSummary);
  cartKicker.hidden = showGeneratedSummary;
  cartTitle.textContent = showGeneratedSummary ? generatedCartTitle : defaultCartTitle;
  cartEmpty.hidden = hasItems;
  cartItems.hidden = !hasItems || showGeneratedSummary;
  cartGenerated.hidden = !showGeneratedSummary;
  cartFooter.hidden = !hasItems;
  cartTotalBlock.hidden = !hasItems || showGeneratedSummary;
  saveCartButton.hidden = !hasItems;
  toggleSummaryViewButton.hidden = !hasItems;
  clearCartButton.hidden = !hasItems || showGeneratedSummary;
  toggleSummaryViewButton.textContent = showGeneratedSummary ? editSummaryLabel : generateSummaryLabel;

  cartTotal.textContent = formatCartBreakdown(state.cart);
}

function moveCartEntryToFront(entryId) {
  const entryIndex = state.cart.findIndex((entry) => entry.entryId === entryId);
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
  state.cart.forEach((entry) => {
    const summaryItem = document.createElement("article");
    summaryItem.className = "cart-generated-item";
    const detail = getGeneratedCartEntryDetail(entry);
    summaryItem.innerHTML = `
      <span class="cart-generated-item__quantity">${entry.quantity}×</span>
      <div class="cart-generated-item__copy">
        <strong>${entry.name}</strong>
        ${detail ? `<p>${detail}</p>` : ""}
      </div>
    `;
    cartGenerated.append(summaryItem);
  });
}

function getGeneratedCartEntryDetail(entry) {
  const item = itemLookup[entry.itemId];
  if (!item || !entry.optionLabel) {
    return "";
  }

  const hasMeaningfulOptions = item.options.length > 1 || getSelectionGroups(item).length > 0;
  return hasMeaningfulOptions ? entry.optionLabel : "";
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
    // Ignore storage failures on browsers with restricted storage access.
  }
}

function rgbaFromHex(color, alpha) {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return `rgba(255, 176, 120, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
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

function getOptionToneClass(option) {
  if (!option || typeof option.tone !== "string") {
    return "";
  }

  const normalizedTone = normalizeLabel(option.tone).replace(/\s+/g, "-");
  return normalizedTone ? `option-btn--${normalizedTone}` : "";
}

function getOptionLayoutClass(option) {
  if (!option || typeof option.layout !== "string") {
    return "";
  }

  const normalizedLayout = normalizeLabel(option.layout).replace(/\s+/g, "-");
  return normalizedLayout ? `option-btn--${normalizedLayout}` : "";
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

function shouldUseCompactDetailOptions(item) {
  return Boolean(item && item.compactDetailOptions === true);
}

function shouldUseCanSelectorLayout(item) {
  return Boolean(
    item &&
      item.visual?.type === "can-cluster" &&
      getSelectionGroups(item).length === 1 &&
      Array.isArray(item.visual?.items) &&
      item.visual.items.length > 1
  );
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function isItemAvailable(item) {
  return getItemAvailabilityState(item) === "available";
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
    return renderCanClusterVisual(item.visual, context, item);
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
  const lengthClass =
    selectedFact.text.length > 165 ? "compact" : selectedFact.text.length > 115 ? "balanced" : "airy";

  return {
    type: "editorial-quote",
    text: selectedFact.text,
    meta: selectSpritzEditorialMetaLine(),
    tone: selectedFact.category,
    lengthClass,
    ornaments: selectSpritzEditorialOrnaments(selectedFact.category),
    startColor: mixHexColors(gradientStart, "#fff7f1", 0.28),
    midColor: mixHexColors(gradientMid, "#fff2ea", 0.4),
    endColor: mixHexColors(gradientEnd, "#fffdf9", 0.18),
    glowColor: rgbaFromHex(gradientMid, selectedFact.category === "nerd" ? 0.16 : 0.24),
    frameColor: rgbaFromHex(gradientStart, 0.14),
  };
}

function selectSpritzEditorialFact() {
  if (!SPRITZ_EDITORIAL_FACTS.length) {
    return null;
  }

  const entries = SPRITZ_EDITORIAL_FACTS.map((fact, index) => ({
    ...fact,
    index,
  }));
  const availableEntries =
    entries.length > 1
      ? entries.filter((entry) => entry.index !== lastSpritzEditorialFactIndex)
      : entries;
  const selectedEntry = selectWeightedEntry(availableEntries);

  if (!selectedEntry) {
    return null;
  }

  lastSpritzEditorialFactIndex = selectedEntry.index;
  return selectedEntry;
}

function selectSpritzEditorialMetaLine() {
  if (!SPRITZ_EDITORIAL_META_LINES.length) {
    return "";
  }

  const entries = SPRITZ_EDITORIAL_META_LINES.map((text, index) => ({ text, index }));
  const availableEntries =
    entries.length > 1
      ? entries.filter((entry) => entry.index !== lastSpritzEditorialMetaIndex)
      : entries;
  const selectedEntry =
    availableEntries[Math.floor(Math.random() * availableEntries.length)] || entries[0];

  lastSpritzEditorialMetaIndex = selectedEntry.index;
  return selectedEntry.text;
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
  const stemPool = [...new Set(config?.stem || [])];
  const playfulPool = [...new Set(config?.playful || [])];

  if (!stemPool.length || !playfulPool.length) {
    return [];
  }

  const combinations = buildSpritzOrnamentCombinations(stemPool, playfulPool);
  const availableCombinations =
    combinations.length > 1
      ? combinations.filter((combination) => combination.join("|") !== lastSpritzEditorialOrnamentKey)
      : combinations;
  const selectedCombination =
    availableCombinations[Math.floor(Math.random() * availableCombinations.length)] || combinations[0] || [];

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
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSpritzEditorialText(text) {
  const sentences = splitSpritzEditorialSentences(text);

  return sentences
    .map((sentence) => {
      let html = escapeHtml(sentence);

      for (const source of SPRITZ_EDITORIAL_SOURCES) {
        const escapedSource = escapeHtml(source);
        html = html.replaceAll(
          escapedSource,
          `<em class="detail-editorial-visual__source">${escapedSource}</em>`
        );
      }

      return `<span class="detail-editorial-visual__sentence">${html}</span>`;
    })
    .join("");
}

function splitSpritzEditorialSentences(text) {
  const normalized = String(text || "").trim();
  if (!normalized) {
    return [];
  }

  const sentences = normalized
    .split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length ? sentences : [normalized];
}

function renderDetailPreview(item) {
  const slides = getDetailPreviewSlides(item);

  if (slides.length <= 1) {
    const [singleSlide] = slides;
    return singleSlide ? renderVisualByType(singleSlide, "detail") : renderItemVisual(item, "detail");
  }

  const slideMarkup = slides
    .map(
      (slide, index) => `
        <div
          class="detail-gallery__slide${slide.type === "editorial-quote" ? " detail-gallery__slide--editorial" : ""}"
          data-gallery-slide="${index}"
        >
          ${renderVisualByType(slide, "detail")}
        </div>
      `
    )
    .join("");

  const dots = slides
    .map(
      (slide, index) => `
        <button
          class="detail-gallery__dot${index === 0 ? " is-active" : ""}"
          type="button"
          aria-label="${getDetailPreviewDotLabel(slide, index)}"
          data-gallery-dot="${index}"
        ></button>
      `
    )
    .join("");

  return `
    <div class="detail-gallery">
      <div class="detail-gallery__track" data-detail-gallery-track>
        ${slideMarkup}
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
    return renderCanClusterVisual(visual, context, null);
  }

  if (visual.type === "text-panel") {
    return renderTextPanelVisual(visual, context);
  }

  if (visual.type === "editorial-quote") {
    return renderEditorialQuoteVisual(visual, context);
  }

  return renderPlaceholderPanelVisual(context);
}

function getDetailPreviewSlides(item) {
  const baseSlides = hasDetailGallery(item)
    ? item.detailGallery.filter(Boolean)
    : item.visual
      ? [item.visual]
      : [];
  const orderedBaseSlides = reorderDetailPreviewSlides(baseSlides, item?.detailPreviewStartIndex);
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
  if (slide?.type === "editorial-quote") {
    return "Vai alla curiosità sullo Spritz";
  }

  return `Vai all'immagine ${index + 1}`;
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
        --beer-script-radius: ${visual.radius || "34px"};
        --beer-script-width: ${visual.width || "100%"};
        --beer-script-max-width: ${visual.maxWidth || "none"};
        --beer-script-min-height: ${visual.minHeight || "82px"};
        --beer-script-label-font: ${visual.labelFontFamily || "var(--font-display)"};
        --beer-script-label-size: ${visual.labelFontSize || "clamp(1.85rem, 7vw, 2.7rem)"};
        --beer-script-label-line-height: ${visual.labelLineHeight || "0.88"};
        --beer-script-label-letter-spacing: ${visual.labelLetterSpacing || "-0.14em"};
        --beer-script-label-order: ${visual.labelOrder || "0"};
        --beer-script-script-font: ${visual.scriptFontFamily || "var(--font-subtitle)"};
        --beer-script-script-size: ${visual.scriptFontSize || "clamp(2.05rem, 7.7vw, 3rem)"};
        --beer-script-script-line-height: ${visual.scriptLineHeight || "0.88"};
        --beer-script-script-letter-spacing: ${visual.scriptLetterSpacing || "0"};
        --beer-script-script-transform: ${visual.scriptTransform || "translate(0.08em, 0.05em)"};
        --beer-script-script-order: ${visual.scriptOrder || "1"};
      "
    >
      ${visual.script ? `<span class="beer-script-visual__script">${visual.script}</span>` : ""}
      <span class="beer-script-visual__label">${visual.label}</span>
    </div>
  `;
}

function renderEditorialQuoteVisual(visual, context) {
  const classes = [
    "detail-editorial-visual",
    `detail-editorial-visual--${visual.lengthClass || "airy"}`,
  ];

  if (context === "detail") {
    classes.push("detail-editorial-visual--detail");
  }

  if (visual.tone) {
    classes.push(`detail-editorial-visual--${visual.tone}`);
  }

  const ornaments = Array.isArray(visual.ornaments) ? visual.ornaments.slice(0, 2) : [];
  const ornamentsMarkup = ornaments
    .map(
      (ornament, index) => `
        <span
          class="detail-editorial-visual__ornament detail-editorial-visual__ornament--${index === 0 ? "one" : "two"}"
          aria-hidden="true"
        >${ornament}</span>
      `
    )
    .join("");
  const quoteMarkup = formatSpritzEditorialText(visual.text);

  return `
    <section
      class="${classes.join(" ")}"
      style="
        --detail-editorial-start: ${visual.startColor};
        --detail-editorial-mid: ${visual.midColor};
        --detail-editorial-end: ${visual.endColor};
        --detail-editorial-glow: ${visual.glowColor};
        --detail-editorial-frame: ${visual.frameColor};
      "
      aria-label="Curiosità sullo Spritz"
    >
      ${ornamentsMarkup}
      <div class="detail-editorial-visual__inner">
        <p class="detail-editorial-visual__quote">${quoteMarkup}</p>
        <p class="detail-editorial-visual__meta">${escapeHtml(visual.meta || "")}</p>
      </div>
    </section>
  `;
}

function renderPhotoPanelVisual(visual, context, item) {
  const classes = ["photo-panel-visual"];
  if (context === "detail") {
    classes.push("photo-panel-visual--detail");
  }

  const imageUrl = visual.asset ? getVisualAsset(visual.asset) : "";
  const shouldDeferImage =
    Boolean(imageUrl) &&
    context !== "detail" &&
    item &&
    (isBottleSectionItem(item) || visual.deferAsset === true || shouldDeferLoaderAssetsForItem(item));

  if (shouldDeferImage) {
    classes.push("photo-panel-visual--deferred");
  }

  return `
    <div
      class="${classes.join(" ")}"
      ${shouldDeferImage ? `data-photo-panel-image="${imageUrl}" data-photo-panel-loaded="false"` : ""}
      style="
        --photo-panel-image: ${shouldDeferImage ? "none" : imageUrl ? `url('${imageUrl}')` : "none"};
        --photo-panel-position: ${visual.position || "center center"};
        --photo-panel-size: ${visual.size || "cover"};
        --photo-panel-bg: ${visual.backgroundColor || "transparent"};
        --photo-panel-blend: ${visual.blendMode || "normal"};
      "
    ></div>
  `;
}

function renderCanClusterVisual(visual, context, item = null) {
  const classes = ["can-cluster-visual"];
  if (context === "detail") {
    classes.push("can-cluster-visual--detail");
  }

  const shouldDeferImages = context !== "detail" && item && shouldDeferLoaderAssetsForItem(item);
  const activeCanIndex = context === "detail" ? getActiveCanClusterIndex(item, visual) : -1;
  const cans = Array.isArray(visual.items)
    ? visual.items
        .map(
          (canItem, index) => `
            <img
              class="can-cluster-visual__can${
                shouldDeferImages ? " can-cluster-visual__can--deferred" : ""
              }${
                activeCanIndex >= 0
                  ? index === activeCanIndex
                    ? " is-selected"
                    : " is-secondary"
                  : ""
              }"
              ${shouldDeferImages ? `data-can-image="${getVisualAsset(canItem.asset)}" data-can-loaded="false"` : ""}
              ${shouldDeferImages ? "" : `src="${getVisualAsset(canItem.asset)}"`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              style="
                --can-left: ${canItem.left || "50%"};
                --can-bottom: ${canItem.bottom || "-18%"};
                --can-width: ${canItem.width || "auto"};
                --can-height: ${canItem.height || "auto"};
                --can-rotate: ${canItem.rotate || "0deg"};
                --can-z: ${
                  activeCanIndex >= 0 && index === activeCanIndex
                    ? Number(canItem.zIndex || 1) + 4
                    : canItem.zIndex || 1
                };
                --can-float-distance: ${canItem.floatDistance || "5px"};
                --can-float-duration: ${canItem.floatDuration || "4.2s"};
                --can-float-delay: ${canItem.floatDelay || "0s"};
                --can-extra-lift: ${activeCanIndex >= 0 && index === activeCanIndex ? "28px" : "0px"};
                --can-scale: ${activeCanIndex >= 0 && index === activeCanIndex ? "1.18" : "0.82"};
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

function getActiveCanClusterIndex(item, visual) {
  if (
    !item ||
    !visual ||
    !Array.isArray(visual.items) ||
    !visual.items.length
  ) {
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

  const bodyLines = Array.isArray(visual.bodyLines)
    ? visual.bodyLines.map((line) => String(line).trim()).filter(Boolean)
    : [];
  if (bodyLines.length) {
    classes.push("text-panel-visual--copy");
  }

  return `
    <div
      class="${classes.join(" ")}"
      style="
        --text-panel-start: ${visual.gradientStart || "#38281b"};
        --text-panel-end: ${visual.gradientEnd || "#a67343"};
        --text-panel-label: ${visual.labelColor || "#fffdf8"};
        --text-panel-script: ${visual.scriptColor || "rgba(17, 17, 17, 0.72)"};
        --text-panel-body: ${visual.bodyColor || visual.labelColor || "#fffdf8"};
      "
    >
      ${
        bodyLines.length
          ? `
        <div class="text-panel-visual__copy">
          ${bodyLines
            .map((line) => `<span class="text-panel-visual__copy-line">${escapeHtml(line)}</span>`)
            .join("")}
        </div>
      `
          : `
        ${visual.script ? `<span class="text-panel-visual__script">${visual.script}</span>` : ""}
        <span class="text-panel-visual__label">${visual.label}</span>
      `
      }
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
      const shouldDeferVisual = shouldDeferSideVisualAsset(item, visual);
      const sideVisualClass =
        visual.type === "floating-bottle"
          ? "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-bottle"
          : "item-card__side-visual item-card__side-visual--floating item-card__side-visual--floating-accent";
      const deferredAttributes =
        shouldDeferVisual
          ? ` data-side-visual-image="${getSideVisualImage(visual)}" data-side-visual-loaded="false"`
          : "";

      return `
        <span
          class="${sideVisualClass}${shouldDeferVisual ? " item-card__side-visual--deferred" : ""}"
          aria-hidden="true"
          ${deferredAttributes}
          style="${buildSideVisualStyle(visual, shouldDeferVisual)}"
        ></span>
      `;
    })
    .join("");
}

function getSideVisualImage(visual) {
  const assetName = visual && visual.asset ? visual.asset : "";
  return buildVersionedPath(`./menu-assets/items/${assetName}`);
}

function getTitleLogoImage(visual) {
  const assetName = visual && visual.asset ? visual.asset : "";
  return buildVersionedPath(`./menu-assets/items/${assetName}`);
}

function buildTitleLogoStyle(visual) {
  const styles = [];

  if (visual.width) {
    styles.push(`--title-logo-width: ${visual.width}`);
  }
  if (visual.height) {
    styles.push(`--title-logo-height: ${visual.height}`);
  }

  return styles.join("; ");
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
  return buildVersionedPath(`./menu-assets/items/${assetName}`);
}

function shouldDeferSideVisualAsset(item, sideVisual) {
  return Boolean(sideVisual && (sideVisual.deferAsset === true || shouldDeferLoaderAssetsForItem(item)));
}

function buildSideVisualStyle(sideVisual, shouldDeferAsset = false) {
  const styles = [
    `background-image: ${shouldDeferAsset ? "none" : `url('${getSideVisualImage(sideVisual)}')`}`,
  ];

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
