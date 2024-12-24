import { useState } from "react";
import WinnerDialog from "@/components/WinnerDialog";
import Header from "@/components/layout/Header";
import FullscreenWheel from "@/components/layout/FullscreenWheel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import SpinCounter from "@/components/SpinCounter";
import MainContent from "@/components/layout/MainContent";
import UseCaseGrid from "@/components/layout/UseCaseGrid";
import ElfsightWidget from "@/components/layout/ElfsightWidget";

const INITIAL_NAMES = [
  "Emma Thompson",
  "James Wilson",
  "Sarah Parker",
  "Michael Chen",
  "Lisa Rodriguez",
  "David Kim",
];

const Index = () => {
  const [names, setNames] = useState<string[]>(INITIAL_NAMES);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("We Have a Winner!");
  const [spinMode, setSpinMode] = useState<"selection" | "elimination">("selection");

  const handleAddName = (name: string) => {
    setNames((prev) => [...prev, name]);
  };

  const handleRemoveName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpin = (winner: string, mode: "selection" | "elimination") => {
    setSpinMode(mode);
    setWinner(winner);
    if (mode === "selection") {
      setWinners((prev) => [winner, ...prev]);
    }
    setWinnerMessage(mode === "elimination" && names.length > 2 ? "Eliminated!" : "We Have a Winner!");
    
    const currentCount = parseInt(localStorage.getItem('wheelspinCount') || '0');
    localStorage.setItem('wheelspinCount', (currentCount + 1).toString());
    
    const event = new Event('storage');
    window.dispatchEvent(event);
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

  if (isFullscreen) {
    return (
      <FullscreenWheel
        names={names}
        onSpin={handleSpin}
        onAddName={handleAddName}
        onRemoveName={handleRemoveName}
        winners={winners}
        toggleFullscreen={toggleFullscreen}
        winner={winner}
        winnerMessage={winnerMessage}
        onCloseWinner={() => setWinner(null)}
        onRemoveWinner={handleRemoveWinner}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        toggleFullscreen={toggleFullscreen}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="max-w-7xl mx-auto px-4">
        <MainContent
          names={names}
          onSpin={handleSpin}
          onAddName={handleAddName}
          onRemoveName={handleRemoveName}
          winners={winners}
        />
        <UseCaseGrid />
      </div>

      <SpinCounter />
      
      <WinnerDialog
        winner={winner}
        winnerMessage={winnerMessage}
        onClose={() => setWinner(null)}
        onRemove={handleRemoveWinner}
        mode={spinMode}
        remainingCount={names.length}
      />
      
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Winner Message</label>
              <Input
                value={winnerMessage}
                onChange={(e) => setWinnerMessage(e.target.value)}
                placeholder="Enter winner message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <ContactForm />
        </div>
      </div>

      <ElfsightWidget />
    </div>
  );
};

export default Index;