import React, { useState, useEffect } from 'react'

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate contract interaction
  const handleIncrement = async () => {
    setIsLoading(true)
    try {
      // Here you would call your Linera contract
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      setCount(prev => prev + 1)
    } catch (error) {
      console.error('Failed to increment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecrement = async () => {
    setIsLoading(true)
    try {
      // Here you would call your Linera contract
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      setCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Failed to decrement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async () => {
    setIsLoading(true)
    try {
      // Here you would call your Linera contract
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      setCount(0)
    } catch (error) {
      console.error('Failed to reset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="linera-card text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Counter Contract
        </h2>
        
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {count}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Current count value
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleIncrement}
              disabled={isLoading}
              className="linera-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '⏳' : '➕'} Increment
            </button>
            
            <button
              onClick={handleDecrement}
              disabled={isLoading || count === 0}
              className="linera-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '⏳' : '➖'} Decrement
            </button>
          </div>
          
          <button
            onClick={handleReset}
            disabled={isLoading || count === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            {isLoading ? '⏳' : '🔄'} Reset
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Contract Information
          </h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p>Contract: Counter Template</p>
            <p>Network: Linera Testnet</p>
            <p>Status: {isLoading ? 'Processing...' : 'Ready'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter
