# Menu Digitale Aperitivi

Versione mobile-first del menu `Domenica al Molino`, pensata per QR code e per evolversi con dettagli interattivi, riepilogo ordine e futuri flussi di servizio al tavolo.

## Struttura

```text
.
├── public/
│   ├── data/
│   │   ├── google-sheet-template-semplice.csv
│   │   ├── google-sheet-template.csv
│   │   ├── menu-data.json
│   │   └── sheet-config.json
│   ├── format-carousel/
│   ├── generated/
│   ├── menu-assets/
│   │   ├── items/
│   │   ├── footer.png
│   │   ├── instagram-logo.webp
│   │   └── sgb-molino-black.png
│   └── farfalla-bianca.gif
├── scripts/
│   ├── assets/
│   │   └── extract_ape_assets.py
│   └── sheets/
│       ├── export_sheet_template.mjs
│       └── export_sheet_template_simple.mjs
├── src/
│   ├── fonts/
│   ├── main.js
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

- `src/`: logica applicativa, stylesheet e font locali del progetto.
- `public/data/`: dati del menu e file CSV collegati al flusso Google Sheet.
- `public/menu-assets/`: asset runtime dell'interfaccia, separati dagli altri media.
- `public/format-carousel/`: immagini dedicate al carosello dei format.
- `public/generated/`: artefatti generati prima della build, non versionati.
- `scripts/assets/`: utility che producono o aggiornano asset grafici.
- `scripts/sheets/`: utility dedicate al flusso Google Sheet.

## Sviluppo locale

```bash
npm install
npm run dev
```

Preview locale: `http://localhost:4173/`

## Build

```bash
npm run build
```

La build:

1. genera `public/generated/main.runtime.js`
2. esegue la build Vite
3. copia automaticamente tutto il contenuto di `public/` dentro `dist/`

## Script utili

### Estrazione asset dal PDF

```bash
npm run extract
```

Lo script legge `APE26.pdf` dal Desktop e aggiorna gli asset ritagliati in `public/menu-assets/`.

### Generare il template Google Sheet

```bash
npm run sheet:template
```

Aggiorna [google-sheet-template.csv](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/public/data/google-sheet-template.csv) con tutti i prodotti attuali.

Per una versione piu semplice, pensata per l'uso quotidiano:

```bash
npm run sheet:template:simple
```

Aggiorna [google-sheet-template-semplice.csv](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/public/data/google-sheet-template-semplice.csv).

## Google Sheet opzionale

Il progetto puo leggere override dinamici da un Google Sheet pubblicato come CSV.

### Flusso consigliato

1. importa `public/data/google-sheet-template-semplice.csv` in Google Sheets
2. modifica dal foglio:
   - `visibilita (visibile/nascosto)`
   - `disponibilita (disponibile/non disponibile/in arrivo)`
   - `prezzo`
3. pubblica il foglio come CSV
4. incolla l'URL pubblico in [sheet-config.json](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/public/data/sheet-config.json)

### Note

- se il foglio non e configurato o non risponde, il sito usa automaticamente `public/data/menu-data.json`
- nomi, descrizioni, categorie e struttura del menu restano nel repository
- per asset o visual personalizzati conviene ancora intervenire nel codice/dati del progetto
- per una gestione avanzata resta disponibile anche [google-sheet-template.csv](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/public/data/google-sheet-template.csv)

## Deploy

Il repository e pubblicato su GitHub Pages tramite GitHub Actions:

- push su `main`
- build Vite
- publish automatica della cartella `dist`
