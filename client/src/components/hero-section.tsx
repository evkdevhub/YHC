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
    <section className="relative bg-navy text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 42, 68, 0.8), rgba(31, 42, 68, 0.8)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-gold w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-gold font-semibold text-lg">5-Star Treatment</span>
          </div>
          
          <h1 className="font-bold text-5xl lg:text-7xl leading-tight mb-8">
            Drive for a Company That Treats You Like a{' '}
            <span className="text-gold">Star</span>
          </h1>
          
          <p className="text-2xl lg:text-3xl font-medium mb-12 text-gray-200">
            Great Pay. Real Respect. Flexible Routes.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={scrollToApplication}
              className="bg-cta-orange hover:bg-red-600 text-white px-8 py-4 text-xl font-semibold transition-colors"
              size="lg"
            >
              <ClipboardCheck className="mr-3 w-6 h-6" />
              Apply Now - Get Started
            </Button>
            <Button 
              onClick={handleCall}
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-navy px-8 py-4 text-xl font-semibold transition-colors"
              size="lg"
            >
              <Phone className="mr-3 w-6 h-6" />
              Call: 1-800-MYSTAR1
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold">$15K</div>
              <div className="text-lg text-gray-300">Sign-On Bonus</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold">$85K+</div>
              <div className="text-lg text-gray-300">Annual Average</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold">62¢</div>
              <div className="text-lg text-gray-300">Per Mile</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
