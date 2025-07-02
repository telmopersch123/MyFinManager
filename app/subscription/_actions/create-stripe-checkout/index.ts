"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Stripe } from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  // Obter o usuário do Clerk para verificar o customerId
  const user = await clerkClient().users.getUser(userId);
  let customerId = user.publicMetadata.stripeCustomerId as string | undefined;

  // Criar cliente no Stripe se não existir
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.emailAddresses[0]?.emailAddress,
      metadata: {
        clerk_user_id: userId,
      },
    });
    customerId = customer.id;
    // Atualizar o usuário do Clerk com o customerId
    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        stripeCustomerId: customerId,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?checkout=cancelled`,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
