import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const SpinCounter = () => {
  const [localSpins, setLocalSpins] = useState(0);

  const { data: globalSpins, isLoading } = useQuery({
    queryKey: ['spinCount'],
    queryFn: async () => {
      const response = await fetch('https://api.countapi.xyz/hit/wheelspin.site/spins');
      const data = await response.json();
      return data.value;
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem('wheelspinCount');
    if (stored) {
      setLocalSpins(parseInt(stored));
    }
  }, []);

  return (
    <div className="text-center space-y-2 mt-8 mb-16">
      <p className="text-lg font-semibold">
        Total Spins by All Users: {isLoading ? '...' : globalSpins?.toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        Your Spins: {localSpins}
      </p>
    </div>
  );
};

export default SpinCounter;