import { getEliminatedCountries } from './utils.js';

function calculateDeterministicLineup(players, eliminatedCountries, lockedModule) {
  const ELIMINATED_SET = new Set(eliminatedCountries);
  
  // Filter active players (not from eliminated countries)
  const activePlayers = players.filter(p => !ELIMINATED_SET.has(p.country));
  
  // Sort players in each role by strength descending, tie-breaker: starter probability descending
  const getPlayerScore = (p) => {
    const strength = parseInt(p.matchStrength) || 50;
    let prob = 50;
    if (p.starterProbability) {
      prob = parseInt(p.starterProbability.replace(/[^0-9]/g, '')) || 50;
    }
    // Convert 0% starter probability to 0 strength
    if (prob === 0) return 0;
    return strength + (prob / 1000.0);
  };
  
  const porCandidates = activePlayers.filter(p => p.role === 'POR').sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  const difCandidates = activePlayers.filter(p => p.role === 'DIF').sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  const cenCandidates = activePlayers.filter(p => p.role === 'CEN').sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  const attCandidates = activePlayers.filter(p => p.role === 'ATT').sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  
  const modules = {
    '4-3-3': { DIF: 4, CEN: 3, ATT: 3 },
    '4-4-2': { DIF: 4, CEN: 4, ATT: 2 },
    '3-5-2': { DIF: 3, CEN: 5, ATT: 2 },
    '3-4-3': { DIF: 3, CEN: 4, ATT: 3 },
    '5-3-2': { DIF: 5, CEN: 3, ATT: 2 }
  };
  
  let bestModule = '4-3-3';
  let bestStarters = [];
  let maxScore = -1;
  
  let activeModules = modules;
  if (lockedModule && modules[lockedModule]) {
    activeModules = { [lockedModule]: modules[lockedModule] };
  }
  
  for (const [mod, req] of Object.entries(activeModules)) {
    // Check if we have enough active players for the module (at least 1 GK and the required outfield players)
    if (porCandidates.length < 1 || 
        difCandidates.length < req.DIF || 
        cenCandidates.length < req.CEN || 
        attCandidates.length < req.ATT) {
      continue;
    }
    
    const currentStarters = [
      porCandidates[0],
      ...difCandidates.slice(0, req.DIF),
      ...cenCandidates.slice(0, req.CEN),
      ...attCandidates.slice(0, req.ATT)
    ];
    
    const currentScore = currentStarters.reduce((sum, p) => sum + getPlayerScore(p), 0);
    
    if (currentScore > maxScore) {
      maxScore = currentScore;
      bestModule = mod;
      bestStarters = currentStarters;
    }
  }
  
  // If no module was fully satisfied (e.g. very small roster), fallback to best module taking what we can
  if (bestStarters.length === 0) {
    const fallbackMod = lockedModule && modules[lockedModule] ? lockedModule : '4-3-3';
    const req = modules[fallbackMod];
    bestModule = fallbackMod;
    bestStarters = [
      ...porCandidates.slice(0, 1),
      ...difCandidates.slice(0, req.DIF),
      ...cenCandidates.slice(0, req.CEN),
      ...attCandidates.slice(0, req.ATT)
    ];
  }
  
  const starterIds = bestStarters.map(p => p.id);
  const starterSet = new Set(starterIds);
  
  // Now build the bench. All players not in starters.
  // Active bench players first (not starters, not eliminated) sorted by score descending
  const activeBenchCandidates = activePlayers.filter(p => !starterSet.has(p.id));
  activeBenchCandidates.sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  
  const bPor = activeBenchCandidates.filter(p => p.role === 'POR');
  const bDif = activeBenchCandidates.filter(p => p.role === 'DIF');
  const bCen = activeBenchCandidates.filter(p => p.role === 'CEN');
  const bAtt = activeBenchCandidates.filter(p => p.role === 'ATT');
  
  const selectedMandatory = [];
  const selectedMandatoryIds = new Set();
  
  if (bPor.length > 0) {
    selectedMandatory.push(bPor[0]);
    selectedMandatoryIds.add(bPor[0].id);
  }
  bDif.slice(0, 2).forEach(p => {
    selectedMandatory.push(p);
    selectedMandatoryIds.add(p.id);
  });
  bCen.slice(0, 2).forEach(p => {
    selectedMandatory.push(p);
    selectedMandatoryIds.add(p.id);
  });
  bAtt.slice(0, 2).forEach(p => {
    selectedMandatory.push(p);
    selectedMandatoryIds.add(p.id);
  });
  
  const remainingCandidates = activeBenchCandidates.filter(p => !selectedMandatoryIds.has(p.id));
  const targetBenchSize = Math.min(10, activeBenchCandidates.length);
  const slotsNeeded = targetBenchSize - selectedMandatory.length;
  
  const activeBenchList = [...selectedMandatory];
  if (slotsNeeded > 0) {
    remainingCandidates.slice(0, slotsNeeded).forEach(p => {
      activeBenchList.push(p);
      selectedMandatoryIds.add(p.id);
    });
  }
  
  // Sort active bench list by score descending
  activeBenchList.sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  const activeBenchIds = activeBenchList.map(p => p.id);
  
  // Tribuna active players (remaining active bench players that didn't fit into the top 10)
  const tribunaActiveIds = activeBenchCandidates
    .filter(p => !selectedMandatoryIds.has(p.id))
    .map(p => p.id);
    
  // Eliminated players go at the bottom of the bench list, sorted by score descending
  const eliminatedPlayers = players.filter(p => ELIMINATED_SET.has(p.country));
  eliminatedPlayers.sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
  const eliminatedIds = eliminatedPlayers.map(p => p.id);
  
  const finalBenchIds = [...activeBenchIds, ...tribunaActiveIds, ...eliminatedIds];
  
  return {
    recommendedModule: bestModule,
    starters: starterIds,
    bench: finalBenchIds
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamName, players, provider, openRouterModel, geminiModel, lockedModule } = req.body || {};
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

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel, geminiModel);
    
    // 1. Calculate deterministic ideal lineup
    const deterministicLineup = calculateDeterministicLineup(players, ELIMINATED_COUNTRIES, lockedModule);

    // 2. Format starters and bench text for the prompt
    const startersText = deterministicLineup.starters.map(id => {
      const p = players.find(x => x.id === id);
      return `- ${p.role}: ${p.name} (${p.country}) | Forza del Turno: ${p.matchStrength} | Titolare: ${p.starterProbability}`;
    }).join('\n');

    const benchText = deterministicLineup.bench.slice(0, 10).map(id => {
      const p = players.find(x => x.id === id);
      return `- ${p.role}: ${p.name} (${p.country}) | Forza del Turno: ${p.matchStrength} | Titolare: ${p.starterProbability}`;
    }).join('\n');

    const playersListText = players.map(p => 
      `- ID: ${p.id} | Ruolo: ${p.role} | Nome: ${p.name} | Nazionale: ${p.country} | Costo d'acquisto: ${p.purchaseCost || 0} cr | Categoria IA: ${p.playerCategory || 'buono'} | Probabilità Titolare: ${p.starterProbability || '50%'} | Forza del Turno (1-100): ${p.matchStrength || 50} | Avversario prossimo: ${p.nextOpponent || 'Da verificare'} | Stato Forma/News: ${p.formState || 'Nessuna news'}`
    ).join('\n');

    // 3. Build AI prompt to request ONLY the tacticalJustification
    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio).
