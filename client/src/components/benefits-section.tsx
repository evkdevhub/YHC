import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const benefits = [
  {
    title: "Top Weekly Pay",
    description: "Earn $1,500-$2,200+ per week with our competitive per-mile rates, performance bonuses, and guaranteed minimum weekly pay."
  },
  {
    title: "Home Time Guaranteed",
    description: "Choose your schedule: 34-hour reset at home every week or 4 days home every 2 weeks. Your family time matters."
  },
  {
    title: "Premium Equipment",
    description: "Drive late-model Freightliner and Peterbilt trucks with APUs, comfortable sleepers, and top maintenance."
  },
  {
    title: "Full Benefits Package",
    description: "Medical, dental, vision, 401K with company match, paid vacation, and life insurance from day one."
  },
  {
    title: "No Touch Freight",
    description: "Focus on driving, not loading. Our freight is primarily drop-and-hook with dedicated customer accounts."
  },
  {
    title: "24/7 Dispatch Support",
    description: "Our experienced dispatch team is always available to help with routes, load planning, and any issues on the road."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl text-navy mb-6">
            Why Drive for My Star LLC?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just hire drivers - we build careers. Join a family-owned company that puts your success first.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Star className="text-gold w-6 h-6 fill-current mr-3" />
                  <h3 className="font-semibold text-xl text-navy">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
