var SPREADSHEET_ID = '1AwYzeqI5d47qc8BgQUIQh90rW9UvMQQrEmOK9XR1Cho';
var MENUMAL_TITLE = 'Menumal: gestione del menu digitale Agri-Eventi';
var MENUMAL_ICON_URL = 'https://molinosantamarta.github.io/aperitivo-menu/public/menumal-logo.png';

var SHEET_NAMES = {
  sections: 'admin_sections',
  items: 'admin_items',
  settings: 'admin_settings',
  audit: 'admin_audit_log',
};

var SECTION_COLUMNS = [
  'section_id',
  'sort_order',
  'title',
  'kicker',
  'description',
  'visible',
  'accent',
  'accent_soft',
  'footer_note',
  'source_mode',
];

var ITEM_COLUMNS = [
  'id',
  'section_id',
  'sort_order',
  'render_mode',
  'legacy_sheet_managed',
  'visibility_state',
  'availability_state',
  'name',
  'description',
  'category',
  'option_1_label',
  'option_1_display_label',
  'option_1_price',
  'option_2_label',
  'option_2_display_label',
  'option_2_price',
  'option_3_label',
  'option_3_display_label',
  'option_3_price',
  'image_url',
  'show_detail_hint',
  'notes',
];

var SETTINGS_COLUMNS = ['key', 'value', 'notes'];
var AUDIT_COLUMNS = ['timestamp', 'actor_email', 'action', 'target_type', 'target_id', 'details_json'];

