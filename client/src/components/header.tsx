import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, Star, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToApplication = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    window.location.href = 'tel:1-800-697-8271';
  };

  return (
    <header className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <Star className="text-navy w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-2xl">MY STAR LLC</h1>
              <p className="text-xs text-gray-300">Professional Trucking</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="text-gold w-5 h-5" />
              <span className="font-semibold text-lg">1-800-MYSTAR1</span>
            </div>
            <Button 
              onClick={scrollToApplication}
              className="bg-cta-orange hover:bg-red-600 text-white px-6 py-3 font-semibold transition-colors"
            >
              Apply Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('benefits')}
                className="block w-full text-left text-white hover:text-gold transition-colors py-2"
              >
                Why Drive for Us
              </button>
              <button
                onClick={() => scrollToSection('pay')}
                className="block w-full text-left text-white hover:text-gold transition-colors py-2"
              >
                Pay & Benefits
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-white hover:text-gold transition-colors py-2"
              >
                Driver Reviews
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-white hover:text-gold transition-colors py-2"
              >
                Requirements
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-white hover:text-gold transition-colors py-2"
              >
                Contact Us
              </button>
              <div className="pt-4 border-t border-white/20">
                <Button 
                  onClick={handleCall}
                  variant="outline"
                  className="w-full border-gold text-gold hover:bg-gold hover:text-navy mb-3"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call: 1-800-MYSTAR1
                </Button>
                <Button 
                  onClick={scrollToApplication}
                  className="w-full bg-cta-orange hover:bg-red-600 text-white"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
