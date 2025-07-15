import { Button } from "@/components/ui/button";
import { Star, ClipboardCheck, Phone } from "lucide-react";

export default function HeroSection() {
  const scrollToApplication = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCall = () => {
    window.location.href = 'tel:1-800-697-8271';
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
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Контент — вертикальное центрирование через flex */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-end min-h-[calc(100vh-80px)]"
      >
        <div className="max-w-3xl text-right w-full">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6">
            Drive for a Company That Treats You Like a{' '}
            <span className="text-gold">Star</span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-10 text-gray-200">
            Great Pay. Real Respect. Flexible Routes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-right">
            <div className="flex flex-col items-end">
              <div className="text-3xl sm:text-3xl font-bold text-gold">$0.70 <span className="text-base sm:text-lg text-gold">per mile</span></div>
              <div className="text-base sm:text-lg text-gray-300">Dispatched Pay Rates</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl sm:text-3xl font-bold text-gold">$90K+ <span className="text-base sm:text-lg text-gold">per year</span></div>
              <div className="text-base sm:text-lg text-gray-300">Average Annual Earnings</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl sm:text-3xl font-bold text-gold">3,000+ <span className="text-base sm:text-lg text-gold">Miles/Week</span></div>
              <div className="text-base sm:text-lg text-gray-300">Steady Loads. No Sitting.</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:justify-end sm:space-x-6 space-y-4 sm:space-y-0 mb-10">
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
              className="bg-gold hover:bg-lime-500 text-white px-8 py-4 text-xl font-semibold w-full max-w-lg rounded-lg transition-all flex items-center justify-center gap-3 group relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-300"
              size="lg"
            >
              <span className="block">
                Apply Now — Start Earning Tomorrow
              </span>
              <img
                src="/applynowtruck.png"
                alt="Truck"
                className="truck"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
