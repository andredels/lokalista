"use client";

import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

export default function Modal({ open, onClose, title, children, className = "", showCloseButton = true }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div role="dialog" aria-modal="true" className={`relative z-10 w-full rounded-lg border border-border/60 bg-background shadow-xl ${className || 'max-w-md p-5'}`}>
        {title && <div className="h2 mb-2">{title}</div>}
        {children}
        {showCloseButton && (
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="h-9 px-4 rounded-md border border-border/60">Close</button>
          </div>
        )}
      </div>
    </div>
  );
} 