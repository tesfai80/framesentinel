// Lemon Squeezy API Client
// Documentation: https://docs.lemonsqueezy.com/api

const LEMON_SQUEEZY_API_URL = 'https://api.lemonsqueezy.com/v1';

export interface LemonSqueezyCheckout {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      store_id: number;
      variant_id: number;
      custom_price: number | null;
      product_options: any;
      checkout_options: any;
      checkout_data: any;
      expires_at: string | null;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface CreateCheckoutParams {
  storeId: string;
  variantId: string;
  checkoutData?: {
    email?: string;
    name?: string;
    custom?: Record<string, any>;
  };
  checkoutOptions?: {
    embed?: boolean;
    media?: boolean;
    logo?: boolean;
    desc?: boolean;
    discount?: boolean;
    dark?: boolean;
    subscription_preview?: boolean;
  };
  expiresAt?: string;
  customPrice?: number;
}

class LemonSqueezyClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${LEMON_SQUEEZY_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.detail || 'Lemon Squeezy API error');
    }

    return response.json();
  }

  async createCheckout(params: CreateCheckoutParams): Promise<LemonSqueezyCheckout> {
    const body = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: params.checkoutData || {},
          checkout_options: params.checkoutOptions || {},
          expires_at: params.expiresAt || null,
          custom_price: params.customPrice || null,
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: params.storeId,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: params.variantId,
            },
          },
        },
      },
    };

    return this.request('/checkouts', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async getSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
    });
  }

  async updateSubscription(subscriptionId: string, data: any) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          type: 'subscriptions',
          id: subscriptionId,
          attributes: data,
        },
      }),
    });
  }

  async getCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`);
  }

  async listSubscriptions(params?: { email?: string; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.email) queryParams.append('filter[email]', params.email);
    if (params?.status) queryParams.append('filter[status]', params.status);
    
    const query = queryParams.toString();
    return this.request(`/subscriptions${query ? `?${query}` : ''}`);
  }
}

// Singleton instance
let lemonSqueezyClient: LemonSqueezyClient | null = null;

export function getLemonSqueezyClient(): LemonSqueezyClient {
  if (!lemonSqueezyClient) {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    if (!apiKey) {
      throw new Error('LEMON_SQUEEZY_API_KEY is not set');
    }
    lemonSqueezyClient = new LemonSqueezyClient(apiKey);
  }
  return lemonSqueezyClient;
}

export default LemonSqueezyClient;
