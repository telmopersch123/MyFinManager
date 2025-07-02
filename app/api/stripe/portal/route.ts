import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return new Response("Customer ID is required", { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
