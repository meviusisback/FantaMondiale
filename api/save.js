export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ 
      error: 'Variabili d\'ambiente Redis non configurate su Vercel. Assicurati che UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN (o le equivalenti KV_REST_API_*) siano valorizzate.' 
    });
  }

  try {
    const sessionData = req.body;
    
    // Call Upstash REST API using command array format
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['SET', 'fantamondiale_session', JSON.stringify(sessionData)])
    });

    const result = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: result.error || 'Errore durante la scrittura su Upstash Redis.' });
    }

    return res.status(200).json({ success: true, result: result.result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
