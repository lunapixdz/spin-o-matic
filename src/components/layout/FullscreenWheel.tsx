import { Maximize } from "lucide-react";
import WheelOfNames from "../WheelOfNames";
import WinnerDialog from "../WinnerDialog";

interface FullscreenWheelProps {
  names: string[];
  onSpin: (winner: string, mode: "selection" | "elimination") => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  winners: string[];
  toggleFullscreen: () => void;
  winner: string | null;
  winnerMessage: string;
  onCloseWinner: () => void;
  onRemoveWinner: () => void;
}

const FullscreenWheel = ({
  names,
  onSpin,
  onAddName,
  onRemoveName,
  winners,
  toggleFullscreen,
  winner,
  winnerMessage,
  onCloseWinner,
  onRemoveWinner,
}: FullscreenWheelProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-3xl">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="relative">
            <WheelOfNames
              names={names}
              onSpin={onSpin}
              onAddName={onAddName}
              onRemoveName={onRemoveName}
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
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Maximize className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <WinnerDialog
        winner={winner}
        winnerMessage={winnerMessage}
        onClose={onCloseWinner}
        onRemove={onRemoveWinner}
        mode="selection"
        remainingCount={names.length}
      />
    </div>
  );
};

export default FullscreenWheel;