const makes = [
  ["Alfa Romeo", "Audi", "BMW", "Chevrolet", "Citroën", "Dacia"],
  ["Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep"],
  ["Kia", "Land Rover", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi"],
  ["Nissan", "Opel", "Peugeot", "Renault", "Seat", "Škoda"],
  ["Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"],
];

const years = [
  "do 2010.", "2011.", "2012.", "2013.", "2014.",
  "2015.", "2016.", "2017.", "2018.", "2019.",
  "2020.", "2021.", "2022.", "2023.", "2024.",
];

export default function SearchBrowse() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* By make */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pretraži prema proizvođaču automobila
        </h2>
        <div className="mb-12">
          {makes.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-x-8 gap-y-2 mb-2">
              {row.map((make) => (
                <a key={make} href="#" className="text-sm text-[#4280EF] hover:underline whitespace-nowrap">
                  {make}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* By year */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pretraži po godini proizvodnje
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {years.map((year) => (
            <a key={year} href="#" className="text-sm text-[#4280EF] hover:underline whitespace-nowrap">
              {year}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
