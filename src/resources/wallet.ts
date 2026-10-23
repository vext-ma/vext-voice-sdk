import { AxiosInstance } from 'axios';
import { WalletBalance, LedgerEntry } from '../types';

export class WalletResource {
  constructor(private http: AxiosInstance) {}

  /**
   * Retrieve current EnvoiSMS prepaid MAD balance.
   */
  async getBalance(): Promise<WalletBalance> {
    const response = await this.http.get<{ tenant_id: string; balance_cents: number; balance_mad: string }>(
      '/api/vext/tenant-config/me'
    );

    return {
      tenantId: response.data.tenant_id,
      balanceCents: response.data.balance_cents,
      balanceMad: parseFloat(response.data.balance_mad),
      currency: 'MAD',
    };
  }

  /**
   * Retrieve immutable audit ledger of voice call unit deductions.
   */
  async getLedger(limit: number = 50): Promise<LedgerEntry[]> {
    const response = await this.http.get<{ tenant_id: string; ledger: LedgerEntry[] }>(
      `/api/vext/tenant-ledger/me?limit=${limit}`
    );

    return response.data.ledger || [];
  }
}
