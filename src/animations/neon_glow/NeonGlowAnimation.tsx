"use client";

import style from "./neon.module.css";

const NeonGlowAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${style.neon_glow} flex items-center justify-center`}>
      {children}
    </div>
  );
};

export default NeonGlowAnimation;
