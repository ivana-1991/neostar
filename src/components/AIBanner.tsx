export default function AIBanner() {
  const benefits = [
    "Preporuke modela koji ti odgovaraju",
    "Sve opcije lizinga i kreditiranja",
    "Odgovori 24/7, bez čekanja",
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1320px] mx-auto px-3">
        <div
          className="rounded-lg overflow-hidden px-4 py-8 md:px-4 md:py-8 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-0"
          style={{
            background: "linear-gradient(180deg, #00CCFF 25.93%, #F9FFFC 99.91%)",
          }}
        >
          {/* Left – Chat preview card */}
          <div className="flex-none w-full md:w-[416px] md:px-[15px] flex justify-center md:justify-start">
            <div
              className="bg-white rounded-xl p-5 flex flex-col gap-3.5 w-full max-w-[360px]"
              style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-2xl w-8 h-8 flex-none"
                  style={{ backgroundColor: "#F7F7FC" }}
                >
                  <svg className="w-5 h-5 text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-[13px] text-[#0F1419] leading-tight">
                    AI prodajni savjetnik
                  </p>
                  <p className="text-[11px] text-[#5F6D7A] leading-tight">Neostar</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-2">
                {/* AI msg */}
                <div className="self-start max-w-[280px]">
                  <p
                    className="text-[13.7px] text-black rounded-lg px-3 py-2.5 leading-snug"
                    style={{ backgroundColor: "#F7F7FC" }}
                  >
                    Bok! Reci mi kakav auto tražiš — pomoći ću ti pronaći pravi.
                  </p>
                </div>
                {/* User msg */}
                <div className="self-end max-w-[280px]">
                  <p
                    className="text-[13.7px] rounded-lg px-3 py-2.5 leading-snug"
                    style={{ backgroundColor: "rgba(127,229,255,0.2)", color: "#01A5CE" }}
                  >
                    Trebam obiteljski auto za grad
                  </p>
                </div>
                {/* AI msg */}
                <div className="self-start max-w-[280px]">
                  <p
                    className="text-[13.7px] text-black rounded-lg px-3 py-2.5 leading-snug"
                    style={{ backgroundColor: "#F7F7FC" }}
                  >
                    Super! Imam par prijedloga — a poslije ti objasnim i opcije lizinga
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Content */}
          <div className="flex-1 flex flex-col gap-4 md:px-[15px]">
            <h2 className="text-2xl md:text-[24px] font-bold text-[#222] leading-[1.2]">
              Tvoj auto. Tvoj savjetnik.
            </h2>

            <p className="text-[13.5px] text-[#222] leading-[21px]">
              Pomažemo ti pronaći idealan auto — a onda i najbolji način da ga kupiš. Uz novog AI savjetnika koji je tu kad god trebaš.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-2.5 pt-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-[18px] h-[18px] flex-none font-bold text-[#212529] text-base leading-none">
                    ✓
                  </span>
                  <span className="text-[13.5px] text-[#222] leading-[21px]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex pt-2">
              <a
                href="#"
                className="border border-[#212529] rounded-md px-6 py-1.5 text-base text-[#212529] hover:bg-[#212529] hover:text-white transition-colors"
              >
                Pronađi svoj auto
              </a>
            </div>

            {/* Online indicator */}
            <div className="flex items-center gap-2 pt-3.5">
              <span className="w-2 h-2 rounded-full bg-[#80CEAA] flex-none" />
              <p className="text-[13px] text-[#212529] opacity-75">
                AI savjetnik je online · odgovara odmah
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
