import { CreditCard, Target, Trophy, Heart } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    icon: CreditCard,
    title: "Subscribe",
    desc: "Choose monthly or yearly. A portion goes directly to your chosen charity.",
  },
  {
    icon: Target,
    title: "Enter Scores",
    desc: "Log your last 5 Stableford scores. New entries replace the oldest automatically.",
  },
  {
    icon: Trophy,
    title: "Win Prizes",
    desc: "Your scores become your draw numbers. Match 3, 4, or 5 to win from the prize pool.",
  },
  {
    icon: Heart,
    title: "Give Back",
    desc: "Track your impact. See exactly how your subscription supports real causes.",
  },
];

export default function HowItWorksSection() {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        
        <div ref={ref} className="text-center max-w-xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 mb-3">
            How It Works
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Four steps to play, win & give
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }) {
  const ref = useScrollReveal();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl bg-white border p-8 hover:shadow-xl transition duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-4 mb-5">
        
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
          <Icon size={22} className="text-blue-600" />
        </div>

        <span className="text-5xl font-bold text-gray-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {step.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}