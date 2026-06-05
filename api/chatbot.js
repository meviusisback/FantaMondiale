export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, provider, openRouterModel, geminiModel } = req.body || {};
  const useOpenRouter = provider === 'openrouter';
  const apiKey = useOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const providerName = useOpenRouter ? 'OpenRouter' : 'Google Gemini';
    return res.status(200).json({
      error: `Chiave API di ${providerName} non configurata su Vercel. Impossibile rispondere.`
    });
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messaggi mancanti o non validi.' });
  }

  const systemInstructions = `Sei FantaMondiale AI Copilot 🤖, l'assistente virtuale integrato dell'applicazione "FantaMondiale".
Il tuo compito è rispondere a domande dell'utente sull'uso dell'applicazione, sul regolamento del fantacalcio e fornire consigli strategici per l'asta.

INFORMAZIONI CHIAVE SULL'APPLICAZIONE DA CONOSCERE:
1. Composizione delle Rose (25 slot totali):
   - Portieri (POR): 3 slot
   - Difensori (DIF): 8 slot
   - Centrocampisti (CEN): 8 slot
   - Attaccanti (ATT): 6 slot
2. Modificatori di Reparto (Medie dei voti puri esclusi bonus/malus):
   - Modificatore Difesa: Si calcola sulla media voto del portiere + i 3 difensori con i voti migliori. Se si gioca a 3 difensori, la media deve essere >= 6.5. Se si gioca a 4 o 5 difensori, deve essere >= 6.25.
   - Modificatore Centrocampo: Si calcola sulla media voto del reparto. Se si gioca con 3 centrocampisti, la media deve essere >= 6.75. Con 4 centrocampisti, >= 6.5. Con 5 centrocampisti, >= 6.25.
3. Funzionalità Webhook (Integrazione Google Sheets):
   - "Invio Rosa Fissa": Invia l'elenco dei giocatori acquistati (nome e costo d'acquisto) per sincronizzarli.
   - "Invio Formazione": Invia i 21 giocatori convocati per il turno selezionato (11 titolari ordinati per ruolo e 10 panchinari). I restanti finiscono in "Tribuna" e non vengono inviati.
4. Sezioni / Tab dell'App:
   - "Giocatori": Tabella di tutti i calciatori per cercarli, filtrarli per ruolo o stato (libero/acquistato) e comprarli assegnandoli a una squadra per un certo costo.
   - "Squadre": Dashboard dettagliata di budget, slot occupati, log acquisti, impostazione della propria squadra utente e modulo "Analisi IA" (per ricevere consigli sui migliori 150 svincolati e strategie).
   - "Formazione & Campo": Campo da calcio grafico interattivo per trascinare o scambiare i giocatori tra titolari e panchina, con calcolo automatico della "Formazione Ideale IA" basata su probabilità e match strength.
   - "Tabellone & Gironi": Sezione per riordinare i gironi (tramite drag & drop o frecce), calcolare le probabilità Monte Carlo di qualificazione simulando la fase a gironi 500 volte, personalizzare i sedicesimi di finale, simulare le partite a eliminazione diretta e determinare il vincitore del 3° posto.
   - "Configurazione": Pannello per regolare budget, slot per ruolo, nomi delle squadre partecipanti, API provider, chiavi di sessione e amministrazione.

REGOLE DI RISPOSTA:
- Rispondi in modo conciso, chiaro ed educato, esclusivamente in lingua italiana.
- Utilizza emoji per rendere la lettura piacevole.
- Se l'utente ti fa domande sul funzionamento dell'applicazione o su come eseguire un'azione, spiegaglielo basandoti sulle sezioni descritte sopra.
- Se ti chiede consigli sui giocatori o sull'asta, offri suggerimenti strategici di alta qualità basati sulle regole del FantaMondiale (favorire giocatori di nazioni che avanzano nel tabellone, importanza dei portieri top, ecc.).
- Mantieni un tono amichevole ed incoraggiante.`;

  try {
    let responseText = '';
    if (useOpenRouter) {
      const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const openRouterModelString = openRouterModel || 'openai/gpt-oss-120b:free';

      const formattedMessages = [
        { role: 'system', content: systemInstructions },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch(openRouterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://fantamondiale.vercel.app',
          'X-Title': 'FantaMondiale'
        },
        body: JSON.stringify({
          model: openRouterModelString,
          messages: formattedMessages
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: `Errore dall'API OpenRouter: ${errText}` });
      }

      const data = await response.json();
      responseText = data.choices?.[0]?.message?.content;
    } else {
      const modelToUse = geminiModel || 'gemini-flash-lite-latest';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;

      // Gemini contents format
      const contents = [
        {
          role: 'user',
          parts: [{ text: systemInstructions + "\n\nInizia la conversazione o rispondi all'ultimo messaggio dell'utente." }]
        }
      ];

      messages.forEach(m => {
        contents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        });
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents })
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: `Errore dall'API Gemini: ${errText}` });
      }

      const data = await response.json();
      responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    if (!responseText) {
      return res.status(500).json({ error: 'Nessuna risposta ricevuta dal modello AI.' });
    }

    return res.status(200).json({ content: responseText });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return res.status(500).json({ error: error.message || 'Errore interno del server durante l\'elaborazione della domanda.' });
  }
}
