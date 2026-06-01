import { getEliminatedCountries } from './utils.js';

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

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);    // Format roster with pre-calculated evaluations for the AI model
    const playersListText = players.map(p => 
      `- ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country} | Costo d'acquisto: ${p.purchaseCost || 0} cr | Categoria IA: ${p.playerCategory || 'buono'} | Probabilità Titolare: ${p.starterProbability || '50%'} | Forza del Turno (1-100): ${p.matchStrength || 50} | Avversario prossimo: ${p.nextOpponent || 'Da verificare'} | Stato Forma/News: ${p.formState || 'Nessuna news'}`
    ).join('\n');

    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio). Il tuo compito è analizzare la rosa dei calciatori a disposizione della squadra "${teamName || 'Mia Squadra'}" e schierare la FORMAZIONE IDEALE da bonus per massimizzare i punteggi, sfruttando le valutazioni strategiche pre-calcolate per ciascuno di essi.
Seleziona gli 11 titolari ed i panchinari basandoti rigorosamente sulle valutazioni fornite per massimizzare il punteggio del turno, schierando prioritariamente i giocatori con la forza del prossimo turno (matchStrength) più alta ed escludendo gli infortunati/eliminati!

Ecco la rosa dei calciatori della squadra con le rispettive valutazioni IA fresche (inclusi infortuni, probabilità, forza e avversario prossimo):
${playersListText}

REGOLE DI SELEZIONE E SCHIERAMENTO (MANDATORIE E RIGIDE):
1. Devi scegliere la migliore formazione possibile (esattamente 11 Titolari) ed i restanti giocatori andranno in panchina.
2. Scegli il modulo tattico migliore (tra: "4-3-3", "4-4-2", "3-5-2", "3-4-3", "5-3-2") che valorizzi al massimo i tuoi migliori giocatori da bonus nel FantaMondiale.
3. Rispetta rigorosamente i ruoli del FantaMondiale per i titolari in base al modulo scelto:
   - "4-3-3": 1 POR, 4 DIF, 3 CEN, 3 ATT
   - "4-4-2": 1 POR, 4 DIF, 4 CEN, 2 ATT
   - "3-5-2": 1 POR, 3 DIF, 5 CEN, 2 ATT
   - "3-4-3": 1 POR, 3 DIF, 4 CEN, 3 ATT
   - "5-3-2": 1 POR, 5 DIF, 3 CEN, 2 ATT
4. I giocatori titolari schierati e quelli in panchina devono corrispondere ESATTAMENTE ai calciatori presenti nella rosa fornita. Non inventare o aggiungere nuovi calciatori.
5. **VALUTAZIONE GLOBALE BASATA SU VOTO E BONUS (MANDATORIA):**
   - La scelta di chi schierare titolare deve basarsi rigorosamente sulla **Forza del Turno (matchStrength)** e sulla **Probabilità Titolare** che ti sono state fornite.
   - Privilegia in assoluto i calciatori con i valori di "Forza del Turno" più elevati. È vietato schierare titolare un giocatore che ha una Forza del Turno molto bassa o pari a 0 (ad esempio perché infortunato o escluso/eliminato), se in rosa disponi di un'alternativa attiva e performante nello stesso ruolo.
   - **IGNORA COMPLETAMENTE** considerazioni tattiche o di posizionamento del calcio reale (es. non ha alcuna utilità escludere un centrocampista ultra-offensivo da bonus perché "è un'ala e non garantisce equilibrio difensivo"). Nel FantaMondiale contano esclusivamente il voto e i bonus/malus.
6. **DIVIETO ASSOLUTO DI DUPLICAZIONE (MANDATORIO E STRICHE):** Ciascun calciatore della rosa fornita deve apparire UNA SOLA VOLTA nell'intero schieramento: o nei titolari ('starters') o nei panchinari ('bench'), mai in entrambi! È assolutamente vietato che un giocatore compaia contemporaneamente sia tra i titolari che in panchina.

