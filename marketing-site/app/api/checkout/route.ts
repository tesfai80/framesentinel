import { NextRequest, NextResponse } from 'next/server';
import { getLemonSqueezyClient } from '@/lib/lemonsqueezy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, email, name, customData } = body;

    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store ID not configured' },
        { status: 500 }
      );
    }

    const lemonSqueezy = getLemonSqueezyClient();

    const checkout = await lemonSqueezy.createCheckout({
      storeId,
      variantId,
      checkoutData: {
        email,
        name,
        custom: customData,
      },
      checkoutOptions: {
        embed: false,
        media: true,
        logo: true,
        desc: true,
        discount: true,
        dark: true,
        subscription_preview: true,
      },
    });

    return NextResponse.json({
      checkoutUrl: checkout.data.attributes.url,
      checkoutId: checkout.data.id,
    });
  } catch (error: any) {
    console.error('Lemon Squeezy checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
