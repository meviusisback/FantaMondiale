import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, roster, budget, freePlayers, provider, openRouterModel, geminiModel } = req.body || {};
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
    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel, geminiModel);

    const POR_free = (freePlayers || []).filter(p => p.role === 'POR').slice(0, 15);
    const DIF_free = (freePlayers || []).filter(p => p.role === 'DIF').slice(0, 30);
    const CEN_free = (freePlayers || []).filter(p => p.role === 'CEN').slice(0, 30);
    const ATT_free = (freePlayers || []).filter(p => p.role === 'ATT').slice(0, 30);

    const formattedFreePOR = POR_free.map(p => `  * ID: ${p.id} | Nome: ${p.name} | Nazionale: ${p.country} | Valore Iniziale: ${p.initialValue} cr | Valutazione Forza: ${p.rating.toFixed(1)}`).join('\n') || '  Nessuno';
    const formattedFreeDIF = DIF_free.map(p => `  * ID: ${p.id} | Nome: ${p.name} | Nazionale: ${p.country} | Valore Iniziale: ${p.initialValue} cr | Valutazione Forza: ${p.rating.toFixed(1)}`).join('\n') || '  Nessuno';
    const formattedFreeCEN = CEN_free.map(p => `  * ID: ${p.id} | Nome: ${p.name} | Nazionale: ${p.country} | Valore Iniziale: ${p.initialValue} cr | Valutazione Forza: ${p.rating.toFixed(1)}`).join('\n') || '  Nessuno';
    const formattedFreeATT = ATT_free.map(p => `  * ID: ${p.id} | Nome: ${p.name} | Nazionale: ${p.country} | Valore Iniziale: ${p.initialValue} cr | Valutazione Forza: ${p.rating.toFixed(1)}`).join('\n') || '  Nessuno';

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

- Lista dei migliori prospetti rimasti liberi all'asta (divisi per ruolo, ordinati per forza):
  * Portieri (POR) Liberi:
${formattedFreePOR}

  * Difensori (DIF) Liberi:
${formattedFreeDIF}

  * Centrocampisti (CEN) Liberi:
${formattedFreeCEN}

  * Attaccanti (ATT) Liberi:
${formattedFreeATT}

Regole cruciali per massimizzare il punteggio all'asta:
1. Analisi del Tabellone e degli Accoppiamenti: Esegui una ricerca web sul tabellone/bracket reale dei Mondiali ad oggi. Valuta con chi finiranno a giocare le nazionali dei vari giocatori nei primi turni e nella fase a eliminazione diretta. Segnala se ci sono accoppiamenti proibitivi in arrivo che potrebbero causare eliminazioni premature di pedine chiave, o se ci sono cammini favorevoli nel tabellone da sfruttare!
2. Profondità, Rotazioni e Copertura della Rosa: Valuta se la rosa è "corta" per garantire buone rotazioni e avere sempre titolari attivi disponibili (es. per coprire squalifiche o turn-over). Indica quanti giocatori acquistare per ruolo per assicurare questa copertura ottimale della rosa.
3. Modificatori di Difesa e Centrocampo (MANDATORIO): Valuta l'utilità strategica dei modificatori per strutturare la rosa:
   - Modificatore Difesa: basato sulla media voto pura (senza bonus/malus) dei difensori. Con 3 difensori: bonus di +1 con media >= 6.5, sale di +1 ogni 0.25 in più. Con 4 difensori: bonus scatta a >= 6.25 (+1), a 6.5 è +2. Con 5 difensori: bonus scatta a >= 6.25 (+2), a 6.5 è +3.
   - Modificatore Centrocampo: basato sulla media voto pura dei centrocampisti. Con 3 centrocampisti: bonus di +1 con media >= 6.75. Con 4 centrocampisti: bonus di +1 con media >= 6.5. Con 5 o 6 centrocampisti: bonus di +1 con media >= 6.25.
4. Calcolo Budget Strategico e Scelta dei Prospetti (MANDATORIO E CRUCIALE):
    - Calcola quanti calciatori l'utente ha in rosa in totale basandoti sui dati in input (somma il numero di giocatori nei 4 ruoli). Per raggiungere il target minimo regolamentare di 25 calciatori in totale, determina gli slot vuoti mancanti: slotMancanti = 25 - N.
    - Calcola il budget medio per ogni slot vuoto dividendo i crediti rimasti (${budget || 0} cr) per slotMancanti.
   - Nella scelta dei 3-5 giocatori da consigliare (che devono essere presi rigorosamente tra i migliori disponibili nella lista dei prospetti liberi):
     * Puntare sempre sui Top Player: L'IA deve privilegiare costantemente i migliori giocatori in assoluto (quelli con 'Valutazione Forza' elevata, ad esempio > 8.5/9.0) che risultano ancora liberi sul mercato. NON escludere i top player anche se il budget dell'utente è ristretto o il budget medio per slot è basso!
     * Evitare Nazionali Minori/Deboli: NON consigliare o proporre giocatori appartenenti a nazionali minori o storicamente deboli (come l'Egitto, l'Iran, la Nuova Zelanda, l'Algeria o simili), anche se si tratta di stelle isolate (come Mohamed Salah dell'Egitto). Concentrati rigorosamente su giocatori di nazionali blasonate, forti e altamente competitive (es. Francia, Argentina, Brasile, Inghilterra, Germania, Spagna, Portogallo, Belgio, Paesi Bassi, ecc.) che hanno altissime probabilità di superare i gironi e avanzare fino alle fasi finali del torneo (garantendo così all'utente molte più partite a voto e bonus nel tempo).
     * Adeguamento Dinamico del Range di Offerta: Invece di ripiegare su giocatori mediocri o di basso livello, consiglia sempre i migliori profili ma adegua il range di offerta (min - max) consigliato per ciascuno in base alla disponibilità di crediti. Se il budget medio per slot è limitato, proponi offerte più conservative (es: vicino al valore iniziale del giocatore) per tutelare la possibilità di completare la rosa. Se il budget medio è generoso, suggerisci offerte molto aggressive per sbaragliare la concorrenza.
     * Coerenza Ruoli e Strategia (MANDATORIO E CRUCIALE): I 3-5 giocatori inseriti in recommendedPlayerIds DEVONO essere perfettamente coerenti con le lacune strategiche identificate e discusse al punto 2 ("Strategia Asta & Lacune da Colmare"). Ad esempio, se scrivi che la priorità assoluta della rosa è acquistare dei difensori (es: per il Modificatore Difesa), allora l'array recommendedPlayerIds DEVE contenere difensori di alto livello scelti dalla lista dei prospetti, ed evitare di suggerire solo attaccanti. C'è assoluto bisogno di coerenza logica tra i suggerimenti testuali e i giocatori taggati come consigliati.
     * Allineamento Nomi-ID (MANDATORIO): Nel testo strategico del punto 2, devi nominare ESPLICITAMENTE ciascuno dei 3-5 giocatori che hai consigliato e inserito in \`recommendedPlayerIds\`. I giocatori citati nel testo come raccomandati d'acquisto DEVONO corrispondere esattamente a quelli indicati in \`recommendedPlayerIds\` (stesso ID per lo stesso giocatore citato, nessun disallineamento!).
   - Consiglia esattamente da 3 a 5 calciatori scelti tra i migliori prospetti liberi e indica per ciascuno un range di offerta consigliato (min - max) coerente con questo principio.


Rispondi RIGOROSAMENTE con un oggetto JSON con le seguenti chiavi:
- analysisText: stringa contenente l'analisi strutturata in 2 punti elenco (usa il grassetto per le parole chiave, massimo 150-180 parole totali):
  1. **Voto, Profondità & Tabellone**: giudizio complessivo del roster attuale.
  2. **Strategia Asta & Lacune da Colmare**: indicazioni su quali ruoli/nazionali acquistare per colmare le lacune, quanti giocatori prendere per garantire buone rotazioni e come spendere tutto il budget residuo incrementando i range d'offerta per profili chiave.
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
      const modelToUse = geminiModel || 'gemini-flash-lite-latest';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;

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
      if (!text) {
        console.error("Gemini Native Team Analysis API returned empty candidates. Full payload:", JSON.stringify(data));
      }
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
