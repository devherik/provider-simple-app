import type { FormEvent } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (event: FormEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
    >
      {children}
    </button>
  );
}
