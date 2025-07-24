"use client";

import style from "./fade.module.css";

const FadeAnimation = ({
  children,
  duration = 1,
  direction = "in",
}: {
  children: React.ReactNode;
  duration: number;
  direction: "in" | "out";
}) => {
  let fadeClass = null;
  if (direction !== "in" && direction !== "out") {
    direction = "in"; // Default to 'in' if an invalid direction is provided
  }
  if (duration > 2 || duration <= 0) {
    duration = 1; // Default to 1 second if no valid duration is provided
  }
  if (direction === "out") {
    switch (duration) {
      case 2:
        fadeClass = style.fade_out_2s;
        break;
      case 1:
        fadeClass = style.fade_out_1s;
        break;
      case 0.5:
        fadeClass = style.fade_out_05s;
        break;
      default:
        break;
    }
  } else {
    switch (duration) {
      case 2:
        fadeClass = style.fade_in_2s;
        break;
      case 1:
        fadeClass = style.fade_in_1s;
        break;
      case 0.5:
        fadeClass = style.fade_in_05s;
        break;
      default:
        break;
    }
  }
  return (
    <div
      className={`${style.fade} ${style[direction]} ${fadeClass}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
};

export default FadeAnimation;
