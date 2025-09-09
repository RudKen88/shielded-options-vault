import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Shielded Options Vault',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'e08e99d213c331aa0fd00f625de06e66',
  chains: [sepolia, mainnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
