import * as THREE from "three";
import { withBasePath } from "../../config/deployment";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  eclipticVectorToSceneAxes,
  moonVectorToSceneOffset,
  physicalVectorToScenePosition,
} from "./astronomical-display";
import type { ObservationContext } from "../../lib/observation-context";
import {
  createBirthLocationMarkerPresentation,
  createEarthPresentationFrame,
  EARTH_TEXTURE_ASSET,
} from "./earth-presentation";
import type { BodyOrientation, EphemerisProvider } from "./ephemeris-provider";
import {
  advanceSolarSceneClock,
  beginBirthSnapshot,
  createPlanetFocusState,
  handoffBirthEarthToObserver,
  returnToSolarOverview,
  setSolarScenePaused,
  setSolarSceneTimestamp,
  setSolarSceneToNow,
  SOLAR_OVERVIEW_STATE,
  type BeginBirthSnapshotResult,
  type SolarSceneState,
} from "./solar-scene-state";
import {
  PLANETS,
  type PlanetDefinition,
  type PlanetId,
  type PlanetVisualStyle,
} from "./solar-system-data";
import { SimulationClock, cameraTransitionProgress } from "./simulation-time";

type SceneCallbacks = {
  onSelect: (planetId: PlanetId) => void;
  onHover: (planetId: PlanetId | null) => void;
  onError: () => void;
  onSimulationTimeChange: (timestampUtcMs: number) => void;
  onBirthObserverHandoff?: (context: ObservationContext) => void;
};

type PlanetRuntime = {
  definition: PlanetDefinition;
  bodyRoot: THREE.Group;
  spinRoot: THREE.Group;
  label: THREE.Sprite;
  highlight: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  orbitLine: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  moonOrbitLine?: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  moonRoot?: THREE.Group;
  moonSpinRoot?: THREE.Group;
  cloudLayer?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  birthMarker?: THREE.Group;
};

type CameraTransition = {
  startedAt: number;
  duration: number;
  fromPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toOffset: THREE.Vector3;
  targetPlanetId: PlanetId | null;
  onComplete?: () => void;
};

const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);
const PLANET_SEGMENTS = 48;

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function seededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value * 1_664_525 + 1_013_904_223) >>> 0;
    return value / 4_294_967_296;
  };
}

