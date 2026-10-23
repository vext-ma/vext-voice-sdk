import axios, { AxiosInstance } from 'axios';
import { DispatchCallOptions, CallRecord } from '../types';

export class CallsResource {
  constructor(private http: AxiosInstance) {}

  /**
   * Dispatch an outbound phone call via WhatsApp Voice or SIP Trunk.
   */
  async dispatch(options: DispatchCallOptions): Promise<CallRecord> {
    const payload = {
      to: options.to,
      agent_name: options.agent || 'kenza',
      language: options.language || 'darija',
      context: options.context || {},
      callback_url: options.callbackUrl,
      channel: options.channel || 'whatsapp',
      metadata: options.metadata || {},
    };

    const response = await this.http.post<{ success: boolean; call_id: string; status: string; data?: any }>(
      '/v1/vext/calls/dispatch',
      payload
    );

    return {
      callId: response.data.call_id,
      status: (response.data.status as any) || 'queued',
      to: options.to,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Alias for dispatch.
   */
  async create(options: DispatchCallOptions): Promise<CallRecord> {
    return this.dispatch(options);
  }

  /**
   * Retrieve real-time status and telemetry for an active or completed call.
   */
  async get(callId: string): Promise<CallRecord> {
    const response = await this.http.get<{ call_id: string; status: string; to: string; duration_seconds?: number; cost_mad?: number }>(
      `/v1/vext/calls/${callId}`
    );

    return {
      callId: response.data.call_id,
      status: (response.data.status as any) || 'completed',
      to: response.data.to,
      durationSeconds: response.data.duration_seconds,
      costMad: response.data.cost_mad,
      createdAt: new Date().toISOString(),
    };
  }
}
