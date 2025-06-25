"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing Stripe keys" }, { status: 400 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const { customer } = event.data.object;
      // Usar type assertion para acessar parent
      interface StripeEventObject {
        parent?: {
          subscription_details?: {
            subscription?: string;
            metadata?: {
              clerk_user_id?: string;
            };
          };
        };
      }
      const parent = (event.data.object as StripeEventObject).parent;
      const subscription_details = parent?.subscription_details;
      const subscriptionId = subscription_details?.subscription;

      if (!subscriptionId) {
        return NextResponse.json(
          { error: "Subscription id not found" },
          { status: 400 },
        );
      }

      // Tente acessar clerk_user_id a partir de parent.subscription_details.metadata
      let clerkUserId = subscription_details?.metadata?.clerk_user_id;

      // Se clerk_user_id não estiver em subscription_details.metadata, busque diretamente da assinatura
      if (!clerkUserId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        clerkUserId = sub.metadata.clerk_user_id;
      }

      if (!clerkUserId) {
        return NextResponse.json(
          { error: "Missing clerk user id" },
          { status: 400 },
        );
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscriptionId,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.json(
          { error: "Missing Clerk user ID in metadata" },
          { status: 400 },
        );
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
    default:
  }
  return NextResponse.json({ received: true });
};
