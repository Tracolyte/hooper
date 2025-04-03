import { Link } from "wouter";
import { Circle, Instagram, Twitter, Facebook, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={cn(
      "pt-16 pb-8 transition-colors duration-300 border-t",
      theme === 'dark' 
        ? "bg-black border-white/5" 
        : "bg-white border-black/5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="p-1.5 mr-2 bg-gradient-to-br from-hooper-orange to-hooper-brown rounded-full">
                <Circle className="h-4 w-4 text-white fill-white" />
              </div>
              <div className="text-xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">HOOPER</span>
              </div>
            </div>
            <p className={cn(
              "text-sm mb-6 max-w-xs transition-colors duration-300",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>
              Connecting basketball players with courts and games in their local area. Join our community today.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={cn(
                  "p-2 rounded-full transition-all",
                  theme === 'dark' 
                    ? "bg-white/5 hover:bg-white/10 hover:text-hooper-orange text-hooper-orange/70" 
                    : "bg-black/5 hover:bg-black/10 hover:text-hooper-orange text-hooper-orange/70"
                )}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className={cn(
                  "p-2 rounded-full transition-all",
                  theme === 'dark' 
                    ? "bg-white/5 hover:bg-white/10 hover:text-hooper-brown text-hooper-brown/70" 
                    : "bg-black/5 hover:bg-black/10 hover:text-hooper-brown text-hooper-brown/70"
                )}
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className={cn(
                  "p-2 rounded-full transition-all",
                  theme === 'dark' 
                    ? "bg-white/5 hover:bg-white/10 hover:text-hooper-orange text-hooper-orange/70" 
                    : "bg-black/5 hover:bg-black/10 hover:text-hooper-orange text-hooper-orange/70"
                )}
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className={cn(
              "font-bold mb-4 relative inline-block transition-colors",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              <span className="relative z-10">Platform</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className={cn(
                  "hover:text-hooper-orange transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Home
                </Link>
              </li>
              <li>
                <Link to="/features" className={cn(
                  "hover:text-hooper-orange transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Features
                </Link>
              </li>
              <li>
                <Link to="/partners" className={cn(
                  "hover:text-hooper-brown transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> For Partners
                </Link>
              </li>
              <li>
                <a href="#" className={cn(
                  "hover:text-hooper-orange transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={cn(
              "font-bold mb-4 relative inline-block transition-colors",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              <span className="relative z-10">Company</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-brown to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={cn(
                  "hover:text-hooper-brown transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={cn(
                  "hover:text-hooper-orange transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={cn(
                  "hover:text-hooper-brown transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> Career
                </a>
              </li>
              <li>
                <a href="#" className={cn(
                  "hover:text-hooper-orange transition-colors flex items-center group",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={cn(
              "font-bold mb-4 relative inline-block transition-colors",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              <span className="relative z-10">Stay Updated</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-hooper-brown/50"></span>
            </h3>
            <p className={cn(
              "text-sm mb-4 transition-colors",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>
              Subscribe to our newsletter to get the latest updates on our platform.
            </p>
            <div className="flex">
              <div className="flex-grow relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className={cn(
                    "w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-hooper-orange transition-all duration-300 rounded-l-md",
                    theme === 'dark' 
                      ? "bg-white/5 border border-white/10 text-white placeholder-gray-400"
                      : "bg-black/5 border border-black/10 text-gray-900 placeholder-gray-500"
                  )}
                />
                <div className={cn(
                  "absolute inset-0 opacity-0 hover:opacity-100 rounded-l-md pointer-events-none transition-opacity duration-300",
                  theme === 'dark' 
                    ? "bg-gradient-to-r from-hooper-orange/10 to-hooper-brown/10"
                    : "bg-gradient-to-r from-hooper-orange/5 to-hooper-brown/5"
                )}></div>
              </div>
              <Button 
                className="rounded-r-md rounded-l-none bg-gradient-to-r from-hooper-orange to-hooper-brown text-white hover:brightness-110 transition-all duration-300"
                size="sm"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "pt-8 border-t flex flex-col md:flex-row justify-between items-center",
          theme === 'dark' ? "border-white/5" : "border-black/5"
        )}>
          <div className={cn(
            "text-sm mb-4 md:mb-0 transition-colors",
            theme === 'dark' ? "text-gray-500" : "text-gray-600" 
          )}>
            &copy; {new Date().getFullYear()} Hooper. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className={cn(
              "transition-colors duration-300 text-sm hover:text-hooper-orange",
              theme === 'dark' ? "text-gray-500" : "text-gray-600"
            )}>
              Privacy
            </a>
            <a href="#" className={cn(
              "transition-colors duration-300 text-sm hover:text-hooper-brown",
              theme === 'dark' ? "text-gray-500" : "text-gray-600"
            )}>
              Terms
            </a>
            <a href="#" className={cn(
              "transition-colors duration-300 text-sm hover:text-hooper-orange",
              theme === 'dark' ? "text-gray-500" : "text-gray-600"
            )}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
