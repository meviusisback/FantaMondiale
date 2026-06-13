import { getEliminatedCountries } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, country, role, provider, openRouterModel, geminiModel, nextOpponent } = req.body || {};
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
    if (!name || !country || !role) {
      return res.status(400).json({ error: 'Dati incompleti: name, country e role sono obbligatori.' });
    }

    const ELIMINATED_COUNTRIES = await getEliminatedCountries(apiKey, provider, openRouterModel, geminiModel);

    const isGK = role === 'POR';
    const appearancesInstruction = isGK
      ? `- Per la chiave 'appearances' del JSON, trattandosi di un Portiere (POR), devi identificare tramite ricerca web statistica (ad esempio Transfermarkt, Soccerway o FBref) il numero REALE ed ESATTO di presenze, clean sheet (partite chiuse senza subire gol) e gol subiti registrati dal calciatore ${name} specificamente nella stagione calcistica 2025/2026, contando ESCLUSIVAMENTE e SOLO le partite in CAMPIONATO (al fine di uniformare e rendere omogenei i dati tra tutti i giocatori, escludendo coppe nazionali, coppe continentali o partite della Nazionale).`
      : `- Per la chiave 'appearances' del JSON, devi identificare tramite ricerca web statistica (ad esempio Transfermarkt, Soccerway o FBref) il numero REALE ed ESATTO di presenze, gol e assist effettuati dal calciatore ${name} specificamente nella stagione calcistica 2025/2026, contando ESCLUSIVAMENTE e SOLO le partite in CAMPIONATO (al fine di uniformare e rendere omogenei i dati tra tutti i giocatori, escludendo quindi coppe nazionali, coppe continentali e partite della Nazionale).`;

    const appearancesJsonDesc = isGK
      ? `- appearances: le presenze, clean sheet (partite senza subire gol) e gol subiti registrati nella stagione calcistica più recente 2025/2026 in CAMPIONATO (es. "34 presenze, 12 clean sheet, 28 gol subiti nella stagione 25/26")`
      : `- appearances: le presenze e gol/assist registrati nella stagione calcistica più recente 2025/2026 in CAMPIONATO (es. "34 presenze, 12 gol nella stagione 25/26")`;

    const prompt = `Sei un esperto analista calcistico e fantallenatore specializzato nel torneo "FantaMondiale" (il fantacalcio basato sulla fase finale dei Mondiali di calcio).
Fornisci un'analisi strategica dettagliata e accurata in lingua italiana per il calciatore: ${name} (Nazionale: ${country}, Ruolo: ${role}, Prossimo Avversario in questo turno del Mondiale: ${nextOpponent || 'Da verificare'}).
Esegui una ricerca online in tempo reale tramite Google Search / Web Search per ottenere le informazioni calcistiche reali più recenti ed aggiornate ad oggi (squadra di club attuale, ultimo stato di forma, infortuni o convocazioni recenti, presenze e gol nella stagione 2025/2026).

REGOLE DI ACCURATEZZA CRONOLOGICA E VERIFICA NEWS (MANDATORIE E CRUCIALI):
- Il torneo di riferimento a cui partecipa il calciatore è il **Mondiale 2026 (World Cup 2026)**, che si gioca nel **2026**.
- Devi effettuare ricerche mirate ed estremamente recenti (es. "${name} infortunio convocazione 2026" oppure "${name} convocazione belgio mondiale 2026") utilizzando SOLO fonti verificate e attendibili (Transfermarkt, Sky Sport, Gazzetta dello Sport, testate ufficiali della nazionale, ecc.).
- È TASSATIVAMENTE VIETATO riportare notizie vecchie o di tornei passati spacciandole per attuali. In particolare, ignora totalmente le notizie risalenti all'Europeo 2024 (Euro 2024) o ad anni passati. Ad esempio, non confondere vecchie esclusioni (come quella di Thibaut Courtois dall'Europeo 2024) con lo stato attuale del Mondiale 2026. Courtois è pienamente convocato, disponibile e attivo per il Mondiale 2026!
- Verifica con estrema attenzione le date degli articoli trovati e fai un controllo incrociato su più fonti per accertarti se il giocatore ha infortuni REALI ad oggi (giugno 2026), se è probabile titolare o se rischia di non giocare.

REGOLE DI ESATTEZZA NUMERICA DELLE PRESENZE (CRUCIALE):
${appearancesInstruction}
- È tassativamente vietato inventare, stimare o tirare a indovinare i numeri. Fai ricerche mirate (es. "${name} presenze gol 2025 2026 transfermarkt"). Se dopo molteplici tentativi non trovi dati certi, rispondi con "Dati non disponibili nella stagione 25/26", ma fai ogni sforzo per trovare l'esatta statistica reale ad oggi.

Regole FantaMondiale per formulare la tua risposta:
1. Impatto in relazione alla Nazionale di appartenenza:
   Nel FantaMondiale, un calciatore che gioca per una Nazionale favorita (es. Francia, Brasile, Argentina) ha un impatto fantacalcistico nettamente superiore rispetto a uno altrettanto bravo che gioca in una Nazionale con scarse probabilità di superare i gironi o avanzare nel torneo (es. Marocco, Canada). Questo perché chi va avanti nel tabellone gioca più partite e accumula più punteggi. Ad esempio: un portiere del Marocco, per quanto talentuoso, avrà un "impactScore" ridotto poiché la sua squadra giocherà verosimilmente meno partite rispetto a un portiere della Francia. Pesa fortemente le reali probabilità di avanzamento della sua Nazionale nei Mondiali.
2. Stato di Forma e Probabilità di Giocare:
   Considera l'ultimo stato di forma (prestazioni recenti con il club o con la nazionale nelle amichevoli/qualificazioni) e la probabilità effettiva che il giocatore parta da titolare o subentri con regolarità durante il Mondiale.
3. Descrizione Strategica:
   La descrizione deve essere fatta in relazione alle sue recenti performance storiche e alle aspettative/ruolo all'interno di questo specifico Mondiale, evidenziando se è il fulcro del gioco, un rigorista, o se rischia il posto in favore di altri titolari.
   Se il giocatore è un Centrocampista (CEN) o un Difensore (DIF), tieni presente l'impatto sul sistema dei modificatori di reparto (dove contano le medie dei voti puri: in difesa il bonus scatta da 6.5 con 3 difensori, e da 6.25 con 4 o 5 difensori; a centrocampo scatta da 6.75 con 3 centrocampisti, da 6.5 con 4 e da 6.25 con 5). Giocatori con un'alta media voto attesa costante sono cruciali per questi modificatori.
4. **VERIFICA CONVOCAZIONE ED ELIMINAZIONE MONDIALE (MANDATORIA E CRUCIALE):**
   Nazioni attualmente eliminate o assenti dal Mondiale ad oggi: ${ELIMINATED_COUNTRIES.join(', ')}.
   - **REGOLA DI PARTECIPAZIONE (IMPORTANTE):** Fai riferimento ESCLUSIVAMENTE all'elenco 'ELIMINATED_COUNTRIES' fornito sopra per stabilire se una nazionale è eliminata o non partecipa. Se la nazione del calciatore (${country}) NON è presente in quell'elenco (ad esempio Norvegia, Belgio, ecc.), devi considerarla a tutti gli effetti come ATTIVA e QUALIFICATA nel torneo dell'utente, ignorando qualsiasi dato reale di mancata qualificazione per garantire la coerenza con il database del FantaMondiale dell'utente (dove giocatori come Haaland sono attivi e giocano nel Mondiale 2026 dell'utente!).
   - **PANCHINARO VS ELIMINATO (CRUCIALE):** Non confondere assolutamente un giocatore panchinaro (che fa parte di una nazione attiva ma parte dalla panchina o ha bassa probabilità di giocare) con un giocatore ELIMINATO (la cui nazione è inclusa in 'ELIMINATED_COUNTRIES'). Per i panchinari attivi, **NON** scrivere assolutamente la parola 'ELIMINATO' nello stato di forma ('formState') o nella descrizione ('description'), ma indica semplicemente che partirà dalla panchina o che non giocherà dall'inizio in questo turno (es. 'non giocherà' o 'partirà dalla panchina').
   - Se la sua nazionale è inclusa nell'elenco di quelle eliminate o non partecipa (incluso in 'ELIMINATED_COUNTRIES'):
     * Imposta la chiave 'starterProbability' tassativamente a '0%'.
     * Imposta la chiave 'playerCategory' tassativamente a 'scarso'.
     * Modifica la chiave 'description' iniziando obbligatoriamente con la dicitura in maiuscolo: "ELIMINATO: [Spiegazione del fatto che la nazionale non partecipa o è stata eliminata]". Il resto della descrizione deve riflettere questa inutilizzabilità fantacalcistica.

Fornisci i dati strutturati RIGOROSAMENTE in formato JSON con le seguenti chiavi:
- club: la squadra di club attuale in cui gioca (es. "Inter Miami", "Real Madrid")
${appearancesJsonDesc}
- starterProbability: stima percentuale (es. "85%" o "30%") che giochi effettivamente come titolare durante questo Mondiale.
- playerCategory: la classificazione del giocatore a livello FantaMondiale (scegli rigorosamente tra: "scarso", "accettabile", "buono", "ottimo", "stella"). Assegna il valore valutando attentamente i criteri definiti sopra.
- formState: una breve descrizione testuale (1 riga o massimo 2 frasi) dello stato di forma e notizie reali del calciatore aggiornate a questa settimana. **DIVIETO ABSOLUTO:** Non descrivere le caratteristiche generiche del giocatore o che tipo di giocatore è (es. NON scrivere "è un attaccante tecnico", "un terzino veloce", o simili). Devi indicare **esclusivamente e tassativamente** lo stato di forma fisica attuale, notizie reali su infortuni, convocazioni, allenamento, ultime prestazioni sul campo e se partirà titolare o meno (es. "Fisicamente al top dopo l'ultimo gol in campionato", "Recuperato dal risentimento muscolare, si allena regolarmente", "In ottima forma ma partirà dalla panchina in questo turno"). Per i panchinari attivi non scrivere 'ELIMINATO', ma scrivi semplicemente che non giocherà o partirà dalla panchina.
- description: descrizione del profilo del calciatore, valutando le performance recenti e le aspettative/performance al Mondiale in ottica FantaMondiale (2-3 frasi chiare).
- expectedBonuses: una descrizione testuale estremamente approfondita e dettagliata (almeno 3-4 frasi chiare) dei bonus fantacalcistici attesi (es. gol, assist, rigori, punizioni, clean sheet, cartellini). Questa valutazione DEVE essere interamente contestualizzata e pesata in base alle caratteristiche specifiche della difesa o dell'attacco del prossimo avversario (nextOpponent). Ad esempio: non limitarti a dire "può fare gol", ma analizza se l'avversario ha una difesa lenta che soffre le imboscate del giocatore, se subisce molti gol su palla inattiva (favorendo saltatori o tiratori), se concede molti falli al limite dell'area, o se al contrario ha una retroguardia impenetrabile che limiterà drasticamente le occasioni da bonus del calciatore. Per i portieri, analizza la pericolosità offensiva dell'avversario indicando con precisione la probabilità del clean sheet rispetto al voto puro atteso. L'analisi DEVE nominare esplicitamente il prossimo avversario (nextOpponent) e spiegare come le sue debolezze o forze tattiche influiscano sulle probabilità di bonus.
- alternatives: un array di massimo 2 oggetti reali rappresentanti i calciatori alternativi nello stesso ruolo in quella specifica Nazionale che potrebbero insidiare la titolarità, con le sole chiavi: name (nome dell'alternativa) e playProbability (probabilità percentuale, es: "35%").
  * **REQUISITO MATEMATICO DEL 100% (MANDATORIO E CRUCIALE):** La somma tra la probabilità di essere titolare del giocatore oggetto di analisi (\`starterProbability\` / es. 85%) e le probabilità di impiego/titolarietà delle alternative concorrenti indicate in \`alternatives\` (es. 15%) **deve essere tassativamente pari al 100% in totale** (ad esempio: se il titolare analizzato ha l'80%, le alternative devono sommare esattamente al 20%; se il titolare ha il 90%, l'alternativa concorrente deve avere il 10%; ecc.).
  * **COMPOSIZIONE ALTERNATIVE (MANDATORIA):** Questa lista deve **sempre** contenere esattamente 1 o 2 concorrenti reali dello stesso ruolo in quella Nazionale (es. per Lukaku indica Openda; per Haaland indica Strand Larsen o Sørloth; per Courtois indica Casteels e Sels) che andranno in panchina se gioca il titolare analizzato. NON lasciare mai l'array vuoto per i giocatori attivi.
- roleCompetitionComment: una descrizione testuale unica e discorsiva in lingua italiana (2-3 frasi chiare) che parli in dettaglio della situazione della titolarità del calciatore analizzato, focalizzandosi su di lui e analizzando lo scenario per il prossimo turno. Deve discutere in dettaglio le potenziali insidie e le dinamiche legate alle sue alternative/concorrenti in Nazionale in base al prossimo avversario (nextOpponent), al suo stato di forma recente, a indiscrezioni reali sugli allenamenti o al modulo tattico previsto.

- matchStrength: valore numerico (intero da 0 a 100) che indica la forza del calciatore per il prossimo specifico match/turno del Mondiale in ottica FantaMondiale. Questa valutazione DEVE essere calcolata deterministicamente sommando i seguenti punteggi oggettivi:
  1) TITOLARITÀ (Max 30 punti):
     * Titolare fisso (starterProbability >= 80%): 30 punti
     * Ballottaggio / Subentrante regolare (50% - 79%): 15 punti
     * Riserva sporadica (< 50%): 5 punti
     * Infortunato/Squalificato/Eliminato: 0 punti
  2) NAZIONALE DI APPARTENENZA (Max 10 punti):
     * Nazionale Top/Favorita (es. Argentina, Brasile, Francia, Inghilterra, Spagna, Germania): 10 punti
     * Nazionale Media (es. Italia, Belgio, Portogallo, Olanda, Croazia, Uruguay): 6 punti
     * Nazionale Debole: 3 punti
  3) DIFFICOLTÀ PROSSIMO AVVERSARIO (Max 30 punti):
     * Avversario Debole/Morbido: 30 punti
     * Avversario di fascia Media: 18 punti
     * Avversario Top/Difesa Solida: 5 punti
  4) STATO DI FORMA FISICA/MENTALE (Max 15 punti):
     * Forma eccellente (ultime prestazioni ottime, gol/assist recenti): 15 punti
     * Forma normale/sufficiente: 10 punti
     * Forma calante o rientro da infortunio: 5 punti
  5) IMPATTO BONUS FANTAMONDIALE (Max 15 punti):
     * Rigorista o battitore piazzati principale: 15 punti
     * Attaccante o centrocampista offensivo propenso al gol/assist: 10 punti
     * Giocatore da modificatore (difensori/centrocampisti con ottimi voti puri costanti): 8 punti
     * Giocatore difensivo/falloso senza alcuna propensione ai bonus: 3 punti
- nextOpponent: la nazionale avversaria reale del prossimo turno. **REGOLA CRUCIALE E MANDATORIA:** Usa tassativamente e fedelmente il valore '${nextOpponent || 'Da verificare'}' (ad esempio: se è 'Egitto', scrivi esattamente 'Egitto'), a meno che la nazione del giocatore sia eliminata (in tal caso rispondi 'Nessuno'). Non inventare o usare altri avversari.
- matchAnalysis: un oggetto con le seguenti chiavi:
  * nextOpponent: lo stesso nome della nazionale avversaria del prossimo turno.
  * criteriaText: spiegazione dettagliata in lingua italiana di 2 frasi chiare che metta in relazione tattica diretta il calciatore con la specifica difesa o attacco del prossimo avversario (nextOpponent) (es: "Sfida complicata contro la solida e fisica retroguardia dell'avversario, dove il calciatore farà fatica a trovare spazi per i bonus, ma potrà comunque puntare su calci piazzati.").
- groupAnalysis: un oggetto strutturato con le seguenti chiavi:
  - groupName: il nome del girone reale (es. "Girone A", "Girone B").
  - qualificationProbability: stima percentuale (es. "80%", "35%") di probabilità della sua Nazionale di passare il turno di girone e qualificarsi agli ottavi di finale.
  - groupAnalysisText: spiegazione dettagliata (2-3 frasi) del girone in cui si trova la sua Nazionale, analizzando la forza delle avversarie del girone per capire se ha buone probabilità di passare o meno.
  - postGroupPath: analisi dettagliata (2 frasi) di dove e contro chi finirebbe a giocare nei turni successivi dopo la fase a gironi (es. "Passando come prima del Girone B, sfiderebbe a San Francisco la seconda del Girone A, con possibili quarti a Boston contro la Spagna").

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
        console.error("Gemini Native API returned empty candidates. Full payload:", JSON.stringify(data));
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

    // Programmatic override for eliminated/absent countries (automated daily AI check)
    if (ELIMINATED_COUNTRIES.includes(country)) {
      parsedData.starterProbability = "0%";
      parsedData.playerCategory = "scarso";
      parsedData.description = `ELIMINATO: La nazionale dell'${country} non partecipa o è stata eliminata da questo Mondiale. Il calciatore non è utilizzabile fantacalcisticamente.`;
      parsedData.formState = `La nazionale dell'${country} è esclusa dal Mondiale.`;
      parsedData.matchStrength = 0;
      parsedData.nextOpponent = "Nessuno";
      parsedData.matchAnalysis = {
        nextOpponent: "Nessuno",
        criteriaText: "La nazionale di appartenenza è stata eliminata o non partecipa al Mondiale."
      };
      parsedData.expectedBonuses = "Nessun bonus atteso (nazionale eliminata).";
      parsedData.groupAnalysis = {
        groupName: "Eliminato",
        qualificationProbability: "0%",
        groupAnalysisText: "La nazionale di appartenenza è stata eliminata o non partecipa al Mondiale.",
        postGroupPath: "Nessun percorso disponibile."
      };
      parsedData.alternatives = [];
      parsedData.roleCompetitionComment = "La nazionale di appartenenza è stata eliminata o non partecipa al Mondiale.";
    } else {
      // Programmatic override to guarantee next opponent matches the active round
      parsedData.nextOpponent = nextOpponent || "Da verificare";
      if (!parsedData.matchAnalysis) parsedData.matchAnalysis = {};
      parsedData.matchAnalysis.nextOpponent = nextOpponent || "Da verificare";
    }

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
