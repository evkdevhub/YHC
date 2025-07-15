import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { Rocket } from "lucide-react";
import { z } from "zod";

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const formSchema = insertApplicationSchema.extend({
    consent: z.boolean().refine(val => val === true, "You must consent to contact")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      licenseType: "",
      experience: "",
      currentLocation: "",
      preferredHomeTime: "",
      additionalInfo: "",
      consent: false,
    }
  });

  const submitApplication = useMutation({
    mutationFn: async (data: InsertApplication) => {
      return await apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application! We will contact you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or call us at 1-800-MYSTAR1",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!data.consent) {
      toast({
        title: "Consent Required",
        description: "Please consent to receiving communications from My Star LLC",
        variant: "destructive",
      });
      return;
    }

    const { consent, ...applicationData } = data;
    setIsSubmitting(true);
    try {
      await submitApplication.mutateAsync(applicationData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application-form" className="py-20 bg-navy text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl mb-6">
            Ready to <span className="text-gold">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete our quick application below and we'll contact you within 24 hours to discuss your driving career with My Star LLC.
          </p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
          <CardContent className="p-8 lg:p-12">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gold font-semibold">First Name *</Label>
                  <Input
                    id="firstName"
                    {...form.register("firstName")}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                    placeholder="John"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-gold font-semibold">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...form.register("lastName")}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                    placeholder="Doe"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-gold font-semibold">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                    placeholder="(555) 123-4567"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gold font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="licenseType" className="text-gold font-semibold">License Type *</Label>
                  <Select onValueChange={(value) => form.setValue("licenseType", value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select License Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdl-a">CDL-A</SelectItem>
                      <SelectItem value="cdl-b">CDL-B</SelectItem>
                      <SelectItem value="learners">Learner's Permit</SelectItem>
                      <SelectItem value="none">No CDL</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.licenseType && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.licenseType.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="experience" className="text-gold font-semibold">Driving Experience *</Label>
                  <Select onValueChange={(value) => form.setValue("experience", value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Experience</SelectItem>
                      <SelectItem value="0-6months">0-6 Months</SelectItem>
                      <SelectItem value="6months-1year">6 Months - 1 Year</SelectItem>
                      <SelectItem value="1-2years">1-2 Years</SelectItem>
                      <SelectItem value="2-5years">2-5 Years</SelectItem>
                      <SelectItem value="5plus">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.experience && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.experience.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="currentLocation" className="text-gold font-semibold">Current Location (City, State) *</Label>
                <Input
                  id="currentLocation"
                  {...form.register("currentLocation")}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                  placeholder="Dallas, TX"
                />
                {form.formState.errors.currentLocation && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.currentLocation.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="preferredHomeTime" className="text-gold font-semibold">Preferred Home Time</Label>
                <Select onValueChange={(value) => form.setValue("preferredHomeTime", value)}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly (34-hour reset)</SelectItem>
                    <SelectItem value="biweekly">4 days every 2 weeks</SelectItem>
                    <SelectItem value="otr">Long haul (2-3 weeks out)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="additionalInfo" className="text-gold font-semibold">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  {...form.register("additionalInfo")}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300 resize-none"
                  placeholder="Tell us about your driving goals, special skills, or any questions you have..."
                  rows={4}
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  onCheckedChange={(checked) => form.setValue("consent", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-gray-300">
                  I consent to receiving calls, texts, and emails from My Star LLC regarding employment opportunities. I understand that message and data rates may apply. *
                </Label>
              </div>
              
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitApplication.isPending}
                  className="bg-cta-orange hover:bg-red-600 text-white px-12 py-4 text-xl font-semibold transition-colors"
                  size="lg"
                >
                  <Rocket className="mr-3 w-6 h-6" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
              
              <p className="text-center text-sm text-gray-400 mt-6">
                Or call us directly at <span className="text-gold font-semibold">1-800-MYSTAR1</span> to speak with a recruiter now.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
