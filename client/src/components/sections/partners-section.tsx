"use client";

import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DollarSign, BarChart2, Megaphone, Shield, CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"; // Added import
import { useState } from "react";

const partnerInterestSchema = z.object({
  facilityName: z.string().min(1, "Facility name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().optional(),
  message: z.string().optional(),
});

type PartnerInterestFormValues = z.infer<typeof partnerInterestSchema>;

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6 text-white" />,
    title: "Increased Revenue",
    description: "Drive more foot traffic to your facility and increase court utilization during off-peak hours with dynamic pricing and targeted promotions.",
    color: "orange" as const,
    features: ["Dynamic pricing optimization", "Targeted player acquisition", "Peak hour analysis"]
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    title: "Data Insights",
    description: "Gain valuable analytics on court usage patterns, popular times, and player demographics to optimize your operations.",
    color: "brown" as const,
    features: ["Real-time usage analytics", "Player demographic insights", "Revenue optimization reports"]
  },
  {
    icon: <Megaphone className="h-6 w-6 text-white" />,
    title: "Marketing Reach",
    description: "Promote your facility to a targeted audience of active basketball players in your area through our platform.",
    color: "orange" as const,
    features: ["Targeted local advertising", "Player community access", "Social media integration"]
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Simple Integration",
    description: "Easy setup with minimal hardware requirements and full support from our installation team throughout the process.",
    color: "brown" as const,
    features: ["Quick 2-hour installation", "Dedicated support team", "Zero maintenance required"]
  }
];

export default function PartnersSection() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<PartnerInterestFormValues>({
    resolver: zodResolver(partnerInterestSchema),
    defaultValues: {
      facilityName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      message: "",
    },
  });
  
  const interestMutation = useMutation({
    mutationFn: async (data: PartnerInterestFormValues) => {
      return apiRequest("POST", "/api/partner-interest", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thanks for your interest! We'll be in touch with you soon.",
        variant: "default",
      });
      setIsSuccess(true);
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: PartnerInterestFormValues) {
    interestMutation.mutate(data);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="partners" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Added BackgroundGradientAnimation, similar to HeroSection */}
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0 z-0"
        className="absolute inset-0 opacity-20"
        interactive={false}
        gradientBackgroundStart="#000000"
        gradientBackgroundEnd="#050505"
        firstColor="hsl(21deg 90% 50% / 30%)"
        secondColor="hsl(31deg 90% 40% / 30%)"
        thirdColor="hsl(41deg 90% 30% / 30%)"
        fourthColor="hsl(11deg 90% 40% / 20%)"
        fifthColor="hsl(21deg 90% 50% / 40%)"
        pointerColor="transparent"
      />

      {/* Existing background blur elements - these will render on top of the BackgroundGradientAnimation due to DOM order and z-index */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-b from-hooper-orange/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-hooper-brown/10 to-transparent rounded-full blur-[120px] transform translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6"> {/* Content container is z-10 to be above background elements */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium tracking-wide text-hooper-orange">Partnership Benefits</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">Partner</span> with Hooper?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Join hundreds of facilities already benefiting from increased utilization and revenue.
          </p>
        </motion.div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 md:mb-32">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group relative rounded-3xl bg-black/80 backdrop-blur-sm border border-white/10 shadow-xl transition-all hover:shadow-2xl"
            >
              {/* Background gradient effect for card - this is separate from the section background */}
              <div className="absolute -inset-1 rounded-3xl blur opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={50}
                  inactiveZone={0.1}
                  className="rounded-3xl"
                />

                <div className="flex items-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + index * 0.1
                    }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center shadow-lg ${
                      benefit.color === "orange" 
                        ? "bg-gradient-to-br from-hooper-orange to-hooper-orange/60" 
                        : "bg-gradient-to-br from-hooper-brown to-hooper-brown/60"
                    }`}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold transition-colors duration-500 ease-in-out group-hover:bg-gradient-to-r group-hover:from-hooper-orange group-hover:via-orange-400 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent">
                    {benefit.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  {benefit.description}
                </p>

                <div className="mt-auto">
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {benefit.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                      >
                        <CheckCircle2
                          className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
                            benefit.color === "orange" ? "text-hooper-orange" : "text-hooper-brown"
                          }`}
                        />
                        <span className="text-gray-200">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Contact Form Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            {/* Background decorative blur for form container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-3xl blur-lg opacity-30 pointer-events-none"></div>

            <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />

              {/* Success state overlay */}
              {isSuccess && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center flex-col bg-black/95 backdrop-blur-sm z-10 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-full p-4 mb-6"
                  >
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-400 text-center max-w-xs px-4">
                    We'll be in touch within 24 hours to discuss your partnership.
                  </p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left side - Info */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">Partner</span> ?</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Join our network of successful facility partners and start seeing results immediately. Our team will work with you every step of the way.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-hooper-orange/20 p-2 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-hooper-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Quick Response</h4>
                        <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-hooper-brown/20 p-2 rounded-full mr-4">
                        <CheckCircle2 className="h-5 w-5 text-hooper-brown" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Custom Solutions</h4>
                        <p className="text-sm text-gray-400">Tailored to your facility's needs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="relative z-[5]"> {/* z-index to ensure form elements are interactive above any local effects */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="facilityName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Facility Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Gym or Recreation Center"
                                {...field}
                                className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black py-3 px-4 rounded-lg h-auto"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 pt-1 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-300">Contact Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your Name"
                                  {...field}
                                  className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black py-3 px-4 rounded-lg h-auto"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 pt-1 text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-300">Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="(123) 456-7890"
                                  {...field}
                                  className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black py-3 px-4 rounded-lg h-auto"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 pt-1 text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black py-3 px-4 rounded-lg h-auto"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 pt-1 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your facility and basketball courts"
                                rows={4}
                                {...field}
                                className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black resize-none"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 pt-1 text-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-semibold text-base py-3 h-auto rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center shadow-lg focus-visible:ring-2 focus-visible:ring-hooper-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60"
                        disabled={interestMutation.isPending}
                      >
                        {interestMutation.isPending ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          <>
                            Submit Partnership Interest
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-500 pt-2">
                        By submitting, you agree to our Privacy Policy.
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}