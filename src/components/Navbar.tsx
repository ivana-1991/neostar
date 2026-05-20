export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-3 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex-none">
          <img
            src="/images/neostar-logo.svg"
            alt="NEOSTAR"
            className="h-5 w-auto"
          />
        </a>

        {/* Center nav + search */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
          <a href="#" className="text-sm text-black hover:opacity-70 transition-opacity whitespace-nowrap">
            Vozila
          </a>
          <a href="#" className="text-sm text-black hover:opacity-70 transition-opacity whitespace-nowrap">
            Servis i gume
          </a>

          {/* AI search bar */}
          <div className="relative w-[450px]">
            <div
              className="flex items-center gap-2 px-6 py-1.5 rounded-lg border text-[13px] text-[#333] cursor-text"
              style={{ backgroundColor: "#ECFCFF", borderColor: "#00CCFF" }}
            >
              <svg className="w-5 h-5 flex-none text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
              </svg>
              <span className="text-[#333]">Pitaj me ...</span>
            </div>
            <div
              className="absolute -top-2 -right-1 px-1 py-0.5 rounded flex items-center justify-center"
              style={{ backgroundColor: "#ECFCFF" }}
            >
              <svg className="w-5 h-5 text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden lg:inline-flex items-center px-4 py-1.5 text-sm font-medium border border-black rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Prodaj
          </a>
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#222] cursor-pointer px-5">
            <span>HR</span>
            <svg className="w-2.5 h-1.5 ml-1" fill="none" viewBox="0 0 8 5" stroke="currentColor" strokeWidth={2}>
              <path d="M1 1l3 3 3-3" />
            </svg>
          </div>

          {/* User icon */}
          <button className="p-1 flex-none">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Mobile menu */}
          <button className="lg:hidden p-1 flex-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
