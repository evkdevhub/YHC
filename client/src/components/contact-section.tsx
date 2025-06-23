import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";

export default function ContactSection() {
  const handleDirections = () => {
    window.open('https://maps.google.com/?q=1234+Trucking+Way,+Dallas,+TX+75201', '_blank');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl text-navy mb-6">
            Visit Our Office
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop by anytime for a personal conversation about your trucking career. Our recruiters are here to help Monday through Friday.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="bg-light-gray">
              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl text-navy mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-navy w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-lg">Call Us</h4>
                      <p className="text-gray-600">1-800-MYSTAR1 (1-800-697-8271)</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 7:00 AM - 7:00 PM CT</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-navy w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-lg">Email Us</h4>
                      <p className="text-gray-600">recruiting@mystarllc.com</p>
                      <p className="text-sm text-gray-500">We respond within 4 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-navy w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-lg">Visit Our Office</h4>
                      <p className="text-gray-600">
                        1234 Trucking Way<br />
                        Dallas, TX 75201
                      </p>
                      <p className="text-sm text-gray-500">Free parking available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-navy text-white">
              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-gold">7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-gold">8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <Button
                    onClick={handleDirections}
                    className="w-full bg-gold hover:bg-yellow-600 text-navy font-semibold"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-200 rounded-xl overflow-hidden">
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">Interactive Google Maps</p>
                <p className="text-sm">1234 Trucking Way, Dallas, TX 75201</p>
                <Button 
                  onClick={handleDirections}
                  className="mt-4 bg-gold hover:bg-yellow-600 text-navy"
                >
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
