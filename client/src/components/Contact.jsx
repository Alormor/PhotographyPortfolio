import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    shootType: 'portrait',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated submission
    setSubmitted(true)
  }

  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative accent line */}
        <div className="text-center mb-12">
          <div className="w-full sm:w-250 h-0.5 bg-accent/80 mx-auto mb-6"></div>
          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-text">
            Contact Me
          </h2>
        </div>

        {/* Contact Form Container */}
        <div className="bg-surface rounded-xl p-6 sm:p-10 md:p-14 border border-neutral-800">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="font-secondary text-2xl text-accent font-bold">
                Thank you for your message!
              </h3>
              <p className="text-muted text-base">
                Clara will get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 text-sm uppercase tracking-wider font-semibold text-accent hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium tracking-normal text-text">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg text-text rounded-md border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              {/* Surname */}
              <div className="flex flex-col gap-2">
                <label htmlFor="surname" className="text-sm font-medium tracking-normal text-text">
                  Surname:
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  required
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg text-text rounded-md border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium tracking-normal text-text">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg text-text rounded-md border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              {/* Type of Shoot */}
              <div className="flex flex-col gap-2">
                <label htmlFor="shootType" className="text-sm font-medium tracking-normal text-text">
                  Type of shoot:
                </label>
                <select
                  id="shootType"
                  name="shootType"
                  value={formData.shootType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg text-text rounded-md border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium tracking-normal text-text">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg text-text rounded-md border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y min-h-36"
                />
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 flex justify-center mt-2">
                <button
                  type="submit"
                  className="px-10 py-3.5 bg-accent text-bg font-primary font-bold uppercase tracking-wide text-sm rounded-md hover:bg-[#e5b382] hover:-translate-y-0.5 transition-all duration-300 shadow-md cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
