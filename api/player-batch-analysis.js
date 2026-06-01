import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { players, provider, openRouterModel } = req.body || {};
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
    if (!players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ error: 'Dati incompleti: la lista dei calciatori (array) è obbligatoria.' });
    }

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);

    // Format roster players for the AI
    const targetPlayersText = players.map(p => 
      `- ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country}`
    ).join('\n');

    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio).
Il tuo compito è analizzare in modo dettagliato ed accurato i seguenti calciatori specificamente per il prossimo turno del torneo:
${targetPlayersText}

REGOLE DI ACCURATEZZA CRONOLOGICA E VERIFICA NEWS (MANDATORIE E CRUCIALI):
- Il torneo di riferimento è il **Mondiale 2026 (World Cup 2026)**, che si gioca nel **2026**.
- Devi effettuare ricerche mirate online in tempo reale tramite Web Search per ciascuno dei calciatori sopra elencati per verificare infortuni reali, squalifiche, stato di forma recente e titolarità aggiornata ad oggi.
- È TASSATIVAMENTE VIETATO riportare notizie vecchie o di tornei passati. Ignora totalmente notizie obsolete come l'assenza di Thibaut Courtois dagli Europei 2024. Per il Mondiale 2026, Courtois fa parte della rosa ed è attivo!

REGOLE DI ESATTEZZA NUMERICA DELLE PRESENZE (CRUCIALE):
- Per la chiave 'appearances' di ogni calciatore, devi identificare tramite ricerca statistica reale il numero ESATTO di presenze registrate in campionato nella stagione calcistica più recente 2025/2026 (escludendo coppe nazionali o coppe continentali).
  * Se il ruolo è 'POR', riporta: presenze, clean sheet e gol subiti (es. "34 presenze, 12 clean sheet, 28 gol subiti nella stagione 25/26").
  * Per tutti gli altri ruoli, riporta: presenze, gol e assist (es. "32 presenze, 10 gol, 4 assist in campionato nella stagione 25/26").
  * Se dopo molteplici tentativi non trovi dati certi, scrivi "Dati non disponibili nella stagione 25/26".

REGOLE DI VALUTAZIONE E CATEGORIA:
- Scegli la 'playerCategory' rigorosamente tra: "scarso", "accettabile", "buono", "ottimo", "stella".
- Scegli 'valueForMoney' rigorosamente tra: "Ottimo", "Buono", "Rischioso", "Sopravvalutato".
- Sotto 'alternatives', includi sempre esattamente 1 o 2 concorrenti reali dello stesso ruolo in quella Nazionale (es. Casteels per Courtois; Openda per Lukaku; Strand Larsen per Haaland).
  * **MATEMATICA AL 100% (CRUCIALE):** La somma tra 'starterProbability' del calciatore analizzato (es. 80%) e le 'playProbability' dei suoi concorrenti (es. 20%) deve essere tassativamente pari al 100%.

VERIFICA CONVOCAZIONE ED ELIMINAZIONE MONDIALE:
Nazioni attualmente eliminate o assenti dal Mondiale ad oggi: ${ELIMINATED_COUNTRIES.join(', ')}.
- Se la nazione di un calciatore NON è presente in tale elenco (ad esempio Norvegia, Belgio, ecc.), considerala attiva e qualificata.
- Se è inclusa nell'elenco di quelle eliminate:
  * Imposta 'starterProbability' tassativamente a '0%'.
  * Imposta 'playerCategory' tassativamente a 'scarso'.
  * Imposta 'matchStrength' tassativamente a 0.
  * Inizia 'formState' con la dicitura: "ELIMINATO: [Spiegazione dettagliata]".

VALUTAZIONE PROSSIMO TURNO (matchStrength & matchAnalysis):
- **matchStrength**: valore numerico da 1 a 100 che indichi la forza relativa del calciatore specificamente per il prossimo turno in base a valore, forma e livello dell'avversario reale. NOTA: in caso di partita proibitiva o avversario durissimo, questo valore deve scendere drasticamente.
- **matchAnalysis**:
  - **nextOpponent**: deve trattarsi tassativamente ed esclusivamente del nome proprio di una reale nazionale di calcio (es. "Brasile", "Francia", "Spagna"). **DIVIETO ASSOLUTO:** È severamente vietato usare diciture generiche o di gironi (come "Avversario Girone", "Fase a gironi", "Girone E", "TBD"). **FALLBACK MANDATORIO:** Se non trovi la partita esatta, identifica il girone reale della nazione nel Mondiale 2026 ed indica uno degli altri 3 paesi presenti in tale girone.
  - **criteriaText**: spiegazione esplicita in 2-3 frasi del punteggio di forza e dei criteri considerati.

