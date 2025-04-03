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
                <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">HOOPER</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Connecting basketball players with courts and games in their local area. Join our community today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1" /> Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/features">
                  <a className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1" /> Features
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/partners">
                  <a className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1" /> For Partners
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" /> About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" /> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" /> Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hooper-orange transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" /> Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter to get the latest updates on our platform.
            </p>
            <div className="flex">
              <div className="flex-grow">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-l-md focus:outline-none focus:ring-1 focus:ring-hooper-orange text-white"
                />
              </div>
              <Button 
                className="rounded-r-md rounded-l-none bg-gradient-to-r from-hooper-orange to-hooper-brown text-white"
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
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
