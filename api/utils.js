import fs from 'fs';
import path from 'path';

const localFilePath = path.join(process.cwd(), 'api', 'eliminated-countries.json');
const tempFilePath = path.join('/tmp', 'eliminated-countries.json');

function readCacheFile() {
  try {
    if (fs.existsSync(localFilePath)) {
      return JSON.parse(fs.readFileSync(localFilePath, 'utf8'));
    }
  } catch (e) {}
  try {
    if (fs.existsSync(tempFilePath)) {
      return JSON.parse(fs.readFileSync(tempFilePath, 'utf8'));
    }
  } catch (e) {}
  return null;
}

function writeCacheFile(data) {
  const serialized = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(localFilePath, serialized, 'utf8');
    return;
  } catch (e) {}
  try {
    fs.writeFileSync(tempFilePath, serialized, 'utf8');
  } catch (e) {}
}

const TOURNAMENT_TEAMS = [
  'Messico', 'Sudafrica', 'Corea del Sud', 'Rep. Ceca',
  'Canada', 'Bosnia ed Erzegovina', 'Qatar', 'Svizzera',
  'Brasile', 'Marocco', 'Haiti', 'Scozia',
  'Stati Uniti', 'Paraguay', 'Australia', 'Turchia',
  'Germania', 'Curaçao', 'Costa d\'Avorio', 'Ecuador',
  'Paesi Bassi', 'Giappone', 'Svezia', 'Tunisia',
  'Belgio', 'Egitto', 'Iran', 'Nuova Zelanda',
  'Spagna', 'Capo Verde', 'Arabia Saudita', 'Uruguay',
  'Francia', 'Senegal', 'Iraq', 'Norvegia',
  'Argentina', 'Algeria', 'Austria', 'Giordania',
  'Portogallo', 'Repubblica Democratica del Congo', 'Uzbekistan', 'Colombia',
  'Inghilterra', 'Croazia', 'Ghana', 'Panama'
];

function normalizeCountry(name) {
  if (!name) return '';
  return name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '');
}

const TOURNAMENT_TEAMS_NORMALIZED = new Set(TOURNAMENT_TEAMS.map(normalizeCountry));

export async function getEliminatedCountries(apiKey, provider, openRouterModel, geminiModel) {
  const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
  let cache = readCacheFile();

  if (cache && cache.lastCheckTime && (Date.now() - cache.lastCheckTime < cacheDuration)) {
    return cache.eliminatedCountries;
  }

  try {
    const useOpenRouter = provider === 'openrouter';
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString('it-IT') + ' ' + new Date().toLocaleTimeString('it-IT');
    
    const prompt = `Esegui una ricerca web in tempo reale e identifica:
1. L'elenco delle nazionali di calcio maschili che NON si sono qualificate per la fase finale del Mondiale ${currentYear} (non partecipanti alla fase finale).
2. L'elenco delle nazionali di calcio maschili che si erano qualificate per la fase finale del Mondiale ${currentYear} ma che sono già state ufficialmente ELIMINATE (escluse) ad oggi (${currentDate}) durante lo svolgimento del torneo.

Rispondi esclusivamente con un oggetto JSON con le seguenti chiavi:
{
  "nonQualificate": ["Nazione1", "Nazione2", ...],
  "eliminateDalTorneo": ["Nazione3", "Nazione4", ...]
}
Non aggiungere spiegazioni, non usare markdown e non scrivere altro testo.`;

    let text = '';
    if (useOpenRouter) {
      const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const openRouterModelString = openRouterModel || 'openai/gpt-oss-120b:free';
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
          messages: [{ role: 'user', content: prompt }],
          tools: [{ type: 'openrouter:web_search' }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        text = data.choices?.[0]?.message?.content;
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
        if (!text) {
          console.error("Gemini Native Utils API returned empty candidates. Full payload:", JSON.stringify(data));
        }
      } else {
        const errText = await response.text();
        console.error(`Errore dall'API Gemini in utils.js: ${errText}`);
      }
    }

    if (text) {
      let cleanText = text.trim();
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.substring(7);
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.substring(3);
      }
      if (cleanText.endsWith('```')) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
      }
      const parsed = JSON.parse(cleanText.trim());
      let countries = [];

      if (Array.isArray(parsed)) {
        countries = parsed.map(c => c.trim()).filter(c => !TOURNAMENT_TEAMS_NORMALIZED.has(normalizeCountry(c)));
      } else if (parsed && (Array.isArray(parsed.nonQualificate) || Array.isArray(parsed.eliminateDalTorneo))) {
        const nonQuali = Array.isArray(parsed.nonQualificate) ? parsed.nonQualificate : [];
        const elim = Array.isArray(parsed.eliminateDalTorneo) ? parsed.eliminateDalTorneo : [];
        
        const nonQualiFiltered = nonQuali.map(c => c.trim()).filter(c => !TOURNAMENT_TEAMS_NORMALIZED.has(normalizeCountry(c)));
        const elimCleaned = elim.map(c => c.trim());
        
        countries = [...nonQualiFiltered, ...elimCleaned];
      }

      if (parsed) {
        const newCache = {
          lastCheckTime: Date.now(),
          lastCheckDate: currentDate,
          eliminatedCountries: countries
        };
        writeCacheFile(newCache);
        console.log('Automated Daily AI World Cup verification completed. Saved to JSON:', newCache);
        return countries;
      }
    }
  } catch (error) {
    console.error('Failed automated daily AI World Cup verification:', error);
  }

  // Fallback in case AI check fails or is pending
  if (!cache || !cache.eliminatedCountries) {
    const fallbackCache = {
      lastCheckTime: Date.now(),
      lastCheckDate: new Date().toLocaleDateString('it-IT') + ' ' + new Date().toLocaleTimeString('it-IT'),
      eliminatedCountries: ['Italia', 'Nigeria']
    };
    writeCacheFile(fallbackCache);
    return fallbackCache.eliminatedCountries;
  }
  return cache.eliminatedCountries;
}
