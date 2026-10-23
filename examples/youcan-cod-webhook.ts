/**
 * Example: Triggering a Moroccan Darija confirmation call when an order
 * is placed on YouCan, Shopify, or WooCommerce.
 */

import { Vext } from '../src';

const vext = new Vext({
  apiKey: process.env.VEXT_API_KEY || 'vext_live_demo_key',
});

async function handleNewOrderPlaced(order: any) {
  console.log(`[OrderWebhook] New order ${order.id} received for ${order.customer.phone}`);

  try {
    const call = await vext.calls.dispatch({
      to: order.customer.phone, // e.g. +212612345678
      agent: 'kenza',
      language: 'darija',
      context: {
        order_id: order.id,
        customer_name: order.customer.first_name,
        city: order.shipping_address.city, // e.g. Marrakech
        total_mad: order.total_price, // e.g. 350
        items_summary: order.line_items.map((i: any) => `${i.quantity}x ${i.title}`).join(', '),
      },
      callbackUrl: 'https://monstore.ma/api/webhooks/vext-voice',
    });

    console.log(`[Vext] Outbound confirmation call queued: ${call.callId} (Status: ${call.status})`);
  } catch (error: any) {
    console.error('[Vext] Failed to dispatch confirmation call:', error.message);
  }
}
