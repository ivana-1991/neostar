const brands = [
  "Audi", "BMW", "Citroën", "Fiat", "Ford", "Honda",
  "Hyundai", "Kia", "Mazda", "Mercedes", "Nissan", "Opel",
  "Peugeot", "Renault", "Seat", "Škoda", "Toyota", "VW",
];

export default function Brands() {
  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-1">
          {brands.map((brand) => (
            <a
              key={brand}
              href="#"
              className="flex-none flex flex-col items-center gap-1 text-xs text-gray-500 hover:text-[#4280EF] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-[#EEF3FE] transition-colors flex items-center justify-center text-gray-400 group-hover:text-[#4280EF] text-xs font-bold">
                {brand.substring(0, 2).toUpperCase()}
              </div>
              <span>{brand}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
