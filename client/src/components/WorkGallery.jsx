import { useState, useEffect } from 'react'
import LikeToggle from './LikeToggle'

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showLikedOnly, setShowLikedOnly] = useState(false)
  const [items, setItems] = useState([])

  // Fetch photos from the real PostgreSQL API
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch('/api/photos')
        if (!res.ok) throw new Error('Failed to fetch photos')
        const data = await res.json()
        setItems(data)
      } catch (err) {
        console.error('Error loading gallery photos:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])

  const categories = ['all', 'landscape', 'portrait', 'lifestyle', 'event']

  // Toggle like for an item
  const handleToggleLike = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    )
  }

  // Filter by category AND liked
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesLiked = !showLikedOnly || item.liked
    return matchesCategory && matchesLiked
  })

  // Count total liked
  const totalLikedCount = items.filter((item) => item.liked).length

  return (
    <section id="work" className="w-full py-16 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="w-full sm:w-250 h-0.5 bg-accent/80 mx-auto mb-6"></div>
          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-text">
            Works
          </h2>
        </div>

        {/* Categories Filter */}
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

          {/* Favourite Filter */}
          <button
            type="button"
            onClick={() => setShowLikedOnly(!showLikedOnly)}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              showLikedOnly
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-md scale-105'
                : 'bg-surface text-muted hover:text-text hover:bg-neutral-800 border border-transparent'
            }`}
          >
            <i className={`fa-heart ${showLikedOnly ? 'fa-solid text-red-500' : 'fa-regular'}`}></i>
            <span>Favorites ({totalLikedCount})</span>
          </button>
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

              {/* Heart toggle */}
              <div className="absolute top-3 right-3 z-10">
                <LikeToggle
                  isLiked={item.liked}
                  onToggle={() => handleToggleLike(item.id)}
                />
              </div>

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                <h3 className="text-text font-medium text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-accent">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-muted py-12">
            {showLikedOnly
              ? `No favorites found in ${activeCategory === 'all' ? 'the portfolio' : activeCategory}. Click the heart icon on any photo to save it!`
              : 'No projects found in this category.'}
          </p>
        )}
      </div>
    </section>
  )
}