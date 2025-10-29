import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heroWave from "/assets/wavy.svg";
import { Link } from "react-router-dom";

function LandingPage() {
  const weOffer = [
    {
      title: "Create Tickets",
      description:
        "Easily create and submit tickets for any issues or requests.",
    },
    {
      title: "Track Progress",
      description:
        "Monitor open, in-progress, and resolved tickets in real-time.",
    },
    {
      title: "Stay notified",
      description: "Receive updates on ticket status changes.",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <section className="relative flex flex-col justify-center items-center text-center px-6 py-30 bg-white overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-amber-700 rounded-full opacity-20"></div>
        <div className="absolute top-50 left-50 w-40 h-40 bg-blue-700 rounded-full opacity-20"></div>
        <div className="max-w=[1440px] mx-auto z-10">
          <h1 className="text-4xl md:text-6xl font-black">OKICKET</h1>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            Simplify Your{" "}
            <span className="text-amber-700">Ticket Management</span>
          </h2>
          <p className="text-gray-800 mt-4 mb-3 max-w-2xl mx-auto">
            Manage, track, and resolve tickets differently with a sleek and
            secure web app.
          </p>

          <section className="mb-20 flex justify-center gap-4">
            <Link
              to="/auth/signup"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Get Started
            </Link>
            <Link
              to="/auth/login"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition "
            >
              Login
            </Link>
          </section>
        </div>
        <img
          src={heroWave}
          alt="Wavy backrgound"
          className="absolute bottom-0 left-0 w-full"
        />
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-4">
        {weOffer.map((item, index) => (
          <section
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-amber-500 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </section>
        ))}
      </section>

      <Footer />
    </main>
  );
}
export default LandingPage;
