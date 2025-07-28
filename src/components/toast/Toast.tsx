import styles from "./toast.module.css";

export default function Toast({
  message,
  type = "info",
}: {
  message: string;
  type: "success" | "error" | "info";
}) {
  return (
    <div className={`toast ${styles.toast} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
}
