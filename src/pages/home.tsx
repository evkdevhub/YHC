import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import PaySection from "@/components/pay-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import ApplicationForm from "@/components/application-form";
import ContactSection from "@/components/contact-section";
import ChatWidget from "@/components/chat-widget";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <PaySection /> 
      <TestimonialsSection />
      <FaqSection />
      <ApplicationForm />
      <ContactSection />
      <ChatWidget />
      <Footer />
    </div>
  );
}
