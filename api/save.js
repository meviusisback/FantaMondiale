import crypto from 'crypto';

function getHash(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

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
    const { metadata, state, password } = req.body;
    if (!metadata || !metadata.title || !metadata.author || !metadata.date || !state) {
      return res.status(400).json({ error: 'Dati incompleti: metadati o stato assenti.' });
    }

    let id = metadata.id;
    const isNew = !id || id === 'new';
    if (isNew) {
      id = `s-${Date.now()}`;
    }

    // 1. Password verification for existing session or requirements for new session
    if (isNew) {
      if (!password || password.trim() === '') {
        return res.status(400).json({ error: 'Password obbligatoria per creare una nuova sessione.' });
      }
    } else {
      // Fetch existing password hash from Upstash Redis
      const responsePwd = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', `fantamondiale_password:${id}`])
      });
      const resultPwd = await responsePwd.json();
      const existingHash = responsePwd.ok && resultPwd.result ? resultPwd.result : null;

      if (existingHash) {
        if (!password) {
          return res.status(401).json({ error: 'Password richiesta per aggiornare questa sessione.' });
        }
        const isCorrectAdmin = process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
        if (!isCorrectAdmin) {
          const providedHash = getHash(password);
          if (providedHash !== existingHash) {
            return res.status(401).json({ error: 'Password della sessione errata. Accesso negato.' });
          }
        }
      }
    }

    const sessionMetadata = {
      id: id,
      title: metadata.title.trim(),
      author: metadata.author.trim(),
      date: metadata.date
    };

    // 2. Fetch existing catalog of sessions
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

    // 3. Update catalog array
    const existingIndex = sessionsList.findIndex(s => s.id === id);
    if (existingIndex !== -1) {
      sessionsList[existingIndex] = sessionMetadata;
    } else {
      sessionsList.push(sessionMetadata);
    }

    // 4. Perform Pipeline atomic SETs
    const pipelineCommands = [
      ['SET', `fantamondiale_session:${id}`, JSON.stringify(state)],
      ['SET', 'fantamondiale_sessions_list', JSON.stringify(sessionsList)]
    ];
    if (password) {
      pipelineCommands.push(['SET', `fantamondiale_password:${id}`, getHash(password)]);
    }

    const responsePipe = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pipelineCommands)
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

