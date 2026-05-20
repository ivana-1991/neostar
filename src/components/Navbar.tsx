export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-[72px] flex items-center">
      <div className="max-w-[1280px] mx-auto px-6 w-full flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex-none">
          <img src="/assets/vector.svg" alt="NEOSTAR" className="h-[22px] w-auto" />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-[#4280EF] transition-colors">Vozila</a>
          <a href="#" className="hover:text-[#4280EF] transition-colors">Servis i gume</a>
          <a href="#" className="hover:text-[#4280EF] transition-colors">Prodaj</a>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex flex-1 max-w-xs">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Pretraži vozila..."
              className="w-full pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4280EF]/20 focus:border-[#4280EF]"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-800">HR</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-800">EN</a>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#4280EF] rounded-full hover:bg-[#3570df] transition-colors"
          >
            Prijava
          </a>
          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
