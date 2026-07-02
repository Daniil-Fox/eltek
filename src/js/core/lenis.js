import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.25,
  smoothWheel: true,
  normalizeWheel: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.documentElement.style.transform ? "transform" : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => lenis.resize());

export default lenis;
