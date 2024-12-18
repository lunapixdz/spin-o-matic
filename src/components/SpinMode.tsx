import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SpinModeProps {
  mode: "selection" | "elimination";
  onChange: (value: "selection" | "elimination") => void;
}

const SpinMode = ({ mode, onChange }: SpinModeProps) => {
  return (
    <RadioGroup
      value={mode}
      onValueChange={(value: "selection" | "elimination") => onChange(value)}
      className="flex gap-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="selection" id="selection" />
        <Label htmlFor="selection">Selection</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="elimination" id="elimination" />
        <Label htmlFor="elimination">Elimination</Label>
      </div>
    </RadioGroup>
  );
};

export default SpinMode;