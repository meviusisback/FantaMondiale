import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventType, payload } = req.body || {};

  if (!eventType || !payload) {
    return res.status(400).json({ error: 'Dati incompleti: eventType e payload sono obbligatori.' });
  }

  try {
    const bodyStr = JSON.stringify(payload);
    
    // Calculate HMAC signature on the server using Node's native crypto module
    const signature = crypto
      .createHmac('sha256', 'fantacalcio-secret-2026')
      .update(bodyStr)
      .digest('hex');

    const webhookUrl = 'https://exposed-port-8644-8b56f0c59a8d9036d9b7-mzr5d4vzoe.h24.openclaw.agent37.com/webhooks/fantacalcio-formazioni';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Event-Type': eventType,
        'X-Hub-Signature-256': `sha256=${signature}`
      },
      body: bodyStr
    });

    const responseText = await response.text();

    if (response.ok) {
      return res.status(200).json({ success: true, status: response.status, data: responseText });
    } else {
      return res.status(response.status).json({ error: responseText });
    }
  } catch (error) {
    console.error('Webhook proxy error:', error);
    return res.status(500).json({ error: error.message || 'Errore interno del server durante l\'invio del webhook.' });
  }
}
