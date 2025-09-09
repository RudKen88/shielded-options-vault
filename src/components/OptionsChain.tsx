import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface OptionsData {
  strike: string;
  callBid: string;
  callAsk: string;
  callVolume: string;
  putBid: string;
  putAsk: string;
  putVolume: string;
  encrypted: boolean;
}

const OptionsChain = () => {
  const [showEncrypted, setShowEncrypted] = useState(false);

  const optionsData: OptionsData[] = [
    { strike: "65,000", callBid: "2.45", callAsk: "2.52", callVolume: "1,234", putBid: "0.89", putAsk: "0.94", putVolume: "876", encrypted: true },
    { strike: "66,000", callBid: "1.89", callAsk: "1.96", callVolume: "2,156", putBid: "1.23", putAsk: "1.28", putVolume: "1,445", encrypted: true },
    { strike: "67,000", callBid: "1.34", callAsk: "1.41", callVolume: "3,234", putBid: "1.67", putAsk: "1.72", putVolume: "2,123", encrypted: false },
    { strike: "68,000", callBid: "0.92", callAsk: "0.98", callVolume: "1,876", putBid: "2.15", putAsk: "2.21", putVolume: "1,654", encrypted: true },
    { strike: "69,000", callBid: "0.56", callAsk: "0.61", callVolume: "987", putBid: "2.78", putAsk: "2.84", putVolume: "1,234", encrypted: true },
  ];

  const formatEncryptedValue = (value: string) => {
    return showEncrypted ? value : "••••••";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-terminal-green mb-2">OPTIONS CHAIN - BTC/USD</h2>
          <p className="text-sm text-muted-foreground">Expiry: Dec 29, 2024 • Current Price: $67,432.15</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-terminal-amber text-terminal-amber">
            <Lock className="w-3 h-3 mr-1" />
            FHE ENCRYPTED
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10"
          >
            {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-terminal-green/20">
              <th className="text-left py-2 text-terminal-green">CALLS</th>
              <th className="text-center py-2 text-terminal-amber">STRIKE</th>
              <th className="text-right py-2 text-terminal-red">PUTS</th>
            </tr>
            <tr className="border-b border-muted text-xs text-muted-foreground">
              <th className="text-left py-2">BID | ASK | VOL</th>
              <th className="text-center py-2">PRICE</th>
              <th className="text-right py-2">BID | ASK | VOL</th>
            </tr>
          </thead>
          <tbody>
            {optionsData.map((option, index) => (
              <tr key={index} className="border-b border-muted/30 hover:bg-muted/20 transition-colors">
                {/* CALLS */}
                <td className="py-3 text-terminal-green">
                  <div className="flex items-center space-x-2">
                    {option.encrypted && <Lock className="w-3 h-3 text-terminal-amber" />}
                    <span>{formatEncryptedValue(option.callBid)}</span>
                    <span className="text-muted-foreground">|</span>
                    <span>{formatEncryptedValue(option.callAsk)}</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-xs text-muted-foreground">{option.callVolume}</span>
                  </div>
                </td>

                {/* STRIKE */}
                <td className="text-center py-3 font-bold text-terminal-amber">
                  ${option.strike}
                </td>

                {/* PUTS */}
                <td className="py-3 text-terminal-red text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className="text-xs text-muted-foreground">{option.putVolume}</span>
                    <span className="text-muted-foreground">|</span>
                    <span>{formatEncryptedValue(option.putAsk)}</span>
                    <span className="text-muted-foreground">|</span>
                    <span>{formatEncryptedValue(option.putBid)}</span>
                    {option.encrypted && <Lock className="w-3 h-3 text-terminal-amber" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-muted">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          <span className="flex items-center">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted positions protected by FHE
          </span>
        </div>
      </div>
    </Card>
  );
};

export default OptionsChain;