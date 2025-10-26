import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="linera-card col-span-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Linera Scaffold! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This is a production-ready template for building Linera microchain applications. 
            Get started by exploring the features below.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/counter" 
              className="linera-button"
            >
              Try Counter App
            </Link>
            <a 
              href="https://linera.io/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Read Documentation
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="linera-card">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Fast Development
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Hot reload, TypeScript support, and modern tooling for rapid development.
          </p>
        </div>

        <div className="linera-card">
          <div className="text-3xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Secure by Default
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Built-in security patterns and best practices for Linera applications.
          </p>
        </div>

        <div className="linera-card">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            One-Click Deploy
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Deploy to Linera testnet with a single command using our CLI tools.
          </p>
        </div>

        <div className="linera-card">
          <div className="text-3xl mb-4">🧩</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Microchain Ready
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Optimized for Linera's microchain architecture and consensus mechanisms.
          </p>
        </div>

        <div className="linera-card">
          <div className="text-3xl mb-4">📱</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Responsive UI
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Beautiful, responsive interface that works on all devices.
          </p>
        </div>

        <div className="linera-card">
          <div className="text-3xl mb-4">🔧</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Developer Tools
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive tooling for debugging, testing, and monitoring.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
