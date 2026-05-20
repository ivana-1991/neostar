import { img } from "@/lib/img";

const faqLinks = [
  "Zašto kupiti vozilo na NEOSTAR-u?",
  "Koliko traje NEOSTAR jamstvo?",
  "Kako prodati vozilo putem NEOSTAR-a?",
  "Kako postati ugovorni korisnik?",
  "Što uključuje NEOSTAR pregled vozila?",
  "Po čemu se Neostar razlikuje od ostalih oglašivača?",
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#ECFCFF" }} className="py-12">
      <div className="max-w-[1320px] mx-auto px-3">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 mb-10">

          {/* Left – brand */}
          <div>
            <img
              src={img("/images/neostar-logo.svg")}
              alt="NEOSTAR"
              className="h-6 w-auto mb-4"
            />
            <p className="text-sm text-gray-700 leading-relaxed mb-6 max-w-xs">
              Neostar je nova platforma za kupnju, prodaju i servisiranje vozila. Uz pomoć napredne tehnologije na pametniji način održavaj svoje vozilo, potraži novo ili pronađi kupca za staro. Jednostavnije, brže, sigurnije.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: "f", label: "Facebook" },
                { icon: "ig", label: "Instagram" },
                { icon: "yt", label: "YouTube" },
                { icon: "x", label: "X" },
              ].map(({ icon, label }) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
            {/* App store badges */}
            <div className="flex gap-3">
              <a href="#">
                <img src={img("/images/google-play.png")} alt="Google Play" className="h-9 w-auto" />
              </a>
              <a href="#">
                <img src={img("/images/app-store.png")} alt="App Store" className="h-9 w-auto" />
              </a>
            </div>
          </div>

          {/* Right – FAQ links in 2 cols */}
          <div className="grid sm:grid-cols-2 gap-3">
            {faqLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-black underline hover:text-gray-600 transition-colors leading-relaxed"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">Opći uvjeti poslovanja</a>
            <a href="#" className="hover:text-black">Izjava o zaštiti privatnosti</a>
            <a href="#" className="hover:text-black">Kontakt</a>
            <a href="#" className="hover:text-black">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
