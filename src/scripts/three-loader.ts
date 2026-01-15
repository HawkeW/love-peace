// Dynamic import for Three.js from CDN
// Using a specific version to ensure stability
const THREE_CDN_URL = 'https://esm.sh/three@0.160.0';

let threeInstance: any = null;

export async function loadThree() {
  if (threeInstance) return threeInstance;
  
  try {
    // @ts-ignore - Importing from URL
    threeInstance = await import(THREE_CDN_URL);
    return threeInstance;
  } catch (e) {
    console.error('Failed to load Three.js', e);
    return null;
  }
}
