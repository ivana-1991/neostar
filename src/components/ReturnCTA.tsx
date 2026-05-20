export default function ReturnCTA() {
  return (
    <section className="py-0">
      <div className="max-w-[1320px] mx-auto px-3">
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden">

          {/* Left – Vrati ga */}
          <div
            className="p-10 flex flex-col md:flex-row items-start gap-6"
            style={{ backgroundColor: "#FED69E" }}
          >
            <img
              src="/images/povrat-vozila.png"
              alt="Povrat vozila"
              className="w-32 h-32 object-contain flex-none"
            />
            <div>
              <h2 className="text-2xl font-bold text-black mb-3">
                Auto ti ne odgovara?<br />
                Vrati ga – bez dodatnih pitanja
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed mb-5">
                Bez stresa i bez skrivenih uvjeta. Imaš više od dva tjedna da se voziš, testiraš i vidiš je li to to. Ako ipak zaključiš da to nije tvoj auto – jednostavno ga vratiš i dobiješ svoj novac natrag.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-black text-sm font-semibold rounded-lg hover:bg-black hover:text-white transition-colors">
                Pogledaj ponudu
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right – Tvoj savjetnik */}
          <div className="bg-white p-10">
            <h2 className="text-2xl font-bold text-black mb-4">Tvoj auto. Tvoj savjetnik.</h2>
            <p className="text-sm text-gray-600 mb-5">
              Pronalazak novog auta nikad nije bio lakši – mi to preuzimamo za tebe. Uz moving AI savjetnika možeš u real-timu razgovarati te ti pomaže naći savršen auto za tebe pod najboljim uvjetima.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Preporuke vozila koji ti odgovaraju",
                "Sve opcije plaćanja u jednom mjestu",
                "Odgovor 24/7, bez čekanja",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-[#80CEAA] mt-0.5 flex-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-lg text-white"
              style={{ backgroundColor: "#80CEAA" }}
            >
              Pronađi svoj auto
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
