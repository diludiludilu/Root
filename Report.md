# CS3404 Mini Project Report — Blood Link

## Overview
The **"Blood Link"** Blood Donor Finder SPA was developed using Vue 3 Composition API, TypeScript (zero `any` usage), Pinia, and Tailwind CSS. It connects users in need of blood with registered donors and local hospitals by consuming the public DummyJSON REST API for donor data and authentication.

## Implemented Features

### Mandatory Requirements
1. **API Interaction**: Fetches all 200+ user profiles from `https://dummyjson.com/users?limit=0` as donor records. Strictly typed via `ApiResponse<Donor>`.
2. **Search / Filter**: Dual filtering — blood group dropdown (exact match) + location text search (city or state substring, case-insensitive). Active filters shown as dismissible pills.
3. **Dynamic Routing**: Vue Router handles `/donor/:id` routes. Clicking any DonorCard navigates to a dedicated full-profile detail view.
4. **Component Architecture**: UI is split into 6 reusable components across 7 views; no logic is monolithically placed in App.vue.
5. **Responsive Layout**: Tailwind flex/grid classes ensure the layout adapts from 1 column (mobile) to 4 columns (desktop).

### Bonus Features
6. **Authentication Simulation**: Submits real credentials to `https://dummyjson.com/auth/login`, receives a JWT token stored in `localStorage`. Route guards block unauthenticated navigation.
7. **Local Account Registration**: Users can register new donor accounts locally (stored in `localStorage`). Local login is checked first before falling back to DummyJSON.
8. **Shopping Cart / Bookmarks (Pinia)**: Two independent carts — "Blood Requests" (donors) and "Hospital Pledges" — managed by Pinia stores and persisted in `localStorage`.
9. **Dark Mode**: Full Tailwind `dark:` class support. ThemeToggle component persists preference in `localStorage` and respects OS preference on first load.
10. **Pagination**: FindDonorsView displays 12 donors per page with a smart page-number window and smooth scroll-to-top.
11. **Skeleton Loaders**: SkeletonCard component provides animated loading placeholders while the API fetch is in progress.

## Component Architecture Diagram

```
[App.vue]
  ├── [NavBar.vue]           — user avatar, links, theme toggle, activity badge
  │     └── [ThemeToggle.vue]
  └── [RouterView]
        ├── [LoginView.vue]          — split-panel premium auth form
        ├── [SignupView.vue]         — donor registration form
        ├── [DashboardView.vue]      — hero, live stats (donors/hospitals/activity), CTA cards
        ├── [FindDonorsView.vue]     — paginated donor grid + filter bar + skeletons
        │     ├── [FilterBar.vue]    — blood group select + location search + pills
        │     ├── [DonorCard.vue]    — donor avatar, blood type badge, request button
        │     └── [SkeletonCard.vue] — animated loading placeholder
        ├── [FindHospitalsView.vue]  — hospital list + urgency/location filters
        │     └── [HospitalCard.vue] — hospital image, blood types needed, pledge button
        ├── [DonorDetailView.vue]    — full donor profile: contact cards, request/cancel
        └── [RequestsView.vue]       — My Activity: all requests and pledges management
```

## TypeScript Design

All API shapes are enforced via strict interfaces in `src/types/api.ts`:
- `Donor` — maps DummyJSON user fields used by the app
- `Hospital` — local data structure for hospital records
- `ApiResponse<T>` — generic wrapper for DummyJSON paginated responses
- `LocalDonorAccount` — extends `Donor` with username/password for local registration
- `UserLoginResponse` — JWT response shape from `/auth/login`

Zero `any` types are used anywhere in the application.

## Pinia Store Architecture

| Store | State | Actions |
|---|---|---|
| `auth` | `currentUser` | `login()`, `logout()`, `register()` |
| `donors` | `donors[]`, `requestedDonors[]`, `loading`, `error` | `fetchDonors()`, `requestBlood()`, `cancelRequest()` |
| `hospitals` | `hospitals[]`, `pledgedHospitals[]` | `pledgeBlood()`, `cancelPledge()` |
| `theme` | `isDark` | `toggleTheme()` |
