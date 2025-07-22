import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const payItems = [
  {
    title: "Must Have Class A License (CDL A)",
    icon: <img src="/cdl.svg" alt="Team Drivers" className="w-8 h-8" />,
    description:
      "A valid Class A Commercial Driver’s License is required to operate heavy vehicles safely and legally across all states.",
  },
  {
    title: "Minimum 3 Months Experience Required",
    icon: <img src="/road.svg" alt="Team Drivers" className="w-8 h-8" />,
    description:
      "You must have at least 3 months of verifiable driving experience to qualify for this position.",
  },
  {
    title: "Experience & Tests Needed",
    icon: <img src="/CheckCircle.svg" alt="Team Drivers" className="w-8 h-8" />,
    description:
      "If you have the experience and pass drug tests, you’ll take a driving test at orientation to join us.",
  },
  {
    title: "We Hire Only Team Drivers",
    icon: <img src="/team.svg" alt="Team Drivers" className="w-8 h-8" />,
    description: "In case you don't have a co-driver we will assign you one.",
  },
];

export default function RequirementsSection() {
  const scrollToApplication = () => {
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      
      className="min-h-screen py-16 bg-light-gray flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Заголовок */}
        <motion.div
        id="pay"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 scroll-mt-24"
        >
          <h2 className="font-bold text-4xl lg:text-5xl text-cyan-950 mb-3">
            Who We’re Looking For
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a company that pays well and keeps you moving — see if you’re a
            good fit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          {/* Левая колонка: карточки */}
          <div className="space-y-3">
            {payItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 border border-gold/30 shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gold">
                        {item.title}
                      </h3>
                      <span className="text-3xl font-bold">{item.icon}</span>
                    </div>
                    <p className="text-gray-600 text-m">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Правая колонка: трак + анимированные колёса + кнопка */}
          <div>
            <div className="relative w-full h-auto">
              {/* Трак */}
              <motion.img
                src="/truck.png"
                alt="truck"
                className="w-full"
                initial={{ opacity: 0.5, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ x: { duration: 2, ease: "easeOut" }, opacity: { duration: 1 } }}
              />
            </div>

            {/* Кнопка */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-14"
            >
              <Button
                onClick={scrollToApplication}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 
hover:from-lime-500 hover:to-lime-700 
text-white tracking-wide font-extrabold text-xl 
px-12 py-5 rounded-full 
shadow-xl hover:shadow-2xl 
transform hover:scale-105 
transition-all duration-300"
              >
                Become a Driver
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
