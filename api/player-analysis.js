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
Esegui una ricerca online in tempo reale tramite Google Search per ottenere le informazioni calcistiche reali più recenti ed aggiornate ad oggi (squadra di club attuale, ultimo stato di forma, infortuni o convocazioni recenti, presenze e gol in stagione).

Regole FantaMondiale per formulare la tua risposta:
1. Impatto in relazione alla Nazionale di appartenenza:
   Nel FantaMondiale, un calciatore che gioca per una Nazionale favorita (es. Francia, Brasile, Argentina) ha un impatto fantacalcistico nettamente superiore rispetto a uno altrettanto bravo che gioca in una Nazionale con scarse probabilità di superare i gironi o avanzare nel torneo (es. Marocco, Canada). Questo perché chi va avanti nel tabellone gioca più partite e accumula più punteggi. Ad esempio: un portiere del Marocco, per quanto talentuoso, avrà un "impactScore" ridotto poiché la sua squadra giocherà verosimilmente meno partite rispetto a un portiere della Francia. Pesa fortemente le reali probabilità di avanzamento della sua Nazionale nei Mondiali.
2. Stato di Forma e Probabilità di Giocare:
   Considera l'ultimo stato di forma (prestazioni recenti con il club o con la nazionale nelle amichevoli/qualificazioni) e la probabilità effettiva che il giocatore parta da titolare o subentri con regolarità durante il Mondiale.
3. Descrizione Strategica:
   La descrizione deve essere fatta in relazione alle sue recenti performance storiche e alle aspettative/ruolo all'interno di questo specifico Mondiale, evidenziando se è il fulcro del gioco, un rigorista, o se rischia il posto in favore di altri titolari.

Fornisci i dati strutturati RIGOROSAMENTE in formato JSON con le seguenti chiavi:
- club: la squadra di club attuale in cui gioca (es. "Inter Miami", "Real Madrid")
- appearances: le presenze e gol/assist registrati nell'ultima stagione di club e nazionale (es. "34 presenze, 12 gol")
- starterProbability: stima percentuale (es. "85%" o "30%") che giochi effettivamente come titolare durante questo Mondiale.
- impactScore: un valore numerico intero da 0 a 100 che indica l'impatto fantacalcistico totale atteso al FantaMondiale. Questo punteggio DEVE essere calcolato tenendo conto sia della forza individuale del giocatore sia del cammino previsto e della forza della sua Nazionale (country: ${country}). Nazionali favorite = punteggio potenziale molto più alto.
- valueForMoney: valutazione sintetica del rapporto qualità/prezzo all'asta FantaMondiale (scegli rigorosamente tra: "Ottimo", "Buono", "Rischioso", "Sopravvalutato"). Ad esempio, un ottimo giocatore in una nazionale debole potrebbe essere "Sopravvalutato" o "Rischioso" perché uscirà presto.
- description: descrizione del profilo del calciatore, valutando le performance recenti e le aspettative/performance al Mondiale in ottica FantaMondiale (2-3 frasi chiare).

Rispondi esclusivamente con il codice JSON, senza alcun blocco di codice markdown o testo introduttivo.`;

    let text = '';

    if (useOpenRouter) {
      const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const openRouterModelString = openRouterModel || 'nvidia/nemotron-3-super-120b-a12b:free';
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
          }
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

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
