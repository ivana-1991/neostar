import { img } from "@/lib/img";

const carTypes = [
  { label: "Gradski", icon: "/images/icon-gradski.png" },
  { label: "Monovolumen", icon: "/images/icon-monovolumen.png" },
  { label: "SUV", icon: "/images/icon-suv.png" },
  { label: "Kombi", icon: "/images/icon-kombi.png" },
  { label: "Obiteljski", icon: "/images/icon-obiteljski.png" },
  { label: "Novo", icon: "/images/icon-novo.png" },
  { label: "Električni", icon: "/images/icon-elektricni.png" },
  { label: "Kabriolet", icon: "/images/icon-kabriolet.png" },
  { label: "Premium", icon: "/images/icon-premium.png" },
  { label: "Putovanje", icon: "/images/icon-putovanje.png" },
  { label: "Automatik", icon: "/images/icon-automatik.png" },
];

const filters = ["Marka", "Model", "Godište", "Kilometraža", "Cijena"];

export default function Hero() {
  return (
    <section className="bg-white pt-[72px]">
      <div className="max-w-[1320px] mx-auto px-3">

        {/* Top: heading left + illustration right */}
        <div className="grid md:grid-cols-2 items-center pt-8 pb-4 gap-4">

          {/* Left */}
          <div className="flex flex-col items-start gap-8">
            <h1
              className="font-bold text-black"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: "1.2" }}
            >
              Auto u prvom planu.<br />
              Ti u centru pažnje.
            </h1>

            {/* Gradient CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-lg font-bold text-sm text-white"
              style={{
                background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
              }}
            >
              Pronađi svoj auto
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right – showroom illustration */}
          <div className="flex justify-center md:justify-end">
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
          <div className="flex flex-wrap items-center gap-0">
            {filters.map((f) => (
              <div key={f} className="flex-1 min-w-[110px] px-3">
                <div
                  className="flex items-center justify-between px-[22px] py-[15px] rounded-[5px] cursor-pointer"
                  style={{ backgroundColor: "#ECFCFF" }}
                >
                  <span className="text-sm text-[#222]">{f}</span>
                  <svg className="w-4 h-4 text-[#222] flex-none" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                  </svg>
                </div>
              </div>
            ))}
            <div className="px-3 flex-none">
              <button className="bg-black text-white font-bold text-sm rounded-lg h-12 px-4 whitespace-nowrap hover:bg-gray-900 transition-colors">
                Pretraži 5885 vozila
              </button>
            </div>
          </div>
        </div>

        {/* Car type icons */}
        <div className="overflow-x-auto pb-6">
          <div className="flex items-start min-w-max">
            {carTypes.map((c) => (
              <a
                key={c.label}
                href="#"
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
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
