import crypto from 'crypto';

function getHash(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

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
      // Scenario A: Retrieve catalog of sessions (public view)
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
      // Scenario B: Retrieve specific session state & verify password
      const response = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          ['GET', `fantamondiale_session:${id}`],
          ['GET', `fantamondiale_password:${id}`]
        ])
      });

      const result = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: `Errore durante il recupero della sessione ${id}.` });
      }

      // Upstash pipeline returns responses inside an array
      const rawData = result[0] ? result[0].result : null;
      const existingHash = result[1] ? result[1].result : null;

      if (!rawData) {
        return res.status(404).json({ error: 'Sessione non trovata su Redis.' });
      }

      // Password check if session is protected
      if (existingHash) {
        const { password } = req.query;
        if (!password) {
          return res.status(401).json({ error: 'Password richiesta per accedere a questa sessione.' });
        }
        const isCorrectAdmin = process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
        if (!isCorrectAdmin) {
          const providedHash = getHash(password);
          if (providedHash !== existingHash) {
            return res.status(401).json({ error: 'Password della sessione errata. Accesso negato.' });
          }
        }
      }

      const sessionData = JSON.parse(rawData);
      return res.status(200).json(sessionData);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

