export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, players, provider, openRouterModel } = req.body || {};
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
      return res.status(400).json({ error: 'Dati incompleti: la lista dei calciatori è obbligatoria ed è richiesto un array.' });
    }

    // Format roster for the AI model
    const playersListText = players.map(p => 
      `- ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country} | Costo d'acquisto: ${p.purchaseCost || 0} cr`
    ).join('\n');

    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio). Il tuo compito è analizzare la rosa completa dei calciatori a disposizione della squadra "${teamName || 'Mia Squadra'}" e schierare la FORMAZIONE IDEALE da bonus per massimizzare i punteggi.

Ecco la rosa completa dei calciatori della squadra suddivisi per ruolo, ciascuno con il suo ID unico, ruolo, nome, nazione di appartenenza e costo d'acquisto:
${playersListText}

REGOLE DI SELEZIONE E SCHIERAMENTO (MANDATORIE E STRICHE):
1. Devi scegliere la migliore formazione possibile (esattamente 11 Titolari) ed i restanti giocatori andranno in panchina.
2. Scegli il modulo tattico migliore (tra: "4-3-3", "4-4-2", "3-5-2", "3-4-3", "5-3-2") che valorizzi al massimo i tuoi migliori giocatori da bonus.
3. Rispetta rigorosamente i ruoli del FantaMondiale per i titolari in base al modulo scelto:
   - "4-3-3": 1 POR, 4 DIF, 3 CEN, 3 ATT
   - "4-4-2": 1 POR, 4 DIF, 4 CEN, 2 ATT
   - "3-5-2": 1 POR, 3 DIF, 5 CEN, 2 ATT
   - "3-4-3": 1 POR, 3 DIF, 4 CEN, 3 ATT
   - "5-3-2": 1 POR, 5 DIF, 3 CEN, 2 ATT
4. I giocatori titolari schierati e quelli in panchina devono corrispondere ESATTAMENTE ai calciatori presenti nella rosa fornita. Non inventare o aggiungere nuovi calciatori.
5. Fai ricerche web in tempo reale (Google Search / Web Search) per verificare le notizie reali di questa settimana relative a infortuni, squalifiche, titolarità o stato di forma recente per ciascuno di questi calciatori per escludere o inserire le persone giuste!
6. **Mandatorio per lo schieramento:** La formazione DEVE basarsi rigorosamente sullo stato di forma recente. Devi escludere dai titolari i giocatori infortunati, squalificati o non dati come probabili titolari reali nelle ultime notizie. Preferisci sempre giocatori in salute e con altissima probabilità di essere titolari e portare bonus.
7. **VERIFICA CONVOCAZIONE ED ELIMINAZIONE MONDIALE (MANDATORIA E CRUCIALE):** Esegui ricerche web mirate per verificare con assoluta certezza se la nazionale di appartenenza di ogni calciatore partecipa a questo Mondiale e se non è già stata eliminata dal torneo ad oggi. Se la nazionale di un calciatore è assente o è GIÀ STATA ELIMINATA:
   - Non inserire assolutamente il calciatore negli 11 titolari (`starters`).
   - Devi inserirlo obbligatoriamente alla fine dell'elenco dei panchinari (`bench`).
   - Nella chiave `playersAnalysis` per quel calciatore, imposta `starterProbability` tassativamente a `"0%"`, `playerCategory` tassativamente a `"scarso"`, e descrivi questo stato in `formState` inserendo obbligatoriamente all'inizio: "ELIMINATO: [Spiegazione dell'assenza o dell'eliminazione della nazionale dal Mondiale ad oggi]".

REGOLE DI VALUTAZIONE E CATEGORIA (CRUCIALE):
Assegna a ciascun calciatore della rosa una valutazione 'playerCategory' rigorosamente tra questi 5 valori in base alle sue ultime performance reali e prospettive nel Mondiale:
- "scarso": gioca poco o niente, pochi bonus, nazionale debole o attualmente infortunato/squalificato di lungo corso.
- "accettabile": titolare in nazionale debole, pochi bonus.
- "buono": titolare in nazionale forte, qualche bonus, pochi malus.
- "ottimo": titolare fisso con ottimi bonus (gol/assist) e pochi malus.
- "stella": top player assoluto, leader indiscusso, rigori/piazzati, altissimo rendimento in nazionale forte o leader indiscusso.

REGOLE DI ESATTEZZA NUMERICA DELLE PRESENZE:
- Per la chiave 'appearances' di ogni calciatore nella chiave 'playersAnalysis', devi identificare il numero REALE ed ESATTO di presenze, gol e assist effettuati specificamente nella stagione calcistica più recente 2025/2026, contando ESCLUSIVAMENTE e SOLO le partite in CAMPIONATO (al fine di uniformare i dati, escludendo coppe nazionali o nazionali). Se dopo molteplici tentativi non trovi dati certi, scrivi "Dati non disponibili nella stagione 25/26", ma fai ogni sforzo per trovare l'esatta statistica reale ad oggi.

Fornisci la risposta RIGOROSAMENTE in formato JSON con la seguente struttura esatta:
{
  "recommendedModule": "4-3-3", // Il modulo consigliato scelto tra i 5 disponibili
  "starters": ["id_calciatore_1", "id_calciatore_2", ...], // Array degli ID dei calciatori titolari (devono essere esattamente 11 e rispettare il modulo)
  "bench": ["id_calciatore_3", "id_calciatore_4", ...], // Array degli ID di tutti i restanti calciatori non titolari
  "playersAnalysis": {
    "id_calciatore_1": {
      "playerCategory": "stella", // scarso, accettabile, buono, ottimo, stella
      "starterProbability": "95%",
      "appearances": "32 presenze, 10 gol in campionato nella stagione 25/26", // presenze/gol campionato reali 25/26
      "formState": "In forma strepitosa, reduce da doppietta decisiva." // Breve notizia/stato di forma reale della settimana
    },
    "id_calciatore_2": {
      ...
    }
  },
  "tacticalJustification": "Spiega chiaramente e in dettaglio quali scelte precise hai preso per produrre questa formazione, evidenziando lo stato di forma recente considerato, chi hai escluso o inserito a causa di squalifiche, infortuni o dubbi di titolarità, e perché questo modulo e questi titolari sono ottimali (massimo 120 parole)."
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

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
