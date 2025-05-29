# 🌌 Three.js Cosmic Modes

An interactive WebGL particle simulation visualizing three cosmic states: **Galaxy**, **Nebula**, and **Black Hole** — powered by custom **GLSL shaders** and **Three.js**.

🔗 [Live Demo](https://wagiham.github.io/threejs-cosmic-modes/)

---

## 🌀 Features

- **Three Dynamic Modes**:
  - 🟠🟣 **Galaxy** – Spiral-arm structure with orange–purple gradient, orbital motion
  - ☁️ **Nebula** – Blurred, glowing particles with slow movement and pulsation
  - 🕳️ **Black Hole** – Matter spirals rapidly inward toward a luminous core

- **Built-in Preset Toggle** via dropdown
- **GLSL Shaders** for animation, color blending, and soft-edge point rendering
- **OrbitControls** for interactive camera movement

---

## 📸 Preview

| Galaxy | Nebula | Black Hole |
|--------|--------|-------------|
| ![Galaxy](assets/galaxy.png) | ![Nebula](assets/nebula.png) | ![Black Hole](assets/blackhole.png) |

> (Make sure to add actual `assets/` images if hosting locally.)

---

## 📁 Project Structure

threejs-cosmic-modes/
├── index.html # Entry point for the UI
├── style.css # Font + layout styling
├── script.js # Three.js setup and shader code
└── README.md # You're here


---

## 🧠 Technologies Used

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
