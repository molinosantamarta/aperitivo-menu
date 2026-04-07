import adminHtmlSource from "../apps-script/Admin.html?raw";
import adminStylesSource from "../apps-script/AdminStyles.html?raw";
import adminScriptsSource from "../apps-script/AdminScripts.html?raw";

const PREVIEW_STORAGE_KEY = "menumal-preview-state-v1";
const PREVIEW_ACTOR_EMAIL = "preview@menumal.local";
const PREVIEW_ROOT_ID = "menumal-preview-root";
const PREVIEW_STYLE_ID = "menumal-preview-styles";
const PREVIEW_SCRIPT_ID = "menumal-preview-runtime";

const DEFAULT_PREVIEW_STATE = {
  sections: [
    {
      section_id: "aperitivi",
      sort_order: "1",
      title: "Aperitivi",
      kicker: "Selezione",
      description: "Prodotti principali del menu digitale.",
      visible: "si",
      accent: "#9d4f16",
      accent_soft: "rgba(157,79,22,0.12)",
      footer_note: "",
      source_mode: "admin",
    },
    {
      section_id: "cucina",
      sort_order: "2",
      title: "Dalla cucina",
      kicker: "Novita",
      description: "Piatti e proposte rapide.",
      visible: "si",
      accent: "#1d6a47",
      accent_soft: "rgba(29,106,71,0.12)",
      footer_note: "",
      source_mode: "admin",
    },
  ],
  items: [
    {
      id: "tagliere-molino",
      section_id: "aperitivi",
      sort_order: "1",
      render_mode: "legacy",
      legacy_sheet_managed: "si",
      visibility_state: "visibile",
      availability_state: "disponibile",
      name: "Tagliere del Molino",
      description: "Prodotto legacy con grafica gestita nel progetto pubblico.",
      category: "Taglieri",
      option_1_label: "Taglia unica",
      option_1_display_label: "",
      option_1_price: "16",
      option_2_label: "",
      option_2_display_label: "",
      option_2_price: "",
      option_3_label: "",
      option_3_display_label: "",
      option_3_price: "",
      image_url: "",
      show_detail_hint: "si",
      notes: "",
    },
    {
      id: "spritz-classico",
      section_id: "aperitivi",
      sort_order: "2",
      render_mode: "standard",
      legacy_sheet_managed: "no",
      visibility_state: "visibile",
      availability_state: "in arrivo",
      name: "Spritz Classico",
      description: "Prodotto standard gestibile interamente da Menumal.",
      category: "Cocktail",
      option_1_label: "Calice",
      option_1_display_label: "",
      option_1_price: "7",
      option_2_label: "",
      option_2_display_label: "",
      option_2_price: "",
      option_3_label: "",
      option_3_display_label: "",
      option_3_price: "",
      image_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
      show_detail_hint: "si",
      notes: "",
    },
    {
      id: "focaccia-rustica",
      section_id: "cucina",
      sort_order: "1",
      render_mode: "standard",
      legacy_sheet_managed: "no",
      visibility_state: "nascosto",
      availability_state: "non disponibile",
      name: "Focaccia Rustica",
      description: "Esempio di prodotto nascosto per testare gli stati.",
      category: "Cucina",
      option_1_label: "Porzione",
      option_1_display_label: "",
      option_1_price: "9.5",
      option_2_label: "",
      option_2_display_label: "",
      option_2_price: "",
      option_3_label: "",
      option_3_display_label: "",
      option_3_price: "",
      image_url: "",
      show_detail_hint: "si",
      notes: "",
    },
  ],
};

bootstrapPreview();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

function bootstrapPreview() {
  injectStyles();
  injectMarkup();
  installPreviewApi();
  injectAdminRuntime();
}

function injectStyles() {
  const previous = document.getElementById(PREVIEW_STYLE_ID);
  if (previous) {
    previous.remove();
  }

  const styleElement = document.createElement("div");
  styleElement.id = PREVIEW_STYLE_ID;
  styleElement.innerHTML = adminStylesSource;
  document.head.append(...styleElement.childNodes);
}

function injectMarkup() {
  const root = document.getElementById(PREVIEW_ROOT_ID);
  if (!root) {
    throw new Error("Root preview Menumal non trovato.");
  }

  const bodyMarkup = extractTagContent(adminHtmlSource, "body")
    .replace('<?!= include("AdminScripts"); ?>', "")
    .replace("<?!= include('AdminScripts'); ?>", "");

  root.innerHTML = bodyMarkup;
  document.title = "MENUMAL | Modifica Menu QR";
}

function injectAdminRuntime() {
  const previous = document.getElementById(PREVIEW_SCRIPT_ID);
  if (previous) {
    previous.remove();
  }

  const runtimeElement = document.createElement("script");
  runtimeElement.id = PREVIEW_SCRIPT_ID;
  runtimeElement.textContent = `
    (() => {
      ${extractTagContent(adminScriptsSource, "script")}
    })();
  `;
  document.body.appendChild(runtimeElement);
}

function installPreviewApi() {
  const previewApi = createRunner();
  window.google = {
    script: {
      run: previewApi,
    },
  };
}

function createRunner(handlers = {}) {
  return {
    withSuccessHandler(successHandler) {
      return createRunner({ ...handlers, successHandler });
    },
    withFailureHandler(failureHandler) {
      return createRunner({ ...handlers, failureHandler });
    },
    getBootstrapData() {
      runAction(() => buildBootstrapData(), handlers);
    },
    saveItem(payload) {
      runAction(() => savePreviewItem(payload), handlers);
    },
    deleteItem(itemId) {
      runAction(() => deletePreviewItem(itemId), handlers);
    },
  };
}

function runAction(action, handlers) {
  window.setTimeout(() => {
    try {
      const result = action();
      handlers.successHandler?.(result);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error));
      handlers.failureHandler?.(normalizedError);
    }
  }, 80);
}

function buildBootstrapData() {
  const state = loadPreviewState();
  const sections = sortSections(state.sections);
  const items = sortItems(state.sections, state.items);
  const visibleItemCount = items.filter((item) => item.visibility_state !== "nascosto").length;
  return {
    actorEmail: PREVIEW_ACTOR_EMAIL,
    actorLabel: "preview locale",
    sections,
    items,
    settings: {
      allowed_editor_emails: PREVIEW_ACTOR_EMAIL,
    },
    publicMenuEndpoint: "preview://menu",
    liveMenuSummary: {
      generatedAt: new Date().toISOString(),
      sectionCount: sections.length,
      itemCount: items.length,
      visibleItemCount,
      hiddenItemCount: items.length - visibleItemCount,
    },
  };
}

function savePreviewItem(payload) {
  const state = loadPreviewState();
  const previousId = sanitizeId(payload?.previous_id);
  const previousItem = previousId ? state.items.find((entry) => entry.id === previousId) || null : null;
  const item = normalizePreviewItemPayload(payload, state, previousItem);
  const itemIndex = state.items.findIndex((entry) => entry.id === item.id);
  const previousItemIndex = previousId && previousId !== item.id ? state.items.findIndex((entry) => entry.id === previousId) : -1;
  const isEditingSameItem = previousId && previousId === item.id;

  if (itemIndex !== -1 && !isEditingSameItem) {
    throw new Error("Esiste gia un prodotto con questo ID nella preview locale.");
  }

  if (itemIndex === -1) {
    state.items.push(item);
  } else {
    state.items[itemIndex] = item;
  }

  if (previousItemIndex !== -1 && previousItemIndex !== itemIndex) {
    state.items.splice(previousItemIndex, 1);
  }

  savePreviewState(state);
  return {
    ok: true,
    item,
    savedAt: new Date().toISOString(),
    liveVerification: buildPreviewLiveVerification(state, item.id),
  };
}

function deletePreviewItem(itemId) {
  const normalizedId = sanitizeId(itemId);
  if (!normalizedId) {
    throw new Error("Serve un ID valido per eliminare il prodotto.");
  }

  const state = loadPreviewState();
  const itemIndex = state.items.findIndex((entry) => entry.id === normalizedId);
  if (itemIndex === -1) {
    throw new Error("Prodotto non trovato nella preview locale.");
  }

  state.items.splice(itemIndex, 1);
  savePreviewState(state);

  return {
    ok: true,
    itemId: normalizedId,
    deletedAt: new Date().toISOString(),
    liveVerification: buildPreviewLiveVerification(state, normalizedId),
  };
}

function normalizePreviewItemPayload(payload, state, previousItem = null) {
  const sectionId = sanitizeText(payload?.section_id);
  const name = sanitizeText(payload?.name);
  const id = sanitizeId(payload?.id || name);
  const uploadedImageDataUrl = sanitizeText(payload?.uploaded_image_data_url);
  const currentLink = sanitizeText(payload?.image_url);

  if (!id) {
    throw new Error("Serve un ID valido per il prodotto.");
  }

  if (!sectionId || !state.sections.some((section) => section.section_id === sectionId)) {
    throw new Error("Seleziona una sezione valida.");
  }

  if (!name) {
    throw new Error("Il nome prodotto e obbligatorio.");
  }

  const option1Price = normalizePrice(payload?.option_1_price);
  const option2Price = normalizePrice(payload?.option_2_price);
  const option3Price = normalizePrice(payload?.option_3_price);

  if (!option1Price && !option2Price && !option3Price) {
    throw new Error("Inserisci almeno un prezzo.");
  }

  const sortOrder = normalizeSortOrder(payload?.sort_order, state.items, sectionId, id);

  return {
    id,
    section_id: sectionId,
    sort_order: String(sortOrder),
    render_mode: payload?.render_mode === "legacy" ? "legacy" : "standard",
    legacy_sheet_managed: normalizeYesNo(payload?.legacy_sheet_managed, false),
    visibility_state: payload?.visibility_state === "nascosto" ? "nascosto" : "visibile",
    availability_state: normalizeAvailability(payload?.availability_state),
    name,
    description: sanitizeText(payload?.description),
    category: sanitizeText(payload?.category),
    option_1_label: sanitizeText(payload?.option_1_label),
    option_1_display_label: sanitizeText(payload?.option_1_display_label),
    option_1_price: option1Price,
    option_2_label: sanitizeText(payload?.option_2_label),
    option_2_display_label: sanitizeText(payload?.option_2_display_label),
    option_2_price: option2Price,
    option_3_label: sanitizeText(payload?.option_3_label),
    option_3_display_label: sanitizeText(payload?.option_3_display_label),
    option_3_price: option3Price,
    image_url: uploadedImageDataUrl || currentLink,
    image_asset_id: resolvePreviewImageAssetId(payload, uploadedImageDataUrl, currentLink, previousItem, id),
    show_detail_hint: normalizeYesNo(payload?.show_detail_hint, true),
    notes: sanitizeText(payload?.notes),
  };
}

