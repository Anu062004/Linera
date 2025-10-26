# MiniChain Studio

Deploy Your Own Micro-App in Seconds on Linera Blockchain

## 🚀 Overview

MiniChain Studio is a full-stack web application that allows users to deploy and interact with simple decentralized micro-apps (Counter, Poll, Tip Jar) on the Linera blockchain. Each micro-app runs on its own microchain and can communicate with other micro-apps via cross-chain messaging.

## ✨ Features

- **Dashboard**: View all deployed micro-apps with real-time state updates
- **Deploy Apps**: Deploy Counter, Poll, or Tip Jar apps with one click
- **Interactive Apps**: Interact with your deployed apps (increment counters, vote, send tips)
- **Cross-Chain Messaging**: Tip Jar apps can send tips across different microchains
- **Visualizer**: Graph visualization of microchains and their connections
- **Real-time Updates**: Live state updates and transaction confirmations

## 🏗️ Architecture

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js with TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Visualization**: Cytoscape.js for graph visualization
- **Components**: Modern UI with cards, modals, and interactive elements

### Backend (Node.js + TypeScript)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **API**: RESTful endpoints for app management
- **Blockchain Integration**: Linera CLI/RPC integration
- **Storage**: In-memory storage (demo) with SQLite support

### Smart Contracts (Rust + Linera SDK)
- **Language**: Rust
- **Framework**: Linera SDK
- **Target**: WebAssembly (WASM)
- **Apps**: Counter, Poll, Tip Jar with cross-chain messaging

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Zustand
- Cytoscape.js
- Lucide React (icons)
- React Hot Toast

### Backend
- Node.js
- TypeScript
- Express.js
- CORS
- UUID
- Axios

### Smart Contracts
- Rust
- Linera SDK
- Serde
- WebAssembly target

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Linera CLI (for blockchain operations)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minichain-studio
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Build smart contracts**
   ```bash
   cd ../contracts/counter_app
   cargo build --target wasm32-unknown-unknown --release
   
   cd ../poll_app
   cargo build --target wasm32-unknown-unknown --release
   
   cd ../tip_jar_app
   cargo build --target wasm32-unknown-unknown --release
   ```

### Running the Application

1. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 App Types

### Counter App
- Simple counter that can be incremented
- Operations: Increment, IncrementBy, Reset
- State: Current counter value

### Poll App
- Create polls and collect votes
- Operations: CreatePoll, Vote, ClosePoll, ReopenPoll
- State: Question, options with vote counts, total votes, active status

### Tip Jar App
- Send tips across microchains
- Operations: Deposit, Withdraw, SendTip, ConnectChain
- Cross-chain messaging for tip delivery
- State: Balance, connections, transaction history

## 🔗 API Endpoints

### Apps
- `POST /api/deploy` - Deploy a new micro-app
- `POST /api/execute` - Execute an action on a micro-app
- `GET /api/apps` - Get all deployed apps
- `GET /api/apps/:appId/state` - Get app state

### Cross-Chain
- `GET /api/messages` - Get cross-chain messages

## 🌐 Cross-Chain Messaging

The Tip Jar app demonstrates Linera's cross-chain messaging capabilities:

1. **Send Tip**: User sends a tip to another microchain
2. **Message Creation**: Cross-chain message is created
3. **Message Delivery**: Message is delivered to target chain
4. **State Update**: Target chain updates its balance

## 🎨 UI Components

- **Dashboard**: Main page showing all deployed apps
- **Deploy Modal**: Modal for deploying new apps
- **MicroAppCard**: Card component for each app
- **Visualizer**: Graph visualization of microchains
- **Navigation**: Top navigation bar

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Smart Contract Development
```bash
cd contracts/[app_name]
cargo build --target wasm32-unknown-unknown --release
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### Smart Contract Tests
```bash
cd contracts/[app_name]
cargo test
```

## 📦 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Linera team for the blockchain infrastructure
- Next.js team for the frontend framework
- Rust community for the smart contract language
- All contributors and supporters

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation

---

**MiniChain Studio** - Deploy micro-apps on Linera blockchain in seconds! 🚀
