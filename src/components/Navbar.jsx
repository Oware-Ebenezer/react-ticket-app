import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <header className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">OKICKET</h1>
        <section className="space-x-4">
          <Link
            to="/auth/login"
            className="text-gray-800 hover:text-blue-900 transition"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="text-gray-800 hover:text-blue-900 transition"
          >
            Get Started
          </Link>
        </section>
      </header>
    </nav>
  );
}
export default Navbar;
