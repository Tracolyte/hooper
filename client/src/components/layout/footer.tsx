import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-hooper-dark-300 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-black tracking-tighter text-white">
              <span className="text-hooper-orange">HOOP</span>
              <span className="text-hooper-brown">ER</span>
            </div>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#">
              <a className="text-hooper-dark-100 hover:text-hooper-orange transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="#">
              <a className="text-hooper-dark-100 hover:text-hooper-orange transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="#">
              <a className="text-hooper-dark-100 hover:text-hooper-orange transition-colors">
                Contact
              </a>
            </Link>
          </div>
          
          <div className="text-hooper-dark-100 text-sm">
            &copy; 2025 Hooper. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
