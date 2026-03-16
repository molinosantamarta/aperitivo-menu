# Menu Digitale Aperitivi

Versione mobile-first del menu `Domenica al Molino`, pensata per QR code e per evolversi con dettagli interattivi, riepilogo ordine e futuri flussi di servizio al tavolo.

## Struttura

```text
.
├── data/
│   ├── google-sheet-template.csv
│   ├── menu-data.json
│   └── sheet-config.json
├── fonts/
├── menu-assets/
│   ├── footer.png
│   ├── instagram-logo.webp
│   ├── sgb-molino-black.png
│   └── items/
├── scripts/
│   ├── export_sheet_template.mjs
│   ├── extract_ape_assets.py
│   └── prepare_dist.mjs
├── farfalla-bianca.gif
├── index.html
├── main.js
├── main.runtime.js
├── package.json
├── styles.css
└── vite.config.js
```

- `data/`: dati del menu usati dall'app.
- `fonts/`: font effettivamente caricati dal sito.
- `menu-assets/`: solo asset runtime realmente usati dall'interfaccia.
- `scripts/`: utility di estrazione, generazione template e preparazione deploy.

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

La build ora prepara anche i file runtime necessari per GitHub Pages dentro `dist/`, inclusi:

- `main.js`
- `main.runtime.js`
- `data/`
- `menu-assets/`
- `farfalla-bianca.gif`

## Script utili

### Estrazione asset dal PDF

```bash
npm run extract
```

Lo script legge `APE26.pdf` dal Desktop e aggiorna gli asset ritagliati in `menu-assets/`.

### Generare il template Google Sheet

```bash
npm run sheet:template
```

Questo aggiorna [google-sheet-template.csv](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/data/google-sheet-template.csv) con tutti i prodotti attuali.

## Google Sheet opzionale

Il progetto può leggere override dinamici da un Google Sheet pubblicato come CSV.

### Flusso consigliato

1. importa `data/google-sheet-template.csv` in Google Sheets
2. modifica dal foglio:
   - `visible` per mostrare/nascondere
   - `name`, `description`, `category`
   - `option_1_*`, `option_2_*`, `option_3_*` per i prezzi
3. se vuoi aggiungere un nuovo prodotto, duplica una riga e cambia almeno:
   - `id`
   - `section_id`
   - `name`
   - almeno `option_1_label` e `option_1_price`
4. pubblica il foglio come CSV
5. incolla l'URL pubblico in [sheet-config.json](/Users/andrea/Desktop/Menu%20Digitale%20Aperitivi/data/sheet-config.json)

### Note

- se il foglio non e configurato o non risponde, il sito usa automaticamente `data/menu-data.json`
- i nuovi prodotti creati dal foglio usano una card testuale pulita, senza bisogno immediato di immagini dedicate
- per visual personalizzati complessi (bottiglie, gradienti speciali, asset fotografici) conviene ancora intervenire nel repository

## Deploy

Il repository è pubblicato su GitHub Pages tramite GitHub Actions:

- push su `main`
- build Vite
- publish automatica della cartella `dist`
