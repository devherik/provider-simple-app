"use client";

import style from "./form.module.css";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "40px" }}>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        pattern=".*\S.*"
        className={style.input}
      />
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      {type === "password" && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className={style.toggle}
        >
          {showPassword ? (
            <img src="src/assets/icons/eye-off.svg" alt="Hide password" />
          ) : (
            <img src="src/assets/icons/eye.svg" alt="Show password" />
          )}
        </span>
      )}
    </div>
  );
}
