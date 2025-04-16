import { Link } from "wouter";
import { Circle, Instagram, Twitter, Facebook, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="p-1.5 mr-2 bg-gradient-to-br from-hooper-orange to-hooper-brown rounded-full">
                <Circle className="h-4 w-4 text-white fill-white" />
              </div>
              <div className="text-xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">HOOPER</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Connecting basketball players with courts and games in their local area. Join our community today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-hooper-orange text-hooper-orange/70 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-hooper-brown text-hooper-brown/70 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-hooper-orange text-hooper-orange/70 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 relative inline-block">
              <span className="relative z-10">Platform</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Features
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> For Partners
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 relative inline-block">
              <span className="relative z-10">Company</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-brown to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-brown/70 group-hover:text-hooper-brown" /> Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-1 text-hooper-orange/70 group-hover:text-hooper-orange" /> Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 relative inline-block">
              <span className="relative z-10">Stay Updated</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-hooper-brown/50"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter to get the latest updates on our platform.
            </p>
            <div className="flex">
              <div className="flex-grow relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-l-md focus:outline-none focus:ring-1 focus:ring-hooper-orange text-white transition-all duration-300 placeholder-gray-400"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-hooper-orange/10 to-hooper-brown/10 opacity-0 hover:opacity-100 rounded-l-md pointer-events-none transition-opacity duration-300"></div>
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
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hooper. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-hooper-orange transition-colors duration-300 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-hooper-brown transition-colors duration-300 text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-hooper-orange transition-colors duration-300 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
