// This is a simplified ABI for the ShieldedOptionsVault contract
// In a real implementation, this would be generated from the compiled contract
export const ShieldedOptionsVaultABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isCall",
        "type": "bool"
      }
    ],
    "name": "PositionOpened",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "PositionClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tradeId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "optionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "TradeExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "VaultDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "VaultWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "PortfolioUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      }
    ],
    "name": "getPositionInfo",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "strikePrice",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "premium",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "quantity",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "expirationTime",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isCall",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "getVaultBalance",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "totalDeposits",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalWithdrawals",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "availableBalance",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "lockedBalance",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "getPortfolioMetrics",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "totalValue",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "unrealizedPnL",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "realizedPnL",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "openPositions",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      }
    ],
    "name": "getTraderReputation",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeId",
        "type": "uint256"
      }
    ],
    "name": "getTradeInfo",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "optionId",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "tradePrice",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "quantity",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isBuy",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
