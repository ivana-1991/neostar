export default function Hero() {
  return (
    <section className="relative min-h-[560px] lg:min-h-[620px] bg-white overflow-hidden flex items-center">
      {/* Blue decorative blob top-left */}
      <div
        className="absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7FE5FF 0%, #4280EF 100%)" }}
      />

      <div className="max-w-[1280px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-0">
        {/* Left content */}
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-gray-900 leading-[1.1] mb-6">
            Auto u prvom planu.<br />
            Ti u centru pažnje.
          </h1>

          {/* Search box */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6 max-w-lg">
            <div className="flex gap-3 mb-3">
              <select className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4280EF]/20">
                <option>Marka</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Volkswagen</option>
              </select>
              <select className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4280EF]/20">
                <option>Model</option>
              </select>
            </div>
            <div className="flex gap-3 mb-4">
              <select className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4280EF]/20">
                <option>God. od</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
              </select>
              <select className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4280EF]/20">
                <option>Cijena do</option>
                <option>10.000 €</option>
                <option>20.000 €</option>
                <option>30.000 €</option>
                <option>50.000 €</option>
              </select>
            </div>
            <button className="w-full py-3 bg-[#4280EF] text-white font-semibold rounded-xl hover:bg-[#3570df] transition-colors text-sm">
              Pretraži vozila
            </button>
          </div>

          <a href="#" className="inline-flex items-center gap-2 text-sm text-[#4280EF] font-medium hover:underline">
            Pregledaj ponudu
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Right – car image with pink background */}
        <div className="relative hidden lg:flex items-end justify-center">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)" }}
          />
          <div className="relative z-10 w-full flex items-center justify-center p-8">
            {/* Car placeholder – in real implementation, use actual car image */}
            <div className="w-full max-w-md">
              <svg viewBox="0 0 500 280" className="w-full drop-shadow-2xl">
                <ellipse cx="250" cy="260" rx="200" ry="15" fill="rgba(0,0,0,0.1)" />
                <rect x="80" y="160" width="340" height="80" rx="20" fill="white" opacity="0.95"/>
                <rect x="120" y="120" width="260" height="80" rx="16" fill="white" opacity="0.95"/>
                <rect x="140" y="100" width="80" height="50" rx="8" fill="#E8F4FD" opacity="0.9"/>
                <rect x="280" y="100" width="80" height="50" rx="8" fill="#E8F4FD" opacity="0.9"/>
                <circle cx="140" cy="245" r="30" fill="#333" />
                <circle cx="140" cy="245" r="18" fill="#666" />
                <circle cx="140" cy="245" r="8" fill="#999" />
                <circle cx="360" cy="245" r="30" fill="#333" />
                <circle cx="360" cy="245" r="18" fill="#666" />
                <circle cx="360" cy="245" r="8" fill="#999" />
                <rect x="85" y="175" width="60" height="30" rx="4" fill="#FFD700" opacity="0.8"/>
                <rect x="355" y="175" width="60" height="30" rx="4" fill="#FF6B35" opacity="0.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
