import React, { useEffect, useState } from "react";


export const HomesShimmer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="shimmer-container">
      <h2 className="shimmer-title">Waking up the server 😴</h2>

      <p className="shimmer-subtitle">
        Free server takes some time. Please wait...
      </p>

      <div className="countdown">{seconds}s</div>

      <div className="shimmer-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="shimmer-card" />
        ))}
      </div>
    </div>
  );
};
