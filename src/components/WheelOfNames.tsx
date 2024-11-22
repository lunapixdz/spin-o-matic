import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WheelProps {
  names: string[];
  onSpin: (winner: string) => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
}

const WheelOfNames: React.FC<WheelProps> = ({
  names,
  onSpin,
  onAddName,
  onRemoveName,
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
    const spinDuration = 5000; // 5 seconds
    const spinRotations = 5; // Number of full rotations
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

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <form onSubmit={handleAddName} className="flex gap-2 w-full">
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name"
          className="flex-1"
        />
        <Button type="submit">Add Name</Button>
      </form>

      <div className="relative w-full aspect-square max-w-xl">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary transform translate-x-1/2 rotate-45 z-10" />
        
        <div
          ref={wheelRef}
          className={`w-full h-full rounded-full relative ${
            isSpinning ? "animate-spin-wheel" : ""
          }`}
          style={{
            background: `conic-gradient(from 0deg, ${names
              .map(
                (_, i) =>
                  `${i % 2 ? "#EC4899" : "#3B82F6"} ${
                    (i * 360) / names.length
                  }deg ${((i + 1) * 360) / names.length}deg`
              )
              .join(", ")})`,
          }}
        >
          {names.map((name, i) => {
            const angle = (i * 360) / names.length;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex items-center justify-center text-white font-bold transform-gpu"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div className="relative -top-[45%] transform -rotate-90 flex items-center gap-2">
                  <span>{name}</span>
                  <button
                    onClick={() => !isSpinning && onRemoveName(i)}
                    className="p-1 hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        size="lg"
        className="w-full max-w-xs"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel!"}
      </Button>
    </div>
  );
};

export default WheelOfNames;