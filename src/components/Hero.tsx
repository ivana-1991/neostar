"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { img } from "@/lib/img";
import { useAIChat } from "@/lib/aiChatContext";
import FilterDropdown from "@/components/FilterDropdown";
import {
  CAR_BRANDS,
  CAR_YEARS,
  KM_RANGES,
  PRICE_RANGES,
  MODELS_BY_BRAND,
} from "@/lib/carFilters";

const carTypes = [
  { label: "Gradski", icon: "/images/icon-gradski.png", slug: "gradski" },
  { label: "Monovolumen", icon: "/images/icon-monovolumen.png", slug: "monovolumen" },
  { label: "SUV", icon: "/images/icon-suv.png", slug: "suv" },
  { label: "Kombi", icon: "/images/icon-kombi.png", slug: "kombi" },
  { label: "Obiteljski", icon: "/images/icon-obiteljski.png", slug: "obiteljski" },
  { label: "Novo", icon: "/images/icon-novo.png", slug: "novo" },
  { label: "Električni", icon: "/images/icon-elektricni.png", slug: "elektricni" },
  { label: "Kabriolet", icon: "/images/icon-kabriolet.png", slug: "kabriolet" },
  { label: "Premium", icon: "/images/icon-premium.png", slug: "premium" },
  { label: "Putovanje", icon: "/images/icon-putovanje.png", slug: "putovanje" },
  { label: "Automatik", icon: "/images/icon-automatik.png", slug: "automatik" },
];

const brandOptions = CAR_BRANDS.map((b) => ({ label: b, value: b }));
const yearOptions = CAR_YEARS.map((y) => ({ label: y, value: y }));

