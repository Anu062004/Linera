# 🧩 Linera Scaffold Platform

A production-ready developer framework for building and deploying Linera microchain applications with zero configuration.

[![CI/CD](https://github.com/Anu062004/Linera/workflows/Linera%20Scaffold%20CI/CD/badge.svg)](https://github.com/Anu062004/Linera/actions)
[![Security Audit](https://github.com/Anu062004/Linera/workflows/Security%20Audit/badge.svg)](https://github.com/Anu062004/Linera/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

Create a new Linera app in seconds:

```bash
# Clone the scaffold platform
git clone https://github.com/Anu062004/Linera.git
cd Linera

# Create a new app
./scaffold/cli/lnr new my-awesome-app
cd my-awesome-app

# Build everything
./lnr build

# Deploy to Linera testnet
./lnr deploy
```

That's it! Your Linera microchain application is now live. 🎉

## ✨ Features

### 🏗️ **Zero-Config Scaffolding**
- Generate complete Linera apps with one command
- Smart contract (Rust → WASM) + Frontend (React + Vite + Tailwind)
- Production-ready templates with best practices

### 🔒 **Security First**
- Deterministic builds with fixed Rust toolchain
- Automated security audits with `cargo audit`
- Reproducible deployments
- CI/CD pipeline with comprehensive checks

### ⚡ **Developer Experience**
- Hot reload for rapid development
- TypeScript support throughout
- Modern tooling (Vite, Tailwind CSS, ESLint)
- Comprehensive testing setup

### 🚀 **One-Click Deploy**
- Deploy to Linera testnet with a single command
- Docker containerization support
- Automated CI/CD with GitHub Actions
- Production monitoring and health checks

## 📁 Project Structure

```
Linera/
├── scaffold/                    # Scaffold platform
│   ├── templates/              # App templates
│   │   ├── contract-template/  # Rust smart contract
│   │   ├── frontend-template/ # React + Vite + Tailwind
│   │   └── operator-template/ # Deployment automation
│   ├── cli/                    # Command-line tools
│   │   ├── lnr                 # Unix CLI
│   │   └── lnr.bat             # Windows CLI
│   └── docs/                   # Documentation
├── examples/                   # Example applications
│   └── hello-linera/          # Sample app
├── .github/workflows/         # CI/CD pipelines
├── rust-toolchain.toml        # Deterministic builds
└── README.md                  # This file
```

## 🛠️ Requirements

### Prerequisites
- **Rust** 1.75.0+ with `wasm32-unknown-unknown` target
- **Node.js** 18+ with npm
- **Linera CLI** installed and configured
- **Git** for version control

### Installation

1. **Install Rust and wasm32 target:**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustup target add wasm32-unknown-unknown
   ```

2. **Install Linera CLI:**
   ```bash
   # Follow Linera documentation for CLI installation
   # https://linera.io/docs/getting-started
   ```

3. **Clone and setup:**
   ```bash
   git clone https://github.com/Anu062004/Linera.git
   cd Linera
   ```

## 🎯 Usage

### Creating a New App

```bash
# Create a new Linera application
./scaffold/cli/lnr new my-app
cd my-app

# The generated app includes:
# - contract/     # Rust smart contract
# - frontend/     # React frontend
# - operator/     # Deployment scripts
# - lnr           # App-specific CLI
```

### Development Workflow

```bash
# Start development mode
./lnr dev

# Build contract and frontend
./lnr build

# Run tests
./lnr test

# Deploy to testnet
./lnr deploy
```

### Available Commands

| Command | Description |
|---------|-------------|
| `lnr new <name>` | Create a new Linera app |
| `lnr build` | Build contract and frontend |
| `lnr deploy` | Deploy to Linera testnet |
| `lnr dev` | Start development mode |
| `lnr test` | Run all tests |

## 🏗️ Architecture

### Smart Contract Template
- **Language**: Rust
- **Target**: WASM (WebAssembly)
- **Framework**: Linera SDK
- **Features**: Counter operations, state management, error handling

### Frontend Template
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Routing**: React Router

### Deployment
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Health checks and logging
- **Security**: Automated audits and deterministic builds

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in your app directory:

```bash
# Linera Configuration
LINERA_NETWORK=testnet
LINERA_RPC_URL=https://testnet.linera.io
LINERA_PRIVATE_KEY=your_private_key_here

# Frontend Configuration
VITE_APP_NAME=My Linera App
VITE_CONTRACT_ADDRESS=your_contract_address
```

### Customization

The scaffold templates are fully customizable:

1. **Contract**: Modify `contract/src/lib.rs` for your business logic
2. **Frontend**: Update `frontend/src/` for your UI components
3. **Deployment**: Customize `operator/` scripts for your infrastructure

## 🧪 Testing

### Running Tests

```bash
# Run contract tests
cargo test --manifest-path contract/Cargo.toml

# Run frontend tests
npm test --prefix frontend

# Run all tests
./lnr test
```

### Test Coverage

The platform includes comprehensive test coverage:
- Unit tests for smart contracts
- Component tests for React components
- Integration tests for end-to-end workflows
- Performance tests for optimization

## 🚀 Deployment

### Local Development

```bash
# Start local development server
./lnr dev
```

### Testnet Deployment

```bash
# Deploy to Linera testnet
./lnr deploy
```

### Production Deployment

```bash
# Build production Docker image
docker build -f operator/Dockerfile -t my-linera-app .

# Run with Docker Compose
docker-compose -f operator/docker-compose.yml up -d
```

## 🔒 Security

### Built-in Security Features

- **Deterministic Builds**: Fixed Rust toolchain ensures reproducible builds
- **Automated Audits**: `cargo audit` runs in CI/CD pipeline
- **Dependency Scanning**: Regular security updates and vulnerability checks
- **Code Quality**: Clippy lints and formatting checks

### Security Best Practices

1. **Never commit private keys** - Use environment variables
2. **Regular updates** - Keep dependencies current
3. **Audit dependencies** - Run `cargo audit` regularly
4. **Test thoroughly** - Comprehensive test coverage

## 📚 Examples

### Hello Linera App

Check out the `examples/hello-linera/` directory for a complete example application demonstrating:

- Smart contract with counter functionality
- React frontend with real-time updates
- Deployment scripts and configuration
- Testing strategies and best practices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/Linera.git
cd Linera

# Install dependencies
npm install

# Run tests
cargo test
npm test

# Make your changes and submit a PR
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Linera](https://linera.io/) for the amazing microchain platform
- [Rust](https://rust-lang.org/) for the powerful systems programming language
- [React](https://reactjs.org/) for the excellent frontend framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

- 📖 [Documentation](https://linera.io/docs)
- 🐛 [Issue Tracker](https://github.com/Anu062004/Linera/issues)
- 💬 [Discussions](https://github.com/Anu062004/Linera/discussions)
- 📧 [Email Support](mailto:support@linera.io)

---

**Built with ❤️ for the Linera ecosystem**

[![Star this repo](https://img.shields.io/github/stars/Anu062004/Linera?style=social)](https://github.com/Anu062004/Linera)
[![Follow on Twitter](https://img.shields.io/twitter/follow/linera_io?style=social)](https://twitter.com/linera_io)
