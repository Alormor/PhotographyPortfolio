export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-bg py-12 px-5 sm:px-12 md:px-20 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10 text-center md:text-left">
          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <p className="flex items-center justify-center md:justify-start gap-3 text-muted text-sm sm:text-base tracking-tight">
              <i className="fa-solid fa-phone text-accent w-5 text-center"></i>
              <a href="tel:+34123456789" className="hover:text-text transition-colors">
                +34 123 456 789
              </a>
            </p>

            <p className="flex items-center justify-center md:justify-start gap-3 text-muted text-sm sm:text-base tracking-tight">
              <i className="fa-solid fa-envelope text-accent w-5 text-center"></i>
              <a href="mailto:claram@example.com" className="hover:text-text transition-colors">
                claram@example.com
              </a>
            </p>

            <p className="flex items-center justify-center md:justify-start gap-3 text-muted text-sm sm:text-base tracking-tight">
              <i className="fa-solid fa-location-dot text-accent w-5 text-center"></i>
              <span>Barcelona, Spain &bull; Available worldwide</span>
            </p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-6 text-2xl">
            <a
              href="#"
              aria-label="Instagram"
              className="text-text hover:text-accent hover:-translate-y-1 transition-all duration-200"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-text hover:text-accent hover:-translate-y-1 transition-all duration-200"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="#"
              aria-label="X Twitter"
              className="text-text hover:text-accent hover:-translate-y-1 transition-all duration-200"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-800 text-center">
          <p className="text-xs sm:text-sm text-muted tracking-normal">
            &copy; 2026 Clara Menéndez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
