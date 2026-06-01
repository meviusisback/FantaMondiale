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

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel);

    // Format roster for the AI model
    const playersListText = players.map(p => 
      `- ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country} | Costo d'acquisto: ${p.purchaseCost || 0} cr`
    ).join('\n');    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio). Il tuo compito è analizzare la rosa completa dei calciatori a disposizione della squadra "${teamName || 'Mia Squadra'}" e schierare la FORMAZIONE IDEALE da bonus per massimizzare i punteggi.

Ecco la rosa completa dei calciatori della squadra suddivisi per ruolo, ciascuno con il suo ID unico, ruolo, nome, nazione di appartenenza e costo d'acquisto:
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
5. **ACCURACY DELLE NOTIZIE, CONVOCAZIONI E INFORTUNI (MONDIALE 2026 - ANNO 2026):**
   - Fai ricerche web in tempo reale per verificare convocazioni, infortuni, squalifiche e stato di forma per ciascun calciatore.
   - **IMPORTANTE:** Le notizie e le convocazioni devono riferirsi TASSATIVAMENTE ed ESCLUSIVAMENTE alla fase finale del **Mondiale 2026 (World Cup 2026)** che si gioca nel corrente anno 2026.
   - **IGNORA COMPLETAMENTE** notizie obsolete o esclusioni passate, come ad esempio l'assenza di Thibaut Courtois agli Europei 2024 (Euro 2024). Per il Mondiale 2026, Courtois è convocato e fa parte della rosa! Cerca solo notizie freschissime e aggiornate sul Mondiale 2026, verificando le date delle notizie. Usa solo fonti verificate e attendibili, effettuando controlli incrociati su più fonti.
