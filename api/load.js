export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ 
      error: 'Variabili d\'ambiente Redis non configurate su Vercel. Assicurati che UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN siano configurate.' 
    });
  }

  const { id } = req.query;

  try {
    if (!id) {
      // Scenario A: Retrieve catalog of sessions
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', 'fantamondiale_sessions_list'])
      });

      const result = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Errore durante il recupero del catalogo sessioni.' });
      }

      const rawList = result.result;
      let sessionsList = [];
      if (rawList) {
        sessionsList = JSON.parse(rawList);
      }
      return res.status(200).json(sessionsList);
    } else {
      // Scenario B: Retrieve specific session state
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', `fantamondiale_session:${id}`])
      });

      const result = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: `Errore durante il recupero della sessione ${id}.` });
      }

      const rawData = result.result;
      if (!rawData) {
        return res.status(404).json({ error: 'Sessione non trovata su Redis.' });
      }

      const sessionData = JSON.parse(rawData);
      return res.status(200).json(sessionData);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
