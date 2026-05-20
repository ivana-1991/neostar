const reviews = [
  {
    name: "Arian Vučilovski",
    initials: "AV",
    text: "S NEOSTAR imamo jako pozitivno iskustvo. Rješavanje leasing predmeta je brzo i bez komplikacija, a jamstva za rabljena vozila daju dodatnu sigurnost kupcima i olakšavaju prodaju. Posebna pohvala za Luciju – uvijek brza, profesionalna i konkretna u komunikaciji. Preporuka bez razmišljanja.",
    stars: 5,
    color: "#d4a0a0",
  },
  {
    name: "Petra Damijanić",
    initials: "PD",
    text: "Moj prvi auto – Mercedes CLA AMG 😍🔥 Put do njega nije bio lagan, ali svaki trud se isplatio… i danas sam presretna! 🙏🏻 Ogromne pohvale Neo Staru na vrhunskoj usluzi – cijeli proces leasinga prošao je brzo, jednostavno. Posebno hvala Luciji i Filipu na nevjerojatno brzoj, profesionalnoj i stvarno divnoj suradnji.",
    stars: 5,
    color: "#a0b4d4",
  },
  {
    name: "Sead Ajdinovic",
    initials: "SA",
    text: "Odlično za sada",
    stars: 5,
    color: "#a0c4b0",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-[#FFB800]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16" style={{ backgroundColor: "#7FE5FF" }}>
      <div className="max-w-[1320px] mx-auto px-3">
        <h2 className="text-3xl font-bold text-black mb-10">
          Iskrene recenzije, stvarni vozači
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initials}
                    </div>
                    <span className="font-semibold text-sm text-black">{r.name}</span>
                  </div>
                  <Stars count={r.stars} />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
              </div>
              {/* Google logo */}
              <div className="mt-5 flex justify-end">
                <svg viewBox="0 0 48 48" className="w-6 h-6">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.2-2.7-.4-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3-11.3-7.2L6 34c3.3 6.4 9.9 10 18 10z"/>
                  <path fill="#1565C0" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.7 44 30.3 44 24c0-1.3-.2-2.7-.4-4z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
