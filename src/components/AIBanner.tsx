"use client";

import { img } from "@/lib/img";
import { useAIChat } from "@/lib/aiChatContext";

export default function AIBanner() {
  const { open } = useAIChat();
  const benefits = [
    "Preporuke modela koji ti odgovaraju",
    "Sve opcije lizinga i kreditiranja",
    "Odgovori 24/7, bez čekanja",
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1320px] mx-auto px-3">
        <div
          onClick={() => open()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          }}
          className="rounded-lg overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8 cursor-pointer hover:brightness-[1.02] transition-all"
          style={{
            background: "linear-gradient(180deg, #00CCFF 25.93%, #F9FFFC 99.91%)",
          }}
        >
          {/* Left – Chat preview card */}
          <div className="flex-none w-full md:w-[420px] flex justify-center md:justify-start">
            <div
              className="bg-white rounded-2xl p-5 md:p-6 flex flex-col gap-4 w-full max-w-[420px] shadow-sm"
              style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full w-10 h-10 flex-none"
                  style={{ backgroundColor: "#F7F7FC" }}
                >
                  <img
                    src={img("/images/icon-sparkle.svg")}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-[15px] text-[#0F1419] leading-tight">
                    AI prodajni savjetnik
                  </p>
                  <p className="text-[13px] text-[#5F6D7A] leading-tight">Neostar</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-2.5">
                {/* AI msg */}
                <div className="self-start max-w-[88%]">
                  <p
                    className="text-[14px] text-black rounded-xl px-4 py-3 leading-[1.4]"
                    style={{ backgroundColor: "#F7F7FC" }}
                  >
                    Bok! Reci mi kakav auto tražiš — pomoći ću ti pronaći pravi.
                  </p>
                </div>
                {/* User msg */}
                <div className="self-end max-w-[88%]">
                  <p
                    className="text-[14px] rounded-xl px-4 py-3 leading-[1.4]"
                    style={{ backgroundColor: "rgba(127,229,255,0.25)", color: "#01A5CE" }}
                  >
                    Trebam obiteljski auto za grad
                  </p>
                </div>
                {/* AI msg */}
                <div className="self-start max-w-[88%]">
                  <p
                    className="text-[14px] text-black rounded-xl px-4 py-3 leading-[1.4]"
                    style={{ backgroundColor: "#F7F7FC" }}
                  >
                    Super! Imam par prijedloga — a poslije ti objasnim i opcije lizinga
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Content */}
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#222] leading-[1.2]">
              Tvoj auto. Tvoj savjetnik.
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#222] leading-[1.55]">
              Pomažemo ti pronaći idealan auto — a onda i najbolji način da ga kupiš. Uz novog AI savjetnika koji je tu kad god trebaš.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-2.5 pt-1">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-[18px] h-[18px] flex-none font-bold text-[#212529] text-base leading-none">
                    ✓
                  </span>
                  <span className="text-[14px] md:text-[15px] text-[#222] leading-[21px]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="border border-[#212529] rounded-md px-6 py-2 text-[15px] text-[#212529] hover:bg-[#212529] hover:text-white transition-colors cursor-pointer"
              >
                Pronađi svoj auto
              </button>
            </div>

            {/* Online indicator */}
            <div className="flex items-center gap-2 pt-3">
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
