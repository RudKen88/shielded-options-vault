# Shielded Options Vault - Deployment Guide

## Overview

This document provides step-by-step instructions for deploying the Shielded Options Vault application to Vercel.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Vercel account
- GitHub repository
- WalletConnect Project ID

## Environment Variables

Before deployment, you need to set up the following environment variables in Vercel:

### Required Environment Variables

1. **VITE_WALLETCONNECT_PROJECT_ID**
   - Get this from [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Used for wallet connection functionality

2. **VITE_CONTRACT_ADDRESS**
   - The deployed contract address on the blockchain
   - Update this after deploying the smart contract

3. **VITE_CHAIN_ID**
   - Chain ID for the target blockchain (e.g., 11155111 for Sepolia)
   - Default: 11155111 (Sepolia testnet)

## Deployment Steps

### 1. Smart Contract Deployment

First, deploy the smart contract to the blockchain:

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia
```

After deployment, copy the contract address and update the `VITE_CONTRACT_ADDRESS` environment variable.

### 2. Vercel Deployment

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add VITE_WALLETCONNECT_PROJECT_ID
vercel env add VITE_CONTRACT_ADDRESS
vercel env add VITE_CHAIN_ID
```

#### Option B: Deploy via Vercel Dashboard

1. Connect your GitHub repository to Vercel
2. Import the project
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. Add environment variables in the Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add each required variable

5. Deploy the project

### 3. Post-Deployment Configuration

After deployment:

1. **Update Contract Address**: If you deployed a new contract, update the `VITE_CONTRACT_ADDRESS` environment variable in Vercel
2. **Test Wallet Connection**: Verify that wallet connection works properly
3. **Test Contract Interaction**: Ensure the frontend can interact with the deployed contract

## Build Configuration

The project uses the following build configuration:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are properly installed
   - Check for TypeScript errors
   - Verify environment variables are set

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check network configuration
   - Ensure contract address is valid

3. **Contract Interaction Issues**
   - Verify contract is deployed and verified
   - Check contract address in environment variables
   - Ensure user has sufficient funds for transactions

### Environment Variable Issues

If environment variables are not loading:

1. Check variable names (must start with `VITE_`)
2. Restart the development server after adding variables
3. Verify variables are set in the correct environment (development/production)

## Security Considerations

- Never commit private keys or sensitive data to the repository
- Use environment variables for all sensitive configuration
- Regularly rotate API keys and project IDs
- Monitor contract interactions for suspicious activity

## Monitoring and Maintenance

- Monitor application performance in Vercel dashboard
- Track contract interactions and gas usage
- Update dependencies regularly
- Monitor for security vulnerabilities

## Support

For deployment issues:

1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify contract deployment status
4. Test wallet connection in different browsers

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [FHE Documentation](https://docs.zama.ai/fhevm)
