const footerLinks = {
  "Kupnja": ["Pretraži vozila", "Pretraži po marki", "Pretraži po godini", "Kako funkcionira"],
  "Prodaja": ["Prodaj vozilo", "NeoConcierge", "Procjena vozila", "Česta pitanja"],
  "Servis": ["Pronađi servis", "Gume", "Redovni servis", "Hitne intervencije"],
  "Neostar": ["O nama", "Blog", "Karijere", "Kontakt"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo + description */}
          <div className="col-span-2 md:col-span-1">
            <img src="/assets/vector.svg" alt="NEOSTAR" className="h-[20px] w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Nov način kupnje, prodaje i održavanja automobila.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              {["f", "in", "ig", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-[#4280EF] transition-colors flex items-center justify-center text-xs font-bold text-gray-300 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>© 2025 Neostar. Sva prava pridržana.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Uvjeti korištenja</a>
            <a href="#" className="hover:text-white">Privatnost</a>
            <a href="#" className="hover:text-white">Kolačići</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
