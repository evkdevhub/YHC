import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Top Weekly Pay",
    description:
      "Make $2,100+ weekly with strong per-mile rates. No sitting idle — your truck is always moving with steady, regular loads.",
  },
  {
    title: "Partnered with Industry Leaders",
    description:
      "Drive for trusted brands like FedEx, Amazon, and UPS. Enjoy consistent, high-volume freight from reliable clients.",
  },
  {
    title: "24/7 Dispatch Support",
    description:
      "Our experienced dispatch team is always available to help with routes, load planning, and any issues on the road.",
  },
  {
    title: "Flexible Home Time",
    description:
      "Our drivers usually spend about 3–4 weeks on the road per trip. However, when life happens, we are flexible and always ready to work with you. That's why we don't have a set home time policy.",
  },
  {
    title: "Comfort & Reliability on the Road",
    description:
      "We run a modern fleet of Freightliner, Volvo, and Kenworth trucks, all equipped with APUs, comfortable sleepers, fridges, and microwaves — carefully maintained for your safety and comfort.",
  },
  {
    title: "No Touch Freight",
    description:
      "Just hook up and drive. Our freight is 90% drop-and-hook, so you won’t waste time loading or unloading. You can stay focused on what matters most — driving safely and earning steady miles.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="min-h-screen py-16 bg-light-gray flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Заголовок + описание */}
        <motion.div
          id="benefits"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 scroll-mt-24"
        >
          <h2 className="font-bold text-4xl lg:text-5xl text-cyan-950 mb-4">
            Why Drive for My Star LLC?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don’t just hire drivers — we build careers. Join our family-owned company where your success comes first. Reliable pay, respect, and real growth await.
          </p>
        </motion.div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Star className="text-gold w-5 h-5 fill-current mr-2" />
                    <h3 className="font-semibold text-lg text-cyan-950">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
