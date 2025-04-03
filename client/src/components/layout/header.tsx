"use client";

import React, { useState } from "react";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-hooper-dark-300">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <div className="text-2xl font-black tracking-tighter text-white">
                <span className="text-hooper-orange">HOOP</span>
                <span className="text-hooper-brown">ER</span>
              </div>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={cn(
                "text-white font-medium transition-colors",
                location === "/" ? "text-hooper-orange" : "hover:text-hooper-orange"
              )}>
                Home
              </a>
            </Link>
            <Link href="/features">
              <a className={cn(
                "text-white font-medium transition-colors",
                location === "/features" ? "text-hooper-orange" : "hover:text-hooper-orange"
              )}>
                Features
              </a>
            </Link>
            <Link href="/partners">
              <a className={cn(
                "text-white font-medium transition-colors",
                location === "/partners" ? "text-hooper-orange" : "hover:text-hooper-orange"
              )}>
                For Partners
              </a>
            </Link>
            <Button 
              className="button-gradient text-white font-sans font-semibold hover:shadow-lg hover:shadow-hooper-orange/20 transition-all"
              onClick={() => {
                const emailSignupSection = document.getElementById("email-signup");
                if (emailSignupSection) {
                  emailSignupSection.scrollIntoView({ behavior: "smooth" });
                } else if (location !== "/") {
                  window.location.href = "/#email-signup";
                }
              }}
            >
              Sign Up for Updates
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-hooper-dark-500 text-white">
              <div className="py-4 space-y-4">
                <Link href="/">
                  <a 
                    className={cn(
                      "block font-medium py-2 transition-colors",
                      location === "/" ? "text-hooper-orange" : "hover:text-hooper-orange"
                    )}
                    onClick={closeSheet}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/features">
                  <a 
                    className={cn(
                      "block font-medium py-2 transition-colors",
                      location === "/features" ? "text-hooper-orange" : "hover:text-hooper-orange"
                    )}
                    onClick={closeSheet}
                  >
                    Features
                  </a>
                </Link>
                <Link href="/partners">
                  <a 
                    className={cn(
                      "block font-medium py-2 transition-colors",
                      location === "/partners" ? "text-hooper-orange" : "hover:text-hooper-orange"
                    )}
                    onClick={closeSheet}
                  >
                    For Partners
                  </a>
                </Link>
                <Button 
                  className="w-full button-gradient text-white font-sans font-semibold hover:shadow-lg hover:shadow-hooper-orange/20 transition-all"
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
                  Sign Up for Updates
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
