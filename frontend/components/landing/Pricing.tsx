import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    name: "Free",
    description: "Perfect for personal use and getting started",
    price: 0,
    popular: false,
    features: [
      { text: "Up to 500 bookmarks", extra: false },
      { text: "3 collections", extra: false },
      { text: "Browser extension", extra: false },
      { text: "Basic search", extra: false },
      { text: "2 devices", extra: false },
    ],
    extras: [],
  },
  {
    name: "Pro",
    description: "For power users who save everything",
    price: 9,
    popular: true,
    features: [
      { text: "Unlimited bookmarks", extra: false },
      { text: "Unlimited collections", extra: false },
      { text: "Browser extension", extra: false },
      { text: "Full-text search", extra: false },
      { text: "Unlimited devices", extra: false },
    ],
    extras: [
      "Custom tags & filters",
      "Import from any browser",
      "Priority sync",
    ],
  },
  {
    name: "Team",
    description: "For teams that save and share knowledge",
    price: 19,
    popular: false,
    features: [
      { text: "Everything in Pro", extra: false },
      { text: "Shared collections", extra: false },
      { text: "Team workspace", extra: false },
      { text: "Admin controls", extra: false },
      { text: "Priority support", extra: false },
    ],
    extras: [
      "SSO & SAML",
      "Audit logs",
      "SLA guarantee",
    ],
  },
]

export default function Pricing() {
  return (
    <section className="mt-20 md:mt-40 flex flex-col items-center gap-4 px-4 md:px-0" id="pricing">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Simple, Transparent Pricing</h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md">
        Choose a plan that works best for you. No hidden fees.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full mt-10 rounded-2xl overflow-hidden border border-dashed border-neutral-200 dark:border-neutral-800">
        {PLANS.map((plan, i) => (
          <div
            key={i}
            className={cn(
              "relative flex flex-col p-8 gap-6",
              plan.popular
                ? "bg-neutral-900 dark:bg-neutral-950 text-white md:border-x border-y md:border-y-0 border-dashed border-neutral-700"
                : "bg-white dark:bg-neutral-900",
              i === 0 && "md:border-r border-b md:border-b-0 border-dashed border-neutral-200 dark:border-neutral-800",
              i === 2 && "md:border-l border-t md:border-t-0 border-dashed border-neutral-200 dark:border-neutral-800",
            )}
          >
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className={cn("text-lg font-semibold", plan.popular ? "text-white" : "text-neutral-900 dark:text-white")}>
                  {plan.name}
                </span>
                {plan.popular && (
                  <span className="text-xs font-semibold bg-white text-neutral-900 px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className={cn("text-sm", plan.popular ? "text-neutral-400" : "text-neutral-500")}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-end gap-1">
                <span className={cn("text-5xl font-bold tracking-tight", plan.popular ? "text-white" : "text-neutral-900 dark:text-white")}>
                  ${plan.price}
                </span>
              </div>
              <span className={cn("text-sm", plan.popular ? "text-neutral-400" : "text-neutral-500")}>
                per month
              </span>
            </div>

            {/* CTA */}
            <button
              className={cn(
                "w-full py-3 rounded-lg font-semibold text-sm transition-all duration-150",
                plan.popular
                  ? "bg-white text-neutral-900 hover:bg-neutral-100"
                  : "bg-neutral-900 dark:bg-neutral-700 text-white hover:bg-neutral-700 dark:hover:bg-neutral-600"
              )}
            >
              {plan.price === 0 ? "Get started free" : "Get Started"}
            </button>

            {/* Base features */}
            <ul className="flex flex-col gap-3">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2.5">
                  <span className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-full shrink-0",
                    plan.popular ? "bg-neutral-700" : "bg-neutral-100 dark:bg-neutral-800"
                  )}>
                    <Check className={cn("h-3 w-3", plan.popular ? "text-neutral-300" : "text-neutral-500 dark:text-neutral-400")} />
                  </span>
                  <span className={cn("text-sm", plan.popular ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400")}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Extras */}
            {plan.extras.length > 0 && (
              <>
                <div className="flex items-center gap-3">
                  <div className={cn("flex-1 border-t border-dashed", plan.popular ? "border-neutral-700" : "border-neutral-200 dark:border-neutral-800")} />
                  <span className={cn("text-xs", plan.popular ? "text-neutral-500" : "text-neutral-400")}>+</span>
                  <div className={cn("flex-1 border-t border-dashed", plan.popular ? "border-neutral-700" : "border-neutral-200 dark:border-neutral-800")} />
                </div>
                <ul className="flex flex-col gap-3 -mt-3">
                  {plan.extras.map((e, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      <span className={cn("text-sm", plan.popular ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400")}>
                        {e}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