La rosa dei calciatori a disposizione della squadra "${teamName || 'Mia Squadra'}" è la seguente:
${playersListText}

Abbiamo calcolato matematicamente e deterministicamente la FORMAZIONE IDEALE ottimale per questo turno (massimizzando la Forza del Turno ed escludendo infortunati ed eliminati):
- Modulo Tattico Consigliato: ${deterministicLineup.recommendedModule}
- Titolari (Starters):
${startersText}
- Panchina Attiva (Top 10):
${benchText}

Il tuo compito è scrivere la "tacticalJustification" (una spiegazione dettagliata ed esplicita in lingua italiana di 3-4 frasi chiare, incentrata ESCLUSIVAMENTE su strategie del FantaMondiale per massimizzare i bonus).
Spiega in modo chiaro ed esauriente perché questo schieramento è ottimale per questo turno rispetto ai giocatori rimasti in panchina (ad esempio descrivendo gli accoppiamenti dei match, le chance di bonus o lo stato di forma dei titolari selezionati).
Fornisci anche in modo esplicito potenziali ballottaggi e/o alternative strategiche valide all'interno della rosa che il fantallenatore può adottare (es. ballottaggi basati su modificatori o difficoltà dei match).

Fornisci la risposta RIGOROSAMENTE in formato JSON con la seguente struttura esatta:
{
  "tacticalJustification": "Tua spiegazione tattica dettagliata..."
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
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          tools: [{ type: 'openrouter:web_search' }]
        })
      });

      if (openRouterResponse.ok) {
        const openRouterData = await openRouterResponse.json();
        text = openRouterData.choices?.[0]?.message?.content;
      }
    } else {
      const modelToUse = geminiModel || 'gemini-flash-lite-latest';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    }

    let justification = "Giustificazione tattica elaborata dal sistema in base ai punteggi di Forza del Turno.";
    if (text) {
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
        const parsedData = JSON.parse(cleanText.trim());
        if (parsedData.tacticalJustification) {
          justification = parsedData.tacticalJustification;
        }
      } catch (e) {
        console.warn("Errore nel parsing della giustificazione tattica dell'AI:", e, "Testo ricevuto:", text);
      }
    }

    return res.status(200).json({
      recommendedModule: deterministicLineup.recommendedModule,
      starters: deterministicLineup.starters,
      bench: deterministicLineup.bench,
      tacticalJustification: justification
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
