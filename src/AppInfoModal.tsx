import { useCallback, useEffect, useRef, useState } from "react";

type AppInfoModalProps = {
  show: boolean;
  onClose: (value: false) => void;
}

const exitAnimationDuration = 200;

export default function AppInfoModal({ show, onClose }: AppInfoModalProps) {
  // Show state for exit animation
  const [isShowing, setIsShowing] = useState(show);
  const timeoutRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleClose]);

  // Animation
  useEffect(() => {
    if (show) {
      setIsShowing(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setIsShowing(false);
      }, exitAnimationDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [show])

  if (!isShowing) {
    return null;
  }

  return (
    <div className={`modal-container ${show ? "appear" : "disappear"}`}>
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="modal">
        <div className="modal-content">
          <h2>QuickMemo</h2>
          <p>
            A simple memo app built with React and localStorage.
          </p>
          <p>
            using <a href="https://www.jetbrains.com/lp/mono/" target="_blank">JetBrains Mono</a> font.
          </p>
        </div>
        <button className="modal-close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}
