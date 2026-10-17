export default function About() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative accent line */}
        <div className="text-center mb-12">
          <div className="w-24 h-0.5 bg-accent/80 mx-auto mb-6"></div>
          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-text">
            About
          </h2>
        </div>

        {/* Content Card */}
        <div className="bg-surface rounded-xl p-6 sm:p-10 md:p-16 border border-neutral-800 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Portrait Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/about.png"
              alt="Clara Menéndez photographer portrait"
              className="w-full max-w-sm rounded-lg object-cover shadow-xl"
            />
          </div>

          {/* Bio Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
            <h3 className="font-secondary text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Clara Menéndez
            </h3>
            <p className="font-primary text-base sm:text-lg font-light leading-relaxed text-muted tracking-normal">
              I’m a photographer with a passion for capturing the beauty of the world around me. I specialize in{' '}
              <span className="text-accent font-bold">portrait</span>,{' '}
              <span className="text-accent font-bold">landscape</span> and{' '}
              <span className="text-accent font-bold">lifestyle</span> photography, and I’m always looking for new and creative ways to tell stories and explore the world through my lens.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
