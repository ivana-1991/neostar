export default function ReturnCTA() {
  return (
    <section className="py-16" style={{ backgroundColor: "#FFF3C4" }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Auto ti ne odgovara?<br />
              Vrati ga – bez dodatnih pitanja
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Bez stresa i bez skrivenih uvjeta. Imaš više od dva tjedna da se voziš, testiraš i vidiš je li to to. Ako ipak zaključiš da to nije tvoj auto – jednostavno ga vratiš i dobiješ svoj novac natrag.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Pogledaj ponudu
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          {/* Illustration */}
          <div className="text-[100px] lg:text-[140px] select-none">🙋</div>
        </div>
      </div>
    </section>
  );
}
