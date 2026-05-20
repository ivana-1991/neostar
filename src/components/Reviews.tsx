const reviews = [
  {
    name: "Arian Vučilovski",
    initials: "AV",
    text: "S NEOSTAR imamo jako pozitivno iskustvo. Rješavanje leasing predmeta je brzo i bez komplikacija, a jamstva za rabljena vozila daju dodatnu sigurnost kupcima i olakšavaju prodaju.",
    stars: 5,
  },
  {
    name: "Petra Damijanić",
    initials: "PD",
    text: "Moj prvi auto – Mercedes CLA AMG 😍🔥 Put do njega nije bio lagan, ali svaki trud se isplatio… i danas sam presretna! 🙏🏻 Ogromne pohvale Neo Staru na vrhunskoj usluzi!",
    stars: 5,
  },
  {
    name: "Sead Ajdinovic",
    initials: "SA",
    text: "Neostar je nova platforma za kupnju, prodaju i servisiranje vozila. Uz pomoć napredne tehnologije na pametniji način održavaj svoje vozilo.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section style={{ background: "linear-gradient(135deg, #E8F8FF 0%, #D0EFFF 100%)" }} className="py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center">
          Iskrene recenzije, stvarni vozači
        </h2>
        <p className="text-gray-500 text-center mb-12">Što naši korisnici kažu o Neostaru</p>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm">
              <Stars count={r.stars} />
              <p className="mt-4 text-sm text-gray-700 leading-relaxed line-clamp-4">{r.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4280EF] flex items-center justify-center text-white text-xs font-bold">
                  {r.initials}
                </div>
                <span className="text-sm font-semibold text-gray-800">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
