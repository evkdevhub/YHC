import { Button } from "@/components/ui/button";
import { Star, ClipboardCheck, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToApplication = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCall = () => {
    window.location.href = "tel:1-800-697-8271";
  };

  return (
    <section
      className="relative bg-navy text-white overflow-hidden"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Контент */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-end min-h-[calc(100vh-80px)]">
        <div className="max-w-3xl w-full text-center sm:text-right">

          {/* Заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-3xl sm:text-5xl lg:text-7xl leading-tight mb-4 sm:mb-6"
          >
            Drive for a Company That Treats You Like a{" "}
            <span className="text-gold">Star</span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-base sm:text-2xl lg:text-3xl font-medium mb-6 sm:mb-10 text-gray-200"
          >
            Great Pay. Real Respect. Flexible Routes
          </motion.p>

          {/* 3 цифры */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-right"
          >
            {[
              {
                amount: "$0.70",
                label: "per mile",
                description: "Dispatched Pay Rates",
              },
              {
                amount: "$90K+",
                label: "per year",
                description: "Average Annual Earnings",
              },
              {
                amount: "3,000+",
                label: "Miles/Week",
                description: "Steady Loads. No Sitting",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center sm:items-end"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gold">
                  {item.amount}{" "}
                  <span className="text-sm sm:text-lg text-gold">{item.label}</span>
                </div>
                <div className="text-sm sm:text-lg text-gray-300">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Кнопка */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-end sm:space-x-6 space-y-4 sm:space-y-0 mb-8 sm:mb-10"
          >
            <style>{`
              .truck {
                position: absolute;
                right: 0;
                top: 50%;
                width: 64px;
                transform: translateY(-50%) translateX(0);
                opacity: 1;
                pointer-events: none;
              }

              @keyframes truckLoop {
                0% {
                  transform: translateY(-50%) translateX(0);
                }
                50% {
                  transform: translateY(-50%) translateX(-552px);
                }
                50.01% {
                  transform: translateY(-50%) translateX(552px);
                }
                100% {
                  transform: translateY(-50%) translateX(0);
                }
              }

              .group:hover .truck {
                animation: truckLoop 3s linear infinite forwards;
              }
            `}</style>

            <Button
              onClick={scrollToApplication}
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 
hover:from-lime-500 hover:to-lime-700 
text-white tracking-wide font-extrabold px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl w-full max-w-lg rounded-full shadow-xl hover:shadow-2xl 
transform hover:scale-105 
transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-300"
              size="lg"
            >
              <span className="block text-sm sm:text-base md:text-lg lg:text-xl">
                Apply Now — Start Earning Tomorrow
              </span>
              <img
                src="/applynowtruck.png"
                alt="Truck"
                className="truck hidden sm:block"
              />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
