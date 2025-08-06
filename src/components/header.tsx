import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false); // десктоп
  const [isMobileCallMenuOpen, setIsMobileCallMenuOpen] = useState(false); // мобилка

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setIsCallMenuOpen(false);
    setIsMobileCallMenuOpen(false);
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
    setIsMenuOpen(false);
    setIsCallMenuOpen(false);
    setIsMobileCallMenuOpen(false);
  };

  const scrollToElementById = (id: string) => {
    setIsMenuOpen(false);
    setIsCallMenuOpen(false);
    setIsMobileCallMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isCallMenuOpen &&
        !target.closest(".call-menu") &&
        !target.closest(".call-button")
      ) {
        setIsCallMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isCallMenuOpen]);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCallMenuOpen(false);
    setIsMobileCallMenuOpen(false);
  };

  return (
    <>
      <style>{`
        [id] {
          scroll-margin-top: 80px;
        }
        .background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3f2e15ff 0%, #17363eff 25%, #09192bff 50%, #05282cff 75%, #021a1fff 100%);
          overflow: hidden;
          z-index: 0;
        }
        /* Overlay for mobile menu */
        .overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, rgba(63,46,21,0.9) 0%, rgba(23,54,62,0.9) 25%, rgba(9,25,43,0.9) 50%, rgba(5,40,44,0.9) 75%, rgba(2,26,31,0.9) 100%);
          backdrop-filter: blur(5px);
          z-index: 40;
          animation: fadeIn 0.3s ease forwards;
        }
        /* Dropdown fade and slide */
        .dropdown-animate {
          animation: fadeSlideDown 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Glassmorphism dropdown styles */
        .glass-dropdown {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 0.1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border-radius: 1rem;
          color: white;
        }
        .glass-dropdown button {
          border-radius: 0.5rem;
          color: #FFD700; /* золотой цвет номеров */
        }
        .glass-dropdown button:hover {
          background-color: #b38600; /* темно-жёлтый для ховера */
          color: white;
        }
      `}</style>

      <header className="relative bg-cyan-950 text-white shadow-lg sticky top-0 z-50">
        <div className="background">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative z-10">
            {/* Логотип */}
            <div className="flex items-center space-x-3">
              <img
                src="/logo7.png"
                alt="MY STAR LLC"
                className="h-12 w-auto m-0 cursor-pointer"
                onClick={scrollToTop}
              />
            </div>

            {/* Десктоп меню */}
            <div className="hidden md:flex items-center space-x-6 relative">
              <div className="relative">
                <Button
                  onClick={() => setIsCallMenuOpen(!isCallMenuOpen)}
                  className="call-button flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-lime-500 hover:to-lime-700 text-white tracking-wide px-6 py-3 rounded-full shadow-xl hover:shadow-2xl font-extrabold text-lg min-w-[140px]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
                {isCallMenuOpen && (
                  <div
                    className="call-menu absolute right-0 mt-2 w-48 dropdown-animate glass-dropdown z-20"
                  >
                    <button
                      onClick={() => handleCall("+17078004800")}
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-600 transition-colors"
                    >
                      +1 707 800 4800
                    </button>
                    <button
                      onClick={() => handleCall("+14246008015")}
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-600 transition-colors"
                    >
                      +1 424 600 8015
                    </button>
                  </div>
                )}
              </div>

              <Button
                onClick={() => scrollToElementById("application-form")}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-lime-500 hover:to-lime-700 text-white tracking-wide px-6 py-3 transition-all duration-300 text-lg rounded-full shadow-xl hover:shadow-2xl font-extrabold"
              >
                Apply Now
              </Button>
            </div>

            {/* Мобильное меню переключатель */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent focus:ring-0"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsCallMenuOpen(false);
                  setIsMobileCallMenuOpen(false);
                }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Мобильное меню с оверлеем */}
          {isMenuOpen && (
            <>
              <div className="overlay" onClick={closeMenus} />

              <div className="md:hidden border-t border-white/20 relative z-50 dropdown-animate">
                <div className="px-4 py-6 space-y-4 bg-cyan-950/30 backdrop-blur-md">
                  {[
                    { href: "benefits", label: "Features" },
                    { href: "pay", label: "Qualifications" },
                    { href: "faq", label: "FAQ" },
                    { href: "contact", label: "Contact Us" },
                  ].map(({ href, label }) => (
                    <button
                      key={href}
                      onClick={() => scrollToElementById(href)}
                      className="block w-full text-left text-white hover:text-gold transition-colors py-2"
                    >
                      {label}
                    </button>
                  ))}

                  <div className="pt-4 border-t border-white/20 relative">
                    <Button
                      onClick={() => setIsMobileCallMenuOpen(!isMobileCallMenuOpen)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-lime-500 hover:to-lime-700 text-white tracking-wide px-6 py-3 transition-all duration-300 text-lg rounded-full shadow-xl hover:shadow-2xl font-extrabold w-full flex justify-center items-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Us
                    </Button>

                    {isMobileCallMenuOpen && (
                      <div className="mt-2 dropdown-animate glass-dropdown z-20 call-menu">
                        <button
                          onClick={() => handleCall("+17078004800")}
                          className="block w-full text-left px-4 py-2 hover:bg-yellow-600 transition-colors rounded-md"
                        >
                          +1 707 800 4800
                        </button>
                        <button
                          onClick={() => handleCall("+14246008015")}
                          className="block w-full text-left px-4 py-2 hover:bg-yellow-600 transition-colors rounded-md"
                        >
                          +1 424 600 8015
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <Button
                      onClick={() => scrollToElementById("application-form")}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-lime-500 hover:to-lime-700 text-white tracking-wide px-6 py-3 transition-all duration-300 text-lg rounded-full shadow-xl hover:shadow-2xl font-extrabold w-full"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
