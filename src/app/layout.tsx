import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import "swiper/css";
import "swiper/css/thumbs";

export const metadata: Metadata = {
  title: "TravelTrucks — Campers of your dreams",
  description:
    "Rent the perfect camper van for your next adventure. Browse our catalog, filter by location, engine, and transmission, and book online in minutes.",
  keywords: [
    "camper rental",
    "travel trucks",
    "campervan",
    "RV rental",
    "road trip",
  ],
  openGraph: {
    title: "TravelTrucks — Campers of your dreams",
    description:
      "Rent the perfect camper van for your next adventure. Browse our catalog and book online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
