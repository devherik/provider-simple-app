"use client";

import style from "./enter.module.css";

const EnterAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${style.fade_in} flex items-center justify-center`}>
      {children}
    </div>
  );
};

export default EnterAnimation;
