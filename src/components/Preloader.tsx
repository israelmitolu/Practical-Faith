import React, { useEffect, useState } from "react";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-divine-light to-divine-blue">
      <div className="relative">
        <img
          src="/images/Frame.svg"
          alt="Practical Faith"
          className="w-[350px] h-[70px] animate-fade-in"
          style={{
            animation: "fadeIn 1s ease-in-out, scaleIn 1s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};
