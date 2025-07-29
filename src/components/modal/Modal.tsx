"use client";

import { useEffect, useRef } from "react";
import styles from "./modal.module.css";

type PositionTypes =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

/** * Modal component that displays content in a modal dialog.
 * @param {boolean} isOpen - Indicates if the modal is open.
 * @param {function} onClose - Function to call when the modal should be closed.
 * @param {PositionTypes} position - Position of the modal on the screen (top-left, top-right, bottom-left, bottom-right, center).
 * @param {React.ReactNode} children - Content to display inside the modal.
 * @param {boolean} isBluer - If true, applies a blur effect to the background.
 * @returns {JSX.Element|null} - Returns the modal JSX or null if not open.
 */
export default function Modal({
  isOpen,
  onClose,
  position = "center",
  children,
  isBluer = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  position?: PositionTypes;
  children: React.ReactNode;
  isBluer?: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "inset-0 flex items-center justify-center",
  };
  const positionClass = positionClasses[position!] || "center";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // Restore scrolling when modal is closed
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center ${
        isBluer ? styles.blur : ""
      }`}
    >
      <div
        ref={modalRef}
        className={`absolute z-50 ${positionClass} ${styles.modal}`}
      >
        {children}
      </div>
    </div>
  );
}
