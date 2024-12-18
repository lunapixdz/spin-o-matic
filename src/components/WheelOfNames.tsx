import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ArrowUpAZ, Shuffle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SpinMode from "./SpinMode";

interface WheelProps {
  names: string[];
  onSpin: (winner: string, mode: "selection" | "elimination") => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  displayMode: "wheel" | "list";
  winners?: string[];
}

const WHEEL_COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const WheelOfNames: React.FC<WheelProps> = ({
  names,
  onSpin,
  onAddName,
  onRemoveName,
  displayMode,
  winners = [],
}) => {
  const [newName, setNewName] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinMode, setSpinMode] = useState<"selection" | "elimination">("selection");
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast({
        title: "Please enter a name",
        variant: "destructive",
      });
      return;
    }
    onAddName(newName.trim());
    setNewName("");
  };

  const getNudgedAngle = (baseAngle: number): number => {
    // Add a small random nudge to avoid landing exactly on segment boundaries
    const nudge = Math.random() * 10 - 5; // Random value between -5 and 5 degrees
    return baseAngle + nudge;
  };

  const handleSpin = () => {
    if (names.length < 2) {
      toast({
        title: "Add at least 2 names",
        description: "The wheel needs more names to spin!",
        variant: "destructive",
      });
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    const spinDuration = 5000;
    const spinRotations = Math.floor(Math.random() * 3) + 5;
    const baseAngle = 360 * spinRotations;
    const winningIndex = Math.floor(Math.random() * names.length);
    const segmentAngle = 360 / names.length;
    // Adjust the target angle to align with the left tip of the arrow
    const targetAngle = getNudgedAngle(baseAngle + (360 - ((winningIndex * segmentAngle) + (segmentAngle / 2))));

    if (wheelRef.current) {
      wheelRef.current.style.setProperty("--spin-to", `${targetAngle}deg`);
      wheelRef.current.style.setProperty("--spin-duration", `${spinDuration}ms`);
    }

    setTimeout(() => {
      setIsSpinning(false);
      onSpin(names[winningIndex], spinMode);
    }, spinDuration);
  };

  const handleSort = () => {
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    names.length = 0;
    sortedNames.forEach((name) => onAddName(name));
  };

  const handleShuffle = () => {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    names.length = 0;
    shuffledNames.forEach((name) => onAddName(name));
  };

  if (displayMode === "list") {
    return (
      <div className="flex flex-col gap-4">
        <form onSubmit={handleAddName} className="flex gap-2">
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name"
            className="flex-1"
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSort}
            className="flex items-center gap-2"
          >
            <ArrowUpAZ size={16} />
            AZ
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShuffle}
            className="flex items-center gap-2"
          >
            <Shuffle size={16} />
            Shuffle
          </Button>
        </div>
        <div className="space-y-2">
          {names.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>
                <span className="font-semibold mr-2">#{i + 1}</span>
                {name}
              </span>
              <button
                onClick={() => !isSpinning && onRemoveName(i)}
                className="p-1 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const segments = names.length > 0 ? names.length : 6;
  const displayNames = names.length > 0 ? names : Array(6).fill("");

  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Arrow Image */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 z-20 w-16">
        <img 
          src="/arrow-pointer.png" 
          alt="Pointer"
          className="w-full h-auto transform -translate-y-1/2"
          style={{
            filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))'
          }}
        />
      </div>

      <div
        ref={wheelRef}
        className={`w-full h-full rounded-full relative ${
          isSpinning ? "animate-spin-wheel" : "animate-spin-slow"
        }`}
        style={{
          background: `conic-gradient(from 0deg, ${Array(segments)
            .fill(null)
            .map(
              (_, i) =>
                `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${
                  (i * 360) / segments
                }deg ${((i + 1) * 360) / segments}deg`
            )
            .join(", ")})`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-gray-100 rounded-full z-10" />
        
        {displayNames.map((name, i) => {
          const angle = (i * 360) / segments;
          const segmentMiddle = angle + (360 / segments / 2);
          return (
            <div
              key={i}
              className="absolute w-[85%] h-[85%] left-[7.5%] top-[7.5%] flex items-center justify-center text-white font-bold transform-gpu"
              style={{
                transform: `rotate(${segmentMiddle}deg)`,
              }}
            >
              <div className="relative -top-[45%] transform -rotate-90">
                <span>{name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <SpinMode mode={spinMode} onChange={setSpinMode} />
        <Button
          onClick={handleSpin}
          disabled={isSpinning || names.length < 2}
          size="lg"
          className="w-full max-w-xs mx-auto rounded-full"
        >
          {isSpinning ? "Spinning..." : "SPIN"}
        </Button>
      </div>
    </div>
  );
};

export default WheelOfNames;