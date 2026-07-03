import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

export function initDesignSection() {
  const columns = document.querySelectorAll(".design-section__right");

  if (!columns.length) return;

  columns.forEach((column) => {
    const items = column.querySelectorAll("ul li");

    if (!items.length) return;

    if (prefersReducedMotion) {
      gsap.set(items, { clearProps: "all" });
      return;
    }

    gsap.set(items, { opacity: 0, x: 56 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: column,
        start: "top 82%",
        end: "bottom 50%",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    items.forEach((item, index) => {
      timeline.to(
        item,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        index * 0.16,
      );
    });
  });
}
