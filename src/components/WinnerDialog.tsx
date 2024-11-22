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
  onClose: () => void;
  onRemove: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ winner, onClose, onRemove }) => {
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
    container.style.zIndex = "50";
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "animate-confetti-fall";
      confetti.style.position = "absolute";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-20px";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      container.appendChild(confetti);
    }

    setTimeout(() => {
      container.remove();
    }, 3000);
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
            🎉 We Have a Winner! 🎉
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