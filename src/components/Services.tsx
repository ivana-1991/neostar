import { img } from "@/lib/img";

const services = [
  {
    title: "Trebaš gume?",
    desc: "Kad tvom limenom ljubimcu zatrebaju cipele za novu sezonu, skreni do jednog od naših servisera, kupi i ugradi nove gume! Brzo i bez gnjavaže.",
    cta: "Dogovori termin",
    image: "/images/gume.png",
  },
  {
    title: "Vrijeme za servis?",
    desc: "Upalila se lampica ili je jednostavno vrijeme za redovan pregled automobila? U par klikova saznaj cijenu i naruči se na servis. Bez iznenađenja i nenadanog udarca na tvoj džep!",
    cta: "Saznaj cijenu servisa",
    image: "/images/servis.png",
  },
  {
    title: "Zašto Neostar?",
    desc: "Kupnja i prodaja auta mogu biti jednostavne, brze i sigurne. Kod nas je sve transparentno, bez skrivenih troškova i gubljenja vremena. Saznaj kako točno funkcioniramo.",
    cta: "Česta pitanja",
    image: "/images/zasto-neostar.png",
  },
];

export default function Services() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-3">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl overflow-hidden">
              <div className="h-52 overflow-hidden">
                <img
                  src={img(s.image)}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-5 pb-2">
                <h3 className="text-lg font-bold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                <a href="#" className="inline-flex items-center gap-1.5 px-4 py-2 border border-black text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  {s.cta}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
