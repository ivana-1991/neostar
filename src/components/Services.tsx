const services = [
  {
    title: "Trebaš gume?",
    desc: "Kad tvom limenom ljubimcu zatrebaju cipele za novu sezonu, skreni do jednog od naših servisera, kupi i ugradi nove gume!",
    cta: "Dogovori termin",
    image: "🔧",
    bg: "#1a1a2e",
  },
  {
    title: "Vrijeme za servis?",
    desc: "Upalila se lampica ili je jednostavno vrijeme za redovan pregled automobila? U par klikova saznaj cijenu i naruči se na servis.",
    cta: "Saznaj cijenu servisa",
    image: "🔩",
    bg: "#16213e",
  },
  {
    title: "Zašto Neostar?",
    desc: "Kupnja i prodaja auta mogu biti jednostavne, brze i sigurne. Kod nas je sve transparentno, bez skrivenih troškova i gubljenja vremena.",
    cta: "Česta pitanja",
    image: "⭐",
    bg: "#0f3460",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl overflow-hidden group">
              {/* Image area */}
              <div
                className="h-48 flex items-center justify-center text-6xl"
                style={{ backgroundColor: s.bg }}
              >
                {s.image}
              </div>
              {/* Content */}
              <div className="p-6 border border-t-0 border-gray-100 rounded-b-2xl">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4280EF] hover:underline"
                >
                  {s.cta}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
