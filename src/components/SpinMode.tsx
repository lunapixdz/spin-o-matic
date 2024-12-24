import React from "react";

interface SpinModeProps {
  mode: "selection" | "elimination";
  onChange: (value: "selection" | "elimination") => void;
}

const SpinMode = ({ mode, onChange }: SpinModeProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <span 
        className={`text-sm transition-colors ${
          mode === 'selection' ? 'text-[#009068] font-medium' : 'text-gray-500'
        }`}
      >
        Selection
      </span>
      <label className="switch">
        <input
          type="checkbox"
          checked={mode === "elimination"}
          onChange={(e) => onChange(e.target.checked ? "elimination" : "selection")}
        />
      </label>
      <span 
        className={`text-sm transition-colors ${
          mode === 'elimination' ? 'text-[#E81B1B] font-medium' : 'text-gray-500'
        }`}
      >
        Elimination
      </span>
      <style>{`
        .switch {
          --false: #009068;
          --true: #E81B1B;
        }
        
        input[type=checkbox] {
          appearance: none;
          height: 2rem;
          width: 3.5rem;
          background-color: #f0f0f0;
          border: 1.5px solid rgb(167, 167, 167);
          position: relative;
          border-radius: 1.5em;
          cursor: pointer;
        }
        
        input[type=checkbox]::before {
          content: '';
          display: block;
          height: 1.8em;
          width: 1.8em;
          transform: translate(0, -50%);
          position: absolute;
          top: 50%;
          left: 0.1em;
          background-color: var(--false);
          border-radius: 1em;
          transition: .3s ease;
        }
        
        input[type=checkbox]:checked::before {
          background-color: var(--true);
          left: calc(100% - 1.9em);
        }
      `}</style>
    </div>
  );
};

export default SpinMode;