import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, players, provider, openRouterModel, geminiModel } = req.body || {};
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

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel, geminiModel);    // Format roster with pre-calculated evaluations for the AI model
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
5. **VALUTAZIONE E SCHIERAMENTO DEI TITOLARI (MANDATORIO):**
   - La Forza del Turno (matchStrength) è l'UNICO parametro primario da considerare per schierare i titolari: devi inserire tra gli 11 titolari (starters) i giocatori con il punteggio 'matchStrength' più alto in ciascun ruolo richiesto dal modulo tattico.
   - La probabilità di essere titolare ('starterProbability' / titolarità) deve essere utilizzata **SEMPRE E SOLO come criterio di spareggio (tie-breaker)** quando due o più giocatori concorrenti hanno lo stesso punteggio di 'matchStrength' (es. se due centrocampisti hanno entrambi 'matchStrength' pari a 75, fai giocare titolare quello con la 'starterProbability' maggiore, es. 90% rispetto a 60%).
   - È vietato schierare titolare un giocatore infortunato o eliminato (ovvero con 'matchStrength' pari a 0 o 'starterProbability' pari a 0%).
   - Ignora totalmente il ruolo tattico nel calcio reale (es. se un centrocampista è puramente offensivo o difensivo): conta solo massimizzare 'matchStrength' ed i bonus nel FantaMondiale.
6. **MODIFICATORI DI DIFESA E CENTROCAMPO (MANDATORI PER LA SCELTA DEL MODULO):**
   Tieni conto dei modificatori di reparto per ottimizzare il modulo e gli schieramenti:
   - Modificatore Difesa: basato sulla media voto pura (senza bonus/malus) dei difensori. Con 3 difensori: bonus di +1 con media >= 6.5, sale di +1 ogni 0.25 di media in più. Con 4 difensori: bonus scatta a >= 6.25 (+1), a 6.5 è +2, e così via. Con 5 difensori (modulo più premiato): bonus scatta a >= 6.25 (+2), a 6.5 è +3.
   - Modificatore Centrocampo: basato sulla media voto pura dei centrocampisti. Con 3 centrocampisti: bonus di +1 con media >= 6.75. Con 4 centrocampisti: bonus di +1 con media >= 6.5. Con 5 centrocampisti: bonus di +1 con media >= 6.25.
   Usa queste regole per selezionare il modulo tattico ottimale e motivare la scelta nella "tacticalJustification".
7. **DIVIETO ASSOLUTO DI DUPLICAZIONE (MANDATORIO E STRICHE):** Ciascun calciatore della rosa fornita deve apparire UNA SOLA VOLTA nell'intero schieramento: o nei titolari ('starters') o nei panchinari ('bench'), mai in entrambi! È assolutamente vietato che un giocatore compaia contemporaneamente sia tra i titolari che in panchina.

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
      const modelToUse = geminiModel || 'gemini-flash-lite-latest';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;

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
        console.error("Gemini Native Team Ideal Lineup API returned empty candidates. Full payload:", JSON.stringify(data));
      }
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
    // Enforce active bench requirements: at least 1 POR, 2 DIF, 2 CEN, 2 ATT in the top 10 active slots,
    // and sort all players in descending order of their matchStrength (Forza del Turno).
    // ==========================================
    const finalStarterSet = new Set(parsedData.starters);
    
    const playerStrengthMap = {};
    players.forEach(p => {
      // Use Phase 1/AI-updated score if present, otherwise fall back to pre-calculated matchStrength
      const aiAnalysisStrength = parsedData.playersAnalysis?.[p.id]?.matchStrength;
      const strengthVal = aiAnalysisStrength !== undefined ? aiAnalysisStrength : p.matchStrength;
      playerStrengthMap[p.id] = parseInt(strengthVal) || 50;
    });

    const getStrength = (id) => {
      if (eliminatedSet.has(id)) return 0;
      return playerStrengthMap[id] !== undefined ? playerStrengthMap[id] : 50;
    };

    // Filter active bench candidates (not in starters, not eliminated)
    const activeBenchPlayers = players.filter(p => !finalStarterSet.has(p.id) && !eliminatedSet.has(p.id));
    
    // Sort all candidates by strength descending
    activeBenchPlayers.sort((a, b) => getStrength(b.id) - getStrength(a.id));

    // Split candidates by role to identify the top/best ones for the mandatory roles
    const porCandidates = activeBenchPlayers.filter(p => p.role === 'POR');
    const difCandidates = activeBenchPlayers.filter(p => p.role === 'DIF');
    const cenCandidates = activeBenchPlayers.filter(p => p.role === 'CEN');
    const attCandidates = activeBenchPlayers.filter(p => p.role === 'ATT');

    const selectedMandatory = [];
    const selectedMandatoryIds = new Set();

    // 1 POR
    if (porCandidates.length > 0) {
      selectedMandatory.push(porCandidates[0]);
      selectedMandatoryIds.add(porCandidates[0].id);
    }
    // 2 DIF
    difCandidates.slice(0, 2).forEach(p => {
      selectedMandatory.push(p);
      selectedMandatoryIds.add(p.id);
    });
    // 2 CEN
    cenCandidates.slice(0, 2).forEach(p => {
      selectedMandatory.push(p);
      selectedMandatoryIds.add(p.id);
    });
    // 2 ATT
    attCandidates.slice(0, 2).forEach(p => {
      selectedMandatory.push(p);
      selectedMandatoryIds.add(p.id);
    });

    // The remaining active bench candidates
    const remainingCandidates = activeBenchPlayers.filter(p => !selectedMandatoryIds.has(p.id));

    // Target active bench size is min(10, activeBenchPlayers.length)
    const targetBenchSize = Math.min(10, activeBenchPlayers.length);
    const slotsNeeded = targetBenchSize - selectedMandatory.length;

    const activeBenchFinalList = [...selectedMandatory];
    if (slotsNeeded > 0) {
      remainingCandidates.slice(0, slotsNeeded).forEach(p => {
        activeBenchFinalList.push(p);
        selectedMandatoryIds.add(p.id);
      });
    }

    // Sort active bench elements by strength descending
    activeBenchFinalList.sort((a, b) => getStrength(b.id) - getStrength(a.id));
    const activeBenchFinalIds = activeBenchFinalList.map(p => p.id);

    // Tribuna players: active bench players that didn't fit into the top 10
    const tribunaActiveCandidates = activeBenchPlayers
      .filter(p => !selectedMandatoryIds.has(p.id))
      .sort((a, b) => getStrength(b.id) - getStrength(a.id))
      .map(p => p.id);

    // Eliminated bench players also go at the end, sorted by strength descending
    const eliminatedBenchFinal = players
      .filter(p => !finalStarterSet.has(p.id) && eliminatedSet.has(p.id))
      .sort((a, b) => getStrength(b.id) - getStrength(a.id))
      .map(p => p.id);
    
    parsedData.bench = [...activeBenchFinalIds, ...tribunaActiveCandidates, ...eliminatedBenchFinal];

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
