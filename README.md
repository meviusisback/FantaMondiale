# FantaMondiale 🏆

Web app per gestire un'asta fantasy calcistica direttamente da browser.

## Funzionalità

- Import dei giocatori da file CSV.
- Gestione delle squadre e della squadra attiva in asta.
- Acquisto giocatori e costruzione delle rose.
- Salvataggio e ripristino della sessione tramite file JSON.
- Reset dell'asta mantenendo giocatori e squadre configurate.

## Stack

- HTML
- CSS
- JavaScript
- Deploy su Vercel
- Repository su GitHub

## Come usare l'app

1. Apri l'app nel browser.
2. Carica il file CSV con l'elenco dei giocatori.
3. Seleziona la squadra attiva.
4. Gestisci l'asta acquistando i giocatori.
5. Salva la sessione in JSON per riprenderla in seguito.
6. Ripristina una sessione salvata quando necessario.

## Avvio locale

Puoi aprire direttamente `index.html` nel browser.

In alternativa, puoi avviare un piccolo server locale:

```bash
python3 -m http.server 8000
```

Poi apri `http://localhost:8000`.

## Deploy

Il progetto può essere pubblicato facilmente su Vercel e aggiornato tramite push su GitHub.

## Roadmap

- Salvataggio cloud della sessione.
- Supporto multi-dispositivo.
- Persistenza con Redis / Upstash.
- Miglioramenti UI/UX.

## Licenza

Licenza MIT.
