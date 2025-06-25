"use client";

import { Button } from "@/app/_components/ui/button";

import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";

export default function AcquireButton() {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    // criando  checkout
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }

    // Carregar o STRIPE
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    // e redirecionar o usuário para o checkout
    await stripe.redirectToCheckout({ sessionId });
  };
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";
  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          {" "}
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <div>
      <Button
        className="w-full rounded-full font-bold"
        onClick={handleAcquirePlanClick}
      >
        Adiquirir Plano
      </Button>
    </div>
  );
}
