import About from "./components/About"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-dvh flex items-center justify-center bg-brand-espresso px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="text-center max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-cream leading-tight">
            Craft Coffee, Elevated
          </h1>
          <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-brand-cream/80 max-w-2xl mx-auto">
            Where every cup is a journey
          </p>
        </div>
      </section>

      <About />
    </main>
  )
}
