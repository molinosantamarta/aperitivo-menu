# MENUMAL / Agri-menu Update Runbook

Ultimo audit locale: 2026-07-07.

## Mappa del sistema

- Repo locale: `/Users/andrea/Desktop/Agri-Menu`
- GitHub Pages Agri-menu: `https://molinosantamarta.github.io/aperitivo-menu/`
- Web app MENUMAL: `https://script.google.com/macros/s/AKfycbzTJl-iLDmSiP23IdHdMqQrLbX0ww7hOSO9qOeHWMssDSYkJgFzA8Jc5Lm5ZyjeexHLLA/exec`
- Endpoint JSON pubblico MENUMAL: `https://script.google.com/macros/s/AKfycbzTJl-iLDmSiP23IdHdMqQrLbX0ww7hOSO9qOeHWMssDSYkJgFzA8Jc5Lm5ZyjeexHLLA/exec?mode=menu`
- Google Sheet dati: `https://docs.google.com/spreadsheets/d/1AwYzeqI5d47qc8BgQUIQh90rW9UvMQQrEmOK9XR1Cho/edit`
- Anteprima locale MENUMAL: `http://localhost:4173/menumal-preview.html`

Tab Google Sheet usati dall'admin:

- `admin_sections`
- `admin_items`
- `admin_settings`
- `admin_audit_log`

## File Apps Script da aggiornare

Nel progetto Apps Script vanno copiati questi file locali:

- `/Users/andrea/Desktop/Agri-Menu/apps-script/Code.gs`
- `/Users/andrea/Desktop/Agri-Menu/apps-script/Admin.html`
- `/Users/andrea/Desktop/Agri-Menu/apps-script/AdminStyles.html`
- `/Users/andrea/Desktop/Agri-Menu/apps-script/AdminScripts.html`
- `/Users/andrea/Desktop/Agri-Menu/apps-script/appsscript.json`

Nota importante: `appsscript.json` va incollato solo nel file manifest di Apps Script, non dentro `AdminScripts.html`.

## Procedura deploy Apps Script

1. Aprire il progetto Apps Script collegato alla web app MENUMAL.
2. Aggiornare i file `Code.gs`, `Admin.html`, `AdminStyles.html`, `AdminScripts.html`.
3. Aggiornare il manifest `appsscript.json` solo se e stato modificato.
4. Salvare tutti i file.
5. Aprire `Deploy > Manage deployments`.
6. Modificare il deployment web app esistente.
7. Selezionare `Version > New version`.
8. Deploy.
9. Mantenere lo stesso URL della web app; creare un nuovo deployment solo se si vuole cambiare endpoint.

## Controlli Apps Script / MENUMAL

Dopo il deploy:

1. Aprire la web app MENUMAL.
2. Verificare che non compaia il JSON del manifest in pagina.
3. Premere `Modifica prodotto`.
4. Cercare un prodotto, aprire una scheda e controllare che la pagina editor si apra.
5. Non premere salva se non si vuole cambiare il Google Sheet.
6. Aprire l'endpoint `?mode=menu` e controllare che torni JSON valido.

Controlli dati attesi nell'ultimo audit:

- item totali: `49`
- `patatine-fritte`: assente
- `gin-lemon`: sezione `drink`, visibile, disponibile, descrizione `Gin Malfy, soda al limone.`
- `granita`: sezione `gelato`, visibile, disponibile, descrizione `Gusti disponibili: menta, limone, ciliegia e granatina. Ordina al tavolo o ritira al Bar`
- `panache`: nome `Panachè (Radler)`, sezione `birre`, nascosto, disponibile

## Procedura Agri-menu / GitHub Pages

Per pubblicare il sito pubblico:

1. Aggiornare i sorgenti in repo.
2. Incrementare `APP_VERSION` in `/Users/andrea/Desktop/Agri-Menu/src/main.js`.
3. Aggiornare i riferimenti versione in `index.html`, `service-worker.js` e `public/service-worker.js`.
4. Eseguire:

```bash
npm run build
npm run verify:release
```

5. Se `verify:release` segnala file spuri in `dist`, rimuovere solo i duplicati locali tipo `* 2.*` dentro `dist` e rilanciare il controllo.
6. Controllare che `generated/main.runtime.<APP_VERSION>.js` sia presente.
7. Fare commit e push su `main`.
8. Verificare GitHub Pages con cache bust, per esempio:

```bash
curl -L "https://molinosantamarta.github.io/aperitivo-menu/?nocache=YYYYMMDDx"
```

## Problemi noti gia risolti

- In `AdminScripts.html` non usare direttamente la stringa letterale `preview://` nei controlli endpoint. La versione stabile usa:

```js
const previewEndpointPrefix = "preview" + "://";
```

Questo evita problemi di parsing dopo copia/deploy in Apps Script.

- Se i bottoni MENUMAL non rispondono dopo deploy, ricontrollare prima `AdminScripts.html`: spesso il problema e un copia/incolla incompleto o un file Apps Script non salvato.
- `public/generated` e ignorata da git; il runtime tracciato e nella cartella root `generated`.
- Prima di pubblicare, cercare stringhe promo rimosse con:

```bash
rg -n "Country Party|Mogathe|Far West|country-2026|country-party" src index.html service-worker.js public generated apps-script docs scripts -g '!public/generated'
```

## Stato ultimo audit

- MENUMAL live: deploy raggiungibile e script admin parse OK.
- Google Sheet: tab admin presenti e dati prodotto coerenti con MENUMAL.
- Endpoint JSON: `patatine-fritte` assente, `gin-lemon`, `granita`, `panache` coerenti.
- Agri-menu: versione locale `20260707c`; promo Country/Far West/Mogathe rimossa dal carosello Agri-Eventi.
