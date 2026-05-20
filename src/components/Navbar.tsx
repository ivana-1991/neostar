"use client";

import { useState } from "react";
import { img } from "@/lib/img";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-3 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex-none">
          <img src={img("/images/neostar-logo.svg")} alt="NEOSTAR" className="h-5 w-auto" />
        </a>

        {/* Desktop: center nav + right actions */}
        <div className="hidden lg:flex flex-1 items-center min-w-0">
          <div className="flex flex-1 items-center justify-center">
            <a href="#" className="px-2 py-3 text-[14px] text-black hover:opacity-70 transition-opacity whitespace-nowrap">
              Vozila
            </a>
            <a href="#" className="px-2 py-3 text-[14px] text-black hover:opacity-70 transition-opacity whitespace-nowrap">
              Servis i gume
            </a>

            {/* AI search bar */}
            <div className="relative mx-2.5 w-[450px] flex-none">
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-lg border text-[13px] text-[#333] cursor-text"
                style={{ backgroundColor: "#ECFCFF", borderColor: "#00CCFF" }}
              >
                <svg className="w-5 h-5 flex-none text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
                </svg>
                <span>Pitaj me ...</span>
              </div>
              <div
                className="absolute -top-2 right-0.5 px-1 py-0.5 rounded flex items-center justify-center"
                style={{ backgroundColor: "#ECFCFF" }}
              >
                <svg className="w-5 h-5 text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-none">
            <a href="#" className="border border-black rounded-lg px-[17px] py-[3px] text-base font-medium text-black hover:bg-gray-50 transition-colors whitespace-nowrap">
              Prodaj
            </a>
            <div className="flex items-center px-5 cursor-pointer">
              <span className="text-base font-medium text-[#222]">HR</span>
              <div className="ml-1.5 w-0 h-0" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #222" }} />
            </div>
          </div>
        </div>

        {/* Desktop: user icon */}
        <div
          className="hidden lg:flex items-center justify-center rounded-[4px] px-1 py-[3px]"
          style={{ backgroundColor: "#ECFCFF" }}
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {/* Mobile: user + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <button onClick={() => setOpen(!open)} className="p-1" aria-label="Menu">
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-5 flex flex-col gap-4">
          {/* AI search bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[13px] text-[#333] cursor-text"
            style={{ backgroundColor: "#ECFCFF", borderColor: "#00CCFF" }}
          >
            <svg className="w-5 h-5 flex-none text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
            </svg>
            <span>Pitaj me ...</span>
          </div>

          {/* Nav links */}
          <a href="#" onClick={() => setOpen(false)} className="text-base font-medium text-black py-2 border-b border-gray-100">
            Vozila
          </a>
          <a href="#" onClick={() => setOpen(false)} className="text-base font-medium text-black py-2 border-b border-gray-100">
            Servis i gume
          </a>

          {/* Bottom row: Prodaj + HR */}
          <div className="flex items-center justify-between pt-1">
            <a href="#" className="border border-black rounded-lg px-5 py-2 text-sm font-medium text-black">
              Prodaj
            </a>
            <div className="flex items-center gap-1 text-sm font-medium text-[#222] cursor-pointer">
              <span>HR</span>
              <div className="w-0 h-0 ml-1" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #222" }} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
