import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function initServicesSection() {
  const textItems = document.querySelectorAll(".services-section__item");
  if (!textItems.length) return;

  const imageItems = document.querySelectorAll(".services-section__item-image");
  const badgeCurrent = document.querySelector(".services-section__badge-current");
  const railFill = document.querySelector(".services-section__rail-fill");
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

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const line = document.querySelector(".services-section__line");
    const firstItem = textItems[0];
    const container = document.querySelector(".services-section__container");
    const list = document.querySelector(".services-section__list");

    if (!line || !firstItem || !container || !list) return;

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

    const timeline = gsap.timeline();

    timeline.fromTo(
      list,
      { y: () => -firstItem.offsetHeight },
      { y: () => -list.scrollHeight, ease: "none" },
    );

    const trigger = ScrollTrigger.create({
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

    return () => {
      trigger.kill();
      timeline.kill();
      gsap.set(list, { clearProps: "transform" });
      activeIndex = -1;
    };
  });

  mm.add("(max-width: 1023px)", () => {
    const scroller = document.querySelector(".services-section__list-scroller");
    const list = document.querySelector(".services-section__list");

    if (!scroller || !list) return;

    gsap.set(list, { clearProps: "transform" });

    const getClosestIndex = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      const center = scrollerRect.left + scrollerRect.width / 2;

      let closestIndex = 0;
      let closestDist = Infinity;

      textItems.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const dist = Math.abs(center - itemCenter);

        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      return closestIndex;
    };

    const scrollItemIntoView = (index) => {
      const item = textItems[index];
      const scrollerRect = scroller.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset =
        itemRect.left - scrollerRect.left - (scrollerRect.width - itemRect.width) / 2;

      scroller.scrollBy({ left: offset, behavior: "smooth" });
    };

    let scrollRaf = null;

    const onScroll = () => {
      if (scrollRaf) return;

      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        setActiveStep(getClosestIndex());
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    const clickHandlers = [];

    textItems.forEach((item, i) => {
      const handler = () => {
        scrollItemIntoView(i);
        setActiveStep(i);
      };

      item.addEventListener("click", handler);
      clickHandlers.push({ item, handler });
    });

    setActiveStep(0);
    requestAnimationFrame(onScroll);

    return () => {
      scroller.removeEventListener("scroll", onScroll);

      clickHandlers.forEach(({ item, handler }) => {
        item.removeEventListener("click", handler);
      });

      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      activeIndex = -1;
    };
  });
}
