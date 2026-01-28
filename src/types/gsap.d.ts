declare global {
  interface Window {
    gsap: typeof import('gsap').gsap;
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    lenis?: import('lenis').default;
  }
  
  const gsap: typeof import('gsap').gsap;
  const ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}

export {};