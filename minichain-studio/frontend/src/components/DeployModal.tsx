'use client';

import { useState } from 'react';
import { X, Zap, Hash, BarChart3, Wallet, Loader } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import toast from 'react-hot-toast';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APP_TEMPLATES = [
  {
    id: 'counter',
    name: 'Counter',
    description: 'A simple counter that can be incremented',
    icon: <Hash className="w-6 h-6 text-blue-600" />,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  },
  {
    id: 'poll',
    name: 'Poll',
    description: 'Create polls and collect votes',
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  },
  {
    id: 'tip_jar',
    name: 'Tip Jar',
    description: 'Send tips across microchains',
    icon: <Wallet className="w-6 h-6 text-purple-600" />,
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
  },
];

export function DeployModal({ isOpen, onClose }: DeployModalProps) {
  const { deployApp } = useAppStore();
  const [appName, setAppName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = async () => {
    if (!appName.trim() || !selectedTemplate) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsDeploying(true);
    try {
      await deployApp(appName.trim(), selectedTemplate);
      toast.success('App deployed successfully!');
      setAppName('');
      setSelectedTemplate('');
      onClose();
    } catch (error) {
      toast.error('Failed to deploy app');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleClose = () => {
    if (!isDeploying) {
      setAppName('');
      setSelectedTemplate('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deploy New Micro-App
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a new microchain and deploy your app
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isDeploying}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* App Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              App Name
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Enter a name for your app"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isDeploying}
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose App Template
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {APP_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? `${template.color} border-current`
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => !isDeploying && setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-white dark:bg-gray-600 rounded-lg">
                      {template.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              What happens when you deploy?
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• A new microchain is created on Linera</li>
              <li>• Your smart contract is compiled to WebAssembly</li>
              <li>• The app is deployed to your microchain</li>
              <li>• You can interact with it immediately</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            disabled={isDeploying}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !appName.trim() || !selectedTemplate}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
          >
            {isDeploying ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Deploy App</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
