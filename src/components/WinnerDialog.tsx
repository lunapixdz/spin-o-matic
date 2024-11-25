import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WinnerDialogProps {
  winner: string | null;
  winnerMessage: string;
  onClose: () => void;
  onRemove: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({
  winner,
  winnerMessage,
  onClose,
  onRemove,
}) => {
  useEffect(() => {
    if (winner) {
      createConfetti();
    }
  }, [winner]);

  const createConfetti = () => {
    const confettiCount = 100;
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
    const animations = ["confetti-fall-1", "confetti-fall-2", "confetti-fall-3"];
    const sizes = ["8px", "10px", "12px", "14px"];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      const randomDelay = Math.random() * 0.5;

      confetti.style.position = "absolute";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-20px";
      confetti.style.width = randomSize;
      confetti.style.height = randomSize;
      confetti.style.backgroundColor = randomColor;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.animation = `${randomAnimation} ${2.5 + Math.random()}s ease-in-out forwards`;
      confetti.style.animationDelay = `${randomDelay}s`;
      container.appendChild(confetti);
    }

    setTimeout(() => {
      container.remove();
    }, 4000);
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  return (
    <Dialog open={!!winner} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            🎉 {winnerMessage} 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-4xl font-bold text-primary animate-bounce">
            {winner}
          </p>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleRemove}>
            Remove Winner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;