import lenis from "./lenis.js";
import { ScrollTrigger } from "gsap/all";

export function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  lenis.stop();

  const row = preloader.querySelector(".preloader__row");
  const text = preloader.querySelector(".preloader__text");

  if (row) {
    row.style.animation = "none";
    row.style.maxWidth = "none";
  }

  if (text) {
    text.style.transform = "translateX(0%)";
  }

  preloader.style.maxHeight = `${preloader.scrollHeight}px`;

  setTimeout(() => {
    preloader.style.maxHeight = "0px";
  }, 3000);

  setTimeout(() => {
    document.body.style.overflow = null;
    lenis.start();
    ScrollTrigger.update();
    preloader.remove();
  }, 3500);
}
