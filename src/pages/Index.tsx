import { useState } from "react";
import WheelOfNames from "@/components/WheelOfNames";
import WinnerDialog from "@/components/WinnerDialog";

const Index = () => {
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleAddName = (name: string) => {
    setNames((prev) => [...prev, name]);
  };

  const handleRemoveName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpin = (winner: string) => {
    setWinner(winner);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          Wheel of Names
        </h1>
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
              <WheelOfNames
                names={names}
                onSpin={handleSpin}
                onAddName={handleAddName}
                onRemoveName={handleRemoveName}
                displayMode="wheel"
              />
            </div>
          </div>
        </div>
        <WinnerDialog winner={winner} onClose={() => setWinner(null)} />
      </div>
    </div>
  );
};

export default Index;