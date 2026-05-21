"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { img } from "@/lib/img";
import { useAIChat } from "@/lib/aiChatContext";
import type { Car } from "@/lib/cars";

type Props = {
  car: Car;
  related: Car[];
};

// ──────────────────────────────────────────────────────────────────
// Spec icons
// ──────────────────────────────────────────────────────────────────

const ICON_CLS = "w-5 h-5 text-[#00CCFF] flex-none";

const Icons = {
  location: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z" />
      <circle cx="12" cy="9" r="3" />
    </svg>
  ),
  year: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  km: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2a10 10 0 0 0-10 10v3h20v-3A10 10 0 0 0 12 2z" />
      <path d="M12 15l4-6" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  fuel: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M4 21h10M14 9h2a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2v0" />
    </svg>
  ),
  power: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
  transmission: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="6" cy="12" r="2" />
      <path d="M6 14v4M6 10V6M12 8v8M18 8v8M18 6h-6M18 18h-6" />
    </svg>
  ),
  registered: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 13h6M9 17h4" />
    </svg>
  ),
  doors: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 21V5a2 2 0 0 1 2-2h7l5 5v13" />
      <circle cx="15" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  seats: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  co2: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 12c2-3 5-5 9-5s7 2 9 5c-2 3-5 5-9 5s-7-2-9-5z" />
      <path d="M9 12c.5 1 2 2 3 2s2.5-1 3-2" />
    </svg>
  ),
  euro: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14 9.5c-.5-.5-1.2-.8-2-.8-2 0-3.5 1.5-3.5 3.3s1.5 3.3 3.5 3.3c.8 0 1.5-.3 2-.8M7 11h5M7 13h5" />
    </svg>
  ),
  color: (
    <svg className={ICON_CLS} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 22a10 10 0 0 0 10-10c0-4.5-3.5-8-8-8a4 4 0 0 0-4 4c0 1 .5 2 1 2.5s-.5 1-2.5 1c-3 0-4.5 2-4.5 4 0 4 4 6.5 8 6.5z" />
    </svg>
  ),
};

function SpecItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="pt-0.5">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] text-[#5F6D7A]">{label}</span>
        <span className="text-sm font-bold text-black">{value}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────

function formatPrice(price: string) {
  // "13.900 €" → "13.900,00 €"
  return price.replace(/\s?€$/, ",00 €");
}

function deriveSpecs(car: Car) {
  // Derive Croatian-style display values, filling in plausible defaults
  // for fields we don't track in the mock data.
  const ksMatch = car.power.match(/(\d+)/);
  const ks = ksMatch ? parseInt(ksMatch[1], 10) : 0;
  const kw = Math.round(ks / 1.36);

  const yearNum = parseInt(car.year, 10) || 2020;
  const regYear = yearNum + 1;

  return {
    registeredUntil: `01.10.${regYear}.`,
    doors: "5",
    seats: "5",
    co2: car.fuel === "Dizel" ? "120 g/km" : "135 g/km",
    euro: "6",
    color: "Crna",
    powerCombined: ks ? `${kw} KW / ${ks} KS` : car.power,
  };
}

function calcAlternateMonthly(price: string) {
  // Derive a small "info" alternate rate (price / 65 months at ~3%).
  const num = parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
  const rate = Math.round((num / 65) * 100) / 100;
  return `${rate.toFixed(2).replace(".", ",")} €/mj`;
}

// ──────────────────────────────────────────────────────────────────
// Main view
// ──────────────────────────────────────────────────────────────────

export default function CarDetailView({ car, related }: Props) {
  const { open } = useAIChat();
  const [selectedImage, setSelectedImage] = useState(car.image);
  const thumbs = [car.image, car.image, car.image, car.image];

  // Split "FIAT 500 1.2" → mainName "FIAT 500" + variant "1.2"
  const variantMatch = car.name.match(/^(.+?)(\s\d+\.\d.*)?$/);
  const mainName = variantMatch?.[1] || car.name;
  const variant = variantMatch?.[2]?.trim() || "";

  const specs = deriveSpecs(car);

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-white">
        <div className="max-w-[1320px] mx-auto px-3 py-6">
          {/* Breadcrumbs */}
          <nav className="text-[13px] text-[#5F6D7A] mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#01A5CE] hover:underline">
              Početna
            </Link>
            <span>›</span>
            <Link href="/vozila" className="hover:text-[#01A5CE] hover:underline">
              Vozila
            </Link>
            <span>›</span>
            <span className="text-black font-medium">{car.name}</span>
          </nav>

          {/* Main: gallery + summary */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-6 mb-6">

            {/* Left: image gallery */}
            <div>
              <div className="bg-[#F7F7FC] rounded-xl overflow-hidden relative">
                <div className="aspect-[16/10] relative">
                  <img
                    src={img(selectedImage)}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Top-right seat icon overlay */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-[#212529]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="7" r="3" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  {/* Bottom-left ID overlay */}
                  <div className="absolute bottom-3 left-3 text-[11px] text-[#5F6D7A] bg-white/80 px-2 py-1 rounded">
                    ID: {car.id.toUpperCase().replace(/-/g, "")}
                  </div>
                  {/* Bottom-center icons */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    <button type="button" className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-[#212529]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                    <button type="button" className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-[#212529]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    </button>
                  </div>
                  {/* Bottom-right 360 indicator */}
                  <div className="absolute bottom-3 right-3 text-[11px] text-[#5F6D7A] bg-white/80 px-2 py-1 rounded flex items-center gap-1">
                    360
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 12a9 9 0 0 1 9-9c4 0 7 3 7 6M21 6v4h-4" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Thumbnail row */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className={`bg-[#F7F7FC] rounded-lg overflow-hidden hover:ring-2 hover:ring-[#00CCFF] transition-all ${
                      src === selectedImage && i === 0 ? "ring-2 ring-[#00CCFF]" : ""
                    }`}
                  >
                    <div className="aspect-[16/10] relative">
                      <img src={img(src)} alt="" className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: title + pricing summary
                On mobile: plain stacked, no card background.
                On lg+: cyan card. */}
            <aside className="flex flex-col gap-4 lg:rounded-xl lg:p-5 lg:bg-[#ECFCFF]">
              {/* Title row with heart + share */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl md:text-[22px] font-bold text-black leading-tight">
                    {mainName}, {car.year}
                  </h1>
                  {variant && (
                    <p className="text-sm text-[#5F6D7A] mt-1">{variant}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-none">
                  <button type="button" aria-label="Spremi" className="w-8 h-8 flex items-center justify-center text-[#5F6D7A] hover:text-[#01A5CE]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Podijeli" className="w-8 h-8 flex items-center justify-center text-[#5F6D7A] hover:text-[#01A5CE]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Cash price */}
              <div>
                <p className="text-[26px] font-bold text-black leading-none">
                  {formatPrice(car.price)}
                </p>
                <p className="text-[13px] text-[#5F6D7A] mt-1.5 flex items-center gap-1">
                  {calcAlternateMonthly(car.price)}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </p>
              </div>

              {/* Leasing savings card — cyan-to-mint gradient */}
              <div
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{
                  background: "linear-gradient(180deg, #B8F0FF 0%, #BFEDD8 100%)",
                }}
              >
                <div>
                  <p className="text-[12px] text-[#5F6D7A] mb-1">Štedi više od</p>
                  <p className="text-3xl font-bold text-black leading-none">
                    {car.monthly.replace("od ", "").replace("/mj", "")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => open({ car, query: `Detaljnije o ${car.name}, ${car.year}` })}
                  className="w-full bg-white rounded-lg py-2.5 text-[14px] font-bold text-[#212529] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <img src={img("/images/icon-sparkle.svg")} alt="" className="w-4 h-4" />
                  Pitaj AI savjetnika
                </button>
              </div>

              {/* Action buttons row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => open(`Kontakt za ${car.name}`)}
                  className="bg-white border border-gray-300 rounded-lg py-2.5 text-sm font-semibold text-[#212529] hover:bg-gray-50 transition-colors"
                >
                  Kontakt
                </button>
                <button
                  type="button"
                  onClick={() => open(`Zanima me ${car.name}`)}
                  className="bg-black text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  Zanima me
                </button>
              </div>
            </aside>
          </div>

          {/* Specs row — 12 items in 6 cols */}
          <div className="bg-white rounded-xl py-5 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5">
              <SpecItem label="Lokacija" value={car.location} icon={Icons.location} />
              <SpecItem label="Godište" value={car.year.replace(/\.?\s?g\.?$/, "").trim()} icon={Icons.year} />
              <SpecItem label="Kilometraža" value={car.km} icon={Icons.km} />
              <SpecItem label="Vrsta goriva" value={car.fuel} icon={Icons.fuel} />
              <SpecItem label="Snaga motora" value={specs.powerCombined} icon={Icons.power} />
              <SpecItem label="Vrsta mjenjača" value={car.transmission} icon={Icons.transmission} />
              <SpecItem label="Registriran do" value={specs.registeredUntil} icon={Icons.registered} />
              <SpecItem label="Broj vrata" value={specs.doors} icon={Icons.doors} />
              <SpecItem label="Broj sjedala" value={specs.seats} icon={Icons.seats} />
              <SpecItem label="CO2" value={specs.co2} icon={Icons.co2} />
              <SpecItem label="Euro norma" value={specs.euro} icon={Icons.euro} />
              <SpecItem label="Boja" value={specs.color} icon={Icons.color} />
            </div>
          </div>

          {/* Description / Highlights */}
          <div className="bg-white rounded-xl p-5 mb-6" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="text-lg font-bold text-black mb-3">Opis vozila</h2>
            <p className="text-sm text-[#212529] leading-relaxed mb-4">
              Vozilo {car.name} iz {car.year.replace(" g.", "")} godine, registrirano i u izvrsnom stanju.
              Servisno održavano kod ovlaštenog servisa, prvi vlasnik, bez šteta. Prošlo je naš detaljan
              pregled u 59 točaka i dolazi s 12 mjeseci NEOSTAR jamstva.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Pregled u 59 točaka",
                "12 mjeseci jamstva",
                "Servisna knjižica",
                "Prvi vlasnik",
                "Klima uređaj",
                "Tempomat",
                "ABS · ESP · 6 airbaga",
                "Električni podizači",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-[#212529]">
                  <svg className="w-4 h-4 text-[#80CEAA] flex-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Related cars */}
          {related.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-black mb-4">
                Slična vozila {car.brand}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rc) => (
                  <Link
                    key={rc.id}
                    href={`/vozila/${rc.id}`}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
                      <img src={img(rc.image)} alt={rc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1 flex flex-col gap-1.5">
                      <h3 className="text-[15px] font-bold text-black">{rc.name}</h3>
                      <p className="text-[11px] text-[#5F6D7A]">
                        {rc.year} · {rc.km} · {rc.location}
                      </p>
                      <div className="flex gap-1 flex-wrap pt-1">
                        {[rc.fuel, rc.transmission, rc.power].map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] text-[#5F6D7A] bg-[#F7F7FC] px-1.5 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-2 mt-auto flex items-center justify-between">
                        <span className="text-base font-bold text-black">{rc.price}</span>
                        <span className="text-[10px] text-[#00CCFF] font-bold">{rc.monthly}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
