export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-3 flex flex-col gap-6">

        {/* Row 1: two cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 – Tvoj auto */}
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 min-h-[280px]"
            style={{ backgroundColor: "#FED69E" }}
          >
            <img
              src="/images/mirko-hero.png"
              alt="Tvoj auto – naša briga"
              className="w-32 h-32 md:w-40 md:h-40 object-contain flex-none"
            />
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Tvoj auto – naša briga</h3>
              <p className="text-sm text-gray-800 leading-relaxed mb-5">
                Oglašavanje, komunikacija s kupcima i papirologija – Neostar to preuzima. NeoConcierge usluga mogla bi biti idealno rješenje za tebe! Hoćeš još brže? Otkupit ćemo vozilo odmah!
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Prodaj
              </a>
            </div>
          </div>

          {/* Card 2 – Leasing */}
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 min-h-[280px]"
            style={{ backgroundColor: "#90F0C8" }}
          >
            <img
              src="/images/financiranje.png"
              alt="Leasing"
              className="w-32 h-32 md:w-40 md:h-40 object-contain flex-none"
            />
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Ne moraš ići do leasinga – leasing dolazi tebi</h3>
              <p className="text-sm text-gray-800 leading-relaxed mb-5">
                Na Neostaru možeš odmah izračunati ratu za gotovo svaki auto koji želiš kupiti, a sve ostalo rješavamo mi. Komunikacija, papirologija i odobrenje – obavi sve ONLINE.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Saznaj više
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: full-width Jamstvo */}
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 min-h-[220px]"
          style={{ backgroundColor: "#00CCFF" }}
        >
          <img
            src="/images/jamstvo.png"
            alt="Jamstvo"
            className="w-36 h-36 object-contain flex-none"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-black mb-3">Jamstvo koje pokriva najvažnije</h3>
            <p className="text-sm text-gray-900 leading-relaxed mb-5 max-w-2xl">
              Sva vozila kupljena putem Neostar platforme dolaze s Neostar jamstvom – <strong>6 ili 12 mjeseci</strong>, ovisno o starosti i kilometraži. Pokrivamo ključne mehaničke i elektroničke dijelove. Svaki automobil prije isporuke detaljno pregledavamo u čak 59 točaka da bi se uvjerili u njegovu ispravnost.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Kupi vozilo s jamstvom
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
