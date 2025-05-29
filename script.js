import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";

const PI2 = Math.PI * 2;
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x160016);

let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 4, 60);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let gu = {
  time: { value: 0 },
  color1: { value: new THREE.Color() },
  color2: { value: new THREE.Color() },
  preset: { value: 0 } // 0 = galaxy, 1 = nebula, 2 = blackhole
};

const presets = {
  galaxy: {
    color1: new THREE.Color(227 / 255, 155 / 255, 0),
    color2: new THREE.Color(100 / 255, 50 / 255, 255 / 255),
    amp: 1.0,
    type: 0
  },
  nebula: {
    color1: new THREE.Color(0xff69b4),
    color2: new THREE.Color(0x7fffd4),
    amp: 1.5,
    type: 1
  },
  blackhole: {
    color1: new THREE.Color(1.0, 1.0, 1.0),
    color2: new THREE.Color(0.2, 0.4, 1.0),
    amp: 0.5,
    type: 2
  }
};

let pts = [], sizes = [], shift = [];

function pushShift(amp) {
  shift.push(
    Math.random() * Math.PI,
    Math.random() * PI2,
    (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
    Math.random() * 0.9 + 0.1 * amp
  );
}

function generateGalaxyPoints() {
  pts = [], sizes = [], shift = [];

  for (let i = 0; i < 50000; i++) {
    sizes.push(Math.random() * 1.5 + 0.5);
    pushShift(1.0);
    pts.push(new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5));
  }

  for (let i = 0; i < 100000; i++) {
    let r = 10, R = 40;
    let rand = Math.pow(Math.random(), 1.5);
    let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
    pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * PI2, (Math.random() - 0.5) * 2));
    sizes.push(Math.random() * 1.5 + 0.5);
    pushShift(1.0);
  }
}

generateGalaxyPoints();

let g = new THREE.BufferGeometry().setFromPoints(pts);
g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));

let m = new THREE.PointsMaterial({
  size: 0.2,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  onBeforeCompile: shader => {
    shader.uniforms.time = gu.time;
    shader.uniforms.color1 = gu.color1;
    shader.uniforms.color2 = gu.color2;
    shader.uniforms.preset = gu.preset;

    shader.vertexShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float preset;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      varying float vFade;
      ${shader.vertexShader}
    `.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * sizes * (preset == 1.0 ? (0.5 + 0.5 * sin(time + shift.y * 5.0)) : 1.0);`
    ).replace(
      `#include <color_vertex>`,
      `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40.));
        d = clamp(d, 0., 1.);
        if (preset == 0.0) {
  // Galaxy: orange (core) to purple (outer edge)
  vColor = mix(vec3(227., 155., 0.) / 255., vec3(100., 50., 255.) / 255., d);
} else {
  vColor = mix(color1, color2, d);
}
      `
    ).replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        vec3 pos = position;
        if (preset == 2.0) {
          float r = length(pos.xz);
          float spiralT = time * shift.z * (1.0 + 2.0 * smoothstep(10.0, 0.0, r));
          float angle = atan(pos.z, pos.x) + spiralT;
          float radius = max(2.0, r - 0.015 * time);
          transformed.x = cos(angle) * radius;
          transformed.z = sin(angle) * radius;
          transformed.y = pos.y * 0.95;
          vFade = 1.0 - smoothstep(3.0, 12.0, radius);
        } else {
          float moveT = mod(shift.x + shift.z * time, PI2);
          float moveS = mod(shift.y + shift.z * time, PI2);
          transformed = pos + vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
          vFade = 1.0;
        }
      `
    );

    shader.fragmentShader = `
      varying vec3 vColor;
      varying float vFade;
      ${shader.fragmentShader}
    `.replace(
      `#include <clipping_planes_fragment>`,
      `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
      `
    ).replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `vec4 diffuseColor = vec4(vColor, smoothstep(0.5, 0.1, d) * vFade);`
    );
  }
});

let points = new THREE.Points(g, m);
scene.add(points);

document.getElementById('presetSelector').addEventListener('change', e => {
  const selected = presets[e.target.value];
  gu.color1.value = selected.color1;
  gu.color2.value = selected.color2;
  gu.preset.value = selected.type;
  document.getElementById('word').textContent = e.target.options[e.target.selectedIndex].text;

  if (e.target.value === 'galaxy') {
    generateGalaxyPoints();
  } else {
    pts = [], sizes = [], shift = [];
    for (let i = 0; i < 100000; i++) {
      let r = Math.pow(Math.random(), 1.5) * 30;
      let angle = Math.random() * PI2;
      let x = Math.cos(angle) * r;
      let z = Math.sin(angle) * r;
      let y = (Math.random() - 0.5) * 10;
      pts.push(new THREE.Vector3(x, y, z));
      sizes.push(Math.random() * 2.5 + 1);
      pushShift(selected.amp);
    }
  }

  g.setFromPoints(pts);
  g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
  g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
});

let clock = new THREE.Clock();

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(() => {
  gu.time.value = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
});
