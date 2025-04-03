"use client";

import { useState } from "react";
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

const emailSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  isPlayer: z.boolean().default(false),
  isPartner: z.boolean().default(false),
});

type EmailSignupFormValues = z.infer<typeof emailSignupSchema>;

export default function EmailSignup() {
  const { toast } = useToast();
  
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
        title: "Success!",
        description: "Thanks for signing up! We'll keep you updated on Hooper's launch.",
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
  
  function onSubmit(data: EmailSignupFormValues) {
    signupMutation.mutate(data);
  }

  return (
    <section id="email-signup" className="py-20 md:py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -right-40 w-96 h-96 bg-hooper-orange/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-hooper-blue/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="bg-hooper-dark-500 rounded-2xl p-8 md:p-12 border border-hooper-dark-300 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-hooper-dark-500 via-hooper-dark-500 to-hooper-dark-400"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Get Early Access</h2>
              <p className="text-hooper-dark-100 text-center mb-8">
                Be the first to know when Hooper launches in your area. No spam, just basketball.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-hooper-dark-100">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="w-full bg-hooper-dark-400 border border-hooper-dark-300 text-white focus:ring-hooper-orange"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isPlayer"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-4 w-4 text-hooper-orange focus:ring-hooper-orange border-hooper-dark-300 rounded bg-hooper-dark-400"
                          />
                        </FormControl>
                        <FormLabel className="font-medium text-white">
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
                            className="h-4 w-4 text-hooper-blue focus:ring-hooper-blue border-hooper-dark-300 rounded bg-hooper-dark-400"
                          />
                        </FormControl>
                        <FormLabel className="font-medium text-white">
                          I run a facility with basketball courts
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full button-gradient text-white font-semibold py-6 h-auto rounded-md hover:shadow-lg hover:shadow-hooper-orange/20 transition-all"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? "Signing Up..." : "Sign Up for Updates"}
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
