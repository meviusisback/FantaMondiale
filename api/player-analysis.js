import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, country, role, provider, openRouterModel } = req.body || {};
  const useOpenRouter = provider === 'openrouter';
  const apiKey = useOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const keyName = useOpenRouter ? 'OPENROUTER_API_KEY' : 'GEMINI_API_KEY';
    const providerName = useOpenRouter ? 'OpenRouter' : 'Google Gemini';
    return res.status(200).json({
      fallback: true,
      error: `Chiave API di ${providerName} non configurata. Aggiungi ${keyName} alle variabili d'ambiente di Vercel.`
    });
  }

  try {
    if (!name || !country || !role) {
      return res.status(400).json({ error: 'Dati incompleti: name, country e role sono obbligatori.' });
    }

    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio).
Fornisci un'analisi strategica dettagliata e accurata in lingua italiana per il calciatore: ${name} (Nazionale: ${country}, Ruolo: ${role}).
Esegui una ricerca online in tempo reale tramite Google Search / Web Search per ottenere le informazioni calcistiche reali più recenti ed aggiornate ad oggi (squadra di club attuale, ultimo stato di forma, infortuni o convocazioni recenti, presenze e gol nella stagione 2025/2026).

REGOLE DI ESATTEZZA NUMERICA DELLE PRESENZE (CRUCIALE):
- Per la chiave 'appearances' del JSON, devi identificare tramite ricerca web statistica (ad esempio interrogando Transfermarkt, Soccerway o FBref) il numero REALE ed ESATTO di presenze, gol e assist effettuati dal calciatore ${name} specificamente nella stagione calcistica 2025/2026, contando ESCLUSIVAMENTE e SOLO le partite in CAMPIONATO (al fine di uniformare e rendere omogenei i dati tra tutti i giocatori, escludendo quindi coppe nazionali, coppe continentali e partite della Nazionale).
- È tassativamente vietato inventare, stimare o tirare a indovinare i numeri. Fai ricerche mirate (es. "${name} presenze gol 2025 2026 transfermarkt"). Se dopo molteplici tentativi non trovi dati certi, rispondi con "Dati non disponibili nella stagione 25/26", ma fai ogni sforzo per trovare l'esatta statistica reale ad oggi.

Regole FantaMondiale per formulare la tua risposta:
1. Impatto in relazione alla Nazionale di appartenenza:
   Nel FantaMondiale, un calciatore che gioca per una Nazionale favorita (es. Francia, Brasile, Argentina) ha un impatto fantacalcistico nettamente superiore rispetto a uno altrettanto bravo che gioca in una Nazionale con scarse probabilità di superare i gironi o avanzare nel torneo (es. Marocco, Canada). Questo perché chi va avanti nel tabellone gioca più partite e accumula più punteggi. Ad esempio: un portiere del Marocco, per quanto talentuoso, avrà un "impactScore" ridotto poiché la sua squadra giocherà verosimilmente meno partite rispetto a un portiere della Francia. Pesa fortemente le reali probabilità di avanzamento della sua Nazionale nei Mondiali.
2. Stato di Forma e Probabilità di Giocare:
   Considera l'ultimo stato di forma (prestazioni recenti con il club o con la nazionale nelle amichevoli/qualificazioni) e la probabilità effettiva che il giocatore parta da titolare o subentri con regolarità durante il Mondiale.
3. Descrizione Strategica:
   La descrizione deve essere fatta in relazione alle sue recenti performance storiche e alle aspettative/ruolo all'interno di questo specifico Mondiale, evidenziando se è il fulcro del gioco, un rigorista, o se rischia il posto in favore di altri titolari.
4. **VERIFICA CONVOCAZIONE ED ELIMINAZIONE MONDIALE (MANDATORIA E CRUCIALE):**
   Esegui una ricerca web mirata e verifica con assoluta certezza se la nazionale del calciatore (${country}) partecipa a questo Mondiale e se non è già stata eliminata dal torneo ad oggi. Se la sua nazionale NON partecipa o è GIÀ STATA ELIMINATA:
   - Imposta la chiave `starterProbability` tassativamente a `"0%"`.
   - Imposta la chiave `playerCategory` tassativamente a `"scarso"`.
   - Imposta la chiave `valueForMoney` tassativamente a `"Sopravvalutato"`.
   - Modifica la chiave `description` iniziando obbligatoriamente con la dicitura in maiuscolo: "ELIMINATO: [Spiegazione del fatto che la nazionale non partecipa o è stata eliminata]". Il resto della descrizione deve riflettere questa inutilizzabilità fantacalcistica.

