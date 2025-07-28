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
    <div className="flex items-center" style={{ position: "relative", marginBottom: "40px" }}>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        pattern=".*\S.*"
        className={`col-auto ${style.input}`}
      />
      <label className={`col-auto ${style.label}`}>
        {label}
      </label>
      {type === "password" && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className={`col-auto ${style.toggle}`}
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
