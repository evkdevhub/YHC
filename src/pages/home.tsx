import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import RequirementsSection from "@/components/requirements-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import ApplicationForm from "@/components/application-form";
import ContactSection from "@/components/contact-section";

import Footer from "@/components/footer";
import { ParallaxProvider } from "react-scroll-parallax"; // добавлено 👈

export default function Home() {
  return (
    <ParallaxProvider> {/* 👈 обернули весь сайт */}
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <BenefitsSection />
        <RequirementsSection />
        <TestimonialsSection />
        <FaqSection />
        <ApplicationForm />
        <ContactSection />
        
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
