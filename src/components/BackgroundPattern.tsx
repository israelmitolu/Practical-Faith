
import React from "react";

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        aria-hidden="true"
      />
    </div>
  );
};
