export default function Footer() {
  return (
    <footer className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-brand-cream border-t border-brand-espresso/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-brand-espresso/60">
          &copy; {new Date().getFullYear()} Craft Coffee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