export default function Hero() {
  const { open } = useAIChat();
  const router = useRouter();

  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [godiste, setGodiste] = useState("");
  const [km, setKm] = useState("");
  const [cijena, setCijena] = useState("");

  const modelOptions = marka && MODELS_BY_BRAND[marka]
    ? MODELS_BY_BRAND[marka].map((m) => ({ label: m, value: m }))
    : [];

  const handleSearch = (extra?: Record<string, string>) => {
    const params = new URLSearchParams();
    if (marka) params.set("marka", marka);
    if (model) params.set("model", model);
    if (godiste) params.set("godiste", godiste);
    if (km) params.set("km", km);
    if (cijena) params.set("cijena", cijena);
    if (extra) Object.entries(extra).forEach(([k, v]) => params.set(k, v));
    const qs = params.toString();
    router.push(`/vozila${qs ? `?${qs}` : ""}`);
  };

  return (
    <section
      className="pt-[72px] relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #ffffff 0%, #E0F7FF 25%, #B8F0FF 50%, #ECFCFF 75%, #ffffff 100%)",
        backgroundSize: "200% 200%",
        animation: "hero-gradient 14s ease-in-out infinite",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-3 relative">

        {/* Mobile-only hero: centered stacked layout with AI car recommendation card */}
        <div className="md:hidden flex flex-col items-center pt-8 pb-4 gap-5 text-center">
          <h1
            className="font-bold text-black"
            style={{ fontSize: "clamp(26px, 7vw, 32px)", lineHeight: "1.2" }}
          >
            Tvoj auto. Tvoj savjetnik.
          </h1>

          <p className="text-[#212529] text-[14px] leading-[1.55] px-2">
            Pronađi savršen auto. Bez stresa. AI savjetnik koji ti pomaže od izbora modela do najbolje opcije kupnje — dostupan 24/7.
          </p>

          {/* CTA — full width on mobile */}
          <button
            type="button"
            onClick={() => open()}
            className="w-full max-w-sm inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg font-bold text-sm text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
            }}
          >
            Pronađi svoj auto
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* AI recommendation car card (clickable) */}
          <Link
            href="/vozila/fiat-500"
            className="w-full max-w-sm bg-white rounded-2xl p-3.5 flex flex-col gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] text-left mt-2"
            style={{
              border: "1px solid rgba(0,204,255,0.3)",
              animation: "pop-in 0.6s ease-out 0.1s both",
            }}
          >
            {/* AI savjetnik header */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full w-8 h-8 flex-none"
                style={{ backgroundColor: "#F7F7FC" }}
              >
                <img src={img("/images/icon-sparkle.svg")} alt="" className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-[12px] text-[#0F1419]">AI prodajni savjetnik</p>
                <p className="text-[10px] text-[#5F6D7A]">Neostar</p>
              </div>
            </div>

            {/* Car details */}
            <div className="flex gap-3">
              <div className="w-[88px] h-[68px] flex-none rounded-lg overflow-hidden relative">
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{ backgroundColor: "rgba(0,204,255,0.12)" }}
                />
                <img
                  src={img("/images/car-fiat-500.jpg")}
                  alt="FIAT 500"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <p className="text-[14px] font-bold text-[#212529] leading-tight">FIAT 500 1.2</p>
                <p className="text-[11px] text-[#5F6D7A] leading-tight">
                  2016. g. · 55.000 km · Velika Gorica
                </p>
                <div className="flex gap-1 flex-wrap pt-0.5">
                  {["Benzin", "Mehanički", "51 KS"].map((s) => (
                    <span key={s} className="text-[10px] text-[#5F6D7A] bg-[#F7F7FC] px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-1.5 mt-1 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#212529]">9.800 €</span>
                  <span className="text-[10px] text-[#00CCFF] font-bold">od 105 €/mj</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop-only hero: heading left + AI savjetnik chat preview composition right */}
        <div className="hidden md:grid md:grid-cols-2 items-center pt-8 pb-4 gap-6 md:gap-8">

          {/* Heading + description + CTA */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-5 md:gap-6">
            <h1
              className="font-bold text-black text-center md:text-left w-full"
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: "1.15" }}
            >
              Tvoj auto. Tvoj savjetnik.
            </h1>

            <p className="text-[#212529] text-center md:text-left text-base md:text-[17px] leading-[1.55] max-w-[560px]">
              Pronađi savršen auto. Bez stresa. AI savjetnik koji ti pomaže od izbora modela do najbolje opcije kupnje — dostupan 24/7.
            </p>

            {/* Gradient CTA */}
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg font-bold text-sm text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
              }}
            >
              Pronađi svoj auto
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* AI chat preview composition */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[480px] md:max-w-none md:w-[440px] h-[420px] md:h-[470px]">
              {/* Main chat preview card */}
              <button
                type="button"
                onClick={() => open()}
                className="absolute top-0 right-0 md:right-4 w-[88%] md:w-[360px] bg-white rounded-2xl p-5 flex flex-col gap-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-left hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow z-10 opacity-0"
                style={{
                  border: "0.5px solid rgba(0,0,0,0.08)",
                  animation: "pop-in 0.6s ease-out 0s forwards",
                }}
                aria-label="Otvori AI savjetnika"
              >
                {/* Header */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full w-8 h-8 flex-none"
                    style={{ backgroundColor: "#F7F7FC" }}
                  >
                    <img src={img("/images/icon-sparkle.svg")} alt="" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <p className="font-bold text-[13px] text-[#0F1419]">AI prodajni savjetnik</p>
                    <p className="text-[11px] text-[#5F6D7A]">Neostar</p>
                  </div>
                </div>
                {/* Messages — sequentially fade & slide in */}
                <div className="flex flex-col gap-2">
                  <div
                    className="self-start max-w-[90%] opacity-0"
                    style={{ animation: "fade-slide-up 0.5s ease-out 0.2s forwards" }}
                  >
                    <p
                      className="text-[13px] text-black px-3 py-2.5 leading-snug"
                      style={{ backgroundColor: "#F7F7FC", borderRadius: "4px 12px 12px 12px" }}
                    >
                      Bok! 👋 Reci mi kakav auto tražiš — pomoći ću ti pronaći pravi.
                    </p>
                  </div>
                  <div
                    className="self-end max-w-[90%] opacity-0"
                    style={{ animation: "fade-slide-up 0.5s ease-out 1.0s forwards" }}
                  >
                    <p
                      className="text-[13px] px-3 py-2.5 leading-snug"
                      style={{ backgroundColor: "rgba(127,229,255,0.25)", color: "#01A5CE", borderRadius: "12px 12px 4px 12px" }}
                    >
                      Trebam obiteljski auto za grad
                    </p>
                  </div>
                  <div
                    className="self-start max-w-[90%] opacity-0"
                    style={{ animation: "fade-slide-up 0.5s ease-out 1.8s forwards" }}
                  >
                    <p
                      className="text-[13px] text-black px-3 py-2.5 leading-snug"
                      style={{ backgroundColor: "#F7F7FC", borderRadius: "4px 12px 12px 12px" }}
                    >
                      Super! Imam par prijedloga — a poslije ti objasnim i opcije lizinga
                    </p>
                  </div>
                </div>
              </button>

              {/* Floating quick reply chip top-left */}
              <button
                type="button"
                onClick={() => open("Tražim auto - pomozi mi ga pronaći")}
                className="hidden md:flex absolute top-[100px] left-0 items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold text-white hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-20 opacity-0"
                style={{
                  background: "linear-gradient(102deg, #00CCFF 6.85%, #80CEAA 95.45%)",
                  border: "1px solid #7FE5FF",
                  animation:
                    "pop-in 0.6s ease-out 2.4s forwards, float-y 5s ease-in-out 3.0s infinite",
                }}
              >
                Tražim auto - pomozi mi ga pronaći
              </button>

              {/* Floating car card */}
              <Link
                href="/vozila/fiat-500"
                className="absolute bottom-[60px] left-0 md:left-2 w-[280px] bg-white rounded-xl p-2.5 flex gap-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-shadow z-20 opacity-0"
                style={{
                  border: "1px solid rgba(0,204,255,0.3)",
                  animation:
                    "pop-in 0.6s ease-out 2.8s forwards, float-y 6s ease-in-out 3.5s infinite",
                }}
              >
                <div className="w-[70px] h-[60px] flex-none rounded-lg overflow-hidden relative">
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{ backgroundColor: "rgba(0,204,255,0.12)" }}
                  />
                  <img
                    src={img("/images/car-fiat-500.jpg")}
                    alt="FIAT 500"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 justify-center">
                  <p className="text-[12px] font-bold text-[#212529] leading-tight">FIAT 500 1.2</p>
                  <p className="text-[10px] text-[#5F6D7A] leading-tight">
                    2016. g. · 55.000 km
                  </p>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[12px] font-bold text-[#212529]">9.800 €</span>
                    <span className="text-[9px] text-[#00CCFF] font-bold">od 105 €/mj</span>
                  </div>
                </div>
              </Link>

              {/* Floating chip bottom-right */}
              <button
                type="button"
                onClick={() => open("Kako funkcionira lizing?")}
                className="hidden md:flex absolute bottom-0 right-4 items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold text-white hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-20 opacity-0"
                style={{
                  background: "linear-gradient(102deg, #00CCFF 6.85%, #80CEAA 95.45%)",
                  border: "1px solid #7FE5FF",
                  animation:
                    "pop-in 0.6s ease-out 3.2s forwards, float-y 5s ease-in-out 3.8s infinite",
                }}
              >
                Kako funkcionira lizing?
              </button>

              {/* Decorative sparkle avatar circle (gently pulses) */}
              <div
                className="hidden md:flex absolute top-[200px] -left-2 w-[60px] h-[60px] rounded-full bg-white items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-30"
                style={{ animation: "pulse-soft 3.5s ease-in-out infinite" }}
              >
                <img
                  src={img("/images/icon-sparkle.svg")}
                  alt=""
                  className="w-7 h-7"
                  style={{ animation: "rotate-slow 18s linear infinite" }}
                />
              </div>

              {/* Decorative coloured dots */}
              <span
                className="hidden md:block absolute top-[120px] left-[200px] w-3 h-3 rounded-full"
                style={{
                  backgroundColor: "#F29FC0",
                  animation: "pulse-soft 4s ease-in-out 0.4s infinite",
                }}
              />
              <span
                className="hidden md:block absolute top-[260px] right-[-10px] w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: "#9997C1",
                  animation: "pulse-soft 4.5s ease-in-out 1.2s infinite",
                }}
              />
              <span
                className="hidden md:block absolute bottom-[140px] right-[20px] w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: "#80CEAA",
                  animation: "pulse-soft 4s ease-in-out 2.0s infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div
          className="rounded-lg p-3 mb-8"
          style={{ boxShadow: "0px 0px 11px rgba(0,0,0,0.1)" }}
        >
          <div className="flex flex-wrap items-stretch gap-y-2">
            <div className="flex-1 min-w-[150px] px-3">
              <FilterDropdown
                label="Marka"
                value={marka}
                options={brandOptions}
                onChange={(v) => {
                  setMarka(v);
                  setModel("");
                }}
              />
            </div>
            <div className="flex-1 min-w-[150px] px-3">
              <FilterDropdown
                label="Model"
                value={model}
                options={modelOptions}
                onChange={setModel}
                disabled={!marka || modelOptions.length === 0}
                placeholder={marka ? "Svi modeli" : "Prvo odaberi marku"}
              />
            </div>
            <div className="flex-1 min-w-[130px] px-3">
              <FilterDropdown
                label="Godište"
                value={godiste}
                options={yearOptions}
                onChange={setGodiste}
                placeholder="Sva godišta"
              />
            </div>
            <div className="flex-1 min-w-[150px] px-3">
              <FilterDropdown
                label="Kilometraža"
                value={km}
                options={KM_RANGES}
                onChange={setKm}
                placeholder="Sva kilometraža"
              />
            </div>
            <div className="flex-1 min-w-[140px] px-3">
              <FilterDropdown
                label="Cijena"
                value={cijena}
                options={PRICE_RANGES}
                onChange={setCijena}
                placeholder="Sve cijene"
              />
            </div>
            <div className="px-3 flex-none flex items-stretch">
              <button
                type="button"
                onClick={() => handleSearch()}
                className="bg-black text-white font-bold text-sm rounded-lg h-12 px-4 whitespace-nowrap hover:bg-gray-900 transition-colors"
              >
                Pretraži 5885 vozila
              </button>
            </div>
          </div>
        </div>

        {/* Car type icons */}
        <div className="overflow-x-auto pb-6">
          <div className="flex items-start min-w-max">
            {carTypes.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => handleSearch({ tip: c.slug })}
                className="flex flex-col items-center justify-between px-2 pt-4 w-[100px] flex-none hover:opacity-70 transition-opacity"
              >
                <img
                  src={img(c.icon)}
                  alt={c.label}
                  className="w-[100px] h-[56px] object-contain mb-2"
                />
                <span className="text-[11.6px] text-black text-center whitespace-nowrap leading-[18px]">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
