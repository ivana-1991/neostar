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

function SpecIcon({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
      <span className="text-[#01A5CE] flex-none">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[11px] text-[#5F6D7A] leading-tight">{label}</span>
        <span className="text-sm font-bold text-black leading-tight">{value}</span>
      </div>
    </div>
  );
}

export default function CarDetailView({ car, related }: Props) {
  const { open } = useAIChat();
  const [selectedImage, setSelectedImage] = useState(car.image);
  // Only one photo per car in our dataset — repeat it for the thumb strip.
  const thumbs = [car.image, car.image, car.image, car.image];

  // Split "FIAT 500 1.2" → mainName "FIAT 500" + variant "1.2"
  // Variant starts with a decimal engine size like 1.2, 2.0, 1.6 (with a dot)
  const variantMatch = car.name.match(/^(.+?)(\s\d+\.\d.*)?$/);
  const mainName = (variantMatch?.[1] || car.name).toUpperCase();
  const variant = variantMatch?.[2]?.trim() || "";

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#FAFBFC]">
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
          <div className="grid lg:grid-cols-[1fr_380px] gap-6 mb-8">
            {/* Left: image gallery */}
            <div>
              <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="aspect-[16/10] bg-gray-50 relative">
                  <img
                    src={img(selectedImage)}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Thumbnail row */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className={`bg-white rounded-lg overflow-hidden hover:ring-2 hover:ring-[#00CCFF] transition-all ${
                      src === selectedImage ? "ring-2 ring-[#00CCFF]" : ""
                    }`}
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="aspect-[16/10] relative">
                      <img src={img(src)} alt="" className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: title + pricing summary */}
            <aside className="flex flex-col gap-5">
              {/* Title block */}
              <div>
                <h1 className="text-2xl md:text-[26px] font-bold text-black leading-tight">
                  {mainName}, {car.year}
                </h1>
                {variant && (
                  <p className="text-sm text-[#5F6D7A] mt-1">{variant}</p>
                )}
              </div>

              {/* Price (cash) */}
              <div>
                <p className="text-3xl font-bold text-black leading-none">
                  {car.price.replace(" €", ",00 €")}
                </p>
                <p className="text-[12px] text-[#5F6D7A] mt-1.5">
                  ({car.monthly.replace("od ", "")})
                </p>
              </div>

              {/* Leasing pricing card */}
              <div
                className="rounded-xl p-5 flex flex-col gap-4"
                style={{ backgroundColor: "#ECFCFF", border: "1px solid #B8F0FF" }}
              >
                <div>
                  <p className="text-[12px] text-[#5F6D7A] mb-1">Cijena s leasingom</p>
                  <p className="text-[32px] font-bold text-black leading-none">
                    {car.monthly.replace("od ", "").replace("/mj", "")}
                    <span className="text-base font-normal text-[#5F6D7A] ml-1">/mj</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => open(`Zanima me ${car.name}, ${car.year}`)}
                  className="w-full bg-white text-[#212529] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ border: "1.5px solid #80CEAA" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#80CEAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Pošalji upit
                  </span>
                </button>
              </div>

              {/* Secondary action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => open(`Kontakt za ${car.name}`)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-[#212529] hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kontakt
                </button>
                <a
                  href="tel:+38512345678"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-[#212529] hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.95-.45l2.8.7A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C10.163 22 2 13.837 2 4V3z" />
                  </svg>
                  Zovni nas
                </a>
              </div>

              {/* NEOSTAR provjereno badge */}
              <div
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "#ECFCFF", border: "1px solid #00CCFF" }}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full flex-none"
                  style={{ backgroundColor: "#00CCFF" }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-black">NEOSTAR provjereno vozilo</p>
                  <p className="text-[11px] text-[#5F6D7A]">Pregled u 59 točaka · 12 mj jamstvo</p>
                </div>
              </div>
            </aside>
          </div>

          {/* Specs row */}
          <div className="bg-white rounded-xl p-5 mb-6" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="text-lg font-bold text-black mb-4">Osnovne karakteristike</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <SpecIcon
                label="Godište"
                value={car.year.replace(" g.", "")}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 11h18" />
                  </svg>
                }
              />
              <SpecIcon
                label="Kilometraža"
                value={car.km}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                }
              />
              <SpecIcon
                label="Gorivo"
                value={car.fuel}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
                    <path d="M4 21h10M14 9h2a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2v0" />
                  </svg>
                }
              />
              <SpecIcon
                label="Mjenjač"
                value={car.transmission}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="6" cy="12" r="2" />
                    <path d="M6 14v4M6 10V6M12 8v8M18 8v8M18 6h-6M18 18h-6" />
                  </svg>
                }
              />
              <SpecIcon
                label="Snaga"
                value={car.power}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                  </svg>
                }
              />
              <SpecIcon
                label="Lokacija"
                value={car.location}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z" />
                    <circle cx="12" cy="9" r="3" />
                  </svg>
                }
              />
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
