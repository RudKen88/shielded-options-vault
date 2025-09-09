import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { ShieldedOptionsVaultABI } from './abi';

// Contract address - update this after deployment
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useShieldedOptionsVault = () => {
  const { address } = useAccount();
  
  return {
    address,
    contractAddress: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
  };
};

export const useVaultBalance = () => {
  const { address } = useAccount();
  
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'getVaultBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
};

export const usePortfolioMetrics = () => {
  const { address } = useAccount();
  
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'getPortfolioMetrics',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
};

export const useOpenPosition = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'openPosition',
  });
};

export const useClosePosition = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'closePosition',
  });
};

export const useDepositToVault = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'depositToVault',
  });
};

export const useWithdrawFromVault = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: ShieldedOptionsVaultABI,
    functionName: 'withdrawFromVault',
  });
};
