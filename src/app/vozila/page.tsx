"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterDropdown from "@/components/FilterDropdown";
import SearchBrowse from "@/components/SearchBrowse";
import AIBanner from "@/components/AIBanner";
import { img } from "@/lib/img";
import { useAIChat } from "@/lib/aiChatContext";
import {
  CAR_BRANDS,
  CAR_YEARS,
  KM_RANGES,
  PRICE_RANGES,
  MODELS_BY_BRAND,
} from "@/lib/carFilters";
import { ALL_CARS } from "@/lib/cars";

const brandOptions = CAR_BRANDS.map((b) => ({ label: b, value: b }));
const yearOptions = CAR_YEARS.map((y) => ({ label: y, value: y }));

const SORT_OPTIONS = [
  { label: "Najnoviji", value: "newest" },
  { label: "Najjeftiniji", value: "price-asc" },
  { label: "Najskuplji", value: "price-desc" },
  { label: "Najmanje km", value: "km-asc" },
];

const PAGE_SIZE = 12;

const num = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10) || 0;

function VozilaContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const { open: openChat } = useAIChat();

  const [marka, setMarka] = useState(sp.get("marka") || "");
  const [model, setModel] = useState(sp.get("model") || "");
  const [godiste, setGodiste] = useState(sp.get("godiste") || "");
  const [km, setKm] = useState(sp.get("km") || "");
  const [cijena, setCijena] = useState(sp.get("cijena") || "");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const modelOptions = marka && MODELS_BY_BRAND[marka]
    ? MODELS_BY_BRAND[marka].map((m) => ({ label: m, value: m }))
    : [];

  // Apply filters then sort
  const filteredCars = useMemo(() => {
    const filtered = ALL_CARS.filter((c) => {
      if (marka && c.brand !== marka) return false;
      if (model && !c.name.toLowerCase().includes(model.toLowerCase())) return false;
      if (godiste && !c.year.startsWith(godiste)) return false;
      if (km) {
        const max = parseInt(km, 10);
        const kmNum = num(c.km);
        if (max === 200001 ? kmNum < 200000 : kmNum > max) return false;
      }
      if (cijena) {
        const max = parseInt(cijena, 10);
        const priceNum = num(c.price);
        if (max === 50001 ? priceNum < 50000 : priceNum > max) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => num(a.price) - num(b.price));
    else if (sort === "price-desc") sorted.sort((a, b) => num(b.price) - num(a.price));
    else if (sort === "km-asc") sorted.sort((a, b) => num(a.km) - num(b.km));
    else sorted.sort((a, b) => num(b.year) - num(a.year));
    return sorted;
  }, [marka, model, godiste, km, cijena, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visibleCars = filteredCars.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const updateUrl = (next: Record<string, string>) => {
    const params = new URLSearchParams();
    const all = { marka, model, godiste, km, cijena, ...next };
    Object.entries(all).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    router.replace(`/vozila${qs ? `?${qs}` : ""}`, { scroll: false });
    setPage(1);
  };

  const reset = () => {
    setMarka("");
    setModel("");
    setGodiste("");
    setKm("");
    setCijena("");
    setPage(1);
    router.replace("/vozila", { scroll: false });
  };

  const hasAnyFilter = !!(marka || model || godiste || km || cijena);

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#FAFBFC]">
        <div className="max-w-[1320px] mx-auto px-3 py-8">
          {/* Hero/intro */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-[40px] font-bold text-black mb-3 leading-tight">
              Prodaja automobila s jamstvom
              <br />
              <span className="text-[#01A5CE]">Novi ili rabljeni</span> - ti biraš!
            </h1>
            <button
              type="button"
              onClick={() => openChat()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
              }}
            >
              Pomoć AI savjetnika
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Filter bar */}
          <div
            className="bg-white rounded-lg p-3 mb-6"
            style={{ boxShadow: "0px 0px 11px rgba(0,0,0,0.08)" }}
          >
            <div className="flex flex-wrap items-stretch gap-y-2">
              <div className="flex-1 min-w-[150px] px-2">
                <FilterDropdown
                  label="Marka"
                  value={marka}
                  options={brandOptions}
                  onChange={(v) => {
                    setMarka(v);
                    setModel("");
                    updateUrl({ marka: v, model: "" });
                  }}
                />
              </div>
              <div className="flex-1 min-w-[150px] px-2">
                <FilterDropdown
                  label="Model"
                  value={model}
                  options={modelOptions}
                  onChange={(v) => {
                    setModel(v);
                    updateUrl({ model: v });
                  }}
                  disabled={!marka || modelOptions.length === 0}
                  placeholder={marka ? "Svi modeli" : "Prvo odaberi marku"}
                />
              </div>
              <div className="flex-1 min-w-[130px] px-2">
                <FilterDropdown
                  label="Godište"
                  value={godiste}
                  options={yearOptions}
                  onChange={(v) => {
                    setGodiste(v);
                    updateUrl({ godiste: v });
                  }}
                  placeholder="Sva godišta"
                />
              </div>
              <div className="flex-1 min-w-[150px] px-2">
                <FilterDropdown
                  label="Kilometraža"
                  value={km}
                  options={KM_RANGES}
                  onChange={(v) => {
                    setKm(v);
                    updateUrl({ km: v });
                  }}
                  placeholder="Sva kilometraža"
                />
              </div>
              <div className="flex-1 min-w-[140px] px-2">
                <FilterDropdown
                  label="Cijena"
                  value={cijena}
                  options={PRICE_RANGES}
                  onChange={(v) => {
                    setCijena(v);
                    updateUrl({ cijena: v });
                  }}
                  placeholder="Sve cijene"
                />
              </div>
            </div>
            {hasAnyFilter && (
              <div className="pt-3 px-2">
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm text-[#01A5CE] hover:underline"
                >
                  ✕ Obriši sve filtere
                </button>
              </div>
            )}
          </div>

          {/* Result count + sort */}
          <div className="flex items-center justify-between mb-4 px-1 gap-3 flex-wrap">
            <p className="text-sm text-[#5F6D7A]">
              <span className="font-bold text-black">{filteredCars.length}</span>{" "}
              {filteredCars.length === 1 ? "rezultat" : "rezultata"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5F6D7A]">Sortiraj:</span>
              <div className="w-[180px]">
                <FilterDropdown
                  label="Sort"
                  value={sort}
                  options={SORT_OPTIONS}
                  onChange={(v) => setSort(v || "newest")}
                  placeholder="Najnoviji"
                />
              </div>
            </div>
          </div>

          {/* Car grid (with full AI banner inserted between rows on page 1) */}
          {filteredCars.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-lg text-[#5F6D7A] mb-2">
                Nažalost, nema vozila koja zadovoljavaju zadane filtere.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00CCFF] text-white font-medium hover:opacity-90"
              >
                Obriši filtere
              </button>
            </div>
          ) : (() => {
            // On page 1 with enough cars, split the grid around the AI banner.
            // Otherwise render a single grid.
            const showSplitBanner = safePage === 1 && visibleCars.length > 4;
            const firstBatch = showSplitBanner ? visibleCars.slice(0, 4) : visibleCars;
            const secondBatch = showSplitBanner ? visibleCars.slice(4) : [];

            const renderCarGrid = (cars: typeof visibleCars) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cars.map((car) => (
                  <article
                    key={car.id}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
                      <img
                        src={img(car.image)}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col gap-1.5">
                      <h3 className="text-[15px] font-bold text-black">{car.name}</h3>
                      <p className="text-[11px] text-[#5F6D7A]">
                        {car.year} · {car.km} · {car.location}
                      </p>
                      <div className="flex gap-1 flex-wrap pt-1">
                        {[car.fuel, car.transmission, car.power].map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] text-[#5F6D7A] bg-[#F7F7FC] px-1.5 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-2 mt-auto flex items-center justify-between">
                        <span className="text-base font-bold text-black">{car.price}</span>
                        <span className="text-[10px] text-[#00CCFF] font-bold">
                          {car.monthly}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            );

            return (
              <>
                {renderCarGrid(firstBatch)}
                {showSplitBanner && (
                  <div className="my-6 -mx-3">
                    <AIBanner />
                  </div>
                )}
                {secondBatch.length > 0 && renderCarGrid(secondBatch)}
              </>
            );
          })()}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-8">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-md text-sm text-[#5F6D7A] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm transition-colors ${
                    p === safePage
                      ? "bg-[#00CCFF] text-white font-bold"
                      : "text-[#5F6D7A] hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-md text-sm text-[#5F6D7A] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <SearchBrowse />
      </main>
      <Footer />
    </>
  );
}

export default function VozilaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VozilaContent />
    </Suspense>
  );
}