6. **Mandatorio per lo schieramento:** La formazione DEVE basarsi rigorosamente sullo stato di forma recente e la titolarità per il Mondiale 2026. Escludi dai titolari i giocatori infortunati, squalificati o non convocati reali per il Mondiale 2026. Preferisci giocatori attivi e con altissima probabilità di essere titolari e portare bonus.
7. **VERIFICA CONVOCAZIONE ED ELIMINAZIONE MONDIALE (MANDATORIA E CRUCIALE):**
   Nazioni attualmente eliminate o assenti dal Mondiale ad oggi: ${ELIMINATED_COUNTRIES.join(', ')}.
   - **REGOLA DI PARTECIPAZIONE (IMPORTANTE):** Fai riferimento ESCLUSIVAMENTE all'elenco sopra per stabilire se una nazionale è eliminata o non partecipa. Se la nazione del calciatore NON è presente in quell'elenco (ad esempio Norvegia, Belgio, ecc.), devi considerarla a tutti gli effetti come ATTIVA e QUALIFICATA nel torneo dell'utente, ignorando qualsiasi dato reale di mancata qualificazione per garantire la coerenza con il database del FantaMondiale dell'utente (dove giocatori come Haaland sono attivi e giocano nel Mondiale 2026 dell'utente!).
   - Se la nazionale di un calciatore è inclusa in tale elenco di nazionali eliminate o assenti dal Mondiale:
     * È assolutamente vietato inserire il calciatore negli 11 titolari ('starters'), anche se si tratta di un top player assoluto.
     * Devi inserirlo obbligatoriamente in fondo all'elenco dei panchinari ('bench').
     * Nella chiave 'playersAnalysis' per quel calciatore, imposta 'starterProbability' tassativamente a '0%', 'playerCategory' tassativamente a 'scarso', e descrivi questo stato in 'formState' inserendo obbligatoriamente all'inizio: "ELIMINATO: [Spiegazione dettagliata dell'assenza o dell'eliminazione della nazionale dal Mondiale]". Non affidarti a conoscenze pregresse, esegui sempre ricerche web attive ad oggi per ogni singola nazionale rappresentata in rosa!
8. **Valutazione Forza Prossimo Turno (matchStrength):** Calcola per ciascun calciatore un valore numerico da 1 a 100 che indichi la forza relativa specifica per il prossimo turno. Questo valore deve rispecchiare in modo rigoroso la difficoltà del prossimo avversario reale del Mondiale (ad esempio, se si scontra contro una nazionale favorita assoluta, il punteggio deve scendere drasticamente). Considera: valore del giocatore, suo stato di forma recente, probabilità di bonus (gol/assist/porta inviolata) nel turno, importanza della partita e situazione del team.
9. **VALUTAZIONE GLOBALE BASATA SU VOTO E BONUS (MANDATORIA - CRUCIALE):**
   - Devi calcolare e valutare singolarmente TUTTI i calciatori in rosa prima di decidere chi far partire titolare.
   - La scelta di chi schierare titolare deve basarsi esclusivamente e rigorosamente sul **voto in pagella stimato e sulle probabilità di portare BONUS** (gol +3, assist +1, rigori, clean sheet per i portieri) o MALUS.
   - **IGNORA COMPLETAMENTE** considerazioni tattiche o di posizionamento del calcio reale (es. non ha alcuna utilità escludere un centrocampista ultra-offensivo da bonus perché "è un'ala e non garantisce equilibrio difensivo" o perché "lascia scoperto il centrocampo"). Nel FantaMondiale contano esclusivamente il voto e i bonus/malus. I centrocampisti e gli attaccanti più offensivi e prolifici devono essere schierati prioritariamente rispetto a centrocampisti difensivi di contenimento, a prescindere dal modulo reale.
10. **DIVIETO ASSOLUTO DI DUPLICAZIONE (MANDATORIO E STRICHE):** Ciascun calciatore della rosa fornita deve apparire UNA SOLA VOLTA nell'intero schieramento: o nei titolari ('starters') o nei panchinari ('bench'), mai in entrambi! È assolutamente vietato che un giocatore (es. Bernardo Silva o chiunque altro) compaia contemporaneamente sia tra i titolari che in panchina.

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
  "playersAnalysis": {
    "id_del_giocatore_1": {
      "playerCategory": "stella",
      "starterProbability": "95%",
      "appearances": "32 presenze, 10 gol in campionato nella stagione 25/26",
      "formState": "Descrizione reale e notizie freschissime su infortuni, convocazioni e forma di questa settimana (2 frasi max). **DIVIETO ASSOLUTO:** Non descrivere le caratteristiche generiche del giocatore o che tipo di giocatore è (es. NON scrivere 'è un attaccante tecnico', 'un terzino veloce', o simili). Devi indicare **esclusivamente e tassativamente** lo stato di forma fisica attuale, notizie reali su infortuni, convocazioni, allenamento, ultime prestazioni sul campo e se partirà titolare o meno (es. 'Fisicamente al top dopo l'ultimo gol in campionato', 'Recuperato dal risentimento muscolare, si allena regolarmente', 'In ottima forma ma partirà dalla panchina in questo turno'). ATTENZIONE: per i panchinari attivi NON scrivere 'ELIMINATO', ma scrivi semplicemente che non giocherà o partirà dalla panchina.",
      "matchStrength": 85,
      "matchAnalysis": {
        "nextOpponent": "Spagna",
        "criteriaText": "Spiegazione dettagliata ed esplicita (in 2-3 frasi chiare) di chi il giocatore affronterà, un giudizio su come sta giocando e perché ha quel punteggio da 1 a 100 per questa specifica partita."
      },
      "alternatives": [
        {
          "name": "Nome del concorrente reale nello stesso ruolo in Nazionale (es. Openda per Lukaku; Casteels per Courtois; Strand Larsen per Haaland) che andrà in panchina se gioca il titolare analizzato. Tassativamente 1 o 2 concorrenti reali.",
          "playProbability": "Percentuale reale o stimata di impiego. REQUISITO MATEMATICO DEL 100% (CRUCIALE): La somma tra starterProbability del titolare analizzato (es. 85%) e le playProbability di queste alternative concorrenti (es. 15%) deve essere tassativamente pari al 100% in totale."
        }
      ]
    }
  },
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
