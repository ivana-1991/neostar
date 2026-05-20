const cards = [
  {
    bg: "#7FE5FF",
    title: "Tvoj auto – naša briga",
    desc: "Oglašavanje, komunikacija s kupcima i papirologija – Neostar to preuzima. NeoConcierge usluga mogla bi biti idealno rješenje za tebe!",
    cta: "Prodaj",
    ctaBg: "#4280EF",
    emoji: "🚗",
  },
  {
    bg: "#B8E6FF",
    title: "Ne moraš ići do leasinga – leasing dolazi tebi",
    desc: "Na Neostaru možeš odmah izračunati ratu za gotovo svaki auto koji želiš kupiti, a sve ostalo rješavamo mi.",
    cta: "Saznaj više",
    ctaBg: "#4280EF",
    emoji: "📋",
  },
  {
    bg: "#FFE5A0",
    title: "Jamstvo koje pokriva najvažnije",
    desc: "Sva vozila kupljena putem Neostar platforme dolaze s Neostar jamstvom – 6 ili 12 mjeseci, ovisno o starosti i kilometraži.",
    cta: "Kupi vozilo s jamstvom",
    ctaBg: "#333",
    emoji: "🛡️",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-8 flex flex-col justify-between min-h-[300px]"
              style={{ backgroundColor: card.bg }}
            >
              <div>
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{card.desc}</p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white w-fit"
                style={{ backgroundColor: card.ctaBg }}
              >
                {card.cta}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
