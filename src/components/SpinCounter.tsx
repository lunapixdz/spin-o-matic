import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const GLOBAL_SPINS_KEY = 'wheelspinGlobalCount';

const SpinCounter = () => {
  const [localSpins, setLocalSpins] = useState(0);
  const [globalSpins, setGlobalSpins] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load local spins
    const stored = localStorage.getItem('wheelspinCount');
    if (stored) {
      setLocalSpins(parseInt(stored));
    }

    // Load global spins
    const storedGlobal = localStorage.getItem(GLOBAL_SPINS_KEY);
    if (storedGlobal) {
      setGlobalSpins(parseInt(storedGlobal));
    }

    // Listen for storage events to update both counters
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wheelspinCount') {
        const newCount = e.newValue;
        if (newCount) {
          setLocalSpins(parseInt(newCount));
        }
      }
      if (e.key === GLOBAL_SPINS_KEY) {
        const newGlobalCount = e.newValue;
        if (newGlobalCount) {
          setGlobalSpins(parseInt(newGlobalCount));
        }
      }
    };

    // Subscribe to storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="text-center space-y-2 mt-8 mb-16">
      <p className="text-lg font-semibold">
        Total Spins: {globalSpins.toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        Your Spins: {localSpins}
      </p>
    </div>
  );
};

export default SpinCounter;