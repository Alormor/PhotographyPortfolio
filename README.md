# Clara Menéndez — Photography Portfolio

A modern, full-stack photography portfolio built from scratch using **React 19**, **Tailwind CSS v4**, **Node.js/Express**, **Better Auth**, and **Drizzle ORM** with **PostgreSQL**.

Live app running on Vercel: https://photography-portfolio-teal.vercel.app/

---

## 📸 Overview

This application serves as an editorial portfolio for photographer Clara Menéndez, featuring dynamic photography showcase galleries, client booking capabilities and an integrated photography workshop ticket reservation system with real-time capacity management and user authentication.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` tokens
- **Auth Client**: [@better-auth/react](https://www.better-auth.com/)
- **Icons**: [Font Awesome](https://fontawesome.com/)

### Backend (Server)
- **Runtime & Server**: [Node.js](https://nodejs.org/) & [Express v5](https://expressjs.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) with cookie-based sessions
- **Database & ORM**: [PostgreSQL (Neon)](https://neon.tech/) managed via [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
- **CORS & Middleware**: Configured for secure cross-origin requests and credentials

---

## ✨ Features

- **Editorial Portfolio Showcase**:
  - Modular component architecture (`Header`, `Hero`, `WorkGallery`, `WorkshopSection`, `About`, `Contact`, `Footer`).
  - Interactive multi-filter by shoot category (*Landscape*, *Portrait*, *Lifestyle*, *Event*).
  - Favorites system with heart toggle (`LikeToggle`) persisted in `localStorage`.
- **Workshop Reservation & Ticketing**:
  - Dynamic workshop schedule loaded directly from the database or API.
  - Interactive seat counter (`QuantityStepper`) with real-time remaining capacity check.
  - Atomic ticket booking process: decrements seat stock and persists user bookings in PostgreSQL.
- **Authentication & User Accounts**:
  - User sign-up, sign-in, and session persistence powered by Better Auth.
  - Protected booking flow with interactive `AuthModal` prompt when unauthenticated users attempt to reserve tickets.
  - Reactive navbar showing user profile status and one-click logout.
- **Responsive & Accessible Design**:
  - Mobile-first responsive layout with zero horizontal overflow.
  - Bespoke design system incorporating editorial typography (*Playfair Display* & *Inter*).

