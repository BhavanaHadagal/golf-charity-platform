import { Link } from "react-router-dom";
import { ArrowRight, Heart, Trophy } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70 mb-8">
            <Heart size={14} className="text-orange-400" />
            Play golf. Win prizes. Change lives.
          </div>

          <h1 className="text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6 text-white font-bold">
            Your Scores.
            <br />
            Their Future.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-lg mb-10 text-white/70">
            Subscribe, enter your golf scores, and compete in monthly prize
            draws — while a portion of your membership funds the charities you
            care about.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
            >
              Start Giving & Winning
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-white font-medium hover:bg-white/10 transition"
            >
              See How It Works
            </a>
          </div>

          <div className="flex items-center gap-8 mt-12 flex-wrap">
            {[
              { icon: Trophy, label: "Monthly Draws", value: "£10K+" },
              { icon: Heart, label: "Raised for Charity", value: "£250K+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon size={18} className="text-orange-400" />
                </div>

                <div>
                  <div className="text-sm font-semibold text-white">{value}</div>
                  <div className="text-xs text-white/50">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}