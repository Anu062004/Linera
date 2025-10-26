import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Components
import Counter from './components/Counter'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate connection check
    const checkConnection = async () => {
      try {
        // Here you would check Linera connection
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect to Linera:', error)
        setIsConnected(false)
      }
    }

    checkConnection()
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation isConnected={isConnected} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🧩 Linera Scaffold App
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A production-ready Linera microchain application
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-4 ${
              isConnected 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p>Built with Linera Scaffold Platform 🚀</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
