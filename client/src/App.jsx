import { useState } from 'react'

import Header from './components/Header'
import Hero from './components/Hero'
import WorkGallery from './components/WorkGallery'
import WorkshopsSection from './components/WorkshopSection'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

import './index.css'


function App() {
  const [authOpen, setAuthOpen] = useState(false)
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header onOpenAuth={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <WorkGallery />
        <WorkshopsSection onRequireAuth={() => setAuthOpen(true)} />
        <About />
        <Contact />
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default App
