"use client";

import Link from "next/link";

const makes = [
  ["Alfa Romeo", "Audi", "BMW", "Chevrolet", "Citroën", "Dacia", "DS"],
  ["Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia"],
  ["Lancia", "Land Rover", "Lexus", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi"],
  ["Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Škoda"],
  ["Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "Lamborghini"],
];

const years = [
  "do 2008.", "2009.", "2010.", "2011.", "2012.",
  "2013.", "2014.", "2015.", "2016.", "2017.",
  "2018.", "2019.", "2020.", "2021.", "2022.",
  "2023.", "2024.",
];

export default function SearchBrowse() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-[1320px] mx-auto px-3">
        <h2 className="text-2xl font-bold text-black mb-6">
          Pretraži prema proizvođaču automobila
        </h2>
        <div className="mb-10">
          {makes.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-x-10 gap-y-2 mb-3">
              {row.map((make) => (
                <Link
                  key={make}
                  href={`/vozila?marka=${encodeURIComponent(make)}`}
                  className="text-sm text-black hover:underline hover:text-[#01A5CE] whitespace-nowrap transition-colors"
                >
                  {make}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-black mb-6">
          Pretraži po godini proizvodnje
        </h2>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {years.map((year) => {
            // Extract year number from "2020." or "do 2008."
            const yearNum = year.replace(/[^\d]/g, "");
            return (
              <Link
                key={year}
                href={`/vozila?godiste=${yearNum}`}
                className="text-sm text-black hover:underline hover:text-[#01A5CE] whitespace-nowrap transition-colors"
              >
                {year}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
