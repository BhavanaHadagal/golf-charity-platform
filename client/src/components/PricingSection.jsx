import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const plans = [
  {
    name: "Monthly",
    price: "£9.99",
    period: "/month",
    features: [
      "Enter up to 5 Stableford scores",
      "Monthly prize draw entry",
      "Choose your charity",
      "Full dashboard access",
      "Winner verification support",
    ],
    featured: false,
  },
  {
    name: "Yearly",
    price: "£89.99",
    period: "/year",
    savings: "Save £30",
    features: [
      "Everything in Monthly",
      "Priority draw entry",
      "Exclusive yearly bonus draw",
      "Increase charity contribution",
      "Early access to new features",
    ],
    featured: true,
  },
];

export default function PricingSection() {
  const ref = useScrollReveal();

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        
        <div ref={ref} className="text-center max-w-xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 mb-3">
            Simple Pricing
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            One subscription, triple the value
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border p-8 transition hover:shadow-xl ${
        plan.featured ? "bg-gray-900 text-white border-gray-900" : "bg-white"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Savings badge */}
      {plan.featured && plan.savings && (
        <div className="absolute -top-3 right-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {plan.savings}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-1">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold">
          {plan.price}
        </span>
        <span className={`text-sm ${plan.featured ? "text-white/60" : "text-gray-500"}`}>
          {plan.period}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check
              size={16}
              className={`mt-1 ${
                plan.featured ? "text-orange-400" : "text-blue-600"
              }`}
            />
            <span className={`text-sm ${plan.featured ? "text-white/80" : "text-gray-600"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Link
        to="/signup"
        className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition ${
          plan.featured
            ? "bg-orange-500 hover:bg-orange-600 text-white"
            : "border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Get Started <ArrowRight size={16} />
      </Link>
    </div>
  );
}