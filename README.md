# 🇲🇦 Vext Voice SDK

> **Sub-500ms Moroccan Darija & French Voice Telephony for E-Commerce COD & Fintech**  
> Powered by the unified Moroccan wallet on [EnvoiSMS.ma](https://envoisms.ma) & [Vext.ma](https://vext.ma).

[![npm version](https://img.shields.io/npm/v/@vext/voice.svg)](https://www.npmjs.com/package/@vext/voice)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Latency](https://img.shields.io/badge/Latency-<480ms-emerald)](https://vext.ma)
[![Dialects](https://img.shields.io/badge/Dialects-Darija%20%7C%20French%20%7C%20Arabic-purple)](https://vext.ma)

---

## What is Vext Voice?

Vext is the developer-first Voice AI gateway for North Africa. It enables developers and e-commerce merchants to trigger automated, conversational phone calls that speak **natural Moroccan Darija and French** with sub-500ms latency.

- **Stop E-Commerce COD Returns**: Call customers 30 seconds after checkout to confirm address, availability, and cash preparation.
- **Voice OTP Fallback**: Deliver urgent authentication codes via phone call when SMS delivery is delayed.
- **Pay in Moroccan Dirhams (MAD)**: Billed directly from your existing **EnvoiSMS.ma** credit balance via CMI or Moroccan bank transfer. No foreign exchange cards (*Dotation*) needed.

---

## Installation

### Node.js / TypeScript
```bash
npm install @vext/voice
```

### Python
```bash
pip install vext-voice
```

---

## Quickstart

### Node.js / TypeScript
```typescript
import { Vext } from '@vext/voice';

const vext = new Vext({
  apiKey: process.env.VEXT_API_KEY!, // Retrieve from envoisms.ma or vext.ma
});

// Trigger an automated confirmation call
const call = await vext.calls.dispatch({
  to: '+212661234567',
  agent: 'kenza',
  language: 'darija',
  context: {
    order_id: 'CMD-9481',
    customer_name: 'Karim',
    total_mad: 350,
    city: 'Casablanca',
  },
  callbackUrl: 'https://monstore.ma/webhooks/vext-callback',
});

console.log(`Call dispatched: ${call.callId} (Status: ${call.status})`);
```

### Python
```python
from vext_voice import VextClient

client = VextClient(api_key="vext_live_...")

call = client.dispatch_call(
    to="+212661234567",
    agent="kenza",
    language="darija",
    context={
        "order_id": "CMD-9481",
        "customer_name": "Karim",
        "total_mad": 350,
        "city": "Casablanca"
    }
)

print(f"Call dispatched: {call['call_id']}")
```

---

## Webhook Verification

Vext sends cryptographic HMAC SHA-256 signatures with every webhook to verify authenticity:

```typescript
import express from 'express';
import { Vext } from '@vext/voice';

const app = express();
const vext = new Vext({ apiKey: process.env.VEXT_API_KEY! });

app.post('/webhooks/vext', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-vext-signature'] as string;
  const isValid = vext.webhooks.verifySignature(
    req.body,
    signature,
    process.env.VEXT_WEBHOOK_SECRET!
  );

  if (!isValid) {
    return res.status(401).send('Unauthorized webhook signature');
  }

  const event = JSON.parse(req.body.toString());
  console.log('Received event:', event.event, event.data);
  res.sendStatus(200);
});
```

---

## Billing & Credits

- Every call is billed in **10-second increments** directly against your prepaid balance on [EnvoiSMS.ma](https://envoisms.ma).
- **Official Invoices with 20% deductible TVA** for Moroccan accounting.
- Check balance programmatically:
  ```typescript
  const balance = await vext.wallet.getBalance();
  console.log(`Remaining balance: ${balance.balanceMad} MAD`);
  ```

---

## Documentation & Support

- **API Documentation**: [https://vext.ma/docs](https://vext.ma/docs)
- **Top Up Credits**: [https://envoisms.ma](https://envoisms.ma)
- **Developer Support**: [engineering@vext.ma](mailto:engineering@vext.ma)

---

## License

[MIT](LICENSE) © 2026 Vext Telecommunications & EnvoiSMS.ma
