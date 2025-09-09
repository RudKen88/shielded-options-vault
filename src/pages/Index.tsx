import TickerHeader from "@/components/TickerHeader";
import OptionsChain from "@/components/OptionsChain";
import Portfolio from "@/components/Portfolio";
import TradingPanel from "@/components/TradingPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TickerHeader />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Options Chain */}
          <div className="lg:col-span-2">
            <OptionsChain />
          </div>
          
          {/* Trading Panel */}
          <div>
            <TradingPanel />
          </div>
        </div>
        
        {/* Portfolio */}
        <Portfolio />
      </div>
    </div>
  );
};

export default Index;
