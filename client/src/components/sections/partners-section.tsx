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
import { DollarSign, BarChart2, Megaphone, Shield } from "lucide-react";

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
    icon: <DollarSign className="h-5 w-5 text-hooper-orange" />,
    title: "Increased Revenue",
    description: "Drive more foot traffic to your facility and increase court utilization during off-peak hours.",
    color: "orange"
  },
  {
    icon: <BarChart2 className="h-5 w-5 text-hooper-brown" />,
    title: "Data Insights",
    description: "Gain valuable analytics on court usage patterns, popular times, and player demographics.",
    color: "brown"
  },
  {
    icon: <Megaphone className="h-5 w-5 text-hooper-orange" />,
    title: "Marketing Reach",
    description: "Promote your facility to a targeted audience of active basketball players in your area.",
    color: "orange"
  },
  {
    icon: <Shield className="h-5 w-5 text-hooper-brown" />,
    title: "Simple Integration",
    description: "Easy setup with minimal hardware requirements and full support from our installation team.",
    color: "brown"
  }
];

export default function PartnersSection() {
  const { toast } = useToast();
  
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
      form.reset();
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

  return (
    <section id="partners" className="py-20 md:py-28 bg-hooper-dark-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">For Facility Partners</h2>
          <p className="text-hooper-dark-100 text-lg">
            Increase utilization, revenue, and insights at your basketball courts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-hooper-dark-400 rounded-xl p-6 border border-hooper-dark-300">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${
                        benefit.color === "orange" 
                          ? "bg-hooper-orange/20" 
                          : benefit.color === "brown" 
                          ? "bg-hooper-brown/20" 
                          : benefit.color === "purple" 
                          ? "bg-purple-500/20" 
                          : "bg-green-500/20"
                      } flex items-center justify-center mr-4`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                  </div>
                  <p className="text-hooper-dark-100">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-hooper-dark-400 rounded-xl p-8 border border-hooper-dark-300">
              <h3 className="text-xl font-bold mb-6">Partner Interest Form</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="facilityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Facility Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Gym or Recreation Center"
                            {...field}
                            className="w-full bg-hooper-dark-500 border border-hooper-dark-300 text-white focus:ring-hooper-brown"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Contact Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                            className="w-full bg-hooper-dark-500 border border-hooper-dark-300 text-white focus:ring-hooper-orange"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            className="w-full bg-hooper-dark-500 border border-hooper-dark-300 text-white focus:ring-hooper-brown"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            {...field}
                            className="w-full bg-hooper-dark-500 border border-hooper-dark-300 text-white focus:ring-hooper-orange"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your facility and basketball courts"
                            rows={4}
                            {...field}
                            className="w-full bg-hooper-dark-500 border border-hooper-dark-300 text-white focus:ring-hooper-brown"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-hooper-brown to-hooper-orange text-white font-semibold py-6 h-auto rounded-md hover:shadow-lg hover:shadow-hooper-orange/20 transition-all"
                    disabled={interestMutation.isPending}
                  >
                    {interestMutation.isPending ? "Submitting..." : "Submit Interest"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
