import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency') || 'USD';
  const paymentMethod = searchParams.get('paymentMethod') || 'card';

  // Validate amount
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  // Validate payment method
  const validPaymentMethods = ['card', 'bank_transfer', 'paypal'];
  if (!validPaymentMethods.includes(paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
  }

  const payoneerBaseUrl = 'https://www.payoneer.com/pay/';
  const payoneerAccountId = '4022641167412'; // Replace this with your real account ID.

  // Generate the Payoneer link
  const payoneerLink = `${payoneerBaseUrl}?account_id=${payoneerAccountId}&amount=${amount}&currency=${currency}&payment_method=${paymentMethod}`;

  return NextResponse.json({ payoneerLink });
}
