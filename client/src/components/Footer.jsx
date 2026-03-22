import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              GolfGives
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-black transition">
              Privacy
            </Link>
            <Link to="#" className="hover:text-black transition">
              Terms
            </Link>
            <Link to="#" className="hover:text-black transition">
              Contact
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500" /> for charity
          </p>
        </div>
      </div>
    </footer>
  );
}