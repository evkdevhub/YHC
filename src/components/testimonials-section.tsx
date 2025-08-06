import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  imageUrl?: string;
  rating: number;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajveer S.",
    location: "Texas, 2 years with YHC",
    imageUrl: "/Rajveer.jpg",
    rating: 5,
    content:
      "I’ve been driving for over 10 years — and I’ve never made this kind of money anywhere else. Always on time, always fair.",
  },
  {
    id: "2",
    name: "Marcus H.",
    location: "Florida, 1 year with YHC",
    imageUrl: "/Marcus.jpg",
    rating: 5,
    content:
      "I left my last company because I was tired of chasing paychecks. At YHC, the miles are real, the pay is consistent, and I’m treated with respect.",
  },
  {
    id: "3",
    name: "Andre T.",
    location: "Georgia, 3 years with YHC",
    imageUrl: "/Andre.jpg",
    rating: 5,
    content:
      "Here, they treat you like a human. Flexible routes, no pressure, and dispatch actually listens. They get that we’ve got families too.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TestimonialsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-16 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-4xl lg:text-5xl text-cyan-950 mb-6">
            What Our Drivers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it — hear from the professionals who
            drive for YHC Logistic Services every day.
          </p>
        </motion.div>

        {/* Карточки отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const isHovered = hoveredId === t.id;
            return (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card className="group bg-light-gray shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <img
                        src={t.imageUrl}
                        alt={`${t.name}, professional truck driver`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-xl text-cyan-950 transition-colors duration-300 hover:text-gold cursor-pointer">
                          {t.name}
                        </h4>
                        <p className="text-gold font-medium">{t.location}</p>
                      </div>
                    </div>

                    <div className="flex mb-4 space-x-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`text-gold w-5 h-5 fill-current transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-70"
                          }`}
                          style={{
                            transitionDelay: isHovered ? `${i * 200}ms` : "0ms",
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 italic transition-transform duration-300 group-hover:scale-105">
                      "{t.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
