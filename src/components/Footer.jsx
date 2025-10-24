function Footer() {
  return (
    <footer className="bg-emerald-950 mt-auto py-6">
      <article className="max-w-[1440px] mx-auto text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} OKICKET. All rights reserved.
      </article>
    </footer>
  );
}

export default Footer;
