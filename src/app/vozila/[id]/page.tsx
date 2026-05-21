import { notFound } from "next/navigation";
import { ALL_CARS } from "@/lib/cars";
import CarDetailView from "@/components/CarDetailView";

export function generateStaticParams() {
  return ALL_CARS.map((c) => ({ id: c.id }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = ALL_CARS.find((c) => c.id === id);
  if (!car) notFound();

  // "Potencijalni automobili" — up to 3 same-brand cars (excluding this one)
  const related = ALL_CARS.filter(
    (c) => c.brand === car.brand && c.id !== car.id,
  ).slice(0, 3);

  // "Automobili ovog prodavatelja" — 4 cars from the same location (or just other cars)
  const sellerCars = (() => {
    const sameLocation = ALL_CARS.filter(
      (c) => c.location === car.location && c.id !== car.id,
    );
    if (sameLocation.length >= 4) return sameLocation.slice(0, 4);
    const others = ALL_CARS.filter(
      (c) => c.id !== car.id && !sameLocation.includes(c),
    );
    return [...sameLocation, ...others].slice(0, 4);
  })();

  return <CarDetailView car={car} related={related} sellerCars={sellerCars} />;
}
