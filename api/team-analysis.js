import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, roster, budget, freePlayers, provider, openRouterModel } = req.body || {};
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
    if (!roster) {
      return res.status(400).json({ error: 'Dati incompleti: roster è obbligatorio.' });
    }

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);

    const systemPrompt = `Tu sei un esperto analista di Fantacalcio specializzato nel Fantamondiale. Il tuo compito è analizzare il roster attuale dell'utente e generare un'analisi strategica ultra-concisa, adatta a essere letta in un piccolo box/fumetto UI (massimo 150-180 parole totali). Usa un tono diretto, esperto e fortemente focalizzato sul gioco FantaMondiale.
L'analisi DEVE essere interamente centrata sulle dinamiche del FantaMondiale, con lo scopo primario di indicare le soluzioni migliori per ottenere BONUS (gol, assist, reti inviolate) e MASSIMIZZARE I PUNTEGGI, evitando commenti generici sul calcio reale.

IMPORTANTE: Questa analisi viene solitamente usata durante l'ASTA. L'obiettivo principale dell'utente è massimizzare la qualità degli acquisti strategici.

Nazioni attualmente ELIMINATE o ASSENTI dal Mondiale ad oggi: ${ELIMINATED_COUNTRIES.join(', ')}
- **IMPORTANTE:** Fai riferimento ESCLUSIVAMENTE a questa lista per stabilire se una nazionale è eliminata o non partecipa. Se una nazione NON è presente in questa lista (es. Norvegia, Belgio, ecc.), devi considerarla a tutti gli effetti come ATTIVA e QUALIFICATA nel torneo dell'utente, ignorando qualsiasi dato reale di mancata qualificazione (es. Haaland e la Norvegia sono considerati attivi e giocano nel Mondiale dell'utente!).

REGOLE DI ACCURATEZZA CRONOLOGICA E VERIFICA NEWS (MANDATORIE E CRUCIALI):
- Il torneo di riferimento è il Mondiale 2026 (World Cup 2026), che si gioca nel corrente anno 2026.
- Qualsiasi notizia su infortuni, squalifiche, convocazioni e cammini nel tabellone deve fare riferimento all'anno 2026 e al Mondiale 2026. Ignora dati obsoleti legati ad altri tornei (es. Euro 2024 o qualificazioni di anni passati). Usa fonti fresche e verificate, double-checking su più fonti.

Input ricevuti:
- Nome Squadra: ${teamName || 'Mia Squadra'}
- Crediti rimasti: ${budget || 0} cr
- Roster attuale (calciatori divisi per ruolo):
  - Portieri (POR): ${roster.POR?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Difensori (DIF): ${roster.DIF?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Centrocampisti (CEN): ${roster.CEN?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Attaccanti (ATT): ${roster.ATT?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}

- Lista dei migliori prospetti rimasti liberi all'asta (seleziona tra questi per consigliare 3-5 giocatori da acquistare):
${freePlayers?.map(p => `  * ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country} | Valore Iniziale: ${p.initialValue} cr | Valutazione Forza: ${p.rating.toFixed(1)}`).join('\n') || 'Nessuno'}

Regole cruciali per massimizzare il punteggio all'asta:
1. **Analisi del Tabellone e degli Accoppiamenti:** Esegui una ricerca web sul tabellone/bracket reale dei Mondiali ad oggi. Valuta con chi finiranno a giocare le nazionali dei vari giocatori nei primi turni e nella fase a eliminazione diretta. Segnala se ci sono accoppiamenti proibitivi in arrivo che potrebbero causare eliminazioni premature di pedine chiave, o se ci sono cammini favorevoli nel tabellone da sfruttare!
2. **Profondità e Copertura della Rosa:** Valuta se la rosa è "corta" in alcuni reparti (es. troppi pochi giocatori attivi in difesa o attacco) o ha lacune e dove intervenire con i crediti rimasti per colmare le lacune.
3. **Scelta dei migliori prospetti (CRUCIALE):** Seleziona esattamente da 3 a 5 calciatori tra quelli forniti nella lista dei prospetti rimasti liberi che meglio rispondono alle lacune evidenziate e ai crediti rimasti. Nella scelta, valuta con attenzione sia la reale **probabilità di giocare titolare** del calciatore che le **probabilità di avanzamento della sua Nazionale** nel torneo (più avanzano, più partite giocheranno, portando potenzialmente più punteggi/bonus).

Rispondi RIGOROSAMENTE con un oggetto JSON con le seguenti chiavi:
- analysisText: stringa contenente l'analisi strutturata in 2 punti elenco (usa il grassetto per le parole chiave, massimo 150-180 parole totali):
  1. **Voto, Profondità & Tabellone**: giudizio complessivo del roster attuale.
  2. **Strategia Asta & Lacune da Colmare**: indicazioni su quali ruoli/nazionali acquistare per colmare le lacune.
- recommendedPlayerIds: un array di stringhe contenente gli ID (es: ["s-12", "s-15"]) dei 3-5 calciatori consigliati presi esclusivamente dalla lista dei prospetti fornita sopra.

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
              content: systemPrompt
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
            parts: [{ text: systemPrompt }]
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
      
      if (parsedData.analysisText) {
        parsedData.analysis = parsedData.analysisText;
      }
    } catch (e) {
      parsedData = {
        analysis: text,
        analysisText: text,
        recommendedPlayerIds: []
      };
    }

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
