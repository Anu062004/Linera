# Hello Linera Example App

This is a complete example application built with the Linera Scaffold Platform.

## What's Included

- **Smart Contract**: Rust-based counter contract with increment, decrement, and reset operations
- **Frontend**: React application with Tailwind CSS styling and real-time counter updates
- **Deployment**: Automated deployment scripts for Linera testnet
- **Testing**: Comprehensive test suite for both contract and frontend

## Quick Start

```bash
# Build the application
./lnr build

# Deploy to testnet
./lnr deploy

# Start development mode
./lnr dev
```

## Features Demonstrated

1. **Smart Contract Operations**
   - Increment counter
   - Decrement counter
   - Reset counter
   - Get current value

2. **Frontend Features**
   - Real-time counter display
   - Interactive buttons for contract operations
   - Responsive design with Tailwind CSS
   - Error handling and loading states

3. **Deployment**
   - One-click deployment to Linera testnet
   - Automated build process
   - Deployment logging and status tracking

## Architecture

```
hello-linera/
├── contract/          # Rust smart contract
│   ├── src/lib.rs     # Contract implementation
│   └── Cargo.toml     # Dependencies and build config
├── frontend/          # React frontend
│   ├── src/           # React components and logic
│   └── package.json   # Frontend dependencies
├── operator/          # Deployment automation
│   ├── deploy.sh      # Deployment script
│   └── Dockerfile     # Container configuration
└── lnr                # App-specific CLI
```

## Learning Path

1. **Explore the Contract**: Check `contract/src/lib.rs` to understand the smart contract logic
2. **Examine the Frontend**: Look at `frontend/src/components/` to see React components
3. **Deploy and Test**: Use `./lnr deploy` to deploy and interact with your contract
4. **Customize**: Modify the code to add your own features

## Next Steps

- Add more complex state management
- Implement additional contract operations
- Create more sophisticated UI components
- Add integration tests
- Deploy to production

This example serves as a foundation for building more complex Linera applications!
