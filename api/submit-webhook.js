import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

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

    let webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      try {
        const envPath = path.join(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const lines = envContent.split('\n');
          for (const line of lines) {
            const match = line.match(/^\s*WEBHOOK_URL\s*=\s*(.*)\s*$/);
            if (match) {
              webhookUrl = match[1].trim();
              break;
            }
          }
        }
      } catch (e) {
        console.error('Failed to load local .env file:', e);
      }
    }

    if (webhookUrl) {
      webhookUrl = webhookUrl.replace(/^['"]|['"]$/g, '');
    }

    if (!webhookUrl) {
      return res.status(500).json({ error: 'Webhook URL non configurato nelle variabili d\'ambiente (WEBHOOK_URL).' });
    }

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