function doGet(e) {
  var mode = sanitizeCell_(e && e.parameter ? e.parameter.mode : '').toLowerCase();
  var output;

  if (mode === 'menu' || mode === 'data' || mode === 'menu-json') {
    return createPublicMenuResponse_();
  }

  assertAuthorized_();
  output = HtmlService.createTemplateFromFile('Admin')
    .evaluate()
    .setTitle(MENUMAL_TITLE)
    .setFaviconUrl(MENUMAL_ICON_URL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .addMetaTag('mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);

  return output;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function createPublicMenuResponse_() {
  return ContentService.createTextOutput(JSON.stringify(buildPublicMenuPayload_())).setMimeType(
    ContentService.MimeType.JSON
  );
}

function buildPublicMenuPayload_() {
  return {
    version: 'admin-v2',
    generatedAt: new Date().toISOString(),
    sections: getAdminSections_().map(mapSectionToPublicPayload_),
    items: getAdminItems_().map(mapItemToPublicPayload_),
  };
}

function getBootstrapData() {
  var actor = assertAuthorized_();
  var settings = getSettingsObject_();
  var liveMenuPayload = buildPublicMenuPayload_();

  if (!settings.brand_icon_url) {
    settings.brand_icon_url = MENUMAL_ICON_URL;
  }

  return {
    actorEmail: actor.email,
    actorLabel: actor.label,
    sections: getAdminSections_(),
    items: getAdminItems_(),
    settings: settings,
    publicMenuEndpoint: buildPublicMenuUrl_(),
    liveMenuSummary: {
      generatedAt: liveMenuPayload.generatedAt,
      sectionCount: liveMenuPayload.sections.length,
      itemCount: liveMenuPayload.items.length,
    },
  };
}

function saveItem(payload) {
  var actor = assertAuthorized_();
  var item = normalizeItemPayload_(payload);
  var validSectionIds = getAdminSections_().map(function (section) {
    return section.section_id;
  });

  if (validSectionIds.indexOf(item.section_id) === -1) {
    throw new Error('La sezione selezionata non esiste nei tab admin.');
  }

  upsertRowById_(SHEET_NAMES.items, ITEM_COLUMNS, 'id', item);
  logAudit_(actor, 'save_item', 'item', item.id, item);

  return {
    ok: true,
    item: item,
    savedAt: new Date().toISOString(),
  };
}

function deleteItem(itemId) {
  var actor = assertAuthorized_();
  var normalizedId = sanitizeId_(itemId);

  if (!normalizedId) {
    throw new Error('Serve un ID valido per eliminare il prodotto.');
  }

  var deletedRow = deleteRowById_(SHEET_NAMES.items, ITEM_COLUMNS, 'id', normalizedId);
  if (!deletedRow) {
    throw new Error('Prodotto non trovato nel database menu.');
  }

  logAudit_(actor, 'delete_item', 'item', normalizedId, deletedRow);

  return {
    ok: true,
    itemId: normalizedId,
    deletedAt: new Date().toISOString(),
  };
}

function getAdminSections_() {
  return readRows_(SHEET_NAMES.sections).sort(function (left, right) {
    return parseInteger_(left.sort_order, 9999) - parseInteger_(right.sort_order, 9999);
  });
}

function getAdminItems_() {
  var sectionOrderLookup = getAdminSections_().reduce(function (lookup, section, index) {
    lookup[section.section_id] = parseInteger_(section.sort_order, index);
    return lookup;
  }, {});

  return readRows_(SHEET_NAMES.items)
    .filter(function (row) {
      return row.id;
    })
    .sort(function (left, right) {
      var leftSectionOrder = parseInteger_(sectionOrderLookup[left.section_id], 9999);
      var rightSectionOrder = parseInteger_(sectionOrderLookup[right.section_id], 9999);
      if (leftSectionOrder !== rightSectionOrder) {
        return leftSectionOrder - rightSectionOrder;
      }

      var leftOrder = parseInteger_(left.sort_order, 9999);
      var rightOrder = parseInteger_(right.sort_order, 9999);
      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return String(left.name || left.id).localeCompare(String(right.name || right.id));
    });
}

function getSettingsObject_() {
  return readRows_(SHEET_NAMES.settings).reduce(function (settings, row) {
    if (row.key) {
      settings[row.key] = row.value || '';
    }
    return settings;
  }, {});
}

function normalizeItemPayload_(payload) {
  payload = payload || {};

  var sectionId = sanitizeCell_(payload.section_id);
  var name = sanitizeCell_(payload.name);
  var description = sanitizeCell_(payload.description);
  var category = sanitizeCell_(payload.category);
  var imageUrl = sanitizeCell_(payload.image_url);
  var notes = sanitizeCell_(payload.notes);
  var renderMode = normalizeRenderMode_(payload.render_mode);
  var legacyManaged = normalizeToggle_(payload.legacy_sheet_managed, renderMode === 'legacy');
  var visibilityState = normalizeVisibilityState_(payload.visibility_state);
  var availabilityState = normalizeAvailabilityState_(payload.availability_state);
  var id = sanitizeId_(payload.id || name);
  var sortOrder = parseInteger_(payload.sort_order, null);

  if (!id) {
    throw new Error('Serve un ID valido per il prodotto.');
  }
  if (!sectionId) {
    throw new Error('Seleziona una sezione prima di salvare.');
  }
  if (!name) {
    throw new Error('Il nome del prodotto e obbligatorio.');
  }

  if (sortOrder == null) {
    sortOrder = getNextSortOrder_(sectionId, id);
  }

  var optionValues = normalizeOptionsFromPayload_(payload);
  if (!hasAnyOptionPrice_(optionValues)) {
    throw new Error('Inserisci almeno un prezzo.');
  }

  return {
    id: id,
    section_id: sectionId,
    sort_order: String(sortOrder),
    render_mode: renderMode,
    legacy_sheet_managed: legacyManaged,
    visibility_state: visibilityState,
    availability_state: availabilityState,
    name: name,
    description: description,
    category: category,
    option_1_label: optionValues.option_1_label,
    option_1_display_label: optionValues.option_1_display_label,
    option_1_price: optionValues.option_1_price,
    option_2_label: optionValues.option_2_label,
    option_2_display_label: optionValues.option_2_display_label,
    option_2_price: optionValues.option_2_price,
    option_3_label: optionValues.option_3_label,
    option_3_display_label: optionValues.option_3_display_label,
    option_3_price: optionValues.option_3_price,
    image_url: imageUrl,
    show_detail_hint: normalizeToggle_(payload.show_detail_hint, true),
    notes: notes,
  };
}

function normalizeOptionsFromPayload_(payload) {
  return {
    option_1_label: sanitizeCell_(payload.option_1_label),
    option_1_display_label: sanitizeCell_(payload.option_1_display_label),
    option_1_price: normalizePriceCell_(payload.option_1_price),
    option_2_label: sanitizeCell_(payload.option_2_label),
    option_2_display_label: sanitizeCell_(payload.option_2_display_label),
    option_2_price: normalizePriceCell_(payload.option_2_price),
    option_3_label: sanitizeCell_(payload.option_3_label),
    option_3_display_label: sanitizeCell_(payload.option_3_display_label),
    option_3_price: normalizePriceCell_(payload.option_3_price),
  };
}

function hasAnyOptionPrice_(options) {
  return Boolean(options.option_1_price || options.option_2_price || options.option_3_price);
}

function normalizeRenderMode_(value) {
  var normalized = normalizeLabel_(value || '');

  if (normalized === 'legacy') {
    return 'legacy';
  }

  return 'standard';
}

function normalizeToggle_(value, fallback) {
  if (typeof value === 'boolean') {
    return value ? 'si' : 'no';
  }

  var normalized = normalizeLabel_(value || '');
  if (['si', 's', 'yes', 'true', '1', 'visibile', 'show'].indexOf(normalized) !== -1) {
    return 'si';
  }
  if (['no', 'n', 'false', '0', 'nascosto', 'hide'].indexOf(normalized) !== -1) {
    return 'no';
  }

  return fallback ? 'si' : 'no';
}

function normalizeVisibilityState_(value) {
  return normalizeToggle_(value, true) === 'si' ? 'visibile' : 'nascosto';
}

function normalizeAvailabilityState_(value) {
  var normalized = normalizeLabel_(value || '');

  if (
    ['in-arrivo', 'arrivo', 'coming-soon', 'comingsoon', 'teaser'].indexOf(normalized) !== -1
  ) {
    return 'in arrivo';
  }

  if (
    ['non-disponibile', 'nondisponibile', 'esaurito', 'unavailable', 'sold-out'].indexOf(normalized) !== -1
  ) {
    return 'non disponibile';
  }

  if (['al-carretto', 'carretto', 'self-service', 'selfservice'].indexOf(normalized) !== -1) {
    return 'al carretto';
  }

  return 'disponibile';
}

function normalizePriceCell_(value) {
  var parsed = parsePrice_(value);
  if (parsed == null) {
    return '';
  }

  return stripTrailingZeros_(parsed.toFixed(2));
}

function parsePrice_(value) {
  if (value === '' || value == null) {
    return null;
  }

  var parsed = Number(String(value).replace(',', '.').trim());
  return isFinite(parsed) ? parsed : null;
}

function mapSectionToPublicPayload_(section) {
  return {
    section_id: section.section_id || '',
    sort_order: section.sort_order || '',
    title: section.title || '',
    kicker: section.kicker || '',
    description: section.description || '',
    visible: section.visible || 'si',
    accent: section.accent || '',
    accent_soft: section.accent_soft || '',
    footer_note: section.footer_note || '',
    source_mode: section.source_mode || '',
  };
}

function mapItemToPublicPayload_(item) {
  var visualMode = item.render_mode === 'legacy' ? 'inherit' : item.image_url ? 'photo-panel' : 'text-panel';

  return {
    id: item.id || '',
    section_id: item.section_id || '',
    sort_order: item.sort_order || '',
    position: item.sort_order || '',
    render_mode: item.render_mode || 'standard',
    legacy_sheet_managed: item.legacy_sheet_managed || 'no',
    visibility_state: item.visibility_state || 'visibile',
    availability_state: item.availability_state || 'disponibile',
    name: item.name || '',
    description: item.description || '',
    category: item.category || '',
    option_1_label: item.option_1_label || '',
    option_1_display_label: item.option_1_display_label || '',
    option_1_price: item.option_1_price || '',
    option_2_label: item.option_2_label || '',
    option_2_display_label: item.option_2_display_label || '',
    option_2_price: item.option_2_price || '',
    option_3_label: item.option_3_label || '',
    option_3_display_label: item.option_3_display_label || '',
    option_3_price: item.option_3_price || '',
    image_url: item.image_url || '',
    show_detail_hint: item.show_detail_hint || 'si',
    visual_mode: visualMode,
    notes: item.notes || '',
  };
}

function getNextSortOrder_(sectionId, currentId) {
  var nextValue = getAdminItems_()
    .filter(function (item) {
      return item.section_id === sectionId && item.id !== currentId;
    })
    .reduce(function (maxValue, item) {
      return Math.max(maxValue, parseInteger_(item.sort_order, 0));
    }, 0);

  return nextValue + 1;
}

function readRows_(sheetName) {
  var sheet = ensureSheet_(sheetName, getExpectedColumnsForSheet_(sheetName));
  var values = sheet.getDataRange().getDisplayValues();
  if (values.length <= 1) {
    return [];
  }

  var headers = values[0].map(function (header) {
    return normalizeHeader_(header);
  });

  return values
    .slice(1)
    .map(function (row) {
      return headers.reduce(function (entry, header, index) {
        entry[header] = sanitizeCell_(row[index]);
        return entry;
      }, {});
    })
    .filter(function (row) {
      return Object.keys(row).some(function (key) {
        return row[key] !== '';
      });
    });
}

function ensureSheet_(sheetName, columns) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (columns && columns.length) {
    ensureHeaderRow_(sheet, columns);
  }

  return sheet;
}

function ensureHeaderRow_(sheet, columns) {
  var lastColumn = Math.max(sheet.getLastColumn(), columns.length);
  var currentHeaders =
    lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0] : [];
  var needsReset =
    currentHeaders.length < columns.length ||
    columns.some(function (column, index) {
      return currentHeaders[index] !== column;
    });

  if (needsReset) {
    sheet.getRange(1, 1, 1, columns.length).setValues([columns]);
  }

  if (sheet.getFrozenRows() !== 1) {
    sheet.setFrozenRows(1);
  }
}

function getExpectedColumnsForSheet_(sheetName) {
  if (sheetName === SHEET_NAMES.sections) {
    return SECTION_COLUMNS;
  }
  if (sheetName === SHEET_NAMES.items) {
    return ITEM_COLUMNS;
  }
  if (sheetName === SHEET_NAMES.settings) {
    return SETTINGS_COLUMNS;
  }
  if (sheetName === SHEET_NAMES.audit) {
    return AUDIT_COLUMNS;
  }

  return [];
}

function upsertRowById_(sheetName, columns, idColumn, rowObject) {
  var sheet = ensureSheet_(sheetName, columns);
  var values = sheet.getDataRange().getDisplayValues();
  var headers = values[0];
  var idColumnIndex = headers.indexOf(idColumn);
  var serializedRow = headers.map(function (header) {
    return rowObject[header] || '';
  });
  var targetRowIndex = -1;

  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    if (sanitizeCell_(values[rowIndex][idColumnIndex]) === rowObject[idColumn]) {
      targetRowIndex = rowIndex + 1;
      break;
    }
  }

  if (targetRowIndex === -1) {
    targetRowIndex = sheet.getLastRow() + 1;
  }

  sheet.getRange(targetRowIndex, 1, 1, headers.length).setValues([serializedRow]);
}