function resolvePreviewImageAssetId(payload, uploadedImageDataUrl, currentLink, previousItem, id) {
  const payloadAssetId = sanitizeText(payload?.image_asset_id);
  const previousAssetId = sanitizeText(previousItem?.image_asset_id);
  const previousImageUrl = sanitizeText(previousItem?.image_url);

  if (uploadedImageDataUrl) {
    return `preview-upload:${id}`;
  }

  if (previousAssetId && currentLink !== previousImageUrl) {
    return "";
  }

  return payloadAssetId || previousAssetId;
}

function loadPreviewState() {
  try {
    const raw = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (!raw) {
      return structuredClone(DEFAULT_PREVIEW_STATE);
    }

    const parsed = JSON.parse(raw);
    return {
      sections: Array.isArray(parsed.sections) ? parsed.sections : structuredClone(DEFAULT_PREVIEW_STATE.sections),
      items: Array.isArray(parsed.items) ? parsed.items : structuredClone(DEFAULT_PREVIEW_STATE.items),
    };
  } catch {
    return structuredClone(DEFAULT_PREVIEW_STATE);
  }
}

function savePreviewState(state) {
  window.localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(state));
}

function buildPreviewLiveVerification(state, itemId) {
  const normalizedId = sanitizeId(itemId);
  const sortedItems = sortItems(state.sections, state.items);
  const matchedItem = sortedItems.find((entry) => entry.id === normalizedId) || null;

  return {
    itemId: normalizedId,
    found: Boolean(matchedItem),
    checkedAt: new Date().toISOString(),
    item: matchedItem,
  };
}

function sortSections(sections) {
  return [...sections].sort((left, right) => toInt(left.sort_order, 9999) - toInt(right.sort_order, 9999));
}

function sortItems(sections, items) {
  const sectionOrder = new Map(sortSections(sections).map((section, index) => [section.section_id, toInt(section.sort_order, index)]));

  return [...items].sort((left, right) => {
    const leftSectionOrder = sectionOrder.get(left.section_id) ?? 9999;
    const rightSectionOrder = sectionOrder.get(right.section_id) ?? 9999;
    if (leftSectionOrder !== rightSectionOrder) {
      return leftSectionOrder - rightSectionOrder;
    }

    const leftOrder = toInt(left.sort_order, 9999);
    const rightOrder = toInt(right.sort_order, 9999);
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return String(left.name || left.id).localeCompare(String(right.name || right.id), "it");
  });
}

function normalizeAvailability(value) {
  const normalized = sanitizeText(value).toLowerCase();
  if (normalized === "in arrivo") {
    return "in arrivo";
  }
  if (normalized === "non disponibile") {
    return "non disponibile";
  }
  if (normalized === "al carretto") {
    return "al carretto";
  }

  return "disponibile";
}

function normalizeYesNo(value, fallback) {
  if (typeof value === "boolean") {
    return value ? "si" : "no";
  }

  const normalized = sanitizeText(value).toLowerCase();
  if (["si", "sì", "true", "1", "yes"].includes(normalized)) {
    return "si";
  }
  if (["no", "false", "0"].includes(normalized)) {
    return "no";
  }

  return fallback ? "si" : "no";
}

function normalizeSortOrder(value, items, sectionId, currentId) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  if (Number.isFinite(parsed)) {
    return parsed;
  }

  return (
    items
      .filter((item) => item.section_id === sectionId && item.id !== currentId)
      .reduce((maxValue, item) => Math.max(maxValue, toInt(item.sort_order, 0)), 0) + 1
  );
}

function normalizePrice(value) {
  const raw = sanitizeText(value).replace(",", ".");
  if (!raw) {
    return "";
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error("Prezzo non valido.");
  }

  return stripTrailingZeros(parsed.toFixed(2));
}

function stripTrailingZeros(value) {
  return String(value).replace(/\.00$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function sanitizeId(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function extractTagContent(source, tagName) {
  const match = source.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i"));
  if (!match) {
    throw new Error(`Impossibile estrarre <${tagName}> dalla preview Menumal.`);
  }

  return match[1];
}
