export const config = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  LINERA_NETWORK: process.env.LINERA_NETWORK || 'devnet',
  LINERA_RPC_URL: process.env.LINERA_RPC_URL || 'http://localhost:8080',
  LINERA_CLI_PATH: process.env.LINERA_CLI_PATH || 'linera',
  DATABASE_URL: process.env.DATABASE_URL || 'sqlite:./data/minichain.db',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
