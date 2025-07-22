import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <style>{`
        .background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3f2e15ff 0%, #17363eff 25%, #09192bff 50%, #05282cff 75%, #021a1fff 100%);
          overflow: hidden;
          z-index: 0;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: float 7s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }
        .blob1 {
          width: 350px;
          height: 350px;
          background: #d97d3bff;
          top: 15%;
          left: 20%;
          animation-delay: 0s;
        }
        .blob2 {
          width: 400px;
          height: 400px;
          background: #677fbcff;
          top: 40%;
          left: 60%;
          animation-delay: 3s;
        }
        .blob3 {
          width: 300px;
          height: 300px;
          background: #619baeff;
          top: 65%;
          left: 30%;
          animation-delay: 1.5s;
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          100% { transform: translateY(-30px) translateX(20px); opacity: 0.5; }
        }
      `}</style>

      <footer className="relative text-white py-12 overflow-hidden">
        <div className="background">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Лого и описание */}
            <div>
              <img src="/logo5.png" alt="MY STAR LLC" className="h-14 w-auto mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed">
                Family-owned trucking company dedicated to treating our drivers like stars. Join our team and experience the difference.
              </p>
            </div>

            {/* Быстрые ссылки */}
            <div>
              <h4 className="font-semibold text-lg text-gold mb-4 border-b border-gold pb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { href: "#application-form", label: "Apply Now" },
                  { href: "#benefits", label: "Features" },
                  { href: "#pay", label: "Qualifications" },
                  { href: "#faq", label: "FAQ" },
                  { href: "#contact", label: "Contact Us" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-gray-300 hover:text-gold hover:underline transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="font-semibold text-lg text-gold mb-4 border-b border-gold pb-2">Contact</h4>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gold w-5 h-5" />
                  <span>1-800-MYSTAR1</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-gold w-5 h-5" />
                  <span>recruiting@mystarllc.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gold w-5 h-5 mt-1" />
                  <address className="not-italic leading-relaxed">
                    2487 Tradeport Dr Suite 106<br />
                    Orlando, FL 32824, United States
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2023 My Star LLC. All rights reserved. USDOT #3962364 | MC #1478119</p>
            
          </div>
        </div>
      </footer>
    </>
  );
}
