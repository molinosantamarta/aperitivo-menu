# Menu Digitale Aperitivi

Versione mobile-first del menu `Domenica al Molino`, pensata per QR code e per evolversi con dettagli interattivi, riepilogo ordine e futuri flussi di servizio al tavolo.

## Struttura

```text
.
├── data/
│   └── menu-data.json
├── fonts/
├── menu-assets/
│   ├── footer.png
│   ├── hero.png
│   └── items/
├── references/
│   ├── fonts/
│   └── layout-slices/
├── scripts/
│   └── extract_ape_assets.py
├── index.html
├── main.js
└── styles.css
```

- `data/`: dati del menu usati dall'app.
- `fonts/`: font effettivamente caricati dal sito.
- `menu-assets/`: asset runtime realmente usati dall'interfaccia.
- `references/`: materiali sorgente o legacy tenuti solo come archivio di lavoro.
- `scripts/`: utility di estrazione e manutenzione.

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

## Estrazione asset dal PDF

```bash
npm run extract
```

Lo script legge `APE26.pdf` dal Desktop e aggiorna gli asset ritagliati in `menu-assets/`.

## Deploy

Il repository è pubblicato su GitHub Pages tramite GitHub Actions:

- push su `main`
- build Vite
- publish automatica della cartella `dist`
