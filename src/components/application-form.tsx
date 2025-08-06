import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputMask from "react-input-mask";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  insertApplicationSchema,
  type InsertApplication,
} from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  User,
  Phone,
  Mail,
  Rocket,
  MessageSquareQuote,
} from "lucide-react";
import { motion } from "framer-motion";

const formSchema = insertApplicationSchema.extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d+()\-\s]+$/, "Phone number contains invalid characters"),
  consent: z.boolean().refine((val) => val === true, "Consent is required"),
  message: z.string().optional(),
});

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      consent: false,
      message: "",
    },
    mode: "onChange", // ошибки показываем сразу, кроме телефона
  });

  const submitApplication = useMutation({
    mutationFn: async (data: InsertApplication) => {
      return await apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description:
          error.message || "Please try again or call us at +1 707 800 4800",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!data.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive communication.",
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

  const isActive = (value: string | undefined, focused: boolean) =>
    focused || (value && value.length > 0);

  const [focusStates, setFocusStates] = useState<Record<string, boolean>>({});

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

        @media (max-width: 640px) {
          input, textarea {
            font-size: 1rem;
          }
          label {
            left: 6px !important;
          }
        }
      `}</style>

      <section
        id="application-form"
        className="relative min-h-screen flex items-start justify-center pt-24 text-white overflow-hidden px-4 sm:px-6 lg:px-8"
        style={{ minHeight: "100vh" }}
      >
        <div className="background">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10 w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 px-2">
            <h2 className="font-bold text-4xl lg:text-5xl mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80">
              Fill out the form and we’ll get back to you shortly.
            </p>
          </div>

          <Card className="bg-white/5 border border-white/5 rounded-3xl backdrop-blur-lg shadow-3xl transition-all duration-300 max-w-2xl mx-auto w-full mb-10">
            <CardContent className="p-5 space-y-5 text-white">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                {[  
                  {
                    id: "fullName",
                    type: "text",
                    icon: <User className="w-4 h-4 text-yellow-400" />,
                    placeholder: "Full Name",
                    register: form.register("fullName"),
                    error: form.formState.errors.fullName?.message,
                  },
                  {
                    id: "phone",
                    type: "tel",
                    icon: <Phone className="w-5 h-4 text-yellow-400" />,
                    placeholder: "Phone Number",
                  },
                  {
                    id: "email",
                    type: "email",
                    icon: <Mail className="w-5 h-4 text-yellow-400" />,
                    placeholder: "Email Address",
                    register: form.register("email"),
                    error: form.formState.errors.email?.message,
                  },
                ].map(({ id, type, icon, placeholder, register, error }) => {
                  if (id === "phone") {
                    const value = form.watch("phone") || "";
                    const focused = focusStates[id] || false;
                    // Ошибка показываем только если телефон был "touched" (пользователь вышел из поля)
                    const showError = form.formState.errors.phone && form.formState.touchedFields.phone;
                    return (
                      <Controller
                        key={id}
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <div className="relative w-full">
                            <div className="flex items-center space-x-5 border-b border-white/30 pb-2 w-full">
                              <div className="mr-2">{icon}</div>
                              <InputMask
                                mask="(999) 999-9999"
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={() => {
                                  field.onBlur();
                                  setFocusStates((s) => ({ ...s, [id]: false }));
                                }}
                                onFocus={() =>
                                  setFocusStates((s) => ({ ...s, [id]: true }))
                                }
                              >
                                {(inputProps) => (
                                  <input
                                    {...inputProps}
                                    type="tel"
                                    placeholder=" "
                                    className="bg-transparent flex-1 w-full text-white placeholder-transparent outline-none text-lg px-1 py-2"
                                  />
                                )}
                              </InputMask>
                              <label
                                htmlFor={id}
                                className={`absolute left-8 top-0 origin-left transform text-white transition-all duration-300 pointer-events-none ${
                                  isActive(value, focused)
                                    ? "-translate-y-5 scale-75 text-yellow-400"
                                    : "translate-y-2 scale-100"
                                }`}
                              >
                                {placeholder}
                              </label>
                            </div>
                            {showError && (
                              <p className="text-red-400 text-sm mt-1">
                                {form.formState.errors.phone?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    );
                  }

                  const rawValue = form.watch(id as keyof z.infer<typeof formSchema>);
                  const value =
                    typeof rawValue === "string"
                      ? rawValue
                      : rawValue === undefined || rawValue === null
                      ? ""
                      : String(rawValue);

                  const focused = focusStates[id] || false;

                  return (
                    <div key={id} className="relative w-full">
                      <div className="flex items-center space-x-5 border-b border-white/30 pb-2 w-full">
                        <div className="mr-2">{icon}</div>
                        <input
                          id={id}
                          type={type}
                          {...register}
                          placeholder=" "
                          value={value}
                          onFocus={() => setFocusStates((s) => ({ ...s, [id]: true }))}
                          onBlur={() => setFocusStates((s) => ({ ...s, [id]: false }))}
                          className="bg-transparent flex-1 w-full text-white placeholder-transparent outline-none text-lg px-1 py-2"
                        />
                        <label
                          htmlFor={id}
                          className={`absolute left-8 top-0 origin-left transform text-white transition-all duration-300 pointer-events-none ${
                            isActive(value, focused)
                              ? "-translate-y-5 scale-75 text-yellow-400"
                              : "translate-y-2 scale-100"
                          }`}
                        >
                          {placeholder}
                        </label>
                      </div>
                      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                    </div>
                  );
                })}

                {/* textarea с высотой 2 строки и масштабом по высоте при фокусе */}
                <div
                  className={`relative w-full transform transition-transform duration-300 origin-top ${
                    focusStates["message"] ? "scale-y-110" : "scale-y-100"
                  }`}
                >
                  <div className="flex items-start space-x-5 border-b border-white/30 pb-2 w-full">
                    <div className="mt-3 mr-2 flex-shrink-0">
                      <MessageSquareQuote className="w-5 h-5 text-yellow-400" />
                    </div>
                    <textarea
                      id="message"
                      {...form.register("message")}
                      placeholder=" "
                      rows={2}
                      value={form.watch("message") || ""}
                      onFocus={() => setFocusStates((s) => ({ ...s, message: true }))}
                      onBlur={() => setFocusStates((s) => ({ ...s, message: false }))}
                      className="bg-transparent flex-1 w-full resize-none text-white placeholder-transparent outline-none text-lg px-1 py-2 rounded-md border border-transparent focus:border-transparent transition-colors"
                      style={{ minHeight: "2.5rem" }}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-8 top-0 origin-left transform text-white transition-all duration-300 pointer-events-none ${
                        isActive(form.watch("message"), focusStates["message"])
                          ? "-translate-y-5 scale-75 text-yellow-400"
                          : "translate-y-2 scale-100"
                      }`}
                      style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem" }}
                    >
                      Your Message
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-nowrap px-2">
                  <Checkbox
                    id="consent"
                    checked={form.watch("consent")}
                    onCheckedChange={(checked) =>
                      form.setValue("consent", checked as boolean, { shouldValidate: true })
                    }
                    className="shrink-0"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-white select-none cursor-pointer leading-snug max-w-xs"
                  >
                    I agree to receive calls, texts, and emails from YHC Logistic Services LLC
                    regarding employment opportunities. *
                  </label>
                </div>

                <div className="pt-6 text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !form.formState.isValid}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold px-6 sm:px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 max-w-full w-full sm:w-auto"
                  >
                    <Rocket className="mr-3 w-6 h-6" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
