import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const SpinCounter = () => {
  const [localSpins, setLocalSpins] = useState(0);
  const { toast } = useToast();

  const { data: globalSpins, isLoading, error } = useQuery({
    queryKey: ['spinCount'],
    queryFn: async () => {
      try {
        // Using a more specific namespace for the counter
        const response = await fetch('https://api.countapi.xyz/hit/wheelspin-counter/visits');
        if (!response.ok) {
          throw new Error('Failed to fetch counter data');
        }
        const data = await response.json();
        return data.value;
      } catch (err) {
        console.error('Counter API Error:', err);
        throw err;
      }
    },
    retry: 3,
    onError: () => {
      toast({
        title: "Unable to load global spin count",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

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
      <p className="text-lg font-semibold">
        {error ? (
          "Unable to load global spin count"
        ) : (
          <>Total Spins by All Users: {isLoading ? '...' : globalSpins?.toLocaleString() || 0}</>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Your Spins: {localSpins}
      </p>
    </div>
  );
};

export default SpinCounter;