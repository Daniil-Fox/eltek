import lenis from "../core/lenis.js";
import { ScrollTrigger } from "gsap/all";
import { initHeaderScroll } from "./header-scroll.js";
import { initHeaderContact } from "./header-contact.js";
import { initProjectCards } from "./projects.js";
import { initFaqAccordion } from "./faq.js";
import { initResponsibilityScroll } from "./responsibility.js";
import { initConsultButtons, initFormLabels } from "./forms.js";
import { initSliders } from "./sliders.js";
import { initAdvantagesParallax } from "./advantages-parallax.js";
import { initServicesSection } from "./services-section.js";
import { initModals } from "./modals.js";
import { initUi } from "./ui.js";
import { initCircleProgress } from "./circle-progress.js";
import { initAboutPage } from "./about-page.js";

export function initMainPage() {
  initSliders();
  initHeaderScroll();
  initHeaderContact();
  initProjectCards();
  initFaqAccordion();
  initConsultButtons();
  initFormLabels();
  initModals();
  initUi();
  initCircleProgress();
  initServicesSection();

  window.addEventListener("DOMContentLoaded", () => {
    const hasPreloader = document.querySelector(".preloader");

    if (!hasPreloader) {
      document.body.style.overflow = null;
      lenis.start();
    }

    initAdvantagesParallax();
    initAboutPage();
    ScrollTrigger.refresh();

    if (window.__responsibilitySlider) {
      initResponsibilityScroll(window.__responsibilitySlider);
    }
  });
}
