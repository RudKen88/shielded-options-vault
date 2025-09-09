import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, TrendingDown } from "lucide-react";
import { useAccount } from 'wagmi';
import { useVaultBalance, usePortfolioMetrics } from '@/lib/contract';

interface Position {
  id: string;
  type: "Call" | "Put";
  strike: string;
  expiry: string;
  quantity: string;
  avgPrice: string;
  currentPrice: string;
  pnl: string;
  encrypted: boolean;
}

const Portfolio = () => {
  const { address, isConnected } = useAccount();
  const { data: vaultBalance, isLoading: isLoadingBalance } = useVaultBalance();
  const { data: portfolioMetrics, isLoading: isLoadingMetrics } = usePortfolioMetrics();
  
  const positions: Position[] = [
    {
      id: "1",
      type: "Call",
      strike: "67,000",
      expiry: "Dec 29",
      quantity: "5",
      avgPrice: "1.45",
      currentPrice: "1.67",
      pnl: "+$1,100",
      encrypted: true
    },
    {
      id: "2", 
      type: "Put",
      strike: "65,000",
      expiry: "Dec 29",
      quantity: "3",
      avgPrice: "0.89",
      currentPrice: "0.76",
      pnl: "-$390",
      encrypted: true
    },
    {
      id: "3",
      type: "Call",
      strike: "68,500",
      expiry: "Jan 05",
      quantity: "2",
      avgPrice: "0.67",
      currentPrice: "0.84",
      pnl: "+$340",
      encrypted: false
    }
  ];

  const totalPnL = positions.reduce((sum, pos) => {
    const pnl = parseFloat(pos.pnl.replace(/[+$,]/g, '').replace('-', '-'));
    return sum + pnl;
  }, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-terminal-green">PORTFOLIO POSITIONS</h2>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total P&L</div>
            <div className={`text-lg font-bold font-mono ${totalPnL >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
            </div>
          </div>
          <Badge variant="outline" className="border-terminal-amber text-terminal-amber">
            <Lock className="w-3 h-3 mr-1" />
            ENCRYPTED
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {positions.map((position) => (
          <div key={position.id} className="flex items-center justify-between p-4 rounded border border-muted/30 hover:bg-muted/20 transition-colors">
            <div className="flex items-center space-x-4">
              {position.encrypted && <Lock className="w-4 h-4 text-terminal-amber" />}
              <Badge variant={position.type === "Call" ? "default" : "secondary"} className="min-w-[50px] justify-center">
                {position.type}
              </Badge>
              <div>
                <div className="font-mono font-bold">${position.strike}</div>
                <div className="text-xs text-muted-foreground">{position.expiry}</div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm font-mono">
              <div className="text-center">
                <div className="text-muted-foreground">QTY</div>
                <div>{position.quantity}</div>
              </div>
              
              <div className="text-center">
                <div className="text-muted-foreground">AVG</div>
                <div>{position.avgPrice}</div>
              </div>
              
              <div className="text-center">
                <div className="text-muted-foreground">CURRENT</div>
                <div>{position.currentPrice}</div>
              </div>
              
              <div className="text-center min-w-[80px]">
                <div className="text-muted-foreground">P&L</div>
                <div className={`flex items-center justify-center space-x-1 ${
                  position.pnl.startsWith('+') ? 'text-terminal-green' : 'text-terminal-red'
                }`}>
                  {position.pnl.startsWith('+') ? 
                    <TrendingUp className="w-3 h-3" /> : 
                    <TrendingDown className="w-3 h-3" />
                  }
                  <span>{position.pnl}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="border-terminal-red/50 text-terminal-red hover:bg-terminal-red/10">
                Close
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-muted flex justify-between items-center text-xs text-muted-foreground">
        <span>Positions are encrypted and private using FHE technology</span>
        <div className="flex space-x-4">
          {isConnected ? (
            <>
              <span>Account Value: <span className="text-terminal-green font-mono">
                {isLoadingMetrics ? "Loading..." : "$125,430.89"}
              </span></span>
              <span>Available Balance: <span className="text-terminal-amber font-mono">
                {isLoadingBalance ? "Loading..." : "$45,230.12"}
              </span></span>
            </>
          ) : (
            <span>Connect wallet to view balance</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Portfolio;