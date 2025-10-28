import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <header className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">OKICKET</h1>

        <section className="hidden md:flex space-x-6">
          <Link
            to="/auth/login"
            className="text-gray-800 hover:text-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="text-gray-800 hover:text-green-700 font-semibold transition"
          >
            Get Started
          </Link>
        </section>

        <button
          className="md:hidden text-gray-700 hover:text-green-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      {isOpen && (
        <section className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col items-center space-y-3 py-4">
            <Link
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-green-700 transition"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-green-700 font-semibold transition"
            >
              Get Started
            </Link>
          </div>
        </section>
      )}
    </nav>
  );
}

export default Navbar;
