import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <Star className="text-navy w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">MY STAR LLC</h3>
                <p className="text-xs text-gray-300">Professional Trucking</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Family-owned trucking company dedicated to treating our drivers like stars. Join our team and experience the difference.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#application-form" className="text-gray-300 hover:text-gold transition-colors">Apply Now</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-gold transition-colors">Driver Benefits</a></li>
              <li><a href="#pay" className="text-gray-300 hover:text-gold transition-colors">Pay Information</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-gold transition-colors">Requirements</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-gold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Driver Portal</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Safety Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Training Programs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Equipment Specs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold transition-colors">Route Planning</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-gold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gold">📞</span>
                <span className="text-gray-300">1-800-MYSTAR1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gold">✉️</span>
                <span className="text-gray-300">recruiting@mystarllc.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gold mt-1">📍</span>
                <span className="text-gray-300">1234 Trucking Way<br />Dallas, TX 75201</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 My Star LLC. All rights reserved. DOT #123456 | MC #789012
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Equal Opportunity</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
