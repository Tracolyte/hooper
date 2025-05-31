"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Removed Label import as it wasn't used directly
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast"; // Assuming this hook exists
import { apiRequest } from "@/lib/queryClient"; // Assuming this exists
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, UserCheck, Building2, ArrowRight, Check } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect"; // Assuming this component exists
import { cn } from "@/lib/utils"; // Assuming this utility function exists

// Helper function cn if not already defined elsewhere
// You can keep your own "@/lib/utils" import if it exists
// import { ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


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
        form.reset(); // Reset form fields
        setIsSuccess(false); // Hide success message
      }, 3000); // Adjust timing as needed
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
    // Optional: Add validation like checking if at least one checkbox is selected
    if (!data.isPlayer && !data.isPartner) {
        toast({
            title: "Selection Required",
            description: "Please select if you are a player or a facility partner.",
            variant: "default",
        });
        return; // Prevent submission
    }
    signupMutation.mutate(data);
  }

  return (
    <section id="email-signup" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              Join the <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">Hooper</span> Community
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
                <div className="bg-hooper-orange/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-hooper-orange" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Launch Notifications</h3>
                  <p className="text-sm text-gray-400">Be the first to know when we go live in your area</p>
                </div>
              </div>
              <div className="flex items-start">
                 {/* Added flex-shrink-0 to prevent icon shrinking */}
                <div className="bg-hooper-brown/20 p-2 rounded-full mr-4 flex-shrink-0">
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
            {/* This outer relative div helps contain the absolute blurred background */}
            <div className="relative">
              {/* Background decorative blur */}
              <div className="absolute -inset-1 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-3xl blur-lg opacity-30 pointer-events-none"></div>

              {/* *** REMOVED overflow-hidden FROM THIS DIV ***
                  This is the main container for the form visuals and the GlowingEffect.
                  Removing overflow-hidden allows the glow to appear outside its bounds. */}
              <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl">
                {/* GlowingEffect is placed inside the container it should add a glow TO */}
                <GlowingEffect
                  spread={40}
                  glow={true} // Make sure glow is enabled
                  disabled={false} // Make sure effect is not disabled
                  proximity={64} // Adjust as needed
                  inactiveZone={0.01} // Adjust as needed
                />

                {/* Success state overlay */}
                {isSuccess && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center flex-col bg-black/95 backdrop-blur-sm z-10 rounded-3xl" // Added rounded-3xl to match parent
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // Added exit animation
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }} // Spring animation
                      className="bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-full p-4 mb-6"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">You're In!</h3>
                    <p className="text-gray-400 text-center max-w-xs px-4"> {/* Adjusted max-width and added padding */}
                      Thanks for joining the waitlist. We'll reach out soon!
                    </p>
                  </motion.div>
                )}

                {/* Form Component */}
                {/* Added relative positioning and z-index to ensure form is above potential future background elements if needed,
                    though shouldn't be strictly necessary with the current structure unless the glow effect itself causes issues */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-[5]"> {/* Added relative and z-index */}
                    <div className="mb-8 text-center lg:text-left"> {/* Centered text on small screens */}
                      <h3 className="text-2xl font-bold mb-2">Sign Up for Early Access</h3>
                      <p className="text-gray-400">
                        Join players and facilities on our waitlist
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-300 sr-only">Email Address</FormLabel> {/* Made label screen-reader only */}
                          <FormControl>
                            <div className="relative">
                               {/* Increased padding-left (pl) to accommodate icon */}
                              <Input
                                type="email" // Specify input type
                                placeholder="you@example.com"
                                {...field}
                                className="w-full bg-white/5 border-white/10 placeholder-gray-500 text-white focus:ring-2 focus:ring-hooper-orange focus:ring-offset-2 focus:ring-offset-black py-3 px-4 pl-11 rounded-lg h-auto" // Adjusted padding/height
                                aria-label="Email Address" // Added aria-label
                              />
                               {/* Adjusted icon positioning */}
                              <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 pt-1 text-sm" /> {/* Adjusted styling */}
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 pt-2"> {/* Increased spacing */}
                      <FormField
                        control={form.control}
                        name="isPlayer"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                             {/* Added padding, background, border hover */}
                            <FormControl>
                              <Checkbox
                                id="isPlayer" // Added id for label association
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5 text-hooper-orange border-white/30 rounded bg-white/10 data-[state=checked]:bg-hooper-orange data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-hooper-orange focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                              />
                            </FormControl>
                            {/* Changed label element for better clickability */}
                            <label htmlFor="isPlayer" className="font-medium text-white text-sm cursor-pointer select-none">
                              I'm a player looking for courts & games
                            </label>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isPartner"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                             {/* Added padding, background, border hover */}
                            <FormControl>
                              <Checkbox
                                id="isPartner" // Added id for label association
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5 text-hooper-brown border-white/30 rounded bg-white/10 data-[state=checked]:bg-hooper-brown data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-hooper-brown focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                              />
                            </FormControl>
                            {/* Changed label element */}
                            <label htmlFor="isPartner" className="font-medium text-white text-sm cursor-pointer select-none">
                              I run a facility with basketball courts
                            </label>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-semibold text-base py-3 h-auto rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center shadow-lg focus-visible:ring-2 focus-visible:ring-hooper-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60" // Enhanced styling
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

                    <p className="text-xs text-center text-gray-500 pt-2"> {/* Adjusted padding */}
                      By signing up, you agree to our Privacy Policy. {/* Simplified text */}
                    </p>
                  </form>
                </Form>
              </div> {/* End of form container div */}
            </div> {/* End of relative wrapper for blur+form */}
          </motion.div> {/* End of right content motion div */}
        </motion.div> {/* End of flex row div */}
      </div> {/* End of container div */}
    </section>
  );
}

// --- Make sure GlowingEffect component is defined or imported correctly ---
// Example definition if needed:
// const GlowingEffect = ({...props}) => <div {...props} />; // Placeholder