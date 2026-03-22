import { Sparkles, Zap, Star } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const tiers = [
  {
    match: "5-Number Match",
    share: "40%",
    rollover: true,
    icon: Sparkles,
    accent: "text-orange-500",
  },
  {
    match: "4-Number Match",
    share: "35%",
    rollover: false,
    icon: Zap,
    accent: "text-blue-600",
  },
  {
    match: "3-Number Match",
    share: "25%",
    rollover: false,
    icon: Star,
    accent: "text-purple-600",
  },
];

export default function PrizeSection() {
  const ref = useScrollReveal();

  return (
    <section id="prizes" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className="text-center max-w-xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 mb-3">
            Monthly Prize Pool
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Your scores are your ticket
          </h2>

          <p className="text-gray-500 mt-4">
            Each month, the draw engine matches your latest 5 scores against the
            winning numbers. More matches, bigger prizes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <TierCard key={tier.match} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, index }) {
  const ref = useScrollReveal();
  const Icon = tier.icon;

  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-white border p-8 text-center hover:shadow-xl transition duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {tier.rollover && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          JACKPOT
        </div>
      )}

      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-5">
        <Icon size={28} className={tier.accent} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {tier.match}
      </h3>

      <div className="text-4xl font-bold text-blue-600 my-4">
        {tier.share}
      </div>

      <p className="text-sm text-gray-500">of prize pool</p>

      {tier.rollover && (
        <p className="text-xs text-orange-500 mt-3 font-medium">
          Rolls over if unclaimed
        </p>
      )}
    </div>
  );
}