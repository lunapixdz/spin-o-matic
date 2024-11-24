import { useState } from "react";
import WheelOfNames from "@/components/WheelOfNames";
import WinnerDialog from "@/components/WinnerDialog";
import { Settings, Maximize } from "lucide-react";

const Index = () => {
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleAddName = (name: string) => {
    setNames((prev) => [...prev, name]);
  };

  const handleRemoveName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpin = (winner: string) => {
    setWinner(winner);
  };

  const handleRemoveWinner = () => {
    if (winner) {
      const winnerIndex = names.indexOf(winner);
      if (winnerIndex !== -1) {
        handleRemoveName(winnerIndex);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          WHEEL SPIN
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {}}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Maximize className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Entries</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <WheelOfNames
                names={names}
                onSpin={handleSpin}
                onAddName={handleAddName}
                onRemoveName={handleRemoveName}
                displayMode="list"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <WheelOfNames
                  names={names}
                  onSpin={handleSpin}
                  onAddName={handleAddName}
                  onRemoveName={handleRemoveName}
                  displayMode="wheel"
                />
                {names.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-400 font-semibold">
                      Add Entries
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <WinnerDialog 
          winner={winner} 
          onClose={() => setWinner(null)} 
          onRemove={handleRemoveWinner}
        />
      </div>
    </div>
  );
};

export default Index;