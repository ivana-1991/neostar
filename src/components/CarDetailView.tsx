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
  // The dataset only has one photo per car — show it as the main image and
  // reuse it for the thumbnail row so the gallery UI is populated.
  const [selectedImage] = useState(car.image);
  const thumbs = [car.image, car.image, car.image, car.image];

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
          <div className="grid lg:grid-cols-[1fr_360px] gap-6 mb-8">
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
                    className="bg-white rounded-lg overflow-hidden hover:ring-2 hover:ring-[#00CCFF] transition-all"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="aspect-[16/10] relative">
                      <img src={img(src)} alt="" className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: title + pricing card */}
            <aside className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-[28px] font-bold text-black leading-tight">
                {car.name}, {car.year}
              </h1>

              {/* Pricing card */}
              <div
                className="rounded-xl p-5 flex flex-col gap-4"
                style={{
                  background: "linear-gradient(180deg, #00CCFF 0%, #80CEAA 100%)",
                }}
              >
                <div className="flex items-end justify-between text-white">
                  <div>
                    <p className="text-[11px] uppercase opacity-80 mb-1">Cijena</p>
                    <p className="text-3xl font-bold">{car.price}</p>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 text-right">
                    <p className="text-[10px] text-[#5F6D7A] leading-tight">Leasing rata</p>
                    <p className="text-base font-bold text-black leading-tight">{car.monthly}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => open(`Zanima me ${car.name}, ${car.year}`)}
                  className="w-full bg-white text-[#212529] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Pošalji upit
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => open(`Želim probnu vožnju za ${car.name}`)}
                    className="bg-white/30 text-white border border-white/60 font-medium py-2 rounded-lg text-sm hover:bg-white/40 transition-colors"
                  >
                    Probna vožnja
                  </button>
                  <button
                    type="button"
                    onClick={() => open(`Izračunaj leasing za ${car.name}`)}
                    className="bg-white/30 text-white border border-white/60 font-medium py-2 rounded-lg text-sm hover:bg-white/40 transition-colors"
                  >
                    Izračun rate
                  </button>
                </div>
              </div>

              {/* NEOSTAR provjereno badge */}
              <div
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: "#ECFCFF", border: "1px solid #00CCFF" }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full flex-none"
                  style={{ backgroundColor: "#00CCFF" }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-black">NEOSTAR provjereno vozilo</p>
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
