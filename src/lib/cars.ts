export type Car = {
  id: string;
  name: string;
  brand: string;
  year: string;
  km: string;
  location: string;
  fuel: string;
  transmission: string;
  power: string;
  price: string;
  monthly: string;
  image: string;
};

// Shared mock car data. Reused by AI chat modal and search results page.
export const CARS: Car[] = [
  {
    id: "fiat-500",
    name: "FIAT 500 1.2",
    brand: "Fiat",
    year: "2016. g.",
    km: "55.000 km",
    location: "Velika Gorica",
    fuel: "Benzin",
    transmission: "Mehanički",
    power: "51 KS",
    price: "9.800 €",
    monthly: "od 105 €/mj",
    image: "/images/car-fiat-500.jpg",
  },
  {
    id: "vw-polo",
    name: "VW Polo 1.0 TSI",
    brand: "Volkswagen",
    year: "2020. g.",
    km: "48.300 km",
    location: "Zagreb",
    fuel: "Benzin",
    transmission: "Mehanički",
    power: "70 KS",
    price: "13.900 €",
    monthly: "od 149 €/mj",
    image: "/images/car-vw-polo.jpg",
  },
  {
    id: "opel-corsa",
    name: "Opel Corsa 1.2",
    brand: "Opel",
    year: "2021. g.",
    km: "56.800 km",
    location: "Varaždin",
    fuel: "Benzin",
    transmission: "Mehanički",
    power: "55 KS",
    price: "12.700 €",
    monthly: "od 137 €/mj",
    image: "/images/car-opel-corsa.jpg",
  },
];

// Expanded list for the search/listing page — repeats the 3 known photos
// across more mock listings so the grid feels populated.
const EXTRA_CARS: Omit<Car, "image">[] = [
  {
    id: "fiat-panda",
    name: "FIAT Panda 1.2",
    brand: "Fiat",
    year: "2018. g.",
    km: "62.000 km",
    location: "Split",
    fuel: "Benzin",
    transmission: "Mehanički",
    power: "69 KS",
    price: "7.200 €",
    monthly: "od 89 €/mj",
  },
  {
    id: "vw-golf",
    name: "VW Golf 1.6 TDI",
    brand: "Volkswagen",
    year: "2019. g.",
    km: "92.500 km",
    location: "Osijek",
    fuel: "Dizel",
    transmission: "Mehanički",
    power: "115 KS",
    price: "16.900 €",
    monthly: "od 175 €/mj",
  },
  {
    id: "opel-astra",
    name: "Opel Astra 1.4",
    brand: "Opel",
    year: "2017. g.",
    km: "108.000 km",
    location: "Rijeka",
    fuel: "Benzin",
    transmission: "Automatik",
    power: "100 KS",
    price: "11.500 €",
    monthly: "od 125 €/mj",
  },
  {
    id: "fiat-500-2",
    name: "FIAT 500X 1.6",
    brand: "Fiat",
    year: "2019. g.",
    km: "78.000 km",
    location: "Zadar",
    fuel: "Dizel",
    transmission: "Mehanički",
    power: "120 KS",
    price: "14.200 €",
    monthly: "od 152 €/mj",
  },
  {
    id: "vw-polo-2",
    name: "VW Polo 1.2 TSI",
    brand: "Volkswagen",
    year: "2017. g.",
    km: "85.000 km",
    location: "Karlovac",
    fuel: "Benzin",
    transmission: "Mehanički",
    power: "90 KS",
    price: "10.800 €",
    monthly: "od 118 €/mj",
  },
  {
    id: "opel-mokka",
    name: "Opel Mokka X 1.4",
    brand: "Opel",
    year: "2020. g.",
    km: "42.000 km",
    location: "Pula",
    fuel: "Benzin",
    transmission: "Automatik",
    power: "140 KS",
    price: "18.500 €",
    monthly: "od 195 €/mj",
  },
  {
    id: "fiat-tipo",
    name: "FIAT Tipo 1.3 Multijet",
    brand: "Fiat",
    year: "2018. g.",
    km: "98.000 km",
    location: "Dubrovnik",
    fuel: "Dizel",
    transmission: "Mehanički",
    power: "95 KS",
    price: "9.200 €",
    monthly: "od 99 €/mj",
  },
  {
    id: "vw-tiguan",
    name: "VW Tiguan 2.0 TDI",
    brand: "Volkswagen",
    year: "2021. g.",
    km: "35.000 km",
    location: "Zagreb",
    fuel: "Dizel",
    transmission: "Automatik",
    power: "150 KS",
    price: "29.900 €",
    monthly: "od 310 €/mj",
  },
  {
    id: "opel-insignia",
    name: "Opel Insignia 2.0 CDTI",
    brand: "Opel",
    year: "2019. g.",
    km: "115.000 km",
    location: "Slavonski Brod",
    fuel: "Dizel",
    transmission: "Automatik",
    power: "170 KS",
    price: "17.500 €",
    monthly: "od 185 €/mj",
  },
];

const PHOTOS = [
  "/images/car-fiat-500.jpg",
  "/images/car-vw-polo.jpg",
  "/images/car-opel-corsa.jpg",
];

export const ALL_CARS: Car[] = [
  ...CARS,
  ...EXTRA_CARS.map((c, i) => ({ ...c, image: PHOTOS[i % PHOTOS.length] })),
];