function deleteRowById_(sheetName, columns, idColumn, idValue) {
  var sheet = ensureSheet_(sheetName, columns);
  var values = sheet.getDataRange().getDisplayValues();
  var headers = values[0] || [];
  var idColumnIndex = headers.indexOf(idColumn);

  if (idColumnIndex === -1) {
    throw new Error('Colonna ID non trovata nel foglio ' + sheetName + '.');
  }

  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    if (sanitizeCell_(values[rowIndex][idColumnIndex]) !== idValue) {
      continue;
    }

    var deletedRow = headers.reduce(function (entry, header, index) {
      entry[header] = sanitizeCell_(values[rowIndex][index]);
      return entry;
    }, {});

    sheet.deleteRow(rowIndex + 1);
    return deletedRow;
  }

  return null;
}

function upsertSetting_(key, value, notes) {
  upsertRowById_(SHEET_NAMES.settings, SETTINGS_COLUMNS, 'key', {
    key: key,
    value: value,
    notes: notes || '',
  });
}

function logAudit_(actor, action, targetType, targetId, details) {
  var sheet = ensureSheet_(SHEET_NAMES.audit, AUDIT_COLUMNS);
  var row = [
    new Date().toISOString(),
    actor.email || actor.label || 'unknown',
    action,
    targetType,
    targetId,
    safeJsonStringify_(details),
  ];

  sheet.appendRow(row);
}

