import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const SpinCounter = () => {
  const [localSpins, setLocalSpins] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('wheelspinCount');
    if (stored) {
      setLocalSpins(parseInt(stored));
    }

    // Listen for storage events to update the counter
    const handleStorageChange = () => {
      const newCount = localStorage.getItem('wheelspinCount');
      if (newCount) {
        setLocalSpins(parseInt(newCount));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="text-center space-y-2 mt-8 mb-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold">Total Spins by All Users:</p>
        <div>
          <a href="https://www.easycounter.com/">
            <img
              src="https://www.easycounter.com/counter.php?lunapix"
              alt="Website Hit Counter"
              style={{ border: '0' }}
            />
          </a>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Your Spins: {localSpins}
      </p>
    </div>
  );
};

export default SpinCounter;