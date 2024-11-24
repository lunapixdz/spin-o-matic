import { Maximize } from "lucide-react";
import WheelOfNames from "../WheelOfNames";

interface FullscreenWheelProps {
  names: string[];
  onSpin: (winner: string) => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  winners: string[];
  toggleFullscreen: () => void;
}

const FullscreenWheel = ({
  names,
  onSpin,
  onAddName,
  onRemoveName,
  winners,
  toggleFullscreen,
}: FullscreenWheelProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-4">
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
    </div>
  );
};

export default FullscreenWheel;