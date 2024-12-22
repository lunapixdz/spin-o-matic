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
        className="data-[state=on]:bg-primary data-[state=on]:border-primary border-2 border-gray-200 w-[52px] h-[28px]"
      />
      <span className={`text-sm ${mode === 'elimination' ? 'text-primary font-medium' : 'text-gray-500'}`}>
        Elimination
      </span>
    </div>
  );
};

export default SpinMode;