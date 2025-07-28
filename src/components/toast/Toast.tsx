import type { JSX } from "react";
import styles from "./toast.module.css";

interface ToastIcon {
  type: "success" | "error" | "info";
  icon: JSX.Element;
}

const icons: Record<ToastIcon["type"], ToastIcon["icon"]> = {
  success: <img src="src/assets/icons/success.svg" alt="Success" />,
  error: <img src="src/assets/icons/error.svg" alt="Error" />,
  info: <img src="src/assets/icons/info.svg" alt="Info" />,
};

export default function Toast({
  message,
  type = "info",
}: {
  message: string;
  type: "success" | "error" | "info";
}) {
  return (
    <div className={`toast ${styles.toast} ${styles[type]}`}>
        <div className={styles.icon}>
            {icons[type]}
        </div>
        <p>{message}</p>
    </div>
  );
}
