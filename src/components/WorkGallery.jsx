import { useState } from 'react'
import { portfolioData } from '../data/portfolioData'

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'landscape', 'portrait', 'lifestyle', 'event']

  // Filter items
  const filteredItems =
    activeCategory === 'all'
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory)

  return (
    <section id="work" className="w-full py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with decorative line matching original */}
        <div className="text-center mb-10">
          <div className="w-24 h-0.5 bg-accent/80 mx-auto mb-6"></div>
          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-text">
            Works
          </h2>
        </div>

        {/* Filter Controls (useState) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-accent text-bg shadow-md scale-105'
                  : 'bg-surface text-muted hover:text-text hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Work Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-4/3 rounded-lg overflow-hidden bg-surface border border-neutral-800/80"
            >
              <img
                src={item.image.startsWith('/images') ? item.image : `/images${item.image}`}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-text font-medium text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-accent">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-muted py-12">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  )
}
