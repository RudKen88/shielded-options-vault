import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const TickerHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const marketData = [
    { symbol: "BTC/USD", price: "$67,432.15", change: "+2.34%" },
    { symbol: "ETH/USD", price: "$3,841.67", change: "+1.87%" },
    { symbol: "FHE/USD", price: "$24.89", change: "+5.42%" },
    { symbol: "OPTIONS VOL", price: "38.2%", change: "-0.85%" }
  ];

  return (
    <header className="relative bg-card border-b border-terminal-green/20 overflow-hidden">
      {/* Scrolling Banner */}
      <div className="bg-terminal-green/10 border-y border-terminal-green/30 py-1">
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-terminal-green font-mono text-sm font-bold px-8">
            ⚡ POWERED BY FHE - FULLY HOMOMORPHIC ENCRYPTION ⚡ ON-CHAIN DATA ENCRYPTION ⚡ CONTRACT-ENCRYPTED TRADING RECORDS ⚡ CONFIDENTIAL OPTIONS MARKET ⚡ ENCRYPTED STRIKE PRICES & POSITIONS ⚡ ZERO-KNOWLEDGE DERIVATIVES ⚡ PRIVATE BLOCKCHAIN TRANSACTIONS ⚡
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-terminal-green">
            CONFIDENTIAL OPTIONS MARKET
          </h1>
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground font-mono">
              {currentTime.toUTCString()}
            </div>
            <div className="text-xs text-terminal-green/70 font-mono">
              FHE-POWERED • ON-CHAIN ENCRYPTION • PRIVATE TRADES
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Market Data Ticker */}
          <div className="flex items-center space-x-6">
            {marketData.map((item, index) => (
              <div key={index} className="text-right">
                <div className="text-xs text-muted-foreground font-mono">{item.symbol}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-foreground">{item.price}</span>
                  <span className={`text-xs font-mono ${
                    item.change.startsWith('+') ? 'text-terminal-green' : 'text-terminal-red'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Wallet Connection Button */}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default TickerHeader;