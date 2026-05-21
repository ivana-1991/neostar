"use client";

import { useAIChat } from "@/lib/aiChatContext";
import { img } from "@/lib/img";

const SUGGESTIONS = [
  {
    text: "Tražim auto - pomozi mi ga pronaći",
    borderColor: "#00CCFF",
    textColor: "#01A5CE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 17h-2v-6l2-5h13l2 5v6h-2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 11h14" />
      </svg>
    ),
  },
  {
    text: "Kako funkcionira lizing?",
    borderColor: "#7FE5C0",
    textColor: "#74B999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 8h2M8 12h8M8 16h6" />
        <path d="M14 6l2 2 4-4" />
      </svg>
    ),
  },
  {
    text: "Pokaži mi aktualne akcije",
    borderColor: "#FFD292",
    textColor: "#E9941B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
];

export default function AIChatModal() {
  const { isOpen, close } = useAIChat();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-[750px] max-h-[85vh] md:max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 flex-none"
          style={{ backgroundColor: "#00CCFF" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center rounded-full w-8 h-8 flex-none"
              style={{ backgroundColor: "#F7F7FC" }}
            >
              <img
                src={img("/images/icon-sparkle.svg")}
                alt=""
                className="w-5 h-5"
              />
            </div>
            <p className="font-bold text-[15px] md:text-base text-white leading-6">
              AI prodajni savjetnik
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Zatvori"
            className="flex items-center justify-center w-8 h-8 rounded-full text-white hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 bg-white">
          {/* Welcome message bubble */}
          <div
            className="self-start max-w-[88%] px-3 py-3"
            style={{
              backgroundColor: "#F7F7FC",
              borderRadius: "4px 12px 12px 12px",
            }}
          >
            <p className="text-[14px] text-[#212529] leading-[1.5]">
              Bok! 👋 Ja sam Neostarov AI prodajni savjetnik.
            </p>
            <p className="text-[14px] text-[#212529] leading-[1.5] mt-2">
              Pomažem ti pronaći idealan auto i objasnim ti sve o lizingu i kreditu.
            </p>
          </div>

          {/* Subtitle */}
          <p className="font-bold text-[13.3px] text-black pt-2">
            Evo s čime mogu pomoći:
          </p>

          {/* Suggestion buttons */}
          <div className="flex flex-col gap-2.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.text}
                className="flex items-center gap-3 px-3.5 md:px-4 py-3 md:py-3.5 bg-white rounded-xl border hover:bg-gray-50 transition-colors text-left"
                style={{ borderColor: s.borderColor, color: s.textColor }}
              >
                <span className="flex-none" style={{ color: s.textColor }}>
                  {s.icon}
                </span>
                <span className="flex-1 text-[13.5px] md:text-[14px] font-medium" style={{ color: s.textColor }}>
                  {s.text}
                </span>
                <span className="hidden md:inline-block flex-none text-[18px] leading-none" style={{ color: s.textColor }}>
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer – input */}
        <div className="flex-none p-3 md:p-4 border-t border-gray-100 bg-white">
          <div className="relative flex items-center bg-[#F7F7FC] rounded-full pl-4 md:pl-5 pr-1.5 py-1.5">
            <input
              type="text"
              placeholder="Napiši poruku..."
              className="flex-1 bg-transparent outline-none text-[14px] text-[#212529] placeholder-[#5F6D7A] py-2"
            />
            <button
              aria-label="Pošalji"
              className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full flex-none hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#00CCFF" }}
            >
              {/* Arrow up icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
