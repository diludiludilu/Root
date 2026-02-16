# 🌳 Family Root - Ancestry & Clan Tracker

> "Every name has a story waiting to be told..."

**Family Root** is a modern Single Page Application (SPA) built with **Vue 3** and **TypeScript**. It allows users to search for family members, categorize them by generation, view detailed "personnel files," and save them to a personal "Clan" list.

## ✨ Features

- **🔐 Authentication System:**
  - Secure Login & Signup.
  - User accounts are stored locally (browser memory).
  - Protected Routes (cannot access the app without logging in).

- **🔍 Advanced Search & Sorting:**
  - Real-time search using the DummyJSON API.
  - **Generation Logic:** Automatically sorts results into *Elders (60+)*, *Adults (25-59)*, and *Youth (<25)*.

- **📜 Detail View (Modal):**
  - Click any card to open a "Vintage File" popup.
  - View full details: Address, Blood Group, University, Company, etc.

- **⚔️ My Clan (Global State):**
  - Add members to your personal "Saved List".
  - Uses **Pinia** for state management (Data persists even after refresh).
  - Remove members from your clan.

- **🎨 UI/UX:**
  - Fully responsive design.
  - Custom "Vintage Paper" aesthetic using **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Routing:** Vue Router
- **Icons:** Vintage ASCII Art & Emojis

## 🚀 How to Run the Project

1.  **Clone the repository** (or download the ZIP):
    ```bash
    git clone [https://github.com/your-username/family-root.git](https://github.com/your-username/family-root.git)
    cd family-root
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Open the App:**
    Click the link in your terminal (usually `http://localhost:5173`).

## 🔑 Default Login (For Testing)

You can create a **New Account** on the Signup page, or use these credentials if you have already set them up:

- **Username:** `admin`
- **Password:** `1234`

*(Note: Since this app uses LocalStorage, you will need to Sign Up first on your own machine!)*

## 📂 Project Structure

```bash
src/
├── assets/          # Static images and styles
├── components/      # Reusable UI components (Modals, Cards)
├── router/          # Navigation logic (Login -> Home -> Clan)
├── stores/          # Pinia State Stores (Auth, Clan)
├── views/           # Main Pages (Login, Signup, Home, ClanView)
├── App.vue          # Main App Component
└── main.ts          # Entry Point



Created by Dilsan for University Assignment 2026.