FORMATO DELLA RISPOSTA (MANDATORIO):
Fornisci la risposta RIGOROSAMENTE in formato JSON con la seguente struttura esatta (sostituendo le chiavi con i reali ID forniti nella lista sopra):
{
  "playersAnalysis": {
    "id_del_giocatore_1": {
      "playerCategory": "stella",
      "starterProbability": "90%",
      "valueForMoney": "Ottimo",
      "appearances": "32 presenze, 10 gol in campionato nella stagione 25/26",
      "formState": "Descrizione fisica dello stato di forma e notizie reali su infortuni, allenamento o prestazioni di questa settimana (2 frasi max). DIVIETO ASSOLUTO: Non descrivere le sue caratteristiche generiche o che tipo di giocatore è.",
      "matchStrength": 85,
      "matchAnalysis": {
        "nextOpponent": "Spagna",
        "criteriaText": "Spiegazione esplicita del perché ha quel punteggio per questo turno in relazione all'avversario specifico."
      },
      "alternatives": [
        {
          "name": "Nome concorrente nello stesso ruolo in Nazionale",
          "playProbability": "10%"
        }
      ]
    }
  }
}

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
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          tools: [{ type: 'openrouter:web_search' }]
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }],
          generationConfig: { responseMimeType: "application/json" }
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

    // Programmatic override for eliminated/absent countries
    if (!parsedData.playersAnalysis) parsedData.playersAnalysis = {};
    
    // ==========================================
    // CRITICAL FIX: Robust key remapping - the AI model may use player names 
    // instead of IDs as keys (e.g. "Alisson Becker" instead of "s-2").
    // We MUST remap all keys to the correct internal player IDs.
    // ==========================================
    const remappedAnalysis = {};
    const originalKeys = Object.keys(parsedData.playersAnalysis);
    
    players.forEach(p => {
      // Try exact ID match first
      if (parsedData.playersAnalysis[p.id]) {
        remappedAnalysis[p.id] = parsedData.playersAnalysis[p.id];
        return;
      }
      
      // Try matching by player name (case-insensitive, trimmed)
      const nameKey = originalKeys.find(k => 
        k.trim().toLowerCase() === p.name.trim().toLowerCase()
      );
      if (nameKey && parsedData.playersAnalysis[nameKey]) {
        remappedAnalysis[p.id] = parsedData.playersAnalysis[nameKey];
        return;
      }
      
      // Try partial name match (last name or first name)
      const nameParts = p.name.toLowerCase().split(/\s+/);
      const partialKey = originalKeys.find(k => {
        const kLower = k.trim().toLowerCase();
        return nameParts.some(part => part.length > 2 && kLower.includes(part));
      });
      if (partialKey && parsedData.playersAnalysis[partialKey] && !remappedAnalysis[p.id]) {
        remappedAnalysis[p.id] = parsedData.playersAnalysis[partialKey];
        return;
      }
    });
    
    // If remapping produced results, use them; otherwise keep original (model used correct IDs)
    if (Object.keys(remappedAnalysis).length > 0) {
      parsedData.playersAnalysis = remappedAnalysis;
    }

    players.forEach(p => {
      const isEliminated = ELIMINATED_COUNTRIES.includes(p.country);
      if (isEliminated) {
        parsedData.playersAnalysis[p.id] = {
          playerCategory: "scarso",
          starterProbability: "0%",
          valueForMoney: "Sopravvalutato",
          appearances: parsedData.playersAnalysis[p.id]?.appearances || "Dati non disponibili nella stagione 25/26",
          formState: `ELIMINATO: La nazionale dell'${p.country} non partecipa o è stata eliminata dal Mondiale 2026.`,
          matchStrength: 0,
          matchAnalysis: {
            nextOpponent: "Nessuno",
            criteriaText: "La nazionale di appartenenza è stata eliminata o non partecipa al Mondiale."
          },
          alternatives: []
        };
      }
      
      // Ensure every player in the batch has an entry - create fallback if model omitted them
      if (!parsedData.playersAnalysis[p.id]) {
        parsedData.playersAnalysis[p.id] = {
          playerCategory: "buono",
          starterProbability: "50%",
          valueForMoney: "Buono",
          appearances: "Dati non disponibili nella stagione 25/26",
          formState: "Valutazione in corso.",
          matchStrength: 50,
          matchAnalysis: {
            nextOpponent: "Da verificare",
            criteriaText: "Analisi non disponibile per questo turno."
          },
          alternatives: []
        };
      }
    });

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
