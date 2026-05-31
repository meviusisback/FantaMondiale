import { getEliminatedCountries } from './utils.js';

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

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);

    const systemPrompt = `Tu sei un esperto analista di Fantacalcio specializzato nel Fantamondiale. Il tuo compito è analizzare il roster attuale dell'utente e generare un'analisi strategica ultra-concisa, adatta a essere letta in un piccolo box/fumetto UI (massimo 120-150 parole totali). Usa un tono diretto, esperto e fortemente focalizzato sul gioco FantaMondiale.
L'analisi DEVE essere interamente centrata sulle dinamiche del FantaMondiale, con lo scopo primario di indicare le soluzioni migliori per ottenere BONUS (gol, assist, reti inviolate) e MASSIMIZZARE I PUNTEGGI, evitando commenti generici sul calcio reale.

Nazioni attualmente ELIMINATE o ASSENTI dal Mondiale ad oggi: ${ELIMINATED_COUNTRIES.join(', ')}

Input ricevuti:
- Nome Squadra: ${teamName || 'Mia Squadra'}
- Roster attuale (calciatori divisi per ruolo):
  - Portieri (POR): ${roster.POR?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Difensori (DIF): ${roster.DIF?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Centrocampisti (CEN): ${roster.CEN?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}
  - Attaccanti (ATT): ${roster.ATT?.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}

Regole cruciali per massimizzare il punteggio:
1. Pesa la Nazionale: Calciatori di Nazionali candidate ad andare avanti (es. Francia, Brasile, Argentina) porteranno più partite e quindi più occasioni di punteggio/bonus rispetto a chi esce ai gironi.
2. Caccia ai Bonus: Suggerisci rigorosamente rigoristi, tiratori di punizioni, difensori goleador e ali offensive che portano +3 (gol) e +1 (assist).
3. Ottimizzazione della Rosa: Individua se ci sono sbilanciamenti che limitano i bonus (es. troppi mediani di rottura da cartellino facile, o pochi attaccanti di peso in grado di accumulare punteggi alti).
4. **Verifica Eliminazione/Presenza al Mondiale (MANDATORIA):** Esegui una ricerca web e verifica con certezza se le nazionali dei calciatori in questo roster partecipano a questo Mondiale e non sono già state eliminate. Se noti calciatori le cui nazionali sono eliminate o assenti dal Mondiale, indicalo esplicitamente nel punto **Strategia Mercato & Lacune** e consiglia di sostituirli/svincolarli immediatamente ad oggi.

Struttura rigidamente l'output in 2 brevissimi punti elenco (usa il grassetto per le parole chiave, niente introduzioni o conclusioni inutili):

1. **Voto & Potenziale Bonus:** Dai un giudizio sulla competitività fantacalcistica del roster concentrandoti sul potenziale di bonus complessivo (es. "Voto 7.5: Ottimo potenziale offensivo ma centrocampo poco propenso ai bonus").
2. **Strategia Mercato & Lacune:** Indica chiaramente come muoversi per massimizzare i punteggi, segnalando quali pedine da bonus mancano (es. "Inserire un difensore d'attacco o un centrocampista offensivo per aumentare i +1/+3").`;

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
