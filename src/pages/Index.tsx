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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          Wheel of Names
        </h1>
        <WheelOfNames
          names={names}
          onSpin={handleSpin}
          onAddName={handleAddName}
          onRemoveName={handleRemoveName}
        />
        <WinnerDialog winner={winner} onClose={() => setWinner(null)} />
      </div>
    </div>
  );
};

export default Index;