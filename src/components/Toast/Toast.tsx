"use client";
import React, { useEffect, useState } from "react";
import styles from "./Toast.module.scss";
import { CheckCircle, XCircle, X, Loader2 } from "lucide-react";

interface ToastProps {
  type: "success" | "error" | "loading";
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (isVisible && type !== "loading") {
      setIsHiding(false);
      const timer = setTimeout(() => {
        setIsHiding(true);
        // Wait for exit animation to complete before calling onClose
        setTimeout(() => {
          onClose();
        }, 500); // Match the CSS transition duration
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose, type]);

  const handleClose = () => {
    if (type === "loading") return; // Prevent closing loading toasts
    setIsHiding(true);
    // Wait for exit animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 500); // Match the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${styles.show} ${
        isHiding ? styles.hiding : ""
      }`}
    >
      <div className={styles.toastContent}>
        <div className={styles.icon}>
          {type === "success" ? (
            <CheckCircle size={24} />
          ) : type === "error" ? (
            <XCircle size={24} />
          ) : (
            <Loader2 size={24} className={styles.spinner} />
          )}
        </div>
        <div className={styles.message}>
          <h4 className={styles.title}>
            {type === "success"
              ? "Success!"
              : type === "error"
              ? "Error"
              : "Loading..."}
          </h4>
          <p className={styles.text}>{message}</p>
        </div>
        {type !== "loading" && (
          <button className={styles.closeButton} onClick={handleClose}>
            <X size={18} />
          </button>
        )}
      </div>
      {type !== "loading" && <div className={styles.progressBar}></div>}
    </div>
  );
};

export default Toast;
