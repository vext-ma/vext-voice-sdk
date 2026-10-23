import * as crypto from 'crypto';
import { WebhookEvent } from '../types';

export class WebhooksResource {
  /**
   * Verify HMAC SHA-256 signature from Vext / Meta webhooks.
   */
  verifySignature(rawBody: string | Buffer, signatureHeader: string, secretKey: string): boolean {
    if (!signatureHeader) return false;
    const parts = signatureHeader.split('=');
    const signature = parts.length === 2 ? parts[1] : parts[0];

    const hmac = crypto.createHmac('sha256', secretKey);
    const expected = typeof rawBody === 'string' ? hmac.update(rawBody).digest('hex') : hmac.update(rawBody).digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
    } catch {
      return false;
    }
  }

  /**
   * Parse typed webhook event payload.
   */
  constructEvent(rawBody: string | Buffer, signature: string, secretKey: string): WebhookEvent {
    if (!this.verifySignature(rawBody, signature, secretKey)) {
      throw new Error('Vext Webhook: Invalid HMAC signature verification failed.');
    }
    const text = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf-8');
    return JSON.parse(text) as WebhookEvent;
  }
}