function assertAuthorized_() {
  var settings = getSettingsObject_();
  var allowedEmails = parseAllowedEmails_(settings.allowed_editor_emails || '');
  var activeEmail = sanitizeCell_(Session.getActiveUser().getEmail()).toLowerCase();
  var fallbackLabel = sanitizeCell_(Session.getTemporaryActiveUserKey()) || 'utente-non-identificato';

  // In una web app Apps Script l'email attiva puo non essere disponibile.
  // Manteniamo l'allowlist solo quando Google espone davvero l'identita dell'utente.
  if (allowedEmails.length && activeEmail && allowedEmails.indexOf(activeEmail) === -1) {
    throw new Error(
      'Questo account Google non e autorizzato. Controlla la chiave allowed_editor_emails in admin_settings.'
    );
  }

  return {
    email: activeEmail,
    label: activeEmail || fallbackLabel,
  };
}

function parseAllowedEmails_(value) {
  return String(value || '')
    .split(/[\n,;]+/)
    .map(function (entry) {
      return sanitizeCell_(entry).toLowerCase();
    })
    .filter(function (entry) {
      return Boolean(entry);
    });
}

function sanitizeId_(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitizeCell_(value) {
  return String(value == null ? '' : value).trim();
}

function normalizeHeader_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/[\/,-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeLabel_(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseInteger_(value, fallbackValue) {
  var parsed = parseInt(value, 10);
  return isFinite(parsed) ? parsed : fallbackValue;
}

function stripTrailingZeros_(value) {
  return String(value || '')
    .replace(/\.00$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1');
}

function safeJsonStringify_(value) {
  var raw = JSON.stringify(value || {});
  return raw.length > 49000 ? raw.slice(0, 48997) + '...' : raw;
}

function buildPublicMenuUrl_() {
  try {
    var serviceUrl = ScriptApp.getService().getUrl();
    return serviceUrl ? serviceUrl + '?mode=menu' : '';
  } catch (error) {
    return '';
  }
}
