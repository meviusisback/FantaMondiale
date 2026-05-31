import crypto from 'crypto';

function getHash(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, password } = req.query;
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
    // 1. Password check if session is protected
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
        return res.status(401).json({ error: 'Password richiesta per eliminare questa sessione.' });
      }
      const isCorrectAdmin = process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
      if (!isCorrectAdmin) {
        const providedHash = getHash(password);
        if (providedHash !== existingHash) {
          return res.status(401).json({ error: 'Password della sessione errata. Rimozione negata.' });
        }
      }
    }

    // 2. Fetch sessions list to filter it
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

    // 3. Perform atomic delete of the specific session key, password key, and list update
    const responseDel = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['DEL', `fantamondiale_session:${id}`],
        ['DEL', `fantamondiale_password:${id}`],
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
