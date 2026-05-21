export const CAR_BRANDS = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Chevrolet",
  "Citroën",
  "Dacia",
  "DS",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Seat",
  "Škoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const CAR_YEARS = Array.from({ length: 25 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export const KM_RANGES = [
  { label: "do 25.000 km", value: "25000" },
  { label: "do 50.000 km", value: "50000" },
  { label: "do 75.000 km", value: "75000" },
  { label: "do 100.000 km", value: "100000" },
  { label: "do 150.000 km", value: "150000" },
  { label: "do 200.000 km", value: "200000" },
  { label: "preko 200.000 km", value: "200001" },
];

export const PRICE_RANGES = [
  { label: "do 5.000 €", value: "5000" },
  { label: "do 10.000 €", value: "10000" },
  { label: "do 15.000 €", value: "15000" },
  { label: "do 20.000 €", value: "20000" },
  { label: "do 25.000 €", value: "25000" },
  { label: "do 35.000 €", value: "35000" },
  { label: "do 50.000 €", value: "50000" },
  { label: "preko 50.000 €", value: "50001" },
];

// Common models per brand — abbreviated mock data
export const MODELS_BY_BRAND: Record<string, string[]> = {
  Audi: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "e-tron"],
  BMW: ["Serija 1", "Serija 2", "Serija 3", "Serija 4", "Serija 5", "Serija 7", "X1", "X3", "X5", "X7", "Z4", "i3", "i4"],
  Volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Touareg", "T-Roc", "T-Cross", "Arteon", "ID.3", "ID.4", "Up", "Caddy"],
  "Mercedes-Benz": ["A-klasa", "C-klasa", "E-klasa", "S-klasa", "GLA", "GLC", "GLE", "GLS", "CLA", "EQA", "EQC"],
  Fiat: ["500", "Panda", "Tipo", "500X", "500L", "Punto", "Bravo"],
  Opel: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Combo"],
  Peugeot: ["208", "308", "508", "2008", "3008", "5008", "Partner", "Rifter"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar", "Koleos", "Talisman", "Zoe", "Twingo", "Scenic"],
  Ford: ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Ecosport", "Galaxy", "S-Max"],
  Toyota: ["Yaris", "Corolla", "Camry", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Prius", "Aygo"],
  Hyundai: ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe", "Ioniq", "Bayon"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Stonic", "XCeed", "Niro", "EV6"],
  "Škoda": ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
};
