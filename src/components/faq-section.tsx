import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What are the minimum requirements?",
      answer:
        "You must be at least 21 years old, hold a valid CDL-A license, have 3+ months of recent OTR experience, a clean MVR (no major violations in the last 3 years), and pass a DOT physical and drug screening.",
    },
    {
      id: 2,
      question: "How much can I expect to earn weekly?",
      answer:
        "Drivers typically earn between $2,100 and $3,000+ per week, depending on mileage and performance.",
    },
    {
      id: 3,
      question: "Do you offer owner-operator programs?",
      answer:
        "Yes, we work with experienced owner-operators and offer competitive opportunities tailored to their needs.",
    },
    {
      id: 4,
      question: "What kind of freight do you haul?",
      answer:
        "We haul mainly dry van loads across the country. Our loads are no-touch and driver-friendly.",
    },
    {
      id: 5,
      question: "How often will I be home?",
      answer:
        "The amount of time you spend at home varies depending on your location and preferences. Most drivers come home once every 3 weeks.",
    },
  ];

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <section
      className="relative min-h-screen flex items-start justify-center pt-24 bg-light-gray"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          id="faq"
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-4xl lg:text-5xl text-cyan-950 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers. Here's what drivers ask us most.
          </p>
        </motion.div>

        <div className="space-y-6 mb-10">
          {faqItems.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-lg overflow-hidden">
                <Button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-4 py-4 sm:px-8 sm:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors bg-transparent text-cyan-950 hover:text-navy break-words sm:break-normal text-base sm:text-xl"
                  variant="ghost"
                >
                  <h3 className="font-semibold break-words sm:break-normal text-base sm:text-xl">
                    {faq.question}
                  </h3>
                  {activeFaq === faq.id ? (
                    <ChevronUp className="text-gold w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="text-gold w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </Button>

                <AnimatePresence initial={false}>
                  {activeFaq === faq.id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="px-4 sm:px-8 pb-4 sm:pb-6 text-gray-700 text-sm sm:text-base break-words">
                        <p>{faq.answer}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
