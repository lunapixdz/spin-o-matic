import React from 'react';
import WheelOfNames from '@/components/WheelOfNames';

interface MainContentProps {
  names: string[];
  onSpin: (winner: string, mode: "selection" | "elimination") => void;
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  winners: string[];
}

const MainContent = ({ names, onSpin, onAddName, onRemoveName, winners }: MainContentProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4">
        <h2 className="text-2xl font-semibold mb-4">Entries</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <WheelOfNames
            names={names}
            onSpin={onSpin}
            onAddName={onAddName}
            onRemoveName={onRemoveName}
            displayMode="list"
          />
        </div>
      </div>
      <div className="w-full md:w-2/4">
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
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 mt-16 md:mt-0">
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
  );
};

export default MainContent;