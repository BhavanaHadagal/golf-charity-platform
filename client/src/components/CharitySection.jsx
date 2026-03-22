import { Heart, Users, Globe } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const charities = [
  {
    name: "Youth First Foundation",
    category: "Youth Development",
    raised: "£32,480",
    icon: Users,
  },
  {
    name: "Ocean Guardians",
    category: "Environmental",
    raised: "£28,150",
    icon: Globe,
  },
  {
    name: "Hearts United",
    category: "Healthcare",
    raised: "£45,920",
    icon: Heart,
  },
];

export default function CharitySection() {
  const ref = useScrollReveal();

  return (
    <section id="charities" className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className="scroll-reveal">
            <p className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3">
              Charity Impact
            </p>

            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
              Every subscription makes a difference
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              At least 10% of every subscription goes directly to a charity of
              your choice. You pick who benefits — and you can change your
              selection anytime.
            </p>

            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-display text-primary">£250K+</div>
                <div className="text-sm text-muted-foreground">Total raised</div>
              </div>

              <div className="w-px h-12 bg-border" />

              <div>
                <div className="text-3xl font-display text-primary">47</div>
                <div className="text-sm text-muted-foreground">
                  Charities supported
                </div>
              </div>

              <div className="w-px h-12 bg-border" />

              <div>
                <div className="text-3xl font-display text-primary">8.2K</div>
                <div className="text-sm text-muted-foreground">Active givers</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {charities.map((charity, i) => (
              <CharityCard key={charity.name} charity={charity} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CharityCard({ charity, index }) {
  const ref = useScrollReveal();
  const Icon = charity.icon;

  return (
    <div
      ref={ref}
      className="scroll-reveal flex items-center gap-5 rounded-2xl bg-card border p-6 hover:shadow-lg transition-shadow duration-300"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
        <Icon size={24} className="text-secondary" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">{charity.name}</h3>
        <p className="text-sm text-muted-foreground">{charity.category}</p>
      </div>

      <div className="text-right shrink-0">
        <div className="text-lg font-semibold text-foreground">
          {charity.raised}
        </div>
        <div className="text-xs text-muted-foreground">raised</div>
      </div>
    </div>
  );
}