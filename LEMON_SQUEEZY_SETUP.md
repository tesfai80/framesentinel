# Lemon Squeezy Integration Setup

## Overview
FrameSentinel uses Lemon Squeezy for payment processing and subscription management.

## Setup Steps

### 1. Create Lemon Squeezy Account
1. Go to https://lemonsqueezy.com
2. Sign up for an account
3. Complete your store setup

### 2. Get API Credentials

#### API Key
1. Go to https://app.lemonsqueezy.com/settings/api
2. Click "Create API Key"
3. Copy the API key

#### Store ID
1. Go to https://app.lemonsqueezy.com/settings/stores
2. Copy your Store ID

#### Webhook Secret
1. Go to https://app.lemonsqueezy.com/settings/webhooks
2. Click "Add endpoint"
3. Set URL to: `https://yourdomain.com/api/webhooks/lemonsqueezy`
4. Select events:
   - `order_created`
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_payment_success`
   - `subscription_payment_failed`
5. Copy the Signing Secret

### 3. Create Products & Variants

Create products for each plan:

#### Free Plan
- Name: FrameSentinel Free
- Price: $0/month
- Copy Variant ID

#### Starter Plan
- Name: FrameSentinel Starter
- Price: $19/month
- Copy Variant ID

#### Growth Plan
- Name: FrameSentinel Growth
- Price: $59/month
- Copy Variant ID

#### Pro Plan
- Name: FrameSentinel Pro
- Price: $149/month
- Copy Variant ID

### 4. Configure Environment Variables

Add to `marketing-site/.env.local`:

```env
# Lemon Squeezy Configuration
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Product Variant IDs
NEXT_PUBLIC_LEMON_SQUEEZY_FREE_VARIANT_ID=variant_id_1
NEXT_PUBLIC_LEMON_SQUEEZY_STARTER_VARIANT_ID=variant_id_2
NEXT_PUBLIC_LEMON_SQUEEZY_GROWTH_VARIANT_ID=variant_id_3
NEXT_PUBLIC_LEMON_SQUEEZY_PRO_VARIANT_ID=variant_id_4
```

## Testing

### Test Mode
Lemon Squeezy provides test mode for development:

1. Enable test mode in dashboard
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC

### Test Checkout Flow

```bash
# Start the dev server
cd marketing-site
npm run dev

# Navigate to pricing page
open http://localhost:3000/pricing

# Click on any paid plan
# Should redirect to Lemon Squeezy checkout
```

### Test Webhooks Locally

Use ngrok or similar tool:

```bash
# Install ngrok
npm install -g ngrok

# Start tunnel
ngrok http 3000

# Update webhook URL in Lemon Squeezy dashboard to:
https://your-ngrok-url.ngrok.io/api/webhooks/lemonsqueezy
```

## Webhook Events

The system handles these events:

### order_created
- Triggered when a one-time purchase is completed
- Action: Create order record, send confirmation

### subscription_created
- Triggered when a new subscription starts
- Action: Activate user account, grant credits

### subscription_updated
- Triggered when subscription plan changes
- Action: Update user plan, adjust credits

### subscription_cancelled
- Triggered when user cancels subscription
- Action: Schedule account downgrade at period end

### subscription_payment_success
- Triggered on successful recurring payment
- Action: Renew credits, send receipt

### subscription_payment_failed
- Triggered when payment fails
- Action: Send payment failed email, set grace period

## Integration Flow

```
User clicks "Start Free Trial"
         ↓
Frontend calls /api/checkout
         ↓
Backend creates Lemon Squeezy checkout
         ↓
User redirected to Lemon Squeezy
         ↓
User completes payment
         ↓
Lemon Squeezy sends webhook
         ↓
Backend processes webhook
         ↓
User account activated
```

## Custom Data

Pass custom data to track users:

```typescript
const checkout = await lemonSqueezy.createCheckout({
  storeId,
  variantId,
  checkoutData: {
    email: user.email,
    name: user.name,
    custom: {
      user_id: user.id,
      tenant_id: tenant.id,
      source: 'pricing_page',
    },
  },
});
```

## Security

### Webhook Verification
All webhooks are verified using HMAC signature:

```typescript
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

### API Key Security
- Never expose API key in frontend
- Store in environment variables
- Use server-side API routes only

## Production Checklist

- [ ] Disable test mode in Lemon Squeezy
- [ ] Update webhook URL to production domain
- [ ] Verify all environment variables are set
- [ ] Test complete checkout flow
- [ ] Test webhook delivery
- [ ] Set up monitoring for failed webhooks
- [ ] Configure email notifications
- [ ] Test subscription cancellation
- [ ] Test plan upgrades/downgrades
- [ ] Verify tax calculations (if applicable)

## Troubleshooting

### Checkout not working
1. Check API key is valid
2. Verify Store ID is correct
3. Check Variant IDs match your products
4. Look at browser console for errors

### Webhooks not received
1. Verify webhook URL is accessible
2. Check webhook secret is correct
3. Look at Lemon Squeezy webhook logs
4. Verify signature verification logic

### Payment failed
1. Check test mode is enabled for testing
2. Verify card details are correct
3. Check Lemon Squeezy dashboard for errors

## Support

- Lemon Squeezy Docs: https://docs.lemonsqueezy.com
- Lemon Squeezy Support: https://lemonsqueezy.com/support
- API Reference: https://docs.lemonsqueezy.com/api

## Next Steps

After setup:
1. Test complete checkout flow
2. Implement subscription management UI
3. Add billing portal link
4. Set up email notifications
5. Configure tax settings
6. Add analytics tracking
