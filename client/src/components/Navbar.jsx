import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// If you DON'T have shadcn/ui setup, replace Button with normal button
const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`} {...props}>
    {children}
  </button>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="text-xl font-semibold">GolfGives</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-black">How It Works</a>
          <a href="#charities" className="text-sm text-gray-600 hover:text-black">Charities</a>
          <a href="#prizes" className="text-sm text-gray-600 hover:text-black">Prizes</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-black">Plans</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button className="px-4 py-2 border rounded">Log in</button>
          </Link>
          <Link to="/admin">
            <Button>Admin Login</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-b px-4 pb-4">
          <div className="flex flex-col gap-3">
            <a href="#how-it-works" className="text-sm py-2 text-gray-600" onClick={() => setOpen(false)}>How It Works</a>
            <a href="#charities" className="text-sm py-2 text-gray-600" onClick={() => setOpen(false)}>Charities</a>
            <a href="#prizes" className="text-sm py-2 text-gray-600" onClick={() => setOpen(false)}>Prizes</a>
            <a href="#pricing" className="text-sm py-2 text-gray-600" onClick={() => setOpen(false)}>Plans</a>

            <Link to="/login">
              <button className="text-left py-2">Log in</button>
            </Link>

            <Link to="/admin">
              <Button>Admin Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}