import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCamperById } from "@/lib/api";
import CamperDetailsClient from "./CamperDetailsClient";

interface PageProps {
  params: { camperId: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const camper = await fetchCamperById(params.camperId);
    return {
      title: `${camper.name} — TravelTrucks`,
      description: camper.description,
      openGraph: {
        title: `${camper.name} — TravelTrucks`,
        description: camper.description,
        images: camper.coverImage ? [camper.coverImage] : undefined,
      },
    };
  } catch {
    return { title: "Camper details — TravelTrucks" };
  }
}

export default async function CamperDetailsPage({ params }: PageProps) {
  let camper;
  try {
    camper = await fetchCamperById(params.camperId);
  } catch {
    notFound();
  }

  return <CamperDetailsClient camper={camper} />;
}
