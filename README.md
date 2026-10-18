# Clara Menéndez — Photography Portfolio

A modern, responsive photography portfolio web application rebuilt from scratch using **React**, **Vite**, and **Tailwind CSS**.

---

## 📸 Overview

This project is a fictional editorial photography portfolio.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Font Awesome](https://fontawesome.com/)


---

## ✨ Features

- **Component Architecture**: Modular sections including `Header`, `Hero`, `WorkGallery`, `About`, `Contact`, and `Footer`.
- **Centralized Data**: All gallery works and metadata are structured in a single data file (`src/data/portfolioData.js`).
- **Interactive Multi-Filter (`useState`)**:
  - Filter by shoot categories: *Landscape*, *Portrait*, *Lifestyle*, and *Event*.
  - Combine category filters with a **Favorites** toggle to view saved photographs across any category.
- **Controlled Like Component**: Reusable `LikeToggle` heart component for each portfolio item, following controlled component patterns with persistent state stored in `localStorage`.
- **Mobile-First Responsive Design**: Tailored layout scales seamlessly from mobile screens to desktop with no horizontal overflow.
- **Custom Design System**: Tailwind CSS v4 `@theme` integration using bespoke palette tokens (`--color-bg`, `--color-surface`, `--color-accent`) and Google Fonts (*Inter* & *Playfair Display*).

---
