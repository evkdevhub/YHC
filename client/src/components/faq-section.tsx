import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { FaqItem } from "@shared/schema";

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const { data: faqItems, isLoading } = useQuery<FaqItem[]>({
    queryKey: ['/api/faq'],
  });

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl lg:text-5xl text-navy mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 bg-light-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl text-navy mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers. Here's what drivers ask us most.
          </p>
        </div>
        
        <div className="space-y-6">
          {faqItems?.map((faq) => (
            <Card key={faq.id} className="bg-white shadow-lg overflow-hidden">
              <Button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors bg-transparent text-navy hover:text-navy"
                variant="ghost"
              >
                <h3 className="font-semibold text-xl">{faq.question}</h3>
                {activeFaq === faq.id ? (
                  <ChevronUp className="text-gold w-6 h-6" />
                ) : (
                  <ChevronDown className="text-gold w-6 h-6" />
                )}
              </Button>
              {activeFaq === faq.id && (
                <CardContent className="px-8 pb-6 text-gray-700">
                  <p>{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
