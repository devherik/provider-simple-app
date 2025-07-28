export default function Toast({
  message,
  type = "info",
}: {
  message: string;
  type: "success" | "error" | "info";
}) {
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
}
