# 🚀 CodeHub — Enterprise Web Solutions & Digital Asset Platform

<div align="center">

![CodeHub Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  <strong>A modern, high-performance web agency & digital asset platform built with React 19, Tailwind CSS 4, and Vite.</strong><br />
  Engineered with a 2-Tier digital service model, dark futuristic UI, responsive glassmorphism design, and SEO-optimized architecture.
</p>

[✨ Live Demo](#) • [📖 Documentation](#table-of-contents) • [🐛 Report Bug](https://github.com/issues) • [💡 Request Feature](https://github.com/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Design System & Highlights](#-design-system--highlights)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)

---

## 🌟 Overview

**CodeHub** represents an industry-grade web application platform inspired by top digital agency models. Rather than treating websites as one-time expenses, CodeHub advocates for websites as **100% owned digital assets** that drive continuous revenue, scalable traffic, and verified business performance.

### 💡 Core Value Pillars
- **100% Code Ownership:** Complete handover of source code, domains, and cloud deployment pipelines.
- **Two-Tier Service Architecture:** Seamless transition between initial foundation setup (Tier 01) and ongoing monthly operations (Tier 02: Basic, Growth, Performance).
- **Interactive Experience:** Real-time inquiry chatbot, project showcase filters, and dynamic contact workflows.

---

## ✨ Key Features

- **⚡ Blazing Fast Performance:** Powered by Vite 8 with HMR and Tailwind CSS 4 engine.
- **🎨 Modern Dark Aesthetic:** Cyberpunk/Tech-agency inspired palette featuring ambient radial gradients, glowing accents, and glassmorphism.
- **📱 Fully Responsive:** Adaptive layouts optimized for mobile, tablet, and desktop screens with fluid typography.
- **🧩 150+ Portfolio Showcase:** Dynamic filtering across enterprise websites, e-commerce, custom web apps, and high-converting landing pages.
- **💬 Real-Time Consultation Widget:** Embedded interactive chatbot with quick Zalo/Hotline routing.
- **🌐 Internationalization (i18n):** Multi-language capability (Vietnamese & English) ready out of the box.
- **🛡️ Clean Code & Modularity:** Decoupled components, context-driven state management, and strict separation of concerns.

---

## 🛠️ Architecture & Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **[React](https://react.dev/)** | Core Component Library & UI Rendering | `^19.2.4` |
| **[Vite](https://vitejs.dev/)** | Next-generation Frontend Build Tool | `^8.0.4` |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS Framework (Next Gen) | `^4.2.2` |
| **[React Router](https://reactrouter.com/)** | Declarative Client-side Routing | `^7.14.0` |
| **[ESLint](https://eslint.org/)** | Code Quality & Static Analysis | `^9.39.4` |

---

## 📂 Folder Structure

```plaintext
my-app/
├── public/                 # Static assets, logos, and favicons
├── src/
│   ├── api/                # Mock APIs and service layers
│   ├── assets/             # Brand images and SVG vectors
│   ├── auth/               # Authentication handlers & credential stores
│   ├── components/         # Reusable atomic UI components
│   │   ├── layout/         # Header, Footer, Admin layouts
│   │   ├── BrandLogo.jsx   # Vector-based dynamic brand logo
│   │   ├── Navbar.jsx      # Navigation bar with backdrop blur
│   │   └── ...
│   ├── config/             # Brand constants, contact channels, bank details
│   ├── context/            # React Contexts (Catalog, Auth, i18n, Marketplace)
│   ├── data/               # Unified data barrels
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Localization dictionaries (vi, en)
│   ├── mocks/              # Mock dataset for showcase projects & reviews
│   ├── pages/              # Primary route pages (Home, Services, Contact, etc.)
│   ├── utils/              # Helper utilities and storage managers
│   ├── App.jsx             # Root routing and application providers
│   ├── main.jsx            # DOM mounting & bootstrap
│   └── index.css           # Global theme variables & Tailwind imports
├── .github/                # GitHub Actions workflows, issue & PR templates
├── index.html              # HTML5 entry with meta SEO tags
├── package.json            # Project manifest & dependencies
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** `v18.0.0` or higher
- **Package Manager:** `npm`, `yarn`, or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/codehub-platform.git
   cd codehub-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Access the app:
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Starts local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets to the `dist/` directory. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint to check for code style issues and potential bugs. |

---

## 📐 Design System & Highlights

- **Typography:** `Inter` & `Plus Jakarta Sans` for clean, professional tech presentation.
- **Color Palette:**
  - Background: Deep Slate `#020617` / `#0B0F19`
  - Accent Gradients: `#3B82F6` (Electric Blue) → `#06B6D4` (Cyan) → `#6366F1` (Indigo)
  - Success State: Emerald `#10B981`
- **Micro-Interactions:** Smooth hover transitions, backdrop blur modals, glow pills, and responsive touch gestures.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check out our [Contributing Guidelines](CONTRIBUTING.md) for details on code style, commit standards, and pull request workflows.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔒 Security

We take platform security seriously. Please review our [Security Policy](SECURITY.md) to report vulnerabilities responsibly.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Built with ❤️ by the CodeHub Engineering Team. If you find this project helpful, please consider giving it a ⭐!</sub>
</div>
