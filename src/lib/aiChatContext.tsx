"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Car } from "@/lib/cars";

type OpenArgs = string | { query?: string; car?: Car };

type AIChatContextValue = {
  isOpen: boolean;
  initialQuery: string | undefined;
  initialCar: Car | undefined;
  open: (arg?: OpenArgs) => void;
  close: () => void;
};

const AIChatContext = createContext<AIChatContextValue | null>(null);

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);
  const [initialCar, setInitialCar] = useState<Car | undefined>(undefined);

  const open = useCallback((arg?: OpenArgs) => {
    if (typeof arg === "string") {
      setInitialQuery(arg.trim() || undefined);
      setInitialCar(undefined);
    } else if (arg && typeof arg === "object") {
      setInitialQuery(arg.query?.trim() || undefined);
      setInitialCar(arg.car);
    } else {
      setInitialQuery(undefined);
      setInitialCar(undefined);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // clear shortly after close (lets modal animation finish if any)
    setTimeout(() => {
      setInitialQuery(undefined);
      setInitialCar(undefined);
    }, 200);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <AIChatContext.Provider value={{ isOpen, initialQuery, initialCar, open, close }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("useAIChat must be used inside AIChatProvider");
  return ctx;
}
