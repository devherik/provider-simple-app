"use client";

import style from "./enter.module.css";

const EnterAnimation = ({ children, duration }: { children: React.ReactNode, duration: number }) => {
    
  let fade_in = null;
  switch (duration) {
    case 2:
        fade_in = style.fade_in_2s;
        break;
    case 1:
        fade_in = style.fade_in_1s;
        break;
    case 0.5:
        fade_in = style.fade_in_05s;
        break;
    default:
        break;
  }
  
    return (
    <div className={`${fade_in} flex items-center justify-center`}>
      {children}
    </div>
  );
};

export default EnterAnimation;
