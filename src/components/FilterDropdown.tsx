"use client";

import { useEffect, useRef, useState } from "react";

export type FilterOption = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder || label;
  const hasValue = !!value;

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-[22px] py-[15px] rounded-[5px] text-left disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#ECFCFF" }}
      >
        <span
          className={`text-sm truncate pr-2 ${
            hasValue ? "text-[#222] font-medium" : "text-[#222]"
          }`}
        >
          {selectedLabel}
        </span>
        <svg
          className={`w-4 h-4 text-[#222] flex-none transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-[5px] shadow-lg border border-gray-100 max-h-[280px] overflow-y-auto">
          {hasValue && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#5F6D7A] hover:bg-[#ECFCFF] border-b border-gray-100"
            >
              ✕ Sve {label.toLowerCase()}
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#ECFCFF] transition-colors ${
                value === opt.value ? "bg-[#ECFCFF] font-medium text-[#01A5CE]" : "text-[#222]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
