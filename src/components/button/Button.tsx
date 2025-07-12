import type { FormEvent } from "react";

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
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
