# Blood Link — Donor Finder (CS3404 Mini Project)

A modern, production-grade **Blood Donor Finder SPA** built for the CS3404 GUI Programming Mini Project.

---

## 🔄 Project Evolution — From Family Tree to Blood Donor App

> **This section documents the pivot made during development and is intended for the project report.**

### Initial Direction — Family Root SPA

This project was originally conceived as a **Family Tree SPA** called *Family Root*. The early implementation established:

- A complete **authentication system** (login, signup, JWT session management via DummyJSON `/auth/login`)
- A polished **UI skeleton** with NavBar, dark mode toggle, route guards, and a Pinia-based state architecture
- A working **Vue 3 + TypeScript + Vite + Tailwind CSS** project scaffold

### The Pivot — Why the Domain Changed

After the initial phase, it became clear that the **DummyJSON API's data structure** (users with `bloodGroup`, `address`, `phone`, `age`, etc.) did not naturally map to a family-tree domain. A family tree requires hierarchical relational data (parent/child/sibling links) that simply does not exist in DummyJSON's flat user objects.

Rather than starting over from scratch, I made a strategic decision to **pivot the application domain** to a **Blood Donor Finder** — a domain that maps perfectly onto DummyJSON's existing fields:

| DummyJSON Field | Family Tree Use | Blood Donor Use |
|---|---|---|
| `bloodGroup` | Not applicable | ✅ Primary filter |
| `address.city / state` | Not applicable | ✅ Location-based search |
| `phone`, `email` | Peripheral | ✅ Core contact info |
| `age`, `gender` | Basic metadata | ✅ Donor eligibility display |
| `image` | Profile photo | ✅ Donor avatar |

### What Was Reused

The pivot was efficient because the **entire technical foundation** built during the Family Tree phase was carried forward unchanged:

- ✅ **Authentication flow** — login, signup, session persistence, route guards
- ✅ **Pinia store architecture** — modular stores with `auth.ts` as the base
- ✅ **UI shell** — NavBar, ThemeToggle, dark mode system, responsive layout
- ✅ **Project configuration** — Vite, TypeScript, Tailwind, Vue Router setup

Only the **domain logic and data layer** were rebuilt: donor browsing, hospital simulation, blood group filtering, and the request/pledge system.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 (Composition API) | Core framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Utility-first styling |
| Vue Router | Client-side navigation |
| Pinia | Global reactive state |
| DummyJSON REST API | Donor data source |

---

## 🛠️ Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open: **http://localhost:5173/**

---

## 🔑 Demo Credentials

The app uses the **live DummyJSON `/auth/login` endpoint** to simulate JWT authentication.

| Field | Value |
|---|---|
| Username | `emilys` |
| Password | `emilyspass` |

> You can also register a new local account via the **Sign Up** page.

---

## 🌟 Features Implemented

### Mandatory
- ✅ **Vue 3 Composition API** — all logic uses `<script setup>` and composable patterns
- ✅ **Strict TypeScript** — 100% typed with interfaces in `/types/api.ts`, zero `any` usage
- ✅ **Component Architecture** — `NavBar`, `DonorCard`, `HospitalCard`, `FilterBar`, `SkeletonCard`, `ThemeToggle`
- ✅ **Responsive Design** — Mobile → Tablet → Desktop grid via Tailwind flex/grid
- ✅ **API Fetch** — Loads all 200+ donors from `https://dummyjson.com/users`
- ✅ **Search & Filter** — Filter by blood group (dropdown) + city/state (text search)
- ✅ **Detail View** — `/donor/:id` dynamic route with full profile and contact info

### Additional Features
- ✅ **Authentication Simulation** — JWT from DummyJSON `/auth/login` stored in localStorage; local account registration via signup
- ✅ **Bookmarks** — Pinia-powered request list and hospital pledges persisted in localStorage
- ✅ **Dynamic Routing** — `vue-router` with `/donor/:id`, route guards protect all pages
- ✅ **Dark Mode** — Full Tailwind `dark:` class support, toggled via ThemeToggle component, persisted in localStorage
- ✅ **Pagination** — 12 donors per page with smart page-window navigation
- ✅ **Skeleton Loaders** — Animated placeholder cards during API fetch
- ✅ **Filter Pills** — Active filters shown as dismissible pills

---

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.vue          # Top navigation with user avatar, dark mode, links
│   ├── DonorCard.vue       # Donor grid card with request button
│   ├── HospitalCard.vue    # Hospital list card with pledge button
│   ├── FilterBar.vue       # Blood group + location filters with clear button
│   ├── SkeletonCard.vue    # Loading placeholder card
│   └── ThemeToggle.vue     # Dark/light mode toggle button
├── views/
│   ├── LoginView.vue       # Split-panel premium login
│   ├── SignupView.vue      # Donor registration form
│   ├── DashboardView.vue   # Hero + stats + CTA dashboard
│   ├── FindDonorsView.vue  # Donor search with pagination
│   ├── FindHospitalsView.vue  # Hospital list with filters
│   ├── DonorDetailView.vue    # Individual donor profile
│   └── RequestsView.vue       # My Activity — requests & pledges
├── stores/
│   ├── auth.ts             # Login, signup, session management
│   ├── donors.ts           # Fetch donors, request blood, bookmark
│   ├── hospitals.ts        # Static hospital data, pledges
│   └── theme.ts            # Dark/light mode state
├── types/
│   ├── api.ts              # Donor, Hospital, ApiResponse interfaces
│   └── index.ts            # User, AuthResponse, Address interfaces
└── router/
    └── index.ts            # Routes + authentication guard
```