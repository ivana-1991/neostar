const carTypes = [
  { label: "Gradski", icon: "🚗" },
  { label: "Monovolumen", icon: "🚐" },
  { label: "SUV", icon: "🚙" },
  { label: "Kombi", icon: "🚌" },
  { label: "Obiteljski", icon: "🚘" },
  { label: "Novo", icon: "✨" },
  { label: "Električni", icon: "⚡" },
  { label: "Kabriolet", icon: "🏎" },
  { label: "Premium", icon: "💎" },
  { label: "Putovanje", icon: "✈️" },
  { label: "Automatik", icon: "⚙️" },
];

export default function Hero() {
  return (
    <section className="bg-white pt-[72px]">
      <div className="max-w-[1320px] mx-auto px-3">
        <div className="grid lg:grid-cols-[1fr_auto] gap-0 items-start">

          {/* Left – content */}
          <div className="py-12 lg:py-16 pr-8">
            <h1 className="text-[clamp(36px,4vw,56px)] font-bold text-black leading-[1.1] mb-8">
              Auto u prvom planu.<br />
              Ti u centru pažnje.
            </h1>

            {/* CTA button */}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm mb-10"
              style={{ backgroundColor: "#80CEAA" }}
            >
              Pronađi svoj auto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Search filters */}
            <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap border border-gray-200 rounded-xl p-3 shadow-sm bg-white mb-8">
              {["Marka", "Model", "Godište", "Kilometraža", "Cijena"].map((label) => (
                <div key={label} className="relative flex-1 min-w-[90px]">
                  <select className="w-full appearance-none bg-transparent text-sm text-gray-700 pr-6 py-1 border-r border-gray-200 last:border-r-0 focus:outline-none cursor-pointer">
                    <option>{label}</option>
                  </select>
                  <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ))}
              <button className="flex-none px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg whitespace-nowrap hover:bg-gray-800 transition-colors">
                Pretraži 5885 vozila
              </button>
            </div>
          </div>

          {/* Right – hero illustration */}
          <div className="hidden lg:flex items-end self-stretch">
            <img
              src="/images/home-hero.svg"
              alt="Neostar auto"
              className="h-[380px] w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* Car type icons row */}
      <div className="border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-3 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {carTypes.map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                className="flex-none flex flex-col items-center gap-1.5 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-xs text-gray-500 group-hover:text-black transition-colors whitespace-nowrap">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
