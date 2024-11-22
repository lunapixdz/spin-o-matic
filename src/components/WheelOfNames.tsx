import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WheelProps {
  names: string[];
  onSpin: (winner: string) => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  displayMode: "wheel" | "list";
}

const WHEEL_COLORS = [
  "#8B5CF6", // Primary Purple
  "#EC4899", // Pink
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
];

const WheelOfNames: React.FC<WheelProps> = ({
  names,
  onSpin,
  onAddName,
  onRemoveName,
  displayMode,
}) => {
  const [newName, setNewName] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
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
    const spinRotations = 5;
    const baseAngle = 360 * spinRotations;
    const winningIndex = Math.floor(Math.random() * names.length);
    const segmentAngle = 360 / names.length;
    const targetAngle = baseAngle + (360 - (winningIndex * segmentAngle));

    if (wheelRef.current) {
      wheelRef.current.style.setProperty("--spin-to", `${targetAngle}deg`);
      wheelRef.current.style.setProperty("--spin-duration", `${spinDuration}ms`);
    }

    setTimeout(() => {
      setIsSpinning(false);
      onSpin(names[winningIndex]);
    }, spinDuration);
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
        <div className="space-y-2">
          {names.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{name}</span>
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

  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white transform translate-x-1/2 rotate-45 z-10 shadow-lg" />
      
      <div
        ref={wheelRef}
        className={`w-full h-full rounded-full relative ${
          isSpinning ? "animate-spin-wheel" : ""
        }`}
        style={{
          background: `conic-gradient(from 0deg, ${names
            .map(
              (_, i) =>
                `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${
                  (i * 360) / names.length
                }deg ${((i + 1) * 360) / names.length}deg`
            )
            .join(", ")})`,
        }}
      >
        {names.map((name, i) => {
          const angle = (i * 360) / names.length;
          const segmentMiddle = angle + (360 / names.length / 2);
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

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        size="lg"
        className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] w-full max-w-xs"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel!"}
      </Button>
    </div>
  );
};

export default WheelOfNames;