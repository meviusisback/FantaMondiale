export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'ID sessione mancante.' });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ 
      error: 'Variabili d\'ambiente Redis non configurate su Vercel. Assicurati che UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN siano configurate.' 
    });
  }

  try {
    // 1. Fetch sessions list
    const responseList = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['GET', 'fantamondiale_sessions_list'])
    });
    
    const resultList = await responseList.json();
    let updatedList = [];
    if (responseList.ok && resultList.result) {
      try {
        updatedList = JSON.parse(resultList.result);
        if (!Array.isArray(updatedList)) updatedList = [];
      } catch (e) {
        updatedList = [];
      }
    }

    // Filter out the deleted session ID
    updatedList = updatedList.filter(s => s.id !== id);

    // 2. Perform atomic delete of the specific session key and list update
    const responseDel = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['DEL', `fantamondiale_session:${id}`],
        ['SET', 'fantamondiale_sessions_list', JSON.stringify(updatedList)]
      ])
    });

    const resultDel = await responseDel.json();
    if (!responseDel.ok) {
      return res.status(responseDel.status).json({ error: 'Errore durante la rimozione da Upstash Redis.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
