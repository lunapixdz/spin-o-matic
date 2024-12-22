import { Toggle } from "@/components/ui/toggle";

interface SpinModeProps {
  mode: "selection" | "elimination";
  onChange: (value: "selection" | "elimination") => void;
}

const SpinMode = ({ mode, onChange }: SpinModeProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm ${mode === 'selection' ? 'text-primary font-medium' : 'text-gray-500'}`}>
        Selection
      </span>
      <Toggle
        pressed={mode === "elimination"}
        onPressedChange={(pressed) => onChange(pressed ? "elimination" : "selection")}
        className="data-[state=on]:bg-primary"
      />
      <span className={`text-sm ${mode === 'elimination' ? 'text-primary font-medium' : 'text-gray-500'}`}>
        Elimination
      </span>
    </div>
  );
};

export default SpinMode;