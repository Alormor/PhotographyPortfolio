export default function Hero() {
  const handleScrollToWork = () => {
    const workSection = document.getElementById('work')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-screen pt-28 md:pt-32 flex items-center justify-center overflow-hidden bg-bg">
      {/* Background Image with opacity */}
      <img
        src="/images/hero.png"
        alt="Hero photography background"
        className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 flex flex-col items-center gap-6">
        <h1 className="font-secondary text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest md:tracking-hero text-text">
          Clara Menéndez
        </h1>

        <p className="text-base sm:text-lg md:text-2xl font-light tracking-wide text-text max-w-2xl">
          Capturing the beauty of the world one picture at a time.
        </p>

        <button
          type="button"
          onClick={handleScrollToWork}
          className="mt-4 px-8 sm:px-10 py-3 sm:py-4 font-primary text-sm sm:text-base font-bold uppercase tracking-wide text-bg bg-accent rounded hover:-translate-y-1.5 hover:bg-[#e5b382] transition-all duration-300 shadow-lg cursor-pointer"
        >
          Dive in
        </button>
      </div>
    </section>
  )
}
