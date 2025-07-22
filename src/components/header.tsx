import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    window.location.href = "tel:1-800-697-8271";
  };

  const scrollToElementById = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
      `}</style>

      <header className="relative bg-cyan-950 text-white shadow-lg sticky top-0 z-50 overflow-hidden">
        <div className="background">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative z-10">
            <div className="flex items-center space-x-3">
              <img
                src="/logo5.png"
                alt="MY STAR LLC"
                className="h-12 w-auto m-0 cursor-pointer"
                onClick={scrollToTop}
              />
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="text-gold w-5 h-5" />
                <span className="font-semibold text-m">1-800-MYSTAR1</span>
              </div>
              <Button
                onClick={() => scrollToElementById("application-form")}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 
                           hover:from-lime-500 hover:to-lime-700 
                           text-white tracking-wide px-6 py-3 transition-all duration-300 text-lg rounded-full shadow-xl hover:shadow-2xl font-extrabold"
              >
                Apply Now
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent focus:ring-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20 relative z-10">
              <div className="px-4 py-6 space-y-4">
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

                <div className="pt-4 border-t border-white/20">
                  <Button
                    onClick={() => scrollToElementById("application-form")}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 
                               hover:from-lime-500 hover:to-lime-700 
                               text-white tracking-wide px-6 py-3 transition-all duration-300 text-lg rounded-full shadow-xl hover:shadow-2xl font-extrabold w-full"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
