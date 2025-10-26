'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Navigation } from '@/components/Navigation';
import { ArrowLeft, Zap, Hash, BarChart3, Wallet, Activity } from 'lucide-react';
import Link from 'next/link';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Register dagre layout
cytoscape.use(dagre);

export default function Visualizer() {
  const { apps } = useAppStore();
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!containerRef.current || apps.length === 0) return;

    // Initialize Cytoscape
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: generateGraphData(),
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#3B82F6',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'white',
            'font-size': '12px',
            'font-weight': 'bold',
            'width': '80px',
            'height': '80px',
            'border-width': 2,
            'border-color': '#1E40AF',
            'text-outline-width': 2,
            'text-outline-color': '#1E40AF'
          }
        },
        {
          selector: 'node[type="counter"]',
          style: {
            'background-color': '#3B82F6',
            'border-color': '#1E40AF'
          }
        },
        {
          selector: 'node[type="poll"]',
          style: {
            'background-color': '#10B981',
            'border-color': '#047857'
          }
        },
        {
          selector: 'node[type="tip_jar"]',
          style: {
            'background-color': '#8B5CF6',
            'border-color': '#6D28D9'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#6B7280',
            'target-arrow-color': '#6B7280',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '10px',
            'text-rotation': 'autorotate',
            'text-margin-y': -10
          }
        },
        {
          selector: 'edge[type="message"]',
          style: {
            'line-color': '#F59E0B',
            'target-arrow-color': '#F59E0B',
            'width': 4
          }
        }
      ],
      layout: {
        name: 'dagre',
        rankDir: 'TB',
        spacingFactor: 1.5,
        nodeSep: 50,
        edgeSep: 20
      }
    });

    // Add event listeners
    cyRef.current.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log('Node clicked:', node.data());
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [apps]);

  const generateGraphData = () => {
    const nodes = apps.map(app => ({
      data: {
        id: app.id,
        label: app.name,
        type: app.type,
        chainId: app.chainId,
        state: app.state
      }
    }));

    const edges: any[] = [];
    
    // Add edges for tip jar connections (cross-chain messages)
    apps.forEach(app => {
      if (app.type === 'tip_jar' && app.state?.connections) {
        app.state.connections.forEach((connection: string) => {
          const targetApp = apps.find(a => a.chainId === connection);
          if (targetApp) {
            edges.push({
              data: {
                id: `${app.id}-${targetApp.id}`,
                source: app.id,
                target: targetApp.id,
                label: 'Tip',
                type: 'message'
              }
            });
          }
        });
      }
    });

    return [...nodes, ...edges];
  };

  const getAppIcon = (type: string) => {
    switch (type) {
      case 'counter':
        return <Hash className="w-4 h-4" />;
      case 'poll':
        return <BarChart3 className="w-4 h-4" />;
      case 'tip_jar':
        return <Wallet className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getAppColor = (type: string) => {
    switch (type) {
      case 'counter':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'poll':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'tip_jar':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Microchain Visualizer
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Visualize your microchains and cross-chain connections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Legend */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Legend
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Hash className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Counter App</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Poll App</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Wallet className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Tip Jar App</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Connections
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-1 bg-orange-500"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Cross-chain messages</span>
                </div>
              </div>
            </div>

            {/* Apps List */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Deployed Apps
              </h3>
              
              {apps.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No apps deployed yet
                </p>
              ) : (
                <div className="space-y-3">
                  {apps.map((app) => (
                    <div key={app.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className={`p-1 rounded ${getAppColor(app.type)}`}>
                        {getAppIcon(app.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {app.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {app.chainId.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-[600px]">
              {apps.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Activity className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No microchains to visualize
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Deploy some micro-apps to see them visualized here
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Deploy Apps</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div ref={containerRef} className="w-full h-full rounded-xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