REGOLE DI VALUTAZIONE E CATEGORIA:
Assegna a ciascun calciatore della rosa una valutazione 'playerCategory' rigorosamente tra questi 5 valori in base alle sue ultime performance reali e prospettive nel Mondiale:
- "scarso": gioca poco o niente, pochi bonus, nazionale debole o attualmente infortunato/squalificato di lungo corso.
- "accettabile": titolare in nazionale debole, pochi bonus.
- "buono": titolare in nazionale forte, qualche bonus, pochi malus.
- "ottimo": titolare fisso con ottimi bonus (gol/assist) e pochi malus.
- "stella": top player assoluto, leader indiscusso, rigori/piazzati, altissimo rendimento in nazionale forte o leader indiscusso.

REGOLE DI ESATTEZZA NUMERICA DELLE PRESENZE:
- Per la chiave 'appearances' di ogni calciatore nella chiave 'playersAnalysis', devi identificare il numero REALE ed ESATTO di presenze registrate specificamente nella stagione calcistica più recente 2025/2026, contando ESCLUSIVAMENTE e SOLO le partite in CAMPIONATO (al fine di uniformare i dati, escludendo coppe nazionali o nazionali).
  * Se il ruolo è 'POR' (Portiere), riporta presenze, clean sheet (partite senza subire gol) e gol subiti (es. "34 presenze, 12 clean sheet, 28 gol subiti nella stagione 25/26").
  * Per tutti gli altri ruoli, riporta presenze, gol segnati e assist (es. "32 presenze, 10 gol, 4 assist in campionato nella stagione 25/26").
- Se dopo molteplici tentativi non trovi dati certi, scrivi "Dati non disponibili nella stagione 25/26", ma fai ogni sforzo per trovare l'esatta statistica reale ad oggi.

FORMATO DELLA RISPOSTA (MANDATORIO):
Fornisci la risposta RIGOROSAMENTE in formato JSON con la seguente struttura esatta (sostituendo le chiavi con i reali ID dei giocatori):
{
  "recommendedModule": "4-3-3",
  "starters": ["id_del_giocatore_1", "id_del_giocatore_2"],
  "bench": ["id_del_giocatore_3"],
  "tacticalJustification": "Spiegazione dettagliata ed esplicita in lingua italiana incentrata ESCLUSIVAMENTE su strategie del FantaMondiale per massimizzare bonus (gol, assist, rigori, clean sheet per i portieri). NON parlare come un vero allenatore di calcio (niente commenti su equilibrio tattico reale della squadra o coperture difensive). Spiega in modo chiaro perché hai preferito gli 11 titolari rispetto a chi è rimasto in panchina (ad esempio chiarendo se chi è in panchina affronta partite più difficili nel prossimo turno del Mondiale, ha uno stato di forma peggiore, ha minori probabilità di portare bonus, o è meno performante). Fornisci anche in modo esplicito potenziali ballottaggi e/o alternative strategiche valide all'interno della rosa che il fantallenatore può adottare (es. ballottaggi tra titolari e panchina basati sul coefficiente di bonus o sulla difficoltà del match)."
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

    // ==========================================
    // PHASE 1: Ensure playersAnalysis exists for ALL roster players (fix missing evaluations)
    // ==========================================
    if (!parsedData.playersAnalysis) parsedData.playersAnalysis = {};
    
    players.forEach(p => {
      if (!parsedData.playersAnalysis[p.id]) {
        // Model didn't return analysis for this player - create a sensible fallback
        parsedData.playersAnalysis[p.id] = {
          playerCategory: "buono",
          starterProbability: "50%",
          appearances: "Dati non disponibili nella stagione 25/26",
          formState: "Valutazione in corso - dati non ancora ricevuti dal modello AI.",
          matchStrength: 50,
          matchAnalysis: {
            nextOpponent: "Da verificare",
            criteriaText: "Analisi non disponibile. Riprova il ricalcolo per ottenere dati aggiornati."
          },
          alternatives: []
        };
      } else {
        // Ensure matchStrength always exists even if the model omitted it
        const analysis = parsedData.playersAnalysis[p.id];
        if (analysis.matchStrength === undefined || analysis.matchStrength === null) {
          analysis.matchStrength = 50;
        }
      }
    });

    // ==========================================
    // PHASE 2: Deduplicate starters - remove invalid IDs and duplicates
    // ==========================================
    const allRosterIds = new Set(players.map(p => p.id));
    let startersListClean = [];
    const startersSeen = new Set();
    for (const id of (parsedData.starters || [])) {
      if (allRosterIds.has(id) && !startersSeen.has(id)) {
        startersSeen.add(id);
        startersListClean.push(id);
      }
    }
    parsedData.starters = startersListClean;

    // ==========================================
    // PHASE 3: Handle eliminated/absent countries
    // ==========================================
    const ELIMINATED_SET = new Set(ELIMINATED_COUNTRIES);
    const eliminatedPlayerIds = players.filter(p => ELIMINATED_SET.has(p.country)).map(p => p.id);
    const eliminatedSet = new Set(eliminatedPlayerIds);
    
    if (eliminatedPlayerIds.length > 0) {
      // Move eliminated players out of starters, replacing them with active bench players of the same role
      const activeStarters = [];
      const removedFromStarters = [];
      
      for (const id of parsedData.starters) {
        if (eliminatedSet.has(id)) {
          removedFromStarters.push(id);
        } else {
          activeStarters.push(id);
        }
      }
      
      if (removedFromStarters.length > 0) {
        // Find active bench candidates (not in starters, not eliminated)
        const activeStarterSet = new Set(activeStarters);
        const activeBenchCandidates = players.filter(p => 
          !activeStarterSet.has(p.id) && !eliminatedSet.has(p.id)
        );
        
        for (const removedId of removedFromStarters) {
          const pRemoved = players.find(p => p.id === removedId);
          if (pRemoved) {
            const replacementIdx = activeBenchCandidates.findIndex(p => p.role === pRemoved.role);
            if (replacementIdx !== -1) {
              const replacement = activeBenchCandidates[replacementIdx];
              activeStarters.push(replacement.id);
              activeBenchCandidates.splice(replacementIdx, 1);
            }
            // If no same-role replacement found, we simply leave that slot unfilled
            // (better than putting an eliminated player in starters)
          }
        }
      }
      
      parsedData.starters = activeStarters;
      
      // Force playersAnalysis for eliminated players
      eliminatedPlayerIds.forEach(id => {
        const p = players.find(x => x.id === id);
        parsedData.playersAnalysis[id] = {
          ...parsedData.playersAnalysis[id],
          starterProbability: "0%",
          playerCategory: "scarso",
          formState: `ELIMINATO: La nazionale dell'${p ? p.country : 'giocatore'} è eliminata o non partecipa al Mondiale 2026.`,
          matchStrength: 0,
          matchAnalysis: {
            nextOpponent: "Nessuno",
            criteriaText: "La nazionale di appartenenza è stata eliminata o non partecipa al Mondiale."
          }
        };
      });
    }

    // ==========================================
    // PHASE 4: FINAL DEDUP - Rebuild bench from scratch based on who's NOT in starters
    // This is the single source of truth and guarantees no player appears in both lists.
    // ==========================================
    const finalStarterSet = new Set(parsedData.starters);
    
    // Active bench players first (not eliminated, not starters), then eliminated at the bottom
    const activeBenchFinal = players
      .filter(p => !finalStarterSet.has(p.id) && !eliminatedSet.has(p.id))
      .map(p => p.id);
    const eliminatedBenchFinal = players
      .filter(p => !finalStarterSet.has(p.id) && eliminatedSet.has(p.id))
      .map(p => p.id);
    
    parsedData.bench = [...activeBenchFinal, ...eliminatedBenchFinal];

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
