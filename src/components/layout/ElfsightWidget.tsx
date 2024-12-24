import React, { useEffect } from 'react';

const ElfsightWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mt-8">
      <div className="elfsight-app-73723ee9-21bd-41c0-8da6-60815bc16dd0" data-elfsight-app-lazy></div>
    </div>
  );
};

export default ElfsightWidget;