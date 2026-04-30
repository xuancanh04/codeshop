/** Stripe publishable key (safe in client). Real charges need a backend for secrets. */
export const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ''

export const stripeReady = Boolean(
  stripePublishableKey && stripePublishableKey.startsWith('pk_'),
)
