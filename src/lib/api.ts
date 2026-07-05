import { Camper, CamperFilters, CampersResponse, CamperReview } from "./types";

export const API_BASE_URL = "https://campers-api.goit.study";

const PER_PAGE = 4;

function buildQuery(page: number, filters: CamperFilters): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("perPage", String(PER_PAGE));

  if (filters.location) params.set("location", filters.location);
  if (filters.form) params.set("form", filters.form);
  if (filters.transmission) params.set("transmission", filters.transmission);
  if (filters.engine) params.set("engine", filters.engine);

  filters.amenities?.forEach((a) => params.append("amenities", a));

  return params.toString();
}

export async function fetchCampers(
  page: number,
  filters: CamperFilters
): Promise<CampersResponse> {
  const query = buildQuery(page, filters);
  const res = await fetch(`${API_BASE_URL}/campers?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load campers (status ${res.status})`);
  }

  const data = await res.json();

  const campers: Camper[] = data.campers ?? data.items ?? data.results ?? [];

  return {
    page: data.page ?? page,
    perPage: data.perPage ?? PER_PAGE,
    total: data.total ?? campers.length,
    totalPages: data.totalPages ?? 1,
    campers,
  };
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const res = await fetch(`${API_BASE_URL}/campers/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load camper ${id} (status ${res.status})`);
  }

  const data = await res.json();

  const camper: Camper =
    data && typeof data === "object" && !("id" in data) && !("name" in data)
      ? data.camper ?? data.data ?? data.result ?? data
      : data;

  return camper;
}

export { PER_PAGE };

export async function fetchCamperReviews(id: string): Promise<CamperReview[]> {
  const candidateUrls = [
    `${API_BASE_URL}/campers/${id}/reviews`,
    `${API_BASE_URL}/reviews?camperId=${id}`,
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.reviews)) return data.reviews;
      if (Array.isArray(data.items)) return data.items;
    } catch {
      continue;
    }
  }

  return [];
}
