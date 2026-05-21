"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <section className="bg-white pt-[72px]">
      <div className="max-w-[1320px] mx-auto px-3">

        {/* Top: heading left + illustration right (desktop) / image top + heading bottom (mobile) */}
        <div className="grid md:grid-cols-2 items-center pt-8 pb-4 gap-4">

          {/* Heading + CTA — below image on mobile, left on desktop */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-8">
            <h1
              className="font-bold text-black text-center md:text-left w-full"
              style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: "1.2" }}
            >
              Auto u prvom planu.<br />
              Ti u centru pažnje.
            </h1>

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

          {/* Showroom illustration — top on mobile, right on desktop */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={img("/images/hero-showroom.png")}
              alt="Neostar showroom"
              className="w-full max-w-[552px] object-contain"
            />
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