Fornisci i dati strutturati RIGOROSAMENTE in formato JSON con le seguenti chiavi:
- club: la squadra di club attuale in cui gioca (es. "Inter Miami", "Real Madrid")
- appearances: le presenze e gol/assist registrati nella stagione calcistica più recente 2025/2026 in CAMPIONATO (es. "34 presenze, 12 gol nella stagione 25/26")
- starterProbability: stima percentuale (es. "85%" o "30%") che giochi effettivamente come titolare durante questo Mondiale.
- playerCategory: la classificazione del giocatore a livello FantaMondiale (scegli rigorosamente tra: "scarso", "accettabile", "buono", "ottimo", "stella"). Assegna il valore valutando attentamente i seguenti criteri:
  - "scarso": gioca poco o niente, pochi bonus, squadra nazionale di appartenenza scarsa
  - "accettabile": titolare in squadra scarsa, pochi bonus
  - "buono": titolare in squadra forte, qualche bonus, pochi malus
  - "ottimo": titolare e con buoni bonus e pochi malus
  - "stella": uno dei migliori giocatori del ruolo, ottimi bonus, ottimo rendimento, gioca per squadre nazionali forti oppure è leader indiscusso di una squadra più debole e garantisce ottimi bonus
- valueForMoney: valutazione sintetica del rapporto qualità/prezzo all'asta FantaMondiale (scegli rigorosamente tra: "Ottimo", "Buono", "Rischioso", "Sopravvalutato"). Ad esempio, un ottimo giocatore in una nazionale debole potrebbe essere "Sopravvalutato" o "Rischioso" perché uscirà presto.
- formState: una breve descrizione testuale (1 riga o massimo 2 frasi) dello stato di forma e notizie reali del calciatore aggiornate a questa settimana (es. "In gran forma dopo il gol decisivo nel weekend", "In dubbio per affaticamento muscolare", "Reduce da ottime prestazioni").
- description: descrizione del profilo del calciatore, valutando le performance recenti e le aspettative/performance al Mondiale in ottica FantaMondiale (2-3 frasi chiare).

Rispondi esclusivamente con il codice JSON, senza alcun blocco di codice markdown o testo introduttivo.`;

    let text = '';

    if (useOpenRouter) {
      const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const openRouterModelString = openRouterModel || 'openai/gpt-oss-120b:free';
      const openRouterResponse = await fetch(openRouterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://fantamondiale.vercel.app',
          'X-Title': 'FantaMondiale'
        },
        body: JSON.stringify({
          model: openRouterModelString,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: {
            type: 'json_object'
          },
          tools: [
            {
              type: 'openrouter:web_search'
            }
          ]
        })
      });

      if (!openRouterResponse.ok) {
        const errText = await openRouterResponse.text();
        return res.status(openRouterResponse.status).json({ error: `Errore dall'API OpenRouter: ${errText}` });
      }

      const openRouterData = await openRouterResponse.json();
      text = openRouterData.choices?.[0]?.message?.content;
    } else {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          tools: [{
            googleSearch: {}
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: `Errore dall'API Gemini: ${errText}` });
      }

      const data = await response.json();
      text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    if (!text) {
      return res.status(500).json({ error: 'Nessun testo ricevuto dal modello.' });
    }

    // Try parsing the text directly
    let parsedData;
    try {
      let cleanText = text.trim();
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.substring(7);
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.substring(3);
      }
      if (cleanText.endsWith('```')) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
      }
      parsedData = JSON.parse(cleanText.trim());
    } catch (e) {
      return res.status(500).json({ 
        error: 'Errore nel parsing del JSON restituito dal modello.', 
        rawText: text 
      });
    }

    // Programmatic override for eliminated/absent countries (automated daily AI check)
    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);
    if (ELIMINATED_COUNTRIES.includes(country)) {
      parsedData.starterProbability = "0%";
      parsedData.playerCategory = "scarso";
      parsedData.valueForMoney = "Sopravvalutato";
      parsedData.description = `ELIMINATO: La nazionale dell'${country} non partecipa o è stata eliminata da questo Mondiale. Il calciatore non è utilizzabile fantacalcisticamente.`;
      parsedData.formState = `La nazionale dell'${country} è esclusa dal Mondiale.`;
    }

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
