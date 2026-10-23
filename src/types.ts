export interface VextClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export type SupportedLanguage = 'darija' | 'fr' | 'ar' | 'en';

export interface DispatchCallOptions {
  to: string;
  agent?: string;
  language?: SupportedLanguage;
  context?: Record<string, any>;
  callbackUrl?: string;
  channel?: 'whatsapp' | 'sip';
  metadata?: Record<string, any>;
}

export interface CallRecord {
  callId: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer';
  to: string;
  durationSeconds?: number;
  costMad?: number;
  extractedState?: Record<string, any>;
  createdAt: string;
}

export interface WalletBalance {
  tenantId: string;
  balanceMad: number;
  balanceCents: number;
  currency: 'MAD';
}

export interface LedgerEntry {
  type: string;
  callId?: string;
  amountCents: number;
  timestamp: number;
  remainingBalance: number;
}

export interface WebhookEvent<T = any> {
  event: 'call.started' | 'call.completed' | 'call.failed' | 'order.confirmed' | 'order.cancelled' | 'location.received';
  callId: string;
  timestamp: string;
  data: T;
}
