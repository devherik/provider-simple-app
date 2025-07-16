"use client";

import style from "./form.module.css";

export default function Form({
  onChange,
  value,
  id,
  type,
  label,
}: {
  onChange: (value: string) => void;
  value: string;
  id: string;
  type: string;
  label: string;
}) {
  return (
    <div style={{ position: "relative", marginBottom: "40px" }}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={style.input}
        //placeholder={`Enter any ${label.toLowerCase()}`}
      />
      <label
        className={style.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
