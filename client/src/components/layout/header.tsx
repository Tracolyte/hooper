"use client";

import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Circle } from "lucide-react";
import { useLocation } from "wouter";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);

  const closeSheet = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    // Show nav items after a short delay for animation
    const timer = setTimeout(() => {
      setShowNavItems(true);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/partners", label: "For Partners" }
  ];

  const getNavItemColor = (href: string) => {
    const active = location === href;
    return active ? "text-hooper-orange" : "text-white/90 hover:text-white";
  };

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      } 
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: 0.6
      } 
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        scrolled 
          ? "bg-black/90 backdrop-blur-lg border-b border-white/5 py-2" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Link href="/">
              <a className="flex items-center">
                <div className="p-2 mr-2 bg-gradient-to-br from-hooper-orange to-hooper-brown rounded-full">
                  <Circle className="h-5 w-5 text-white fill-white" />
                </div>
                <div className="text-2xl font-black tracking-tighter">
                  <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">HOOPER</span>
                </div>
              </a>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-10">
            <nav className="flex items-center gap-x-8">
              <AnimatePresence>
                {showNavItems && navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Link href={item.href}>
                      <a className={cn(
                        "font-medium transition-colors relative py-2",
                        getNavItemColor(item.href)
                      )}>
                        {item.label}
                        {location === item.href && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-full"
                          />
                        )}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className="relative"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-full pointer-events-none"
              />
              <Button 
                className="relative z-10 bg-white/10 border border-white/10 hover:bg-white/20 text-white font-medium px-5 py-2 h-auto rounded-full backdrop-blur-sm"
                onClick={() => {
                  const emailSignupSection = document.getElementById("email-signup");
                  if (emailSignupSection) {
                    emailSignupSection.scrollIntoView({ behavior: "smooth" });
                  } else if (location !== "/") {
                    window.location.href = "/#email-signup";
                  }
                }}
              >
                Get Early Access
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden"
          >
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2 text-white hover:bg-white/5 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-l border-white/10 p-0">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center">
                      <div className="p-1.5 mr-2 bg-gradient-to-br from-hooper-orange to-hooper-brown rounded-full">
                        <Circle className="h-4 w-4 text-white fill-white" />
                      </div>
                      <div className="text-xl font-bold text-white">HOOPER</div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={closeSheet}>
                      <X className="h-5 w-5 text-white" />
                    </Button>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="space-y-6 pt-4">
                      {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <a 
                            className={cn(
                              "flex items-center py-2 font-medium text-lg transition-colors",
                              location === item.href ? "text-hooper-orange" : "text-white hover:text-hooper-orange"
                            )}
                            onClick={closeSheet}
                          >
                            {item.label}
                            <ChevronRight className={cn(
                              "ml-auto h-5 w-5 transition-transform",
                              location === item.href ? "text-hooper-orange rotate-90" : "text-white/70"
                            )} />
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 mt-auto border-t border-white/5">
                    <Button 
                      className="w-full bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-medium py-6 h-auto rounded-full"
                      onClick={() => {
                        closeSheet();
                        const emailSignupSection = document.getElementById("email-signup");
                        if (emailSignupSection) {
                          emailSignupSection.scrollIntoView({ behavior: "smooth" });
                        } else if (location !== "/") {
                          window.location.href = "/#email-signup";
                        }
                      }}
                    >
                      Get Early Access
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
