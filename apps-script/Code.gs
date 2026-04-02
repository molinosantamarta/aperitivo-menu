var SPREADSHEET_ID = '1AwYzeqI5d47qc8BgQUIQh90rW9UvMQQrEmOK9XR1Cho';

var SHEET_NAMES = {
  sections: 'admin_sections',
  items: 'admin_items',
  settings: 'admin_settings',
  audit: 'admin_audit_log',
  live: 'database-semplice',
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

var LIVE_EXPORT_COLUMNS = [
  'nome attuale (solo riferimento)',
  'id',
  'visibilita (visibile/nascosto)',
  'disponibilita (disponibile/non disponibile/in arrivo)',
  'prezzo',
  'section_id',
  'position',
  'name',
  'description',
  'category',
  'render_mode',
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
  'visual_mode',
  'notes',
];

function doGet() {
  assertAuthorized_();
  return HtmlService.createTemplateFromFile('Admin')
    .evaluate()
    .setTitle('Agri Menu Admin')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getBootstrapData() {
  var actor = assertAuthorized_();
  var settings = getSettingsObject_();

  return {
    actorEmail: actor.email,
    actorLabel: actor.label,
    sections: getAdminSections_(),
    items: getAdminItems_(),
    settings: settings,
    liveTabName: SHEET_NAMES.live,
    liveSyncAt: settings.last_live_sync_at || '',
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

  var syncInfo = syncLegacyLiveTab_();
  return {
    ok: true,
    item: item,
    syncInfo: syncInfo,
    savedAt: new Date().toISOString(),
  };
}

function syncLegacyLiveTab() {
  var actor = assertAuthorized_();
  var syncInfo = syncLegacyLiveTab_();
  logAudit_(actor, 'sync_live_tab', 'sheet', SHEET_NAMES.live, syncInfo);
  return syncInfo;
}

function syncLegacyLiveTab_() {
  var sections = getAdminSections_();
  var sectionOrderLookup = {};
  sections.forEach(function (section, index) {
    sectionOrderLookup[section.section_id] = parseInteger_(section.sort_order, index);
  });

  var liveRows = getAdminItems_()
    .sort(function (left, right) {
      var leftSection = parseInteger_(sectionOrderLookup[left.section_id], 9999);
      var rightSection = parseInteger_(sectionOrderLookup[right.section_id], 9999);

      if (leftSection !== rightSection) {
        return leftSection - rightSection;
      }

      var leftOrder = parseInteger_(left.sort_order, 9999);
      var rightOrder = parseInteger_(right.sort_order, 9999);
      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return String(left.name || left.id).localeCompare(String(right.name || right.id));
    })
    .map(buildLiveExportRow_);
  var syncedAt = new Date().toISOString();
  var liveSheet = ensureSheet_(SHEET_NAMES.live, LIVE_EXPORT_COLUMNS);
  var values = [LIVE_EXPORT_COLUMNS].concat(
    liveRows.map(function (row) {
      return LIVE_EXPORT_COLUMNS.map(function (header) {
        return row[header] || '';
      });
    })
  );

  liveSheet.clearContents();
  liveSheet
    .getRange(1, 1, values.length, LIVE_EXPORT_COLUMNS.length)
    .setValues(values);
  liveSheet
    .getRange(1, 1, Math.max(values.length, 1), LIVE_EXPORT_COLUMNS.length)
    .clearFormat();
  liveSheet.setFrozenRows(1);

  upsertSetting_('migration_status', 'live-tab-synced', 'database-semplice viene rigenerato dall admin.');
  upsertSetting_(
    'last_live_sync_at',
    syncedAt,
    'Timestamp dell ultima sincronizzazione automatica dal pannello admin.'
  );

  return {
    liveTabName: SHEET_NAMES.live,
    rowCount: liveRows.length,
    syncedAt: syncedAt,
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

function buildLiveExportRow_(item) {
  return {
    'nome attuale (solo riferimento)': item.name || item.id,
    id: item.id,
    'visibilita (visibile/nascosto)': item.visibility_state || 'visibile',
    'disponibilita (disponibile/non disponibile/in arrivo)': item.availability_state || 'disponibile',
    prezzo: getPrimaryPrice_(item),
    section_id: item.section_id || '',
    position: item.sort_order || '',
    name: item.name || '',
    description: item.description || '',
    category: item.category || '',
    render_mode: item.render_mode || 'standard',
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
    visual_mode: item.image_url ? 'photo-panel' : item.render_mode === 'legacy' ? 'inherit' : 'text-panel',
    notes: item.notes || '',
  };
}

function getPrimaryPrice_(item) {
  return item.option_1_price || item.option_2_price || item.option_3_price || '';
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
  if (sheetName === SHEET_NAMES.live) {
    return LIVE_EXPORT_COLUMNS;
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

  if (allowedEmails.length && (!activeEmail || allowedEmails.indexOf(activeEmail) === -1)) {
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
