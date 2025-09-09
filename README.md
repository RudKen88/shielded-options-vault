# Shielded Options Vault

A privacy-preserving options trading vault built with FHE (Fully Homomorphic Encryption) technology.

## Project Overview

This project implements a decentralized options trading platform that uses FHE to encrypt sensitive trading data while maintaining full functionality. Users can trade options privately without exposing their positions, strategies, or financial information.

## Features

- **Privacy-Preserving Trading**: All sensitive data is encrypted using FHE
- **Options Chain Management**: Complete options chain with real-time pricing
- **Portfolio Tracking**: Encrypted portfolio management and analytics
- **Secure Vault Operations**: Deposit, withdraw, and manage funds securely
- **Real-time Market Data**: Live market data integration
- **Wallet Integration**: Support for multiple wallet providers

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn-ui, Tailwind CSS
- **Blockchain**: Solidity, FHE (Fully Homomorphic Encryption)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RudKen88/shielded-options-vault.git
cd shielded-options-vault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── OptionsChain.tsx # Options chain display
│   ├── Portfolio.tsx   # Portfolio management
│   ├── TradingPanel.tsx # Trading interface
│   └── TickerHeader.tsx # Market data header
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## Smart Contract

The project includes a Solidity smart contract that implements:
- FHE-encrypted position tracking
- Privacy-preserving trade execution
- Secure fund management
- Encrypted portfolio analytics

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_RPC_URL=your_rpc_url
VITE_CHAIN_ID=your_chain_id
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the maintainer.

## Acknowledgments

- Built with FHE technology for privacy preservation
- Inspired by modern DeFi protocols
- Uses cutting-edge cryptographic techniques