# Google Sheet Admin Model

Questo progetto sta passando da un uso "foglio semplice + override CSV" a una base dati piu strutturata nello stesso spreadsheet Google.

## Spreadsheet

- File Google Sheet: `Menu Digitale Aperitivo`
- Tab legacy live attuale: `database-semplice`
- Nuovi tab di scaffolding admin:
  - `admin_sections`
  - `admin_items`
  - `admin_settings`
  - `admin_audit_log`

## Stato attuale

Il sito pubblico oggi continua a leggere:

1. [`public/data/menu-data.json`](/Users/andrea/Desktop/Agri-Menu/public/data/menu-data.json)
2. le override del CSV pubblicato collegate a [`public/data/sheet-config.json`](/Users/andrea/Desktop/Agri-Menu/public/data/sheet-config.json)

Quindi `database-semplice` resta intatto finche non completiamo la migrazione.

Da questa revisione in poi la direzione scelta e:

1. `admin_items` e `admin_sections` diventano la base operativa dell admin
2. una web app Apps Script, versionata in repo, salva e valida le modifiche
3. Apps Script rigenera `database-semplice` a ogni salvataggio
4. il sito pubblico continua a leggere il CSV pubblicato di `database-semplice`
5. il frontend pubblico usa le colonne extra del CSV per far comparire anche prodotti nuovi

## Nuovo modello

### `admin_sections`

Serve a gestire ordine e contenuti editoriali minimi delle sezioni.

Colonne:

- `section_id`
- `sort_order`
- `title`
- `kicker`
- `description`
- `visible`
- `accent`
- `accent_soft`
- `footer_note`
- `source_mode`

Per le sezioni attuali, `source_mode` parte da `legacy`.

### `admin_items`

E la base futura per l'admin dei prodotti.

Colonne:

- `id`
- `section_id`
- `sort_order`
- `render_mode`
- `legacy_sheet_managed`
- `visibility_state`
- `availability_state`
- `name`
- `description`
- `category`
- `option_1_label`
- `option_1_display_label`
- `option_1_price`
- `option_2_label`
- `option_2_display_label`
- `option_2_price`
- `option_3_label`
- `option_3_display_label`
- `option_3_price`
- `image_url`
- `show_detail_hint`
- `notes`

Scelta importante:

- i prodotti gia esistenti partono con `render_mode=legacy`
- i prodotti nuovi, aggiunti in futuro dall'admin, potranno usare un `render_mode` piu semplice come `standard`

In questo modo non rompiamo le card gia molto personalizzate, ma iniziamo a creare una base indipendente per le aggiunte rapide.

### `admin_settings`

Contiene chiavi di configurazione e stato migrazione, per esempio:

- tab live legacy
- nome dei nuovi tab admin
- modalita pubblica attuale
- stato della migrazione
- allowlist email per l admin
- strategia di sync verso il tab live
- timestamp dell ultimo sync live
- timestamp dell'ultimo seed

### `admin_audit_log`

Tab pensato per lo storico modifiche dell'admin Apps Script.

Colonne:

- `timestamp`
- `actor_email`
- `action`
- `target_type`
- `target_id`
- `details_json`

## Seed iniziale

Il seed viene generato con:

```bash
npm run sheet:admin-seed
```

Script:

- [scripts/sheets/export_admin_seed.mjs](/Users/andrea/Desktop/Agri-Menu/scripts/sheets/export_admin_seed.mjs)

Output locale:

- `output/google-sheet-admin-seed/admin_sections.csv`
- `output/google-sheet-admin-seed/admin_items.csv`
- `output/google-sheet-admin-seed/admin_settings.csv`
- `output/google-sheet-admin-seed/admin_audit_log.csv`

Il seed parte da:

- [`public/data/menu-data.json`](/Users/andrea/Desktop/Agri-Menu/public/data/menu-data.json)
- e, se presente, riallinea visibilita/disponibilita/prezzo iniziale usando [`public/data/google-sheet-template-semplice.csv`](/Users/andrea/Desktop/Agri-Menu/public/data/google-sheet-template-semplice.csv)

## Prossimi passi

1. copiare la cartella [apps-script](/Users/andrea/Desktop/Agri-Menu/apps-script) in un progetto Apps Script
2. fare il deploy della web app admin
3. impostare `allowed_editor_emails` in `admin_settings` se vuoi una allowlist esplicita
4. usare l admin per scrivere `admin_items`
5. verificare che `database-semplice` si rigeneri correttamente e che il sito pubblico mostri anche i nuovi prodotti
