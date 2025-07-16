import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const payItems = [
  {
    title: "Per-Mile Rate",
    amount: "52¢ - 62¢",
    description: "Base rate increases with experience and performance. Top drivers earn 62¢+ per mile."
  },
  {
    title: "Sign-On Bonus",
    amount: "Up to $15,000",
    description: "$5,000 after 30 days, $5,000 after 90 days, $5,000 after 180 days."
  },
  {
    title: "Weekly Guarantee",
    amount: "$1,400",
    description: "Minimum weekly pay guaranteed for full-time drivers, plus additional earnings."
  },
  {
    title: "Safety Bonus",
    amount: "$2,500",
    description: "Annual safety bonus for accident-free driving and clean CSA scores."
  }
];

export default function PaySection() {
  const scrollToApplication = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pay" className="py-20 bg-light-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl mb-6">
            Competitive Pay & <span className="text-gold">Bonuses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We believe great drivers deserve great pay. Here's what you can earn with My Star LLC.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional truck driver reviewing documents" 
              className="rounded-xl shadow-2xl w-full" 
            />
          </div>
          
          <div className="space-y-8">
            {payItems.map((item, index) => (
              <Card key={index} className="bg-white/10 border border-gold/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-2xl text-gold">{item.title}</h3>
                    <span className="text-3xl font-bold">{item.amount}</span>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button 
                onClick={scrollToApplication}
                className="bg-cta-orange hover:bg-red-600 text-white px-8 py-4 text-xl font-semibold transition-colors"
                size="lg"
              >
                Start Earning Today - Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
