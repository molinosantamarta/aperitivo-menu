# Apps Script Admin

Questo e il pannello admin del menu, versionato nella stessa repo ma pensato per essere deployato come web app Google Apps Script.

## Cosa fa

- legge `admin_sections`, `admin_items`, `admin_settings`, `admin_audit_log`
- salva e aggiorna i prodotti dal browser
- scrive uno storico minimo in `admin_audit_log`
- espone un endpoint JSON pubblico con `?mode=menu`

Il sito pubblico puo leggere direttamente l endpoint JSON Apps Script, senza passare da un tab CSV intermedio.

## File

- [Code.gs](/Users/andrea/Desktop/Agri-Menu/apps-script/Code.gs)
- [Admin.html](/Users/andrea/Desktop/Agri-Menu/apps-script/Admin.html)
- [AdminStyles.html](/Users/andrea/Desktop/Agri-Menu/apps-script/AdminStyles.html)
- [AdminScripts.html](/Users/andrea/Desktop/Agri-Menu/apps-script/AdminScripts.html)
- [appsscript.json](/Users/andrea/Desktop/Agri-Menu/apps-script/appsscript.json)

## Setup

1. Apri [script.google.com](https://script.google.com).
2. Crea un nuovo progetto Apps Script.
3. Copia dentro il progetto i file di questa cartella con gli stessi nomi.
4. Verifica in [Code.gs](/Users/andrea/Desktop/Agri-Menu/apps-script/Code.gs) che `SPREADSHEET_ID` punti allo spreadsheet giusto.
5. Nel tab `admin_settings` aggiungi, quando vuoi attivare la allowlist, una riga:
   - `key`: `allowed_editor_emails`
   - `value`: una o piu email separate da virgola
6. Fai `Deploy -> New deployment -> Web app`.

Impostazione consigliata per partire:

- `Execute as`: `Me`
- `Who has access`: `Only myself`

Se in futuro vorrai 2 o 3 account autorizzati:

- cambia `Who has access` in `Anyone with Google account`
- compila `allowed_editor_emails` in `admin_settings`

## Preview locale

Per lavorare sull interfaccia di Menumal in locale senza toccare ogni volta Apps Script:

1. avvia `npm run menumal:dev`
2. apri [menumal-preview.html](/Users/andrea/Desktop/Agri-Menu/menumal-preview.html) dal server locale, per esempio `http://localhost:4175/menumal-preview.html`
3. modifica questi file:
   - [Admin.html](/Users/andrea/Desktop/Agri-Menu/apps-script/Admin.html)
   - [AdminStyles.html](/Users/andrea/Desktop/Agri-Menu/apps-script/AdminStyles.html)
   - [AdminScripts.html](/Users/andrea/Desktop/Agri-Menu/apps-script/AdminScripts.html)

La preview locale simula `google.script.run` e salva i test in `localStorage`, quindi:
- puoi provare inserimento, modifica ed eliminazione prodotti
- non tocchi il Google Sheet
- non tocchi il deployment Menumal reale

Quando la UI e stabile, copi gli stessi file nel progetto Apps Script e fai `New version`.

## Flusso dati

1. l admin salva su `admin_items`
2. `Code.gs` aggiorna `admin_audit_log`
3. `Code.gs` espone il menu pubblico via `?mode=menu`
4. il frontend pubblico legge quell endpoint JSON

## Note

- per i prodotti nuovi, l immagine usa `image_url`
- se `image_url` e vuoto, il frontend crea una card testuale semplice
- per i prodotti legacy, `render_mode=legacy` mantiene il comportamento del menu principale
- per mettere online l endpoint pubblico, serve un deployment web app accessibile pubblicamente per la sola lettura