function createPlanetTexture(style: PlanetVisualStyle): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const palettes: Record<PlanetVisualStyle, readonly [string, string, string]> = {
    mercury: ["#6f716f", "#a8a39b", "#4b4d4c"],
    venus: ["#b36f36", "#e4b76e", "#8e512c"],
    earth: ["#0b3973", "#1764a5", "#8ec7e8"],
    mars: ["#8c321f", "#c05a32", "#5e271d"],
    jupiter: ["#a87858", "#e2c19a", "#654333"],
    saturn: ["#c2a875", "#ead7a4", "#8e744f"],
    uranus: ["#75bbc7", "#b2e2e4", "#4e929f"],
    neptune: ["#174ea0", "#397dcc", "#0c2d69"],
  };
  const palette = palettes[style];
  const random = seededRandom(style.length * 9_973);

  const baseGradient = context.createLinearGradient(0, 0, 0, canvas.height);
  baseGradient.addColorStop(0, palette[1]);
  baseGradient.addColorStop(0.22, palette[0]);
  baseGradient.addColorStop(0.78, palette[0]);
  baseGradient.addColorStop(1, palette[2]);
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (style === "jupiter" || style === "saturn" || style === "venus") {
    const bandStep = style === "jupiter" ? 15 : style === "saturn" ? 20 : 24;
    for (let y = 5; y < canvas.height; y += bandStep) {
      context.globalAlpha = style === "venus" ? 0.22 + random() * 0.2 : 0.3 + random() * 0.3;
      context.strokeStyle = random() > 0.48 ? palette[1] : palette[2];
      context.lineWidth = 5 + random() * (style === "jupiter" ? 9 : 6);
      context.beginPath();
      context.moveTo(-20, y + random() * 7);
      context.bezierCurveTo(125, y - 8, 330, y + 9, 532, y - 3);
      context.stroke();
    }
    if (style === "jupiter") {
      context.globalAlpha = 0.9;
      const spot = context.createRadialGradient(376, 158, 2, 376, 158, 32);
      spot.addColorStop(0, "#d08461");
      spot.addColorStop(0.6, "#a94f39");
      spot.addColorStop(1, "rgba(91,47,37,0)");
      context.fillStyle = spot;
      context.beginPath();
      context.ellipse(376, 158, 34, 14, -0.08, 0, Math.PI * 2);
      context.fill();
    }
  } else if (style === "earth") {
    context.fillStyle = "#4f8a56";
    const landMasses = [
      [56, 34, 23, 12],
      [86, 72, 17, 25],
      [145, 42, 30, 17],
      [188, 82, 20, 11],
    ];
    for (const [x, y, rx, ry] of landMasses) {
      context.beginPath();
      context.ellipse(x, y, rx, ry, random() - 0.5, 0, Math.PI * 2);
      context.fill();
    }
    context.strokeStyle = "rgba(255,255,255,.32)";
    context.lineWidth = 1.4;
    for (let index = 0; index < 6; index += 1) {
      context.beginPath();
      const startY = 10 + index * 20;
      context.moveTo(18 + random() * 34, startY);
      context.bezierCurveTo(78, startY - 9, 130, startY + 12, 190 + random() * 42, startY - 2);
      context.stroke();
    }
  } else {
    const markCount = style === "mercury" || style === "mars" ? 130 : 75;
    for (let index = 0; index < markCount; index += 1) {
      context.globalAlpha = 0.1 + random() * 0.32;
      context.fillStyle = random() > 0.5 ? palette[1] : palette[2];
      context.beginPath();
      context.ellipse(
        random() * canvas.width,
        random() * canvas.height,
        2 + random() * (style === "mercury" ? 15 : 28),
        1 + random() * (style === "mercury" ? 10 : 9),
        random() * Math.PI,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    if (style === "mars") {
      context.globalAlpha = 0.55;
      context.fillStyle = "#4d211b";
      context.beginPath();
      context.ellipse(318, 135, 66, 18, -0.2, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "rgba(240,222,197,.8)";
      context.fillRect(0, 0, canvas.width, 7);
    }
    if (style === "uranus" || style === "neptune") {
      context.globalAlpha = 0.18;
      context.strokeStyle = palette[1];
      context.lineWidth = 5;
      for (let y = 35; y < canvas.height; y += 34) {
        context.beginPath();
        context.moveTo(0, y);
        context.bezierCurveTo(140, y - 5, 360, y + 5, canvas.width, y);
        context.stroke();
      }
    }
    if (style === "neptune") {
      context.globalAlpha = 0.35;
      context.fillStyle = "#071d58";
      context.beginPath();
      context.ellipse(360, 150, 25, 10, 0, 0, Math.PI * 2);
      context.fill();
    }
  }

  context.globalAlpha = 1;
  const shading = context.createLinearGradient(0, 0, 0, canvas.height);
  shading.addColorStop(0, "rgba(255,255,255,.18)");
  shading.addColorStop(0.52, "rgba(255,255,255,0)");
  shading.addColorStop(1, "rgba(0,0,0,.22)");
  context.fillStyle = shading;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function createSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const random = seededRandom(28_061);
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#fff1a6");
  gradient.addColorStop(0.22, "#ffc34f");
  gradient.addColorStop(0.72, "#f58a24");
  gradient.addColorStop(1, "#ffcf58");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 260; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 1 + random() * 8;
    context.globalAlpha = 0.08 + random() * 0.2;
    context.fillStyle = random() > 0.42 ? "#fff5c2" : "#d95d18";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 0.24;
  context.strokeStyle = "#fff3ad";
  context.lineWidth = 3;
  for (let y = 16; y < canvas.height; y += 28) {
    context.beginPath();
    context.moveTo(-20, y);
    context.bezierCurveTo(120, y - 16, 340, y + 18, 532, y - 5);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const random = seededRandom(11_243);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < 92; index += 1) {
    const x = random() * canvas.width;
    const y = 18 + random() * (canvas.height - 36);
    const width = 9 + random() * 42;
    const height = 2 + random() * 8;
    const cloud = context.createRadialGradient(x, y, 1, x, y, width);
    cloud.addColorStop(0, `rgba(255,255,255,${0.18 + random() * 0.3})`);
    cloud.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = cloud;
    context.beginPath();
    context.ellipse(x, y, width, height, random() - 0.5, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const center = canvas.width / 2;
  const ring = context.createRadialGradient(center, center, 126, center, center, 254);
  ring.addColorStop(0, "rgba(204, 188, 151, 0.18)");
  ring.addColorStop(0.08, "rgba(224, 207, 166, 0.42)");
  ring.addColorStop(0.2, "rgba(235, 218, 177, 0.55)");
  ring.addColorStop(0.34, "rgba(197, 181, 145, 0.34)");
  ring.addColorStop(0.45, "rgba(229, 211, 170, 0.46)");
  ring.addColorStop(0.49, "rgba(116, 105, 86, 0.08)");
  ring.addColorStop(0.535, "rgba(110, 99, 82, 0.045)");
  ring.addColorStop(0.58, "rgba(220, 202, 164, 0.3)");
  ring.addColorStop(0.72, "rgba(239, 221, 181, 0.44)");
  ring.addColorStop(0.86, "rgba(205, 188, 153, 0.25)");
  ring.addColorStop(0.97, "rgba(230, 214, 178, 0.1)");
  ring.addColorStop(1, "rgba(230, 214, 178, 0)");
  context.fillStyle = ring;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createAtmosphereMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(mat3(modelMatrix) * normal);
        vViewDirection = normalize(cameraPosition - worldPosition.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        float rim = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), 4.6);
        gl_FragColor = vec4(0.2, 0.54, 1.0, rim * 0.11);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const gradient = context.createRadialGradient(64, 64, 6, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,230,1)");
  gradient.addColorStop(0.18, "rgba(255,187,73,.72)");
  gradient.addColorStop(0.5, "rgba(255,115,29,.2)");
  gradient.addColorStop(1, "rgba(255,94,15,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createLabelTexture(label: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 96;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }

  context.fillStyle = "rgba(4, 10, 24, .8)";
  context.beginPath();
  context.roundRect(12, 10, 296, 68, 22);
  context.fill();
  context.strokeStyle = "rgba(189, 213, 255, .32)";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "#f5f7ff";
  context.font = "600 30px Segoe UI, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, 160, 44);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createOrbitLine(radius: number): THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const points = Array.from({ length: 160 }, (_, index) => {
    const angle = (index / 160) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x7890b4,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
  });
  return new THREE.LineLoop(geometry, material);
}

export class SolarSystemRenderer {
  private readonly mount: HTMLElement;
  private readonly callbacks: SceneCallbacks;
  private readonly reducedMotion: boolean;
  private readonly ephemerisProvider: EphemerisProvider;
  private readonly simulationClock: SimulationClock;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 800);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly timer = new THREE.Timer();
  private readonly planets = new Map<PlanetId, PlanetRuntime>();
  private readonly selectable: THREE.Object3D[] = [];
  private readonly resizeObserver: ResizeObserver;
  private animationFrame = 0;
  private pageHidden = false;
  private hoveredPlanetId: PlanetId | null = null;
  private focusedPlanetId: PlanetId | null = null;
  private sceneState: SolarSceneState = SOLAR_OVERVIEW_STATE;
  private transition: CameraTransition | null = null;
  private followedTarget = new THREE.Vector3();
  private pointerDown = new THREE.Vector2();
  private dragging = false;
  private labelsVisible = true;
  private orbitsVisible = true;
  private lastEphemerisTimestamp = Number.NaN;
  private lastTimeNotificationAt = 0;
  private disposed = false;
  private sun?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  private sunGlow?: THREE.Sprite;
  private sunCorona?: THREE.Sprite;
  private decorativeStars?: THREE.Group;

  constructor(
    mount: HTMLElement,
    callbacks: SceneCallbacks,
    reducedMotion: boolean,
    ephemerisProvider: EphemerisProvider,
    simulationClock: SimulationClock,
  ) {
    this.mount = mount;
    this.callbacks = callbacks;
    this.reducedMotion = reducedMotion;
    this.ephemerisProvider = ephemerisProvider;
    this.simulationClock = simulationClock;

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      callbacks.onError();
      throw new Error("WebGL renderer could not be created.");
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.setClearColor(0x02050d, 1);
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.touchAction = "none";
    mount.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.055;
    this.controls.enablePan = false;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 260;
    this.controls.rotateSpeed = 0.62;
    this.controls.zoomSpeed = 0.8;
    this.timer.connect(document);

    this.buildScene();
    this.syncAstronomicalState(this.simulationClock.getTimestamp());
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(mount);
    this.handleResize();
    this.showOverview(false);

    const canvas = this.renderer.domElement;
    canvas.addEventListener("pointerdown", this.handlePointerDown);
    canvas.addEventListener("pointermove", this.handlePointerMove);
    canvas.addEventListener("pointerup", this.handlePointerUp);
    canvas.addEventListener("pointerleave", this.handlePointerLeave);
    document.addEventListener("visibilitychange", this.handleVisibility);

    this.animate();
  }

  private buildScene(): void {
    this.scene.fog = new THREE.FogExp2(0x02050d, 0.0024);
    this.scene.add(new THREE.HemisphereLight(0x607fae, 0x050814, 0.26));

    const sunLight = new THREE.PointLight(0xffd6a0, 3_600, 190, 1.55);
    this.scene.add(sunLight);

    const sunTexture = createSunTexture();
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissiveMap: sunTexture,
      emissive: 0xff8a20,
      emissiveIntensity: 1.65,
      color: 0xffd36c,
      roughness: 1,
    });
    this.sun = new THREE.Mesh(new THREE.SphereGeometry(4.2, 64, 48), sunMaterial);
    this.sun.name = "Sun";
    this.scene.add(this.sun);

    const glowMaterial = new THREE.SpriteMaterial({
      map: createGlowTexture(),
      color: 0xffbd62,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.sunGlow = new THREE.Sprite(glowMaterial);
    this.sunGlow.scale.set(14.5, 14.5, 1);
    this.scene.add(this.sunGlow);

    const coronaMaterial = new THREE.SpriteMaterial({
      map: createGlowTexture(),
      color: 0xff7c2b,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.sunCorona = new THREE.Sprite(coronaMaterial);
    this.sunCorona.scale.set(20, 20, 1);
    this.scene.add(this.sunCorona);

    this.createStarField();
    for (const definition of PLANETS) {
      this.createPlanet(definition);
    }
  }

  private loadLocalTexture(
    path: string,
    onLoad: (texture: THREE.Texture) => void,
  ): void {
    const loader = new THREE.TextureLoader();
    loader.load(
      withBasePath(path),
      (texture) => {
        if (this.disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
        onLoad(texture);
      },
      undefined,
      () => {
        // The procedural fallback remains visible if a local asset cannot load.
      },
    );
  }

  private createStarField(): void {
    const starField = new THREE.Group();
    starField.name = "Decorative solar overview stars";
    const count = 2_000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const random = seededRandom(42_019);
    const color = new THREE.Color();

    for (let index = 0; index < count; index += 1) {
      const radius = 105 + random() * 230;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      color.setHSL(0.55 + random() * 0.12, 0.2 + random() * 0.35, 0.6 + random() * 0.35);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.42,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.74,
      depthWrite: false,
    });
    starField.add(new THREE.Points(geometry, material));

    const brightCount = 240;
    const brightPositions = new Float32Array(brightCount * 3);
    for (let index = 0; index < brightCount; index += 1) {
      const radius = 120 + random() * 205;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      brightPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      brightPositions[index * 3 + 1] = radius * Math.cos(phi);
      brightPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const brightGeometry = new THREE.BufferGeometry();
    brightGeometry.setAttribute("position", new THREE.BufferAttribute(brightPositions, 3));
    starField.add(new THREE.Points(
      brightGeometry,
      new THREE.PointsMaterial({
        color: 0xdcecff,
        size: 0.95,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
    ));
    this.decorativeStars = starField;
    this.scene.add(starField);
  }

  private createPlanet(definition: PlanetDefinition): void {
    const orbitPlane = new THREE.Group();
    orbitPlane.rotation.z = definition.visual.inclination;
    const orbitLine = createOrbitLine(definition.visual.orbitRadius);
    orbitPlane.add(orbitLine);
    this.scene.add(orbitPlane);

    const bodyRoot = new THREE.Group();
    this.scene.add(bodyRoot);

    const spinRoot = new THREE.Group();
    bodyRoot.add(spinRoot);

    const surfaceTexture = createPlanetTexture(definition.visual.style);
    const material = new THREE.MeshStandardMaterial({
      map: surfaceTexture,
      color: definition.id === "mercury" ? 0x787878 : 0xffffff,
      roughness: definition.id === "earth" ? 0.78 : 0.94,
      metalness: 0,
      emissive: definition.id === "earth" ? 0x14243b : 0x000000,
      emissiveMap: definition.id === "earth" ? surfaceTexture : null,
      emissiveIntensity: definition.id === "earth" ? 0.16 : 0,
    });
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(definition.visual.radius, PLANET_SEGMENTS, 32),
      material,
    );
    planet.userData.planetId = definition.id;
    spinRoot.add(planet);
    this.selectable.push(planet);

    if (definition.id === "earth") {
      this.loadLocalTexture(EARTH_TEXTURE_ASSET.publicPath, (texture) => {
        material.map?.dispose();
        material.map = texture;
        material.emissiveMap = texture;
        material.needsUpdate = true;
      });
    }

    const hitTarget = new THREE.Mesh(
      new THREE.SphereGeometry(definition.visual.radius * 1.48, 18, 12),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    hitTarget.userData.planetId = definition.id;
    bodyRoot.add(hitTarget);
    this.selectable.push(hitTarget);

    const highlight = new THREE.Mesh(
      new THREE.SphereGeometry(definition.visual.radius * 1.06, 32, 20),
      new THREE.MeshBasicMaterial({
        color: 0xaed6ff,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    highlight.visible = false;
    bodyRoot.add(highlight);

    let cloudLayer: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | undefined;
    let birthMarker: THREE.Group | undefined;
    if (definition.id === "earth") {
      const cloudMaterial = new THREE.MeshStandardMaterial({
        map: createCloudTexture(),
        alphaMap: createCloudTexture(),
        color: 0xf4f8ff,
        transparent: true,
        opacity: 0.34,
        roughness: 1,
        depthWrite: false,
      });
      cloudLayer = new THREE.Mesh(
        new THREE.SphereGeometry(definition.visual.radius * 1.014, PLANET_SEGMENTS, 32),
        cloudMaterial,
      );
      spinRoot.add(cloudLayer);

      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(definition.visual.radius * 1.032, PLANET_SEGMENTS, 32),
        createAtmosphereMaterial(),
      );
      bodyRoot.add(atmosphere);

      birthMarker = new THREE.Group();
      birthMarker.name = "Birth location marker";
      const markerDot = new THREE.Mesh(
        new THREE.SphereGeometry(definition.visual.radius * 0.055, 20, 14),
        new THREE.MeshBasicMaterial({ color: 0xffd36c, depthTest: false }),
      );
      const markerHalo = new THREE.Mesh(
        new THREE.SphereGeometry(definition.visual.radius * 0.095, 20, 14),
        new THREE.MeshBasicMaterial({
          color: 0xffbd62,
          transparent: true,
          opacity: 0.2,
          depthTest: false,
          depthWrite: false,
        }),
      );
      birthMarker.add(markerDot, markerHalo);
      birthMarker.visible = false;
      spinRoot.add(birthMarker);
    }

    if (definition.id === "saturn") {
      const ringTexture = createRingTexture();
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(definition.visual.radius * 1.28, definition.visual.radius * 2.55, 128),
        new THREE.MeshBasicMaterial({
          map: ringTexture,
          color: 0xddcba4,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.82,
          alphaTest: 0.015,
          depthWrite: false,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      spinRoot.add(ring);
    }

    if (definition.id === "uranus") {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(definition.visual.radius * 1.45, definition.visual.radius * 1.78, 72),
        new THREE.MeshBasicMaterial({
          color: 0xaedce2,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.07,
          depthWrite: false,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      spinRoot.add(ring);
    }

    let moonRoot: THREE.Group | undefined;
    let moonSpinRoot: THREE.Group | undefined;
    let moonOrbitLine: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial> | undefined;
    if (definition.id === "earth") {
      const earthMoonSystem = this.createEarthMoonSystem(bodyRoot);
      moonRoot = earthMoonSystem.moonRoot;
      moonSpinRoot = earthMoonSystem.moonSpinRoot;
      moonOrbitLine = earthMoonSystem.moonOrbitLine;
    }

    const labelMaterial = new THREE.SpriteMaterial({
      map: createLabelTexture(definition.nameVi),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const label = new THREE.Sprite(labelMaterial);
    label.position.y = definition.visual.radius + 1.25;
    label.scale.set(3.85, 1.16, 1);
    label.material.opacity = 0.78;
    label.renderOrder = 10;
    label.raycast = () => undefined;
    bodyRoot.add(label);

    this.planets.set(definition.id, {
      definition,
      bodyRoot,
      spinRoot,
      label,
      highlight,
      orbitLine,
      moonOrbitLine,
      moonRoot,
      moonSpinRoot,
      cloudLayer,
      birthMarker,
    });
  }

  private createEarthMoonSystem(earthRoot: THREE.Group): {
    moonRoot: THREE.Group;
    moonSpinRoot: THREE.Group;
    moonOrbitLine: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  } {
    const moonOrbitLine = createOrbitLine(3.2);
    moonOrbitLine.material.color.set(0x9db8d9);
    moonOrbitLine.material.opacity = 0.09;
    earthRoot.add(moonOrbitLine);

    const moonRoot = new THREE.Group();
    earthRoot.add(moonRoot);

    const moonSpinRoot = new THREE.Group();
    moonRoot.add(moonSpinRoot);

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: createPlanetTexture("mercury"),
      roughness: 1,
    });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.36, 36, 24), moonMaterial);
    moonSpinRoot.add(moon);
    this.loadLocalTexture("/solar-system/textures/moon-lroc-color-2k.jpg", (texture) => {
      moonMaterial.map?.dispose();
      moonMaterial.map = texture;
      moonMaterial.needsUpdate = true;
    });
    return { moonRoot, moonSpinRoot, moonOrbitLine };
  }

  private getOverviewOffset(): THREE.Vector3 {
    const aspect = Math.max(this.camera.aspect, 0.35);
    const scale = Math.max(1, 0.76 / aspect);
    return new THREE.Vector3(0, 46.5 * scale, 89.5 * scale);
  }

  private getFocusFramingScale(): number {
    const aspect = Math.max(this.camera.aspect, 0.35);
    if (aspect < 0.55) {
      return 1.85;
    }
    if (aspect < 0.8) {
      return 1.2;
    }
    return 1;
  }

  private getPlanetWorldPosition(planetId: PlanetId, target = new THREE.Vector3()): THREE.Vector3 {
    const runtime = this.planets.get(planetId);
    if (!runtime) {
      return target.set(0, 0, 0);
    }
    return runtime.bodyRoot.getWorldPosition(target);
  }

  private getPlanetCameraTarget(planetId: PlanetId, target = new THREE.Vector3()): THREE.Vector3 {
    const runtime = this.planets.get(planetId);
    this.getPlanetWorldPosition(planetId, target);
    target.y += runtime?.definition.visual.camera.targetYOffset ?? 0;
    return target;
  }

  private applyBodyOrientation(group: THREE.Group | THREE.Mesh, orientation: BodyOrientation): void {
    const mappedPole = eclipticVectorToSceneAxes(orientation.northPole);
    const north = new THREE.Vector3(mappedPole.x, mappedPole.y, mappedPole.z).normalize();
    const alignNorth = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      north,
    );
    const spin = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      THREE.MathUtils.degToRad(orientation.spinDegrees),
    );
    group.quaternion.copy(alignNorth).multiply(spin);
  }

  private applyEarthPresentationFrame(group: THREE.Group, timestampUtcMs: number): void {
    const frame = createEarthPresentationFrame(timestampUtcMs);
    const basis = new THREE.Matrix4().makeBasis(
      new THREE.Vector3(frame.xGreenwich.x, frame.xGreenwich.y, frame.xGreenwich.z),
      new THREE.Vector3(frame.yNorth.x, frame.yNorth.y, frame.yNorth.z),
      new THREE.Vector3(frame.zWest.x, frame.zWest.y, frame.zWest.z),
    );
    group.quaternion.setFromRotationMatrix(basis);
  }

  private syncAstronomicalState(timestampUtcMs: number): void {
    if (timestampUtcMs === this.lastEphemerisTimestamp) {
      return;
    }

    const state = this.ephemerisProvider.getPhysicalState(timestampUtcMs);
    for (const [planetId, runtime] of this.planets) {
      const planetState = state.planets[planetId];
      const position = physicalVectorToScenePosition(planetState.heliocentric);
      runtime.bodyRoot.position.set(position.x, position.y, position.z);
      if (planetId === "earth") {
        this.applyEarthPresentationFrame(runtime.spinRoot, timestampUtcMs);
      } else {
        this.applyBodyOrientation(runtime.spinRoot, planetState.orientation);
      }
    }

    const earth = this.planets.get("earth");
    if (earth?.moonRoot && earth.moonSpinRoot) {
      const moonOffset = moonVectorToSceneOffset(state.moon.geocentric);
      earth.moonRoot.position.set(moonOffset.x, moonOffset.y, moonOffset.z);
      this.applyBodyOrientation(earth.moonSpinRoot, state.moon.orientation);
    }

    if (this.sun) {
      this.applyBodyOrientation(this.sun, state.sunOrientation);
    }
    this.lastEphemerisTimestamp = timestampUtcMs;
  }

  private notifySimulationTime(realNowMs: number, force = false): void {
    if (force || realNowMs - this.lastTimeNotificationAt >= 250) {
      this.lastTimeNotificationAt = realNowMs;
      this.callbacks.onSimulationTimeChange(this.simulationClock.getTimestamp());
    }
  }

  private focusPlanetVisual(planetId: PlanetId, onComplete?: () => void): void {
    const runtime = this.planets.get(planetId);
    if (!runtime) {
      return;
    }

    this.focusedPlanetId = planetId;
    const planetPosition = this.getPlanetWorldPosition(planetId);
    const target = this.getPlanetCameraTarget(planetId);
    const radial = planetPosition.clone().normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(radial).normalize();
    const cameraConfig = runtime.definition.visual.camera;
    const direction = radial.clone()
      .multiplyScalar(cameraConfig.radial)
      .addScaledVector(tangent, cameraConfig.tangent)
      .add(new THREE.Vector3(0, cameraConfig.height, 0))
      .normalize();
    direction.multiplyScalar(cameraConfig.distance * this.getFocusFramingScale());
    this.transition = {
      startedAt: performance.now(),
      duration: this.reducedMotion ? 0 : 1_150,
      fromPosition: this.camera.position.clone(),
      fromTarget: this.controls.target.clone(),
      toOffset: direction,
      targetPlanetId: planetId,
      onComplete,
    };
    this.followedTarget.copy(target);
    for (const [runtimePlanetId, planet] of this.planets) {
      planet.label.visible = false;
      planet.bodyRoot.visible = runtimePlanetId === planetId;
    }
    this.updateHighlights();
    this.updateOrbitHierarchy();
  }

  focusPlanet(planetId: PlanetId): void {
    this.sceneState = createPlanetFocusState(planetId);
    this.setDecorativeStarsVisible(true);
    this.setBirthMarker(null);
    this.focusPlanetVisual(planetId);
  }

  showOverview(animate = true): void {
    this.sceneState = returnToSolarOverview();
    this.setDecorativeStarsVisible(true);
    this.setBirthMarker(null);
    this.focusedPlanetId = null;
    this.transition = {
      startedAt: performance.now(),
      duration: animate && !this.reducedMotion ? 1_200 : 0,
      fromPosition: this.camera.position.clone(),
      fromTarget: this.controls.target.clone(),
      toOffset: this.getOverviewOffset(),
      targetPlanetId: null,
    };
    for (const planet of this.planets.values()) {
      planet.bodyRoot.visible = true;
      planet.label.visible = this.labelsVisible;
    }
    this.updateHighlights();
    this.updateOrbitHierarchy();
  }

  getSceneState(): SolarSceneState {
    return this.sceneState;
  }

  enterBirthEarth(context: ObservationContext): BeginBirthSnapshotResult {
    const result = beginBirthSnapshot(context, this.simulationClock);
    if (!result.ok) {
      return result;
    }

    this.sceneState = result.state;
    this.syncAstronomicalState(context.timestampUtcMs);
    this.notifySimulationTime(performance.now(), true);
    this.setDecorativeStarsVisible(true);
    this.setBirthMarker(context);
    this.focusPlanetVisual("earth", () => {
      const observerState = handoffBirthEarthToObserver(this.sceneState);
      if (!observerState) {
        return;
      }
      this.sceneState = observerState;
      this.setDecorativeStarsVisible(false);
      this.callbacks.onBirthObserverHandoff?.(observerState.context);
    });
    return result;
  }

  private setDecorativeStarsVisible(visible: boolean): void {
    if (this.decorativeStars) {
      this.decorativeStars.visible = visible;
    }
  }

  private setBirthMarker(context: ObservationContext | null): void {
    const earth = this.planets.get("earth");
    if (!earth?.birthMarker) {
      return;
    }
    if (!context) {
      earth.birthMarker.visible = false;
      return;
    }
    const presentation = createBirthLocationMarkerPresentation(context);
    earth.birthMarker.position.set(
      presentation.localDirection.x,
      presentation.localDirection.y,
      presentation.localDirection.z,
    ).multiplyScalar(earth.definition.visual.radius * 1.075);
    earth.birthMarker.visible = true;
  }

  setPaused(paused: boolean): void {
    setSolarScenePaused(this.sceneState, this.simulationClock, paused);
  }

  setSimulationSpeed(speed: number): void {
    this.simulationClock.setSpeed(speed);
  }

  setSimulationTime(timestampUtcMs: number): void {
    if (!setSolarSceneTimestamp(this.sceneState, this.simulationClock, timestampUtcMs)) {
      return;
    }
    this.syncAstronomicalState(this.simulationClock.getTimestamp());
    this.notifySimulationTime(performance.now(), true);
  }

  setToNow(): void {
    if (!setSolarSceneToNow(this.sceneState, this.simulationClock)) {
      return;
    }
    this.syncAstronomicalState(this.simulationClock.getTimestamp());
    this.notifySimulationTime(performance.now(), true);
  }

  setLabelsVisible(visible: boolean): void {
    this.labelsVisible = visible;
    for (const runtime of this.planets.values()) {
      runtime.label.visible = visible && this.focusedPlanetId === null;
    }
  }

  setOrbitsVisible(visible: boolean): void {
    this.orbitsVisible = visible;
    this.updateOrbitHierarchy();
  }

  private updateOrbitHierarchy(): void {
    for (const [planetId, runtime] of this.planets) {
      runtime.orbitLine.visible = this.orbitsVisible;
      if (!this.focusedPlanetId) {
        runtime.orbitLine.material.opacity = planetId === this.hoveredPlanetId ? 0.19 : 0.09;
      } else if (planetId === this.focusedPlanetId) {
        runtime.orbitLine.material.opacity = planetId === "earth" ? 0.04 : 0.24;
      } else {
        runtime.orbitLine.material.opacity = 0.035;
      }

      if (runtime.moonOrbitLine) {
        runtime.moonOrbitLine.visible = this.orbitsVisible;
        runtime.moonOrbitLine.material.opacity = this.focusedPlanetId === "earth" ? 0.25 : 0.075;
      }
    }
  }

  private updateHighlights(): void {
    for (const [planetId, runtime] of this.planets) {
      runtime.highlight.visible = planetId === this.focusedPlanetId || planetId === this.hoveredPlanetId;
      runtime.highlight.material.opacity = planetId === this.focusedPlanetId ? 0.09 : 0.06;
    }
    this.updateOrbitHierarchy();
  }

  private updateCamera(now: number): void {
    if (this.transition) {
      const target = this.transition.targetPlanetId
        ? this.getPlanetCameraTarget(this.transition.targetPlanetId)
        : OVERVIEW_TARGET;
      const progress = cameraTransitionProgress(
        this.transition.startedAt,
        now,
        this.transition.duration,
      );
      const eased = smoothstep(progress);
      this.camera.position.lerpVectors(
        this.transition.fromPosition,
        target.clone().add(this.transition.toOffset),
        eased,
      );
      this.controls.target.lerpVectors(this.transition.fromTarget, target, eased);
      this.followedTarget.copy(target);
      if (progress >= 1) {
        const onComplete = this.transition.onComplete;
        this.transition = null;
        onComplete?.();
      }
      return;
    }

    if (this.focusedPlanetId) {
      const target = this.getPlanetCameraTarget(this.focusedPlanetId);
      const delta = target.clone().sub(this.followedTarget);
      this.camera.position.add(delta);
      this.controls.target.add(delta);
      this.followedTarget.copy(target);
    }
  }

  private animate = (now = performance.now()): void => {
    this.animationFrame = window.requestAnimationFrame(this.animate);
    this.timer.update(now);
    const realDelta = this.timer.getDelta();
    if (!this.pageHidden) {
      advanceSolarSceneClock(this.sceneState, this.simulationClock, realDelta);
    }
    this.syncAstronomicalState(this.simulationClock.getTimestamp());
    this.notifySimulationTime(now);

    if (this.sunGlow && this.sunCorona) {
      const pulse = 1 + Math.sin(now * 0.0007) * 0.018;
      this.sunGlow.scale.setScalar(14.5 * pulse);
      this.sunCorona.scale.setScalar(20 * (2 - pulse));
    }

    this.updateCamera(now);
    this.controls.update(Math.min(realDelta, 0.05));
    this.renderer.render(this.scene, this.camera);
  };

  private handleResize = (): void => {
    const width = Math.max(this.mount.clientWidth, 1);
    const height = Math.max(this.mount.clientHeight, 1);
    const previousAspect = this.camera.aspect;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);

    if (!this.focusedPlanetId && !this.transition && Math.abs(previousAspect - this.camera.aspect) > 0.05) {
      this.camera.position.copy(this.getOverviewOffset());
      this.controls.target.copy(OVERVIEW_TARGET);
    }
  };

  private getPlanetAtPointer(event: PointerEvent): PlanetId | null {
    const bounds = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersections = this.raycaster.intersectObjects(this.selectable, false);
    const planetId = intersections[0]?.object.userData.planetId as PlanetId | undefined;
    return planetId ?? null;
  }

  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerDown.set(event.clientX, event.clientY);
    this.dragging = false;
  };

  private handlePointerMove = (event: PointerEvent): void => {
    if (this.pointerDown.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 6) {
      this.dragging = true;
    }
    if (event.pointerType !== "mouse" || this.dragging) {
      return;
    }
    const planetId = this.getPlanetAtPointer(event);
    if (planetId === this.hoveredPlanetId) {
      return;
    }
    this.hoveredPlanetId = planetId;
    this.renderer.domElement.style.cursor = planetId ? "pointer" : "grab";
    this.updateHighlights();
    this.callbacks.onHover(planetId);
  };

  private handlePointerUp = (event: PointerEvent): void => {
    if (!this.dragging) {
      const planetId = this.getPlanetAtPointer(event);
      if (planetId) {
        this.callbacks.onSelect(planetId);
      }
    }
    this.dragging = false;
  };

  private handlePointerLeave = (): void => {
    this.hoveredPlanetId = null;
    this.renderer.domElement.style.cursor = "grab";
    this.updateHighlights();
    this.callbacks.onHover(null);
  };

  private handleVisibility = (): void => {
    this.pageHidden = document.hidden;
    if (!this.pageHidden) {
      this.timer.reset();
    }
  };

  dispose(): void {
    this.disposed = true;
    window.cancelAnimationFrame(this.animationFrame);
    this.resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", this.handleVisibility);
    const canvas = this.renderer.domElement;
    canvas.removeEventListener("pointerdown", this.handlePointerDown);
    canvas.removeEventListener("pointermove", this.handlePointerMove);
    canvas.removeEventListener("pointerup", this.handlePointerUp);
    canvas.removeEventListener("pointerleave", this.handlePointerLeave);
    this.controls.dispose();
    this.timer.dispose();

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) {
              value.dispose();
            }
          }
          material.dispose();
        }
      }
      if (object instanceof THREE.Sprite) {
        object.material.map?.dispose();
        object.material.dispose();
      }
    });

    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }
}
