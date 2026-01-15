/**
 * Three.js helper utilities
 */

import * as THREE from 'three';

/**
 * Create an optimized WebGL renderer with common settings
 */
export function createRenderer(
  canvas: HTMLCanvasElement,
  options: {
    antialias?: boolean;
    alpha?: boolean;
    pixelRatio?: number;
  } = {}
): THREE.WebGLRenderer {
  const { antialias = true, alpha = true, pixelRatio = 1 } = options;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias,
    alpha,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  return renderer;
}

/**
 * Create a perspective camera with common settings
 */
export function createCamera(
  fov = 75,
  aspect = 1,
  near = 0.1,
  far = 1000
): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;
  return camera;
}

/**
 * Dispose of Three.js resources properly
 */
export function disposeResources(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
): void {
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry?.dispose();
      if (object.material instanceof THREE.Material) {
        disposeMaterial(object.material);
      } else if (Array.isArray(object.material)) {
        object.material.forEach(disposeMaterial);
      }
    }
  });
  renderer.dispose();
}

function disposeMaterial(material: THREE.Material): void {
  material.dispose();
  if ('map' in material && material.map) {
    (material.map as THREE.Texture).dispose();
  }
}

/**
 * Create a resize handler for the renderer and camera
 */
export function createResizeHandler(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  container: HTMLElement
): () => void {
  return () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
  };
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Create a shader material with common uniforms
 */
export function createShaderMaterial(
  vertexShader: string,
  fragmentShader: string,
  uniforms: Record<string, THREE.IUniform> = {}
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2() },
      ...uniforms,
    },
    transparent: true,
    depthWrite: false,
  });
}

/**
 * Load a texture with common settings
 */
export async function loadTexture(
  url: string,
  loader = new THREE.TextureLoader()
): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
}

/**
 * Create golden ring geometry (for portal effect)
 */
export function createRingGeometry(
  innerRadius = 1,
  outerRadius = 1.2,
  segments = 64
): THREE.RingGeometry {
  return new THREE.RingGeometry(innerRadius, outerRadius, segments);
}

/**
 * Create particle buffer geometry
 */
export function createParticleGeometry(
  count: number,
  spread = 10
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random position in sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = Math.random() * spread;
    
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
    
    // Golden-ish colors with variation
    colors[i3] = 0.9 + Math.random() * 0.1;
    colors[i3 + 1] = 0.7 + Math.random() * 0.2;
    colors[i3 + 2] = 0.3 + Math.random() * 0.3;
    
    sizes[i] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  return geometry;
}
