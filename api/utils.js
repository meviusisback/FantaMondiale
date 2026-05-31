import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localFilePath = path.join(__dirname, 'eliminated-countries.json');
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

export async function getEliminatedCountries(apiKey, provider, openRouterModel) {
  const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
  let cache = readCacheFile();

  if (cache && cache.lastCheckTime && (Date.now() - cache.lastCheckTime < cacheDuration)) {
    return cache.eliminatedCountries;
  }

  try {
    const useOpenRouter = provider === 'openrouter';
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString('it-IT') + ' ' + new Date().toLocaleTimeString('it-IT');
    
    const prompt = `Esegui una ricerca web in tempo reale e identifica l'elenco esatto di tutte le nazionali di calcio maschili che NON partecipano (non qualificate) o che sono già state ufficialmente ELIMINATE ad oggi (${currentDate}) dalla fase finale del Mondiale di calcio ${currentYear}.
Rispondi esclusivamente con un array JSON di stringhe in lingua italiana (es. ["Italia", "Egitto", "Nigeria", "Svezia"]). Non aggiungere spiegazioni, non usare markdown e non scrivere altro testo.`;

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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (response.ok) {
        const data = await response.json();
        text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
      if (Array.isArray(parsed)) {
        const countries = parsed.map(c => c.trim());
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
      eliminatedCountries: ['Italia', 'Egitto', 'Nigeria']
    };
    writeCacheFile(fallbackCache);
    return fallbackCache.eliminatedCountries;
  }
  return cache.eliminatedCountries;
}
