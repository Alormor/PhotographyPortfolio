import Header from './components/Header'
import Hero from './components/Hero'
import WorkGallery from './components/WorkGallery'
import About from './components/About'

import './index.css'


function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main>
        <Hero />
        <WorkGallery />
        <About />
      </main>
    </div>
  )
}

export default App
