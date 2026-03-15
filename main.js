const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

let sections = [];
let itemLookup = {};

const state = {
  selectedItemId: null,
  selectedOptionIndex: 0,
  cart: loadCart(),
};

const sectionNav = document.querySelector("#sectionNav");
const menuSections = document.querySelector("#menuSections");
const cartFab = document.querySelector("#cartFab");
const openCartButton = document.querySelector("#openCart");
const detailSheet = document.querySelector("#detailSheet");
const cartSheet = document.querySelector("#cartSheet");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailDescription = document.querySelector("#detailDescription");
const detailOptions = document.querySelector("#detailOptions");
const addToCartButton = document.querySelector("#addToCart");
const closeDetailButton = document.querySelector("#closeDetail");
const closeCartButton = document.querySelector("#closeCart");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const copySummaryButton = document.querySelector("#copySummary");
const clearCartButton = document.querySelector("#clearCart");
const detailPreview = document.querySelector("#detailPreview");
const appLoader = document.querySelector("#appLoader");

cartFab.addEventListener("click", openCart);
openCartButton.addEventListener("click", openCart);
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
    existing.quantity += 1;
  } else {
    state.cart.push({
      entryId,
      itemId: item.id,
      name: item.name,
      category: item.category,
      optionLabel: option.label,
      price: option.price,
      quantity: 1,
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

  try {
    await navigator.clipboard.writeText(summary);
    copySummaryButton.textContent = "Riepilogo copiato";
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copia riepilogo";
    }, 1600);
  } catch (error) {
    copySummaryButton.textContent = "Copia non riuscita";
    window.setTimeout(() => {
      copySummaryButton.textContent = "Copia riepilogo";
    }, 1600);
  }
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
  try {
    const [menuData] = await Promise.all([loadMenuData(), waitForFonts()]);
    sections = menuData.sections;
    itemLookup = sections
      .flatMap((section) => section.items)
      .reduce((lookup, item) => {
        lookup[item.id] = item;
        return lookup;
      }, {});

    renderNavigation();
    renderSections();
    renderCart();
  } catch (error) {
    console.error("Errore durante il caricamento del menu:", error);
  } finally {
    revealApp();
  }
}

async function loadMenuData() {
  const response = await fetch(new URL("./menu-data.json", import.meta.url));
  if (!response.ok) {
    throw new Error(`Impossibile caricare menu-data.json (${response.status})`);
  }

  return response.json();
}

function waitForFonts() {
  if (!("fonts" in document)) {
    return Promise.resolve();
  }

  const fontLoads = [
    document.fonts.load('700 1rem "Lulo Clean"'),
    document.fonts.load('400 1rem "Housky Demo"'),
    document.fonts.load('400 1rem "Factually Handwriting"'),
  ];

  return Promise.race([
    Promise.all(fontLoads),
    new Promise((resolve) => window.setTimeout(resolve, 2200)),
  ]);
}

function revealApp() {
  document.body.classList.remove("is-loading");
  appLoader?.classList.add("is-hidden");

  window.setTimeout(() => {
    appLoader?.remove();
  }, 320);
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
  menuSections.innerHTML = sections
    .map((section) => renderSection(section))
    .join("");

  menuSections.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.itemId));
  });
}

function renderSection(section) {
  if (section.layout === "grouped" && Array.isArray(section.groups)) {
    return `
      <section
        class="menu-section menu-section--grouped"
        id="section-${section.id}"
        style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft};"
      >
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
      </section>
    `;
  }

  return `
    <section
      class="menu-section"
      id="section-${section.id}"
      style="--section-accent: ${section.accent}; --section-accent-soft: ${section.accentSoft};"
    >
      <div class="menu-section__header">
        <h2>${section.title}</h2>
        <span class="menu-section__kicker">${section.kicker}</span>
        <p>${section.description}</p>
      </div>
      <div class="menu-section__items">
        ${section.items.map((item) => renderItemCard(item)).join("")}
      </div>
    </section>
  `;
}

function renderItemCard(item) {
  return `
    <button
      class="item-card${hasSideVisual(item) ? " item-card--with-side-visual" : ""}${
        hasFloatingBottle(item) ? " item-card--floating-bottle" : ""
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
          <span class="item-card__hint">Tocca per dettagli</span>
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

function openDetail(itemId) {
  const item = itemLookup[itemId];
  if (!item) {
    return;
  }

  state.selectedItemId = itemId;
  state.selectedOptionIndex = 0;
  detailCategory.textContent = item.category;
  detailTitle.textContent = item.name;
  detailDescription.textContent = item.description;
  detailPreview.className = `sheet-preview${getDetailPreviewClass(item)}`;
  detailPreview.innerHTML = renderItemVisual(item, "detail");
  renderOptions(item);
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

function renderCart() {
  cartItems.innerHTML = "";
  cartCount.textContent = state.cart.reduce((sum, entry) => sum + entry.quantity, 0);

  if (state.cart.length === 0) {
    cartEmpty.hidden = false;
    cartItems.hidden = true;
  } else {
    cartEmpty.hidden = true;
    cartItems.hidden = false;

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

  const total = state.cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
  cartTotal.textContent = formatPrice(total);
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
  lines.push(`Totale indicativo: ${cartTotal.textContent}`);
  return lines.join("\n");
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem("molino-cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistCart() {
  window.localStorage.setItem("molino-cart", JSON.stringify(state.cart));
}

function formatPrice(value) {
  return currency.format(value);
}

function getOptionDisplayLabel(option) {
  return option.displayLabel ?? option.label;
}

function formatOptionChip(option) {
  const displayLabel = getOptionDisplayLabel(option);
  return displayLabel
    ? `${displayLabel} · ${formatPrice(option.price)}`
    : formatPrice(option.price);
}

function hasCustomVisual(item) {
  return item.visual?.type === "brand-pill" || item.visual?.type === "beer-script";
}

function getCardVisualClass(item) {
  if (item.visual?.type === "brand-pill") {
    return " item-card__visual--custom";
  }

  if (item.visual?.type === "beer-script") {
    return " item-card__visual--beer-script";
  }

  return "";
}

function getDetailPreviewClass(item) {
  if (item.visual?.type === "brand-pill") {
    return " sheet-preview--custom";
  }

  if (item.visual?.type === "beer-script") {
    return " sheet-preview--beer-script";
  }

  return "";
}

function hasSideVisual(item) {
  return item.sideVisual?.type === "asset-right-crop" || item.sideVisual?.type === "floating-bottle";
}

function hasFloatingBottle(item) {
  return item.sideVisual?.type === "floating-bottle";
}

function renderItemVisual(item, context) {
  if (item.visual?.type === "brand-pill") {
    return renderBrandPillVisual(item.visual, context);
  }

  if (item.visual?.type === "beer-script") {
    return renderBeerScriptVisual(item.visual, context);
  }

  const imageClass = context === "detail" ? "sheet-preview__image" : "item-card__image";
  return `
    <img
      class="${imageClass}"
      src="${getItemImage(item)}"
      alt="${item.name}"
      loading="${context === "detail" ? "eager" : "lazy"}"
    />
  `;
}

function renderBeerScriptVisual(visual, context) {
  const classes = ["beer-script-visual"];
  if (context === "detail") {
    classes.push("beer-script-visual--detail");
  }

  return `
    <div class="${classes.join(" ")}">
      <span class="beer-script-visual__label">${visual.label}</span>
    </div>
  `;
}

function renderItemSideVisual(item) {
  if (!hasSideVisual(item)) {
    return "";
  }

  const sideVisualClass = hasFloatingBottle(item)
    ? "item-card__side-visual item-card__side-visual--floating-bottle"
    : "item-card__side-visual";

  return `
    <span
      class="${sideVisualClass}"
      aria-hidden="true"
      style="background-image: url('${getSideVisualImage(item)}');"
    ></span>
  `;
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
  return new URL(`./menu-assets/items/${item.id}.png`, import.meta.url).href;
}

function getSideVisualImage(item) {
  const assetName = item.sideVisual?.asset || `${item.id}.png`;
  return new URL(`./menu-assets/items/${assetName}`, import.meta.url).href;
}
