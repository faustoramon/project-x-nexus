import { Search, MessageSquare, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Tell Nexus what you&apos;re looking for. Our AI scans thousands of retailers in seconds to find the best options and prices.",
  },
  {
    icon: MessageSquare,
    title: "Negotiate",
    description:
      "Nexus automatically negotiates with sellers, applies coupons, and finds hidden discounts to get you the best possible deal.",
  },
  {
    icon: ShoppingBag,
    title: "Purchase",
    description:
      "Review your personalized recommendations and complete your purchase with confidence, knowing you got the best price.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            How it Works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Three simple steps to
            <br />
            smarter shopping
          </h2>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-sm font-medium text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-base leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
