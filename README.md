# 🌌 Interactive Particle Universe with Custom GLSL Shaders

An interactive WebGL particle simulation visualizing three cosmic states: **Galaxy**, **Nebula**, and **Black Hole** — powered by custom **GLSL shaders** and **Three.js**.

🔗 [Live Demo](https://wagiham.github.io/threejs-cosmic-modes/)

---

## Features

- **Three Dynamic Modes**:
  -  **Galaxy** – Spiral-arm structure with orange–purple gradient, orbital motion
  - **Nebula** – Blurred, glowing particles with slow movement and pulsation
  -  **Black Hole** – Matter spirals rapidly inward toward a luminous core

- **Built-in Preset Toggle** via dropdown
- **GLSL Shaders** for animation, color blending, and soft-edge point rendering
- **OrbitControls** for interactive camera movement

---

## 📸 Preview

| Galaxy | Nebula | Black Hole |
|--------|--------|------------|
| <img width="300" src="https://github.com/user-attachments/assets/6c6dbae2-2df3-434a-bfa4-1a15380e85db" alt="Galaxy" /> | <img width="300" src="https://github.com/user-attachments/assets/bd8aa087-a615-43d5-98e0-56e53ab73572" alt="Nebula" /> | <img width="300" src="https://github.com/user-attachments/assets/551e538c-db61-4fae-b540-be788c5ffc2f" alt="Black Hole" /> |



---

## 📁 Project Structure

threejs-cosmic-modes/
├── index.html # Entry point for the UI
├── style.css # Font + layout styling
├── script.js # Three.js setup and shader code
└── README.md # You're here


---

## Technologies Used

- [Three.js](https://threejs.org/) – 3D WebGL engine
- [GLSL](https://thebookofshaders.com/) – For custom vertex & fragment shaders
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) – Mouse-based camera control
- [Skypack](https://www.skypack.dev/) – Fast ES module CDN

---

## 🚀 Run Locally

```bash
git clone https://github.com/wagiham/threejs-cosmic-modes.git
cd threejs-cosmic-modes

Credits: Thank you to Coder Pahadi for the starter code
