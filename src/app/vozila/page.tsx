"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterDropdown from "@/components/FilterDropdown";
import { img } from "@/lib/img";
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

function VozilaContent() {
  const sp = useSearchParams();
  const router = useRouter();

  const [marka, setMarka] = useState(sp.get("marka") || "");
  const [model, setModel] = useState(sp.get("model") || "");
  const [godiste, setGodiste] = useState(sp.get("godiste") || "");
  const [km, setKm] = useState(sp.get("km") || "");
  const [cijena, setCijena] = useState(sp.get("cijena") || "");

  const modelOptions = marka && MODELS_BY_BRAND[marka]
    ? MODELS_BY_BRAND[marka].map((m) => ({ label: m, value: m }))
    : [];

  // Apply filters
  const filteredCars = useMemo(() => {
    return ALL_CARS.filter((c) => {
      if (marka && c.brand !== marka) return false;
      if (model && !c.name.toLowerCase().includes(model.toLowerCase())) return false;
      if (godiste && !c.year.startsWith(godiste)) return false;
      if (km) {
        const max = parseInt(km, 10);
        const kmNum = parseInt(c.km.replace(/[^\d]/g, ""), 10);
        if (max === 200001 ? kmNum < 200000 : kmNum > max) return false;
      }
      if (cijena) {
        const max = parseInt(cijena, 10);
        const priceNum = parseInt(c.price.replace(/[^\d]/g, ""), 10);
        if (max === 50001 ? priceNum < 50000 : priceNum > max) return false;
      }
      return true;
    });
  }, [marka, model, godiste, km, cijena]);

  const updateUrl = (next: Record<string, string>) => {
    const params = new URLSearchParams();
    const all = { marka, model, godiste, km, cijena, ...next };
    Object.entries(all).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    router.replace(`/vozila${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const reset = () => {
    setMarka("");
    setModel("");
    setGodiste("");
    setKm("");
    setCijena("");
    router.replace("/vozila", { scroll: false });
  };

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-[#FAFBFC]">
        <div className="max-w-[1320px] mx-auto px-3 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
            Pretraga vozila
          </h1>

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
            {(marka || model || godiste || km || cijena) && (
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

          {/* Results count */}
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-sm text-[#5F6D7A]">
              <span className="font-bold text-black">{filteredCars.length}</span>{" "}
              {filteredCars.length === 1 ? "vozilo" : "vozila"} pronađeno
            </p>
          </div>

          {/* Car grid */}
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
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
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-black">{car.name}</h3>
                    <p className="text-xs text-[#5F6D7A]">
                      {car.year} · {car.km} · {car.location}
                    </p>
                    <div className="flex gap-1.5 flex-wrap pt-1">
                      {[car.fuel, car.transmission, car.power].map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] text-[#5F6D7A] bg-[#F7F7FC] px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-black">{car.price}</span>
                      <span className="text-xs text-[#00CCFF] font-bold">
                        {car.monthly}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
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
