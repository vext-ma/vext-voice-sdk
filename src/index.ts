import axios, { AxiosInstance } from 'axios';
import { VextClientOptions } from './types';
import { CallsResource } from './resources/calls';
import { WalletResource } from './resources/wallet';
import { WebhooksResource } from './resources/webhooks';

export * from './types';

export class Vext {
  public calls: CallsResource;
  public wallet: WalletResource;
  public webhooks: WebhooksResource;

  private http: AxiosInstance;

  constructor(options: VextClientOptions) {
    if (!options.apiKey) {
      throw new Error('Vext: API Key is required. Retrieve your key from https://envoisms.ma or https://vext.ma.');
    }

    const baseUrl = options.baseUrl || 'https://api.envoisms.ma';
    this.http = axios.create({
      baseURL: baseUrl,
      timeout: options.timeoutMs || 15000,
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': '@vext/voice-sdk-node/1.0.0',
      },
    });

    this.calls = new CallsResource(this.http);
    this.wallet = new WalletResource(this.http);
    this.webhooks = new WebhooksResource();
  }
}

// Default export
export default Vext;
