export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, roster, provider, openRouterModel } = req.body || {};
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

    const systemPrompt = `Tu sei un esperto analista di Fantacalcio specializzato nel Fantamondiale. Il tuo compito è analizzare il roster attuale dell'utente e generare un'analisi ultra-concisa, adatta a essere letta in un piccolo box/fumetto UI (massimo 120-150 parole totali). Usa un tono directo, esperto e leggermente ironico.

Input ricevuti:
- Nome Squadra: ${teamName || 'Mia Squadra'}
- Roster attuale (calciatori divisi per ruolo):
  - Portieri (POR): ${roster.POR?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Difensori (DIF): ${roster.DIF?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Centrocampisti (CEN): ${roster.CEN?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Attaccanti (ATT): ${roster.ATT?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}

Se ci sono infortuni, ballottaggi e probabili formazioni reali per il Mondiale riferite a questi calciatori, considerale integrando le notizie reali più recenti da una ricerca web in tempo reale.

Struttura rigidamente l'output in 3 brevissimi punti elenco (usa il grassetto per le parole chiave, niente introduzioni o conclusioni inutili):

1. **Competitività:** Dai un voto sintetico o un giudizio sul livello generale del team (es. "Top tier", "Manca una scintilla", "Da sfoltire").
2. **Focus Ruoli & Lacune:** Indica chiaramente se mancano slot da completare per il regolamento o su quale reparto specifico focalizzarsi sul mercato (es. "Centrocampo corto", "Manca un top in attacco").
3. **Formazione Ideale:** Schiera l'11 migliore possibile in base al roster e alle ultime notizie reali sui titolari nel Mondiale (usa moduli standard come 3-4-3, 4-3-3, ecc.). Se ci sono ballottaggi critici, segnalali tra parentesi.`;

    let text = '';

    if (useOpenRouter) {
      const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const openRouterModelString = openRouterModel || 'google/gemini-2.5-flash';
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
          }]
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

    return res.status(200).json({ analysis: text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
