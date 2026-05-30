export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ 
      error: 'Variabili d\'ambiente Redis non configurate su Vercel. Assicurati che UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN siano configurate.' 
    });
  }

  try {
    const { metadata, state } = req.body;
    if (!metadata || !metadata.title || !metadata.author || !metadata.date || !state) {
      return res.status(400).json({ error: 'Dati incompleti: metadati o stato assenti.' });
    }

    let id = metadata.id;
    const isNew = !id || id === 'new';
    if (isNew) {
      id = `s-${Date.now()}`;
    }

    const sessionMetadata = {
      id: id,
      title: metadata.title.trim(),
      author: metadata.author.trim(),
      date: metadata.date
    };

    // 1. Fetch existing catalog of sessions
    const responseList = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['GET', 'fantamondiale_sessions_list'])
    });

    const resultList = await responseList.json();
    let sessionsList = [];
    if (responseList.ok && resultList.result) {
      try {
        sessionsList = JSON.parse(resultList.result);
        if (!Array.isArray(sessionsList)) sessionsList = [];
      } catch (e) {
        sessionsList = [];
      }
    }

    // 2. Update catalog array
    const existingIndex = sessionsList.findIndex(s => s.id === id);
    if (existingIndex !== -1) {
      sessionsList[existingIndex] = sessionMetadata;
    } else {
      sessionsList.push(sessionMetadata);
    }

    // 3. Perform Pipeline atomic SETs for both state and updated catalog
    const responsePipe = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['SET', `fantamondiale_session:${id}`, JSON.stringify(state)],
        ['SET', 'fantamondiale_sessions_list', JSON.stringify(sessionsList)]
      ])
    });

    const resultPipe = await responsePipe.json();
    if (!responsePipe.ok) {
      return res.status(responsePipe.status).json({ error: 'Errore durante il salvataggio atomico su Upstash Redis.' });
    }

    return res.status(200).json({ success: true, id, session: sessionMetadata });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
