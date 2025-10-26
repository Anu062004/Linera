'use client';

import { useState } from 'react';
import { MicroApp } from '@/store/appStore';
import { useAppStore } from '@/store/appStore';
import { 
  Hash, 
  BarChart3, 
  Wallet, 
  Play, 
  RefreshCw,
  ExternalLink,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MicroAppCardProps {
  app: MicroApp;
}

export function MicroAppCard({ app }: MicroAppCardProps) {
  const { executeAction } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const getAppIcon = (type: string) => {
    switch (type) {
      case 'counter':
        return <Hash className="w-6 h-6 text-blue-600" />;
      case 'poll':
        return <BarChart3 className="w-6 h-6 text-green-600" />;
      case 'tip_jar':
        return <Wallet className="w-6 h-6 text-purple-600" />;
      default:
        return <Hash className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAppColor = (type: string) => {
    switch (type) {
      case 'counter':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'poll':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'tip_jar':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const handleAction = async (action: string, params?: any) => {
    setIsLoading(true);
    try {
      await executeAction(app.id, action, params);
      toast.success(`Action ${action} executed successfully!`);
    } catch (error) {
      toast.error(`Failed to execute ${action}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyChainId = () => {
    navigator.clipboard.writeText(app.chainId);
    toast.success('Chain ID copied to clipboard!');
  };

  const renderAppContent = () => {
    switch (app.type) {
      case 'counter':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {app.state?.value || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
            </div>
            <button
              onClick={() => handleAction('increment')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>Increment</span>
            </button>
          </div>
        );

      case 'poll':
        const options = app.state?.options || {};
        const totalVotes = Object.values(options).reduce((sum: number, votes: any) => sum + votes, 0);
        
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {totalVotes} Total Votes
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(options).map(([option, votes]) => (
                <div key={option} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: totalVotes > 0 ? `${(votes as number / totalVotes) * 100}%` : '0%' 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {votes as number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(options).map((option) => (
                <button
                  key={option}
                  onClick={() => handleAction('vote', { option })}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
                >
                  <Play className="w-3 h-3" />
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'tip_jar':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {app.state?.balance || 0} LIN
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Balance</div>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Receiver Chain ID"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <input
                type="number"
                placeholder="Amount (LIN)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={() => handleAction('send_tip', { receiver: '', amount: 0 })}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>Send Tip</span>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Unknown app type
          </div>
        );
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${getAppColor(app.type)} shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              {getAppIcon(app.type)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {app.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {app.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          <button
            onClick={copyChainId}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Copy Chain ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Chain ID */}
        <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
              {app.chainId.slice(0, 8)}...{app.chainId.slice(-8)}
            </span>
          </div>
        </div>

        {/* App Content */}
        {renderAppContent()}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Deployed {new Date(app.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
