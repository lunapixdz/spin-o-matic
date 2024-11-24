import { useState } from "react";
import WheelOfNames from "@/components/WheelOfNames";
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

const Index = () => {
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("We Have a Winner!");

  const handleAddName = (name: string) => {
    setNames((prev) => [...prev, name]);
  };

  const handleRemoveName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpin = (winner: string) => {
    setWinner(winner);
    setWinners((prev) => [winner, ...prev]);
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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
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
          <div className="w-full md:w-2/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <WheelOfNames
                  names={names}
                  onSpin={handleSpin}
                  onAddName={handleAddName}
                  onRemoveName={handleRemoveName}
                  displayMode="wheel"
                  winners={winners}
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
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
                {winners.map((winner, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 rounded flex items-center justify-between"
                  >
                    <span>
                      <span className="font-semibold mr-2">#{index + 1}</span>
                      {winner}
                    </span>
                  </div>
                ))}
                {winners.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No winners yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WinnerDialog
        winner={winner}
        winnerMessage={winnerMessage}
        onClose={() => setWinner(null)}
        onRemove={handleRemoveWinner}
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
    </div>
  );
};

export default Index;