"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 lg:px-8 bg-[#e8f4fc]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4a9ede]/30 bg-white px-4 py-1.5 text-sm text-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-[#4a9ede]" />
            <span>AI-Powered Shopping Assistant</span>
          </div>
        </div>

        <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">Stop Overpaying. Our AI Finds & Guarantees Your Lowest Price.</h1>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Ditch the endless research and stressful haggling. Nexus intelligently finds, compares, and negotiates the best deals across the web, so you save time and money effortlessly.</p>

        <div className="mt-12">
          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#4a9ede]/30 px-6 py-4 text-foreground shadow-sm">
              <Sparkles className="h-5 w-5 text-[#4a9ede]" />
              <span className="font-medium">
                You&apos;re on the list! We&apos;ll be in touch soon.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-full border border-[#4a9ede]/30 bg-white px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#4a9ede]/30 focus:border-[#4a9ede] transition-all shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a9ede] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4a9ede]/30 transition-all hover:bg-[#3a8ecc] hover:shadow-xl hover:shadow-[#4a9ede]/40 focus:outline-none focus:ring-2 focus:ring-[#4a9ede]/50"
              >
                Get Early Access: Secure Your Lowest Price
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Join 2,000+ people already on the waitlist
        </p>
      </div>

      {/* Subtle gradient background */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4a9ede]/30 to-[#a8d4f0]/40 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
