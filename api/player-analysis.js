export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      error: 'Chiave API di Gemini non configurata. Aggiungi GEMINI_API_KEY alle variabili d\'ambiente di Vercel.'
    });
  }

  try {
    const { name, country, role } = req.body;
    if (!name || !country || !role) {
      return res.status(400).json({ error: 'Dati incompleti: name, country e role sono obbligatori.' });
    }

    const prompt = `Sei un esperto giornalista sportivo e analista calcistico internazionale. 
Fornisci un'analisi dettagliata e accurata in lingua italiana per il calciatore: ${name} (Nazionale: ${country}, Ruolo: ${role}).
Esegui una ricerca online tramite Google Search per ottenere le informazioni calcistiche reali più recenti ed aggiornate ad oggi (squadra attuale di club, presenze e gol nell'ultima stagione, probabilità stimate per la sua titolarità nei prossimi mondiali o competizioni internazionali).

Fornisci i dati strutturati RIGOROSAMENTE in formato JSON con le seguenti chiavi:
- club: la squadra di club attuale in cui gioca (es. "Inter Miami", "Real Madrid")
- appearances: le presenze e gol registrate nell'ultima stagione di club o nazionale (es. "34 presenze, 12 gol" o "42 presenze, 2 assist")
- starterProbability: stima percentuale (es. "85%" o "40%") che giochi come titolare nel Mondiale / competizioni internazionali
- impactScore: un valore numerico intero da 0 a 100 che indica l'impatto tecnico e fantacalcistico del giocatore (es. 92)
- valueForMoney: valutazione sintetica del rapporto qualità/prezzo (scegli rigorosamente tra: "Ottimo", "Buono", "Rischioso", "Sopravvalutato")
- description: una breve descrizione qualitativa del profilo del giocatore, i suoi punti di forza ed il suo ruolo tattico (circa 2-3 frasi).

Rispondi esclusivamente con il codice JSON, senza alcun blocco di codice markdown o testo introduttivo.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

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
    
    // Extract text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
