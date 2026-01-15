/**
 * Device performance detection utilities
 * Used to determine appropriate rendering quality levels
 */

export type PerformanceTier = 'high' | 'medium' | 'low';

interface DeviceCapabilities {
  tier: PerformanceTier;
  gpuTier: number;
  hasWebGL2: boolean;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  deviceMemory: number | null;
  isMobile: boolean;
}

/**
 * Detect device capabilities and return performance tier
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      tier: 'medium',
      gpuTier: 1,
      hasWebGL2: true,
      devicePixelRatio: 1,
      hardwareConcurrency: 4,
      deviceMemory: 4,
      isMobile: false,
    };
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const hasWebGL2 = !!canvas.getContext('webgl2');
  
  let gpuTier = 1;
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      gpuTier = estimateGPUTier(renderer);
    }
  }

  const devicePixelRatio = window.devicePixelRatio || 1;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || null;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const tier = calculateTier(gpuTier, deviceMemory, isMobile, hasWebGL2);

  return {
    tier,
    gpuTier,
    hasWebGL2,
    devicePixelRatio,
    hardwareConcurrency,
    deviceMemory,
    isMobile,
  };
}

function estimateGPUTier(renderer: string): number {
  const lowEnd = /intel|mali-4|adreno 3|sgx/i;
  const midRange = /mali-[gt]|adreno [45]|nvidia 9|gtx 7|gtx 8|rtx 20/i;
  const highEnd = /rtx 3|rtx 4|rx 6|rx 7|m1|m2|m3|apple gpu/i;

  if (highEnd.test(renderer)) return 3;
  if (midRange.test(renderer)) return 2;
  if (lowEnd.test(renderer)) return 1;
  return 2; // Default to mid-range
}

function calculateTier(
  gpuTier: number,
  deviceMemory: number | null,
  isMobile: boolean,
  hasWebGL2: boolean
): PerformanceTier {
  if (!hasWebGL2) return 'low';
  
  const memory = deviceMemory ?? 4;
  
  if (gpuTier >= 2 && memory >= 8 && !isMobile) return 'high';
  if (gpuTier >= 1 && memory >= 4) return 'medium';
  return 'low';
}

/**
 * Get recommended particle count based on performance tier
 */
export function getParticleCount(tier: PerformanceTier): number {
  switch (tier) {
    case 'high': return 50000;
    case 'medium': return 20000;
    case 'low': return 5000;
  }
}

/**
 * Get recommended texture resolution based on performance tier
 */
export function getTextureResolution(tier: PerformanceTier): number {
  switch (tier) {
    case 'high': return 2048;
    case 'medium': return 1024;
    case 'low': return 512;
  }
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get recommended pixel ratio based on performance tier
 */
export function getOptimalPixelRatio(tier: PerformanceTier): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  switch (tier) {
    case 'high': return Math.min(dpr, 2);
    case 'medium': return Math.min(dpr, 1.5);
    case 'low': return 1;
  }
}
