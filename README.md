# TravelTrucks — Camper Rental Web App

A frontend application for **TravelTrucks**, a camper-van rental company.
Built as a GoIT capstone project: browse a catalog of campers, filter by
location/body type/engine/transmission, view full camper details with a
photo gallery and reviews, and submit a booking request.

## ✨ Features

- **Home page** — hero banner with a call to action leading to the catalog.
- **Catalog page** (`/catalog`)
  - Filter campers by location, camper form (Alcove / Panel Van / Integrated /
    Semi Integrated), engine (Diesel / Petrol / Hybrid / Electric), and
    transmission (Automatic / Manual).
  - Infinite pagination via **Load more** (4 campers per page), implemented
    with `useInfiniteQuery` from TanStack Query, respecting active filters.
  - "No campers found" empty state, loading state, and error state.
- **Camper details page** (`/catalog/[camperId]`)
  - Opens in a new browser tab from the catalog card's **Show more** button.
  - Photo gallery with thumbnails (Swiper, thumbs-gallery pattern).
  - Full specs (form, dimensions, tank, consumption) and equipment badges.
  - User reviews rendered on a 5-star scale.
  - Booking form (name, email, date, comment) with client-side validation
    and a success notification on submit.

## 🛠 Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **TanStack Query** (`useInfiniteQuery`) for paginated data fetching
- **CSS Modules** for styling (tokens matched from the Figma design)
- **Swiper** for the image gallery
- **React Icons** for iconography
- **react-hot-toast** for booking confirmation notifications
- Backend: [`https://campers-api.goit.study`](https://campers-api.goit.study/docs)

## 📦 Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# open http://localhost:3000

# production build
npm run build
npm run start
```

## 📁 Project structure

```
src/
  app/
    page.tsx                     # Home page
    catalog/
      page.tsx                   # Catalog page (filters + infinite list)
      catalog.module.css
      [camperId]/
        page.tsx                 # Server component: fetch + metadata
        CamperDetailsClient.tsx  # Layout: gallery, specs, reviews, booking
        details.module.css
        not-found.tsx
    layout.tsx
    globals.css
  components/
    Header/, Filters/, CamperCard/, RatingStars/, Loader/,
    Gallery/, VehicleDetails/, Reviews/, BookingForm/
  hooks/
    useCampersInfinite.ts         # useInfiniteQuery wrapper
  lib/
    api.ts                        # fetchCampers / fetchCamperById
    types.ts                      # Camper, CamperFilters, etc.
  providers/
    QueryProvider.tsx              # TanStack Query client provider
```

## 🎨 Design

Desktop layout implemented to match the provided Figma mockup (colors,
spacing, and component structure). Only the desktop version is required by
the assignment; adjust breakpoints in the `*.module.css` files if you'd like
to extend it to tablet/mobile.

> Note: exact color hex values were sampled from exported mockup screenshots.
> If you have direct Figma inspector access, double-check `globals.css`
> design tokens against the source file and adjust if needed.

## ⚠️ Backend contract assumptions

The public demo backend's exact field names weren't independently verified
against a live OpenAPI spec at the time this project was generated. `src/lib/types.ts`
and `src/lib/api.ts` are the single source of truth for the request/response
shape — if the live API differs (e.g. field names for equipment flags or the
booking endpoint), update those two files and the rest of the app keeps working.

## 👤 Author

_Add your name, GitHub, and contact info here before submission._

## 🔗 Deployment

Deploy to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/):

```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy
```
