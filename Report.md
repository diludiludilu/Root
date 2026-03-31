# CS3404 Mini Project Report

## Overview
The "Family Root Finder" SPA was developed using Vue 3 Composition API, TypeScript, Pinia, and Tailwind CSS. It allows users to securely login and assemble historical family records by consuming the remote DummyJSON public API.

## Implemented Features
1. **API Interaction**: Fetches global user directories from `https://dummyjson.com/users` and targeted queries from `/search`.
2. **Search / Filter**: Combines local subset filtering by age block with remote endpoint searching.
3. **Dynamic Routing**: Clicking a user profile leverages Vue Router parameter passing (`/user/:id`) to display a dedicated detail view.
4. **Authentication Simulation**: Submits real credentials securely to `https://dummyjson.com/auth/login`, provisions a JSON Web Token (JWT), and uses granular Vue Router routing guards to restrict global access.
5. **Component Separation**: Logical atomic separation. Decoupled `UserCard.vue` and `NavBar.vue` modules are extensively reused to minimize duplicated UI.
6. **Shopping Cart Integration ("My Family")**: Integrates Pinia reactive state to orchestrate a cross-page bookmark system. Explicit user-storage segregation binds user data individually so logs DO NOT intersect.
7. **Strict Typings**: 100% type-safe application architected through a consolidated TypeScript interface index inside `/types`.
8. **Dark Mode**: Configured robust aesthetic toggling between CSS states via the Tailwind class configuration workflow.

## Component Architectural Diagram
```text
[App.vue]
  ├── [ThemeToggle.vue]
  └── [RouterView]
         ├── [LoginView.vue / SignupView.vue]
         ├── [HomeView.vue]
         │     ├── [NavBar.vue]
         │     └── [UserCard.vue]
         ├── [ClanView.vue]
         │     ├── [NavBar.vue]
         │     └── [UserCard.vue]
         └── [UserDetailView.vue]
               └── [NavBar.vue]
```
