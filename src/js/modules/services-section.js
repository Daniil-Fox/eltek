import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function initServicesSection() {
  if (window.matchMedia("(max-width: 1023px)").matches) return;

  const textItems = document.querySelectorAll(".services-section__item");
  if (!textItems.length) return;

  const imageItems = document.querySelectorAll(".services-section__item-image");
  const line = document.querySelector(".services-section__line");
  const firstItem = textItems[0];
  const container = document.querySelector(".services-section__container");
  const badgeCurrent = document.querySelector(".services-section__badge-current");
  const railFill = document.querySelector(".services-section__rail-fill");

  if (!line || !firstItem || !container) return;

  const totalSteps = textItems.length;
  let activeIndex = -1;

  const setActiveStep = (index) => {
    const next = Math.max(0, Math.min(totalSteps - 1, index));
    if (next === activeIndex) return;

    activeIndex = next;

    textItems.forEach((item, i) => {
      item.classList.toggle("active", i === next);
    });

    imageItems.forEach((el, i) => {
      el.classList.toggle("active", i === next);
    });

    if (badgeCurrent) {
      badgeCurrent.textContent = String(next + 1).padStart(2, "0");
    }

    if (railFill && totalSteps > 1) {
      railFill.style.height = `${(next / (totalSteps - 1)) * 100}%`;
    }
  };

  const stepFromProgress = (progress) =>
    Math.round(Math.min(1, Math.max(0, progress)) * (totalSteps - 1));

  const snapConfig =
    totalSteps > 1
      ? {
          snapTo: 1 / (totalSteps - 1),
          duration: { min: 0.25, max: 0.55 },
          delay: 0.06,
          ease: "power2.inOut",
          directional: false,
        }
      : false;

  const list = document.querySelector(".services-section__list");
  if (!list) return;

  const timeline = gsap.timeline();

  timeline.fromTo(
    list,
    { y: () => -firstItem.offsetHeight },
    { y: () => -list.scrollHeight, ease: "none" },
  );

  ScrollTrigger.create({
    animation: timeline,
    trigger: ".services-section__line",
    start: "center center",
    end: "+=220%",
    scrub: 0.45,
    pin: ".services-section__container",
    anticipatePin: 1,
    invalidateOnRefresh: true,
    snap: snapConfig,
    onUpdate: (self) => {
      setActiveStep(stepFromProgress(self.progress));
    },
  });

  setActiveStep(0);
}
