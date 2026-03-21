const priceFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const APP_VERSION = "20260321d";
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

// Real font dependencies for the current UI. Keeping the source + selector map
// here makes the bootstrap easier to maintain when CSS evolves.
const FONT_BOOTSTRAP_PLAN = {
  loader: [
    {
      family: "Lulo Clean",
      descriptor: '700 1rem "Lulo Clean"',
      sample: "DOMENICA AL MOLINO",
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
      selectors: "hero connector wordmark and decorative script accents",
      source: "local preload",
    },
    {
      family: "Factually Handwriting",
      descriptor: '400 1rem "Factually Handwriting"',
      sample: "Aperitivo e agrigelato",
      selectors: "subtitles, descriptive script accents",
      source: "local preload",
    },
    {
      family: "SignPainter",
      descriptor: '400 1rem "SignPainter"',
      sample: "Iced Latte Tropical",
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
const loaderClockStartedPromise = new Promise((resolve) => {
  resolveLoaderClockStarted = resolve;
});

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

  if (!sectionNav || !sectionId) {
    return;
  }

  const links = Array.from(sectionNav.querySelectorAll(".section-nav__link"));
  if (!links.length) {
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
  if (!("fonts" in document)) {
    pageBody.classList.remove("fonts-critical-loading");
    pageBody.classList.add("fonts-critical-ready", "loader-fonts-ready");
    return;
  }

  await Promise.all(
    REQUIRED_FONT_PLANS.map((plan) =>
      waitForFontLoad(plan, {
        strict: true,
        timeout: STRICT_FONT_LOAD_TIMEOUT,
      })
    )
  );

  if (document.fonts.ready) {
    try {
      await waitWithTimeout(document.fonts.ready, STRICT_FONT_LOAD_TIMEOUT);
    } catch (error) {
      if (!REQUIRED_FONT_PLANS.every((plan) => document.fonts.check(plan.descriptor))) {
        throw new Error("I font critici della pagina non sono ancora pronti.");
      }
    }
  }
}

async function waitForLoaderFonts() {
  if (!("fonts" in document) || !LOADER_FONT_PLANS.length) {
    return;
  }

  await Promise.all(
    LOADER_FONT_PLANS.map((plan) =>
      waitForFontLoad(plan, {
        strict: true,
        timeout: LOADER_FONT_TIMEOUT,
      })
    )
  );
}

async function waitForFontLoad(fontPlan, options = {}) {
  const { strict = false, timeout = FONT_LOAD_TIMEOUT } = options;
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
        throw new Error(`Timeout nel caricamento del font critico: ${fontPlan.family}`);
      }

      console.warn(`Timeout nel caricamento del font: ${fontPlan.family}`);
      return;
    }

    await wait(140);
  }
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
    const displayLabel = getOptionModalLabel(item, option);

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
    return renderCanClusterVisual(visual, context, null);
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
  const cans = Array.isArray(visual.items)
    ? visual.items
        .map(
          (item) => `
            <img
              class="can-cluster-visual__can${shouldDeferImages ? " can-cluster-visual__can--deferred" : ""}"
              ${shouldDeferImages ? `data-can-image="${getVisualAsset(item.asset)}" data-can-loaded="false"` : ""}
              ${shouldDeferImages ? "" : `src="${getVisualAsset(item.asset)}"`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              style="
                --can-left: ${item.left || "50%"};
                --can-bottom: ${item.bottom || "-18%"};
                --can-width: ${item.width || "auto"};
                --can-height: ${item.height || "auto"};
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
