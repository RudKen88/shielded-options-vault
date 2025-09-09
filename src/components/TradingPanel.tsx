import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Shield, Calculator } from "lucide-react";
import { useState } from "react";
import { useAccount } from 'wagmi';
import { useOpenPosition, useDepositToVault } from '@/lib/contract';
import { toast } from 'sonner';

const TradingPanel = () => {
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [strikePrice, setStrikePrice] = useState("67000");
  const [contractType, setContractType] = useState("call");
  const [expiryDate, setExpiryDate] = useState("dec29");
  const [depositAmount, setDepositAmount] = useState("");
  
  const { address, isConnected } = useAccount();
  const { write: openPosition, isLoading: isOpeningPosition } = useOpenPosition();
  const { write: depositToVault, isLoading: isDepositing } = useDepositToVault();
  
  const handleBuyOrder = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!quantity || parseFloat(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    
    try {
      // In a real implementation, you would encrypt the values using FHE
      // For now, we'll simulate the transaction
      toast.success("Position opened successfully! (Simulated)");
    } catch (error) {
      toast.error("Failed to open position");
      console.error(error);
    }
  };
  
  const handleDeposit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("Please enter a valid deposit amount");
      return;
    }
    
    try {
      // In a real implementation, you would encrypt the amount using FHE
      // For now, we'll simulate the transaction
      toast.success(`Deposited ${depositAmount} to vault! (Simulated)`);
      setDepositAmount("");
    } catch (error) {
      toast.error("Failed to deposit to vault");
      console.error(error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-terminal-green">TRADE OPTIONS</h2>
        <Badge variant="outline" className="border-terminal-green text-terminal-green animate-pulse-glow">
          <Shield className="w-3 h-3 mr-1" />
          CONFIDENTIAL TRADING
        </Badge>
      </div>

      <Tabs defaultValue="buy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="buy" className="data-[state=active]:bg-terminal-green/20 data-[state=active]:text-terminal-green">
            BUY
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-terminal-red/20 data-[state=active]:text-terminal-red">
            SELL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">CONTRACT TYPE</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="bg-input border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Call Option</SelectItem>
                  <SelectItem value="put">Put Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">STRIKE PRICE</Label>
              <Select value={strikePrice} onValueChange={setStrikePrice}>
                <SelectTrigger className="bg-input border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="65000">$65,000</SelectItem>
                  <SelectItem value="66000">$66,000</SelectItem>
                  <SelectItem value="67000">$67,000</SelectItem>
                  <SelectItem value="68000">$68,000</SelectItem>
                  <SelectItem value="69000">$69,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">EXPIRY DATE</Label>
              <Select value={expiryDate} onValueChange={setExpiryDate}>
                <SelectTrigger className="bg-input border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dec29">Dec 29, 2024</SelectItem>
                  <SelectItem value="jan05">Jan 05, 2025</SelectItem>
                  <SelectItem value="jan12">Jan 12, 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">ORDER TYPE</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-input border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">QUANTITY</Label>
              <Input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-input border-muted font-mono"
              />
            </div>

            {orderType === "limit" && (
              <div>
                <Label className="text-xs text-muted-foreground">LIMIT PRICE</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-input border-muted font-mono"
                />
              </div>
            )}
          </div>

          {/* Encryption Notice */}
          <div className="flex items-center justify-center p-3 bg-terminal-amber/10 border border-terminal-amber/30 rounded">
            <Lock className="w-4 h-4 text-terminal-amber mr-2" />
            <span className="text-xs text-terminal-amber">Your trade details will be encrypted using FHE</span>
          </div>

          {/* Order Summary */}
          <div className="p-4 bg-muted/30 rounded space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Premium:</span>
              <span className="font-mono text-terminal-green">$1.67 × {quantity || 0} = ${((parseFloat(quantity) || 0) * 1.67).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trading Fee:</span>
              <span className="font-mono">$2.50</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-muted pt-2">
              <span>Total Cost:</span>
              <span className="font-mono text-terminal-amber">${(((parseFloat(quantity) || 0) * 1.67) + 2.50).toFixed(2)}</span>
            </div>
          </div>

          <Button 
            className="w-full bg-terminal-green hover:bg-terminal-green/80 text-black font-bold"
            onClick={handleBuyOrder}
            disabled={isOpeningPosition || !isConnected}
          >
            <Calculator className="w-4 h-4 mr-2" />
            {isOpeningPosition ? "OPENING POSITION..." : "EXECUTE BUY ORDER"}
          </Button>
        </TabsContent>

        <TabsContent value="sell" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">DEPOSIT TO VAULT</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-input border-muted font-mono"
                />
                <Button 
                  onClick={handleDeposit}
                  disabled={isDepositing || !isConnected}
                  className="bg-terminal-green hover:bg-terminal-green/80 text-black"
                >
                  {isDepositing ? "DEPOSITING..." : "DEPOSIT"}
                </Button>
              </div>
            </div>
            
            <div className="text-center text-muted-foreground py-4">
              <p>Select a position from your portfolio to sell</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TradingPanel;