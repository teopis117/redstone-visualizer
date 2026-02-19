# 🧊 NexusLogic | Minecraft EdTech Visualizer

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Three.js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react)

Un simulador 3D de alta fidelidad renderizado en el navegador para visualizar la propagación de energía y lógica booleana, inspirado en las mecánicas de "Redstone" de Minecraft. Diseñado como una herramienta EdTech (Tecnología Educativa) para enseñar fundamentos de ciencias de la computación de forma interactiva y visualmente impactante.

🔗 **[Live Demo]([AQUÍ_PONDRÁS_TU_LINK_DE_VERCEL_O_NETLIFY_EN_EL_FUTURO])** | 📱 **[Ver el Video del Proceso en TikTok/IG]([LINK_A_TU_VIDEO])**

## ✨ Características Principales (MVP)

* **Motor Voxel 3D:** Renderizado de bloques en tiempo real utilizando WebGL a través de `React Three Fiber`.
* **Gestor de Estado Lógico:** Un "Sistema Nervioso Central" construido con `Zustand` que procesa la propagación de señales de forma instantánea y sin latencia.
* **Post-Procesamiento Cinematográfico:** Implementación de *Bloom Shaders* para emitir luz real (Neon Glow) desde la geometría activa.
* **UI Glassmorphism:** Interfaz de usuario responsiva superpuesta (HUD) construida con el motor avanzado de `Tailwind CSS v4`.

## 🛠️ Stack Tecnológico

* **Core:** React 18 + TypeScript + Vite
* **3D / WebGL:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **VFX:** `@react-three/postprocessing`
* **Gestión de Estado:** Zustand
* **Estilos:** Tailwind CSS v4
