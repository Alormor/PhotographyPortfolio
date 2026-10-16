import { useState } from 'react'
import './App.css'
import './index.css'

function App() {

  return (
    <>
<div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold text-sky-400">
        React + Tailwind CSS
      </h1>
      <p className="mt-2 text-slate-400">
        Tailwind is fully wired up and ready!
      </p>
      <button className="mt-4 rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-600">
        Click Me
      </button>
    </div>
    </>
  )
}

export default App
