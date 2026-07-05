# TravelTrucks — вебзастосунок для оренди кемперів

Фронтенд-застосунок для **TravelTrucks**, компанії з оренди кемпер-ванів.
Розроблено як капстоун-проєкт GoIT: перегляд каталогу кемперів, фільтрація за
місцем/типом кузова/двигуном/коробкою передач, перегляд детальної інформації з
фотогалереєю та відгуками, а також відправка запиту на бронювання.

## ✨ Функції

- **Головна сторінка** — банер з закликом до дії, що веде до каталогу.
- **Сторінка каталогу** (`/catalog`)
  - Фільтрація кемперів за локацією, формою кемпера (Alcove / Panel Van / Integrated /
    Semi Integrated), типом двигуна (Diesel / Petrol / Hybrid / Electric) та
    коробкою передач (Automatic / Manual).
  - Бескінечна пагінація через **Load more** (4 кемпери на сторінку), реалізована
    з використанням `useInfiniteQuery` з TanStack Query, з урахуванням активних фільтрів.
  - Порожній стан "Кемпери не знайдені", стан завантаження та стан помилки.
- **Сторінка деталей кемпера** (`/catalog/[camperId]`)
  - Відкривається в новій вкладці браузера з кнопки картки каталогу **Show more**.
  - Фотогалерея з мініатюрами (Swiper, патерн thumbs-gallery).
  - Повні технічні характеристики (форма, розміри, бак, витрата) та бейджі обладнання.
  - Відгуки користувачів, відображені у вигляді 5-зіркової шкали.
  - Форма бронювання (ім'я, email, дата, коментар) з валідацією на боці клієнта
    та сповіщенням про успіх після відправки.

## 🛠 Технології

- **Next.js 14** (App Router) + **TypeScript**
- **TanStack Query** (`useInfiniteQuery`) для пагінованого завантаження даних
- **CSS Modules** для стилізації (токени підібрані відповідно до дизайну у Figma)
- **Swiper** для галереї зображень
- **React Icons** для іконок
- **react-hot-toast** для сповіщень про підтвердження бронювання
- Бекенд: [`https://campers-api.goit.study`](https://campers-api.goit.study/docs)

## 📦 Початок роботи

```bash
# встановити залежності
npm install

# запустити dev-сервер
npm run dev

# відкрити http://localhost:3000

# збірка для продакшну
npm run build
npm run start
```

## 📁 Структура проєкту

```
src/
  app/
    page.tsx                     # Головна сторінка
    catalog/
      page.tsx                   # Сторінка каталогу (фільтри + бескінечний список)
      catalog.module.css
      [camperId]/
        page.tsx                 # Серверний компонент: запит + metadata
        CamperDetailsClient.tsx  # Лейаут: галерея, характеристики, відгуки, бронювання
        details.module.css
        not-found.tsx
    layout.tsx
    globals.css
  components/
    Header/, Filters/, CamperCard/, RatingStars/, Loader/,
    Gallery/, VehicleDetails/, Reviews/, BookingForm/
  hooks/
    useCampersInfinite.ts         # wrapper для useInfiniteQuery
  lib/
    api.ts                        # fetchCampers / fetchCamperById
    types.ts                      # Camper, CamperFilters тощо
  providers/
    QueryProvider.tsx              # Провайдер клієнта TanStack Query
```

## 🎨 Дизайн

Десктопний макет реалізовано відповідно до наданого макету у Figma

## 👤 Автор

_Shevchenko Yevhenii, [GitHub https://github.com/Yevhenii-Shevchenko]._

## 🔗 Деплой

Розгорнути можна на [Vercel](https://vercel.com) або [Netlify](https://www.netlify.com/):

```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy
```
