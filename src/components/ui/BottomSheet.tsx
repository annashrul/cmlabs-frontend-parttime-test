"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export default function BottomSheet({ open, onClose, title, children, scrollRef }: BottomSheetProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = scrollRef || internalRef;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${
        open ? "visible" : "invisible pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[75vh] flex flex-col rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="shrink-0 px-4 pt-3 pb-2">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={ref} className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
