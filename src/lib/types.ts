export type CamperForm = "alcove" | "van" | "integrated" | "semi_integrated";

export type TransmissionType = "automatic" | "manual";

export type FuelType = "diesel" | "petrol" | "hybrid" | "electric";

export type Amenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water"
  | "awning"
  | "shower"
  | "toilet";

export interface CamperReview {
  reviewer_name?: string;
  reviewer_rating?: number;
  name?: string;
  rating?: number;
  author?: string;
  reviewerName?: string;
  score?: number;
  comment?: string;
  text?: string;
  message?: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;
  transmission: TransmissionType;
  engine: FuelType;
  amenities?: string[];
  createdAt?: string;
  updatedAt?: string;
  coverImage: string;
  totalReviews: number;
  gallery?: GalleryItem[];
  reviews?: CamperReview[];
}

export type GalleryItem =
  | string
  | {
      original?: string;
      url?: string;
      src?: string;
      image?: string;
      path?: string;
      thumb?: string;
      thumbnail?: string;
      full?: string;
      large?: string;
      [key: string]: unknown;
    };

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  transmission?: TransmissionType;
  engine?: FuelType;
  amenities?: Amenity[];
}

export interface BookingFormValues {
  name: string;
  email: string;
  bookingDate?: string;
  comment: string;
}

export function hasAmenity(camper: Pick<Camper, "amenities">, amenity: Amenity) {
  return camper.amenities?.includes(amenity) ?? false;
}

export function formatLocation(location?: string) {
  if (!location) return "—";
  const parts = location.split(",").map((p) => p.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : location;
}

export function formLabel(form?: string) {
  if (!form) return "—";
  const map: Record<string, string> = {
    alcove: "Alcove",
    van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
  };
  return map[form] ?? form.replace(/_/g, " ");
}

export function formatPrice(price: unknown): string {
  const num = typeof price === "number" ? price : Number(price);
  return Number.isFinite(num) ? num.toFixed(2) : "0.00";
}

export function formatRating(rating: unknown): string {
  const num = typeof rating === "number" ? rating : Number(rating);
  return Number.isFinite(num) ? num.toFixed(1) : "0.0";
}

export function capitalize(value?: unknown): string {
  if (typeof value !== "string" || value.length === 0) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function extractReviews(camper: unknown): CamperReview[] {
  if (!camper || typeof camper !== "object") return [];
  const obj = camper as Record<string, unknown>;
  const candidateKeys = [
    "reviews",
    "camperReviews",
    "review",
    "feedbacks",
    "feedback",
    "comments",
  ];
  for (const key of candidateKeys) {
    const value = obj[key];
    if (Array.isArray(value)) return value as CamperReview[];
  }
  return [];
}

export function extractImageUrl(item: GalleryItem | undefined | null): string {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (typeof item === "object") {
    const candidateKeys = [
      "original",
      "url",
      "src",
      "image",
      "path",
      "full",
      "large",
      "thumb",
      "thumbnail",
    ];
    for (const key of candidateKeys) {
      const value = item[key];
      if (typeof value === "string" && value) return value;
    }
  }
  return "";
}
