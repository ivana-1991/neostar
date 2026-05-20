import { img } from "@/lib/img";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-3 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex-none">
          <img src={img("/images/neostar-logo.svg")} alt="NEOSTAR" className="h-5 w-auto" />
        </a>

        {/* Flex-1: center nav + right actions (desktop) */}
        <div className="hidden lg:flex flex-1 items-center min-w-0">

          {/* Center: Vozila + Servis + search – all centered */}
          <div className="flex flex-1 items-center justify-center">
            <a href="#" className="px-2 py-3 text-[14px] text-black hover:opacity-70 transition-opacity whitespace-nowrap">
              Vozila
            </a>
            <a href="#" className="px-2 py-3 text-[14px] text-black hover:opacity-70 transition-opacity whitespace-nowrap">
              Servis i gume
            </a>

            {/* AI search bar */}
            <div className="relative mx-2.5 w-[450px] flex-none">
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-lg border text-[13px] text-[#333] cursor-text"
                style={{ backgroundColor: "#ECFCFF", borderColor: "#00CCFF" }}
              >
                <svg className="w-5 h-5 flex-none text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
                </svg>
                <span>Pitaj me ...</span>
              </div>
              {/* Sparkle badge top-right corner of search */}
              <div
                className="absolute -top-2 right-0.5 px-1 py-0.5 rounded flex items-center justify-center"
                style={{ backgroundColor: "#ECFCFF" }}
              >
                <svg className="w-5 h-5 text-[#00CCFF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Prodaj + HR – flush right inside flex-1 */}
          <div className="flex items-center flex-none">
            <a
              href="#"
              className="border border-black rounded-lg px-[17px] py-[3px] text-base font-medium text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Prodaj
            </a>
            {/* HR + CSS triangle dropdown */}
            <div className="flex items-center px-5 cursor-pointer">
              <span className="text-base font-medium text-[#222]">HR</span>
              <div
                className="ml-1.5 w-0 h-0"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "4px solid #222",
                }}
              />
            </div>
          </div>
        </div>

        {/* Far right: user icon in #ECFCFF bg */}
        <div className="flex items-center gap-2">
          <div
            className="hidden lg:flex items-center justify-center rounded-[4px] px-1 py-[3px]"
            style={{ backgroundColor: "#ECFCFF" }}
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Mobile: hamburger + user icon */}
          <svg className="lg:hidden w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
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
