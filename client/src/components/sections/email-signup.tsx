"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, UserCheck, Building2, ArrowRight, Check } from "lucide-react";

const emailSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  isPlayer: z.boolean().default(false),
  isPartner: z.boolean().default(false),
});

type EmailSignupFormValues = z.infer<typeof emailSignupSchema>;

export default function EmailSignup() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<EmailSignupFormValues>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: {
      email: "",
      isPlayer: false,
      isPartner: false,
    },
  });
  
  const signupMutation = useMutation({
    mutationFn: async (data: EmailSignupFormValues) => {
      return apiRequest("POST", "/api/signup", data);
    },
    onSuccess: () => {
      toast({
        title: "You're in!",
        description: "Thanks for joining Hooper's early access list.",
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
  
  function onSubmit(data: EmailSignupFormValues) {
    signupMutation.mutate(data);
  }

  return (
    <section id="email-signup" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-gradient-to-b from-hooper-orange/10 via-hooper-brown/5 to-transparent rounded-full opacity-50 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-20 left-0 w-[600px] h-[600px] bg-gradient-to-t from-hooper-brown/10 via-hooper-orange/5 to-transparent rounded-full opacity-50 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto gap-12 lg:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 rounded-full px-4 py-1.5">
                <span className="text-sm font-medium text-hooper-orange tracking-wide">Get in Early</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Join the Hooper <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">Community</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-300 mb-8 max-w-xl lg:max-w-none mx-auto lg:mx-0"
            >
              Be the first to know when Hooper launches in your area and get exclusive early access to our beta program. No spam, just updates about your basketball community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="flex items-start">
                <div className="bg-hooper-orange/20 p-2 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-hooper-orange" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Launch Notifications</h3>
                  <p className="text-sm text-gray-400">Be the first to know when we go live in your area</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-hooper-brown/20 p-2 rounded-full mr-4">
                  <UserCheck className="h-5 w-5 text-hooper-brown" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Priority Access</h3>
                  <p className="text-sm text-gray-400">Skip the line when we launch our full platform</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Form */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Background glows */}
              <div className="absolute -inset-1 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-3xl blur-lg opacity-30"></div>
              
              <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Success state */}
                {isSuccess && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center flex-col bg-black/95 backdrop-blur-sm z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-full p-4 mb-6"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">You're In!</h3>
                    <p className="text-gray-400 text-center max-w-md">
                      Thank you for joining our waitlist. We'll notify you when Hooper launches in your area.
                    </p>
                  </motion.div>
                )}
              
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2">Sign Up for Early Access</h3>
                      <p className="text-gray-400">
                        Join thousands of players already on our waitlist
                      </p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-300">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="you@example.com"
                                {...field}
                                className="w-full bg-white/5 border border-white/10 text-white focus:ring-hooper-orange py-6 pl-11 rounded-lg"
                              />
                              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-3 pt-2">
                      <FormField
                        control={form.control}
                        name="isPlayer"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5 text-hooper-orange border-white/20 rounded bg-white/5 data-[state=checked]:bg-hooper-orange"
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-white text-base">
                              I'm a player looking for courts and games
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isPartner"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5 text-hooper-brown border-white/20 rounded bg-white/5 data-[state=checked]:bg-hooper-brown"
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-white text-base">
                              I run a facility with basketball courts
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-medium py-6 h-auto rounded-lg hover:opacity-90 transition-all flex items-center justify-center"
                      disabled={signupMutation.isPending}
                    >
                      {signupMutation.isPending ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <>
                          Join the Waitlist
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 pt-4">
                      By signing up, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
