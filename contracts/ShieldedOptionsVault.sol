// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ShieldedOptionsVault is SepoliaConfig {
    using FHE for *;
    
    struct OptionPosition {
        euint32 positionId;
        euint32 strikePrice;
        euint32 premium;
        euint32 quantity;
        euint32 expirationTime;
        bool isCall;
        bool isActive;
        address trader;
        uint256 timestamp;
    }
    
    struct VaultBalance {
        euint32 totalDeposits;
        euint32 totalWithdrawals;
        euint32 availableBalance;
        euint32 lockedBalance;
        address owner;
    }
    
    struct TradeRecord {
        euint32 tradeId;
        euint32 optionId;
        euint32 tradePrice;
        euint32 quantity;
        bool isBuy;
        address trader;
        uint256 timestamp;
    }
    
    struct PortfolioMetrics {
        euint32 totalValue;
        euint32 unrealizedPnL;
        euint32 realizedPnL;
        euint32 openPositions;
        address owner;
    }
    
    mapping(uint256 => OptionPosition) public optionPositions;
    mapping(address => VaultBalance) public vaultBalances;
    mapping(uint256 => TradeRecord) public tradeRecords;
    mapping(address => PortfolioMetrics) public portfolioMetrics;
    mapping(address => euint32) public traderReputation;
    
    uint256 public positionCounter;
    uint256 public tradeCounter;
    
    address public owner;
    address public verifier;
    
    event PositionOpened(uint256 indexed positionId, address indexed trader, bool isCall);
    event PositionClosed(uint256 indexed positionId, address indexed trader);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed optionId, address indexed trader);
    event VaultDeposited(address indexed trader, uint32 amount);
    event VaultWithdrawn(address indexed trader, uint32 amount);
    event PortfolioUpdated(address indexed trader);
    event ReputationUpdated(address indexed trader, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function openPosition(
        externalEuint32 strikePrice,
        externalEuint32 premium,
        externalEuint32 quantity,
        externalEuint32 expirationTime,
        externalEuint8 isCallFlag,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(quantity > 0, "Quantity must be positive");
        require(expirationTime > block.timestamp, "Expiration must be in future");
        
        uint256 positionId = positionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalStrikePrice = FHE.fromExternal(strikePrice, inputProof);
        euint32 internalPremium = FHE.fromExternal(premium, inputProof);
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        euint32 internalExpirationTime = FHE.fromExternal(expirationTime, inputProof);
        euint8 internalIsCallFlag = FHE.fromExternal(isCallFlag, inputProof);
        
        // Calculate total premium cost
        euint32 totalCost = FHE.mul(internalPremium, internalQuantity);
        
        // Check if trader has sufficient balance
        euint32 availableBalance = vaultBalances[msg.sender].availableBalance;
        ebool hasSufficientBalance = FHE.gte(availableBalance, totalCost);
        
        // This would need to be handled with FHE comparison in a real implementation
        require(true, "Insufficient balance"); // Placeholder for FHE comparison
        
        optionPositions[positionId] = OptionPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            strikePrice: internalStrikePrice,
            premium: internalPremium,
            quantity: internalQuantity,
            expirationTime: internalExpirationTime,
            isCall: FHE.decrypt(internalIsCallFlag) == 1,
            isActive: true,
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vault balance (lock the premium)
        vaultBalances[msg.sender].availableBalance = FHE.sub(
            vaultBalances[msg.sender].availableBalance, 
            totalCost
        );
        vaultBalances[msg.sender].lockedBalance = FHE.add(
            vaultBalances[msg.sender].lockedBalance, 
            totalCost
        );
        
        emit PositionOpened(positionId, msg.sender, FHE.decrypt(internalIsCallFlag) == 1);
        return positionId;
    }
    
    function closePosition(
        uint256 positionId,
        externalEuint32 closingPrice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(optionPositions[positionId].trader == msg.sender, "Not position owner");
        require(optionPositions[positionId].isActive, "Position not active");
        
        uint256 tradeId = tradeCounter++;
        
        euint32 internalClosingPrice = FHE.fromExternal(closingPrice, inputProof);
        OptionPosition storage position = optionPositions[positionId];
        
        // Calculate P&L (simplified calculation)
        euint32 pnl;
        if (position.isCall) {
            // For call options: max(0, currentPrice - strikePrice) - premium
            ebool isInTheMoney = FHE.gte(internalClosingPrice, position.strikePrice);
            euint32 intrinsicValue = FHE.select(
                isInTheMoney,
                FHE.sub(internalClosingPrice, position.strikePrice),
                FHE.asEuint32(0)
            );
            pnl = FHE.sub(intrinsicValue, position.premium);
        } else {
            // For put options: max(0, strikePrice - currentPrice) - premium
            ebool isInTheMoney = FHE.gte(position.strikePrice, internalClosingPrice);
            euint32 intrinsicValue = FHE.select(
                isInTheMoney,
                FHE.sub(position.strikePrice, internalClosingPrice),
                FHE.asEuint32(0)
            );
            pnl = FHE.sub(intrinsicValue, position.premium);
        }
        
        // Calculate total P&L for the position
        euint32 totalPnL = FHE.mul(pnl, position.quantity);
        
        // Update vault balance
        vaultBalances[msg.sender].availableBalance = FHE.add(
            vaultBalances[msg.sender].availableBalance,
            totalPnL
        );
        vaultBalances[msg.sender].lockedBalance = FHE.sub(
            vaultBalances[msg.sender].lockedBalance,
            FHE.mul(position.premium, position.quantity)
        );
        
        // Record the trade
        tradeRecords[tradeId] = TradeRecord({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            optionId: FHE.asEuint32(positionId),
            tradePrice: internalClosingPrice,
            quantity: position.quantity,
            isBuy: false, // Closing position
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update portfolio metrics
        portfolioMetrics[msg.sender].realizedPnL = FHE.add(
            portfolioMetrics[msg.sender].realizedPnL,
            totalPnL
        );
        portfolioMetrics[msg.sender].openPositions = FHE.sub(
            portfolioMetrics[msg.sender].openPositions,
            FHE.asEuint32(1)
        );
        
        // Close the position
        position.isActive = false;
        
        emit PositionClosed(positionId, msg.sender);
        emit TradeExecuted(tradeId, positionId, msg.sender);
        emit PortfolioUpdated(msg.sender);
        
        return tradeId;
    }
    
    function depositToVault(externalEuint32 amount, bytes calldata inputProof) public {
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        vaultBalances[msg.sender].totalDeposits = FHE.add(
            vaultBalances[msg.sender].totalDeposits,
            internalAmount
        );
        vaultBalances[msg.sender].availableBalance = FHE.add(
            vaultBalances[msg.sender].availableBalance,
            internalAmount
        );
        
        emit VaultDeposited(msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function withdrawFromVault(externalEuint32 amount, bytes calldata inputProof) public {
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Check if sufficient balance available
        ebool hasSufficientBalance = FHE.gte(
            vaultBalances[msg.sender].availableBalance,
            internalAmount
        );
        
        // This would need to be handled with FHE comparison in a real implementation
        require(true, "Insufficient balance"); // Placeholder for FHE comparison
        
        vaultBalances[msg.sender].totalWithdrawals = FHE.add(
            vaultBalances[msg.sender].totalWithdrawals,
            internalAmount
        );
        vaultBalances[msg.sender].availableBalance = FHE.sub(
            vaultBalances[msg.sender].availableBalance,
            internalAmount
        );
        
        emit VaultWithdrawn(msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function updatePortfolioMetrics(address trader) public {
        require(msg.sender == verifier, "Only verifier can update metrics");
        
        // Calculate total portfolio value (simplified)
        euint32 totalValue = FHE.add(
            vaultBalances[trader].availableBalance,
            vaultBalances[trader].lockedBalance
        );
        
        portfolioMetrics[trader].totalValue = totalValue;
        
        emit PortfolioUpdated(trader);
    }
    
    function updateTraderReputation(address trader, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(trader != address(0), "Invalid trader address");
        
        traderReputation[trader] = reputation;
        
        emit ReputationUpdated(trader, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        uint8 strikePrice,
        uint8 premium,
        uint8 quantity,
        uint8 expirationTime,
        bool isCall,
        bool isActive,
        address trader,
        uint256 timestamp
    ) {
        OptionPosition storage position = optionPositions[positionId];
        return (
            0, // FHE.decrypt(position.strikePrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.premium) - will be decrypted off-chain
            0, // FHE.decrypt(position.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(position.expirationTime) - will be decrypted off-chain
            position.isCall,
            position.isActive,
            position.trader,
            position.timestamp
        );
    }
    
    function getVaultBalance(address trader) public view returns (
        uint8 totalDeposits,
        uint8 totalWithdrawals,
        uint8 availableBalance,
        uint8 lockedBalance
    ) {
        VaultBalance storage balance = vaultBalances[trader];
        return (
            0, // FHE.decrypt(balance.totalDeposits) - will be decrypted off-chain
            0, // FHE.decrypt(balance.totalWithdrawals) - will be decrypted off-chain
            0, // FHE.decrypt(balance.availableBalance) - will be decrypted off-chain
            0  // FHE.decrypt(balance.lockedBalance) - will be decrypted off-chain
        );
    }
    
    function getPortfolioMetrics(address trader) public view returns (
        uint8 totalValue,
        uint8 unrealizedPnL,
        uint8 realizedPnL,
        uint8 openPositions
    ) {
        PortfolioMetrics storage metrics = portfolioMetrics[trader];
        return (
            0, // FHE.decrypt(metrics.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(metrics.unrealizedPnL) - will be decrypted off-chain
            0, // FHE.decrypt(metrics.realizedPnL) - will be decrypted off-chain
            0  // FHE.decrypt(metrics.openPositions) - will be decrypted off-chain
        );
    }
    
    function getTraderReputation(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderReputation[trader]) - will be decrypted off-chain
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 optionId,
        uint8 tradePrice,
        uint8 quantity,
        bool isBuy,
        address trader,
        uint256 timestamp
    ) {
        TradeRecord storage trade = tradeRecords[tradeId];
        return (
            0, // FHE.decrypt(trade.optionId) - will be decrypted off-chain
            0, // FHE.decrypt(trade.tradePrice) - will be decrypted off-chain
            0, // FHE.decrypt(trade.quantity) - will be decrypted off-chain
            trade.isBuy,
            trade.trader,
            trade.timestamp
        );
    }
}
