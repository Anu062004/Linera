import { create } from 'zustand';
import axios from 'axios';

export interface MicroApp {
  id: string;
  name: string;
  type: 'counter' | 'poll' | 'tip_jar';
  chainId: string;
  state: any;
  createdAt: string;
}

interface AppStore {
  apps: MicroApp[];
  loading: boolean;
  error: string | null;
  fetchApps: () => Promise<void>;
  deployApp: (name: string, type: string) => Promise<MicroApp>;
  executeAction: (appId: string, action: string, params?: any) => Promise<void>;
  updateAppState: (appId: string, newState: any) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance with better error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const useAppStore = create<AppStore>((set, get) => ({
  apps: [],
  loading: false,
  error: null,

  fetchApps: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get('/api/apps');
      set({ apps: response.data.data || response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch apps',
        loading: false 
      });
    }
  },

  deployApp: async (name: string, type: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/api/deploy', {
        name,
        type
      });
      
      const newApp = response.data.data || response.data;
      set(state => ({ 
        apps: [...state.apps, newApp],
        loading: false 
      }));
      
      return newApp;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to deploy app',
        loading: false 
      });
      throw error;
    }
  },

  executeAction: async (appId: string, action: string, params?: any) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/api/execute', {
        appId,
        action,
        params
      });
      
      // Update the app state
      set(state => ({
        apps: state.apps.map(app => 
          app.id === appId 
            ? { ...app, state: response.data.data?.state || response.data.state }
            : app
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to execute action',
        loading: false 
      });
      throw error;
    }
  },

  updateAppState: (appId: string, newState: any) => {
    set(state => ({
      apps: state.apps.map(app => 
        app.id === appId 
          ? { ...app, state: newState }
          : app
      )
    }));
  }
}));
