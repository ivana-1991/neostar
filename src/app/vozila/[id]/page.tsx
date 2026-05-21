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

  // Pick up to 3 related cars from the same brand (excluding this one)
  const related = ALL_CARS.filter(
    (c) => c.brand === car.brand && c.id !== car.id,
  ).slice(0, 3);

  return <CarDetailView car={car} related={related} />;
}
