const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'MiniChain Studio Backend'
  });
});

// Test API endpoint
app.get('/api/apps', (req, res) => {
  console.log('GET /api/apps requested');
  res.json({
    success: true,
    data: [],
    message: 'Apps retrieved successfully'
  });
});

// Test deploy endpoint
app.post('/api/deploy', (req, res) => {
  console.log('POST /api/deploy requested with body:', req.body);
  const { name, type } = req.body;
  
  const newApp = {
    id: 'demo-app-' + Date.now(),
    name: name || 'Demo App',
    type: type || 'counter',
    chainId: 'linera:demo-chain-' + Date.now(),
    state: { value: 0 },
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: newApp,
    message: 'App deployed successfully'
  });
});

// Test execute endpoint
app.post('/api/execute', (req, res) => {
  console.log('POST /api/execute requested with body:', req.body);
  const { appId, action, params } = req.body;
  
  let newState = { value: 0 };
  
  if (action === 'increment') {
    newState = { value: Math.floor(Math.random() * 100) };
  }
  
  res.json({
    success: true,
    data: { state: newState },
    message: 'Action executed successfully'
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MiniChain Studio Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`🌐 Server started at: ${new Date().toISOString()}`);
});
