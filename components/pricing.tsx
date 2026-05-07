import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with AI-powered shopping.",
    features: [
      "Up to 10 product searches per month",
      "Basic price comparison",
      "Browser extension",
      "Email support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For power shoppers who want the full Nexus experience.",
    features: [
      "Unlimited product searches",
      "AI-powered negotiation",
      "Real-time price tracking",
      "Priority support",
      "Exclusive deals access",
      "Multi-retailer checkout",
    ],
    cta: "Join Waitlist",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 lg:px-8 bg-card">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Pricing
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Start free, upgrade when you need more power.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 lg:p-10 ${
                tier.featured
                  ? "bg-primary text-primary-foreground ring-1 ring-primary"
                  : "bg-background ring-1 ring-border"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-medium text-background">
                  Most Popular
                </span>
              )}

              <div>
                <h3
                  className={`text-lg font-semibold ${
                    tier.featured ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-semibold tracking-tight ${
                      tier.featured ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={
                        tier.featured
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }
                    >
                      {tier.period}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    tier.featured
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`h-5 w-5 flex-shrink-0 ${
                        tier.featured
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        tier.featured
                          ? "text-primary-foreground/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-medium transition-all ${
                  tier.featured
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
