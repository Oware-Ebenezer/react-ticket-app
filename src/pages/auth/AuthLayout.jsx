
export default function AuthLayout({ children, title }) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-200 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
      <footer className="mt-10 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} OKICKET. All rights reserved.
      </footer>
    </section>
  );
}
