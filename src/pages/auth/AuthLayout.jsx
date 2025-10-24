import Footer from "../../components/Footer";

export default function AuthLayout({ children, title }) {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {children}

      </div>
      <Footer />
    </section>
  );
}
