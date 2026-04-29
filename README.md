# Blood Donor Finder - CS3404 mini Project

Welcome to the Blood Donor Finder SPA! This project is a modern Vue 3 application built for the CS3404 GUI Programming Mini Project, achieving all strict and bonus requirements.

## 🚀 Tech Stack
- Vue 3 (Composition API)
- TypeScript (Strict, 100% Type Safe, no `any` fallbacks)
- Vite
- Tailwind CSS (Utility-First Responsive Design)
- Vue Router & Pinia 
- Axios / Native Fetch for consuming DummyJSON APIs

## 🛠️ Setup & Run Instructions
1. Extract the project ZIP and navigate to the root directory `Root`.
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```
4. Open the localhost URL (usually `http://localhost:5173/`).

## 🔑 Demo Access
By default, the application is protected by a route guard. You must sign in.
We are using the **Live DummyJSON API endpoint (`/auth/login`)**.
You can use the default DummyJSON credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

## 🌟 Implemented Features & Bonus Tiers
- **Dynamic Routing** (`/user/:id`): Clicking any profile dynamically routes to a standalone Details View.
- **Strict TypeScript**: Used `types/index.ts` to strictly enforce API responses.
- **Component Separation**: Logical chunks (like `NavBar.vue` and `UserCard.vue`) are isolated and reused across the app using slots.
- **Shopping Cart Parity (Family Book)**: Users can add profiles to a global Pinia store. The code is structured securely so that multiple local users automatically partition their "carts" using dynamic storage keys. 
- **Dark Mode**: Automatically respects OS preference and can be toggled via the sun/moon icon.

Enjoy!