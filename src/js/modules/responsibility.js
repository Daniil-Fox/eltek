import lenis from "../core/lenis";
import { responsibility } from "../_vars";
import { throttle } from "../functions/throttle";

export function initResponsibilityScroll(responsibilitySlider) {
  if (!responsibility || !responsibilitySlider) return;

  const responsItems = document.querySelector(".responsibility__items");
  const resLines = responsibility.querySelectorAll(".responsibility__line");
  const resTriggers = responsibility.querySelectorAll(".responsibility__trigger");
  const resWrapper = document.querySelector(".responsibility__wrapper");

  const setHeightOfWrapper = () => {
    if (!resWrapper) return;
    resWrapper.style.removeProperty("--wrapper-height");

    const multiplier = window.matchMedia("(min-width: 769px)").matches ? 2.8 : 2;
    resWrapper.style.setProperty(
      "--wrapper-height",
      resWrapper.offsetHeight * multiplier + "px",
    );
  };

  let offsetLines = [];

  const setOffsetLines = () => {
    offsetLines = [];
    resLines.forEach((line) => {
      const elRect = line.getBoundingClientRect();
      offsetLines.push(
        elRect.y + (window.pageY || document.documentElement.scrollTop),
      );
    });
  };

  const thresholdsArr = Array.from({ length: 5 }, (_, i) => i * 0.2);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setOffsetLines();
      });
    },
    { threshold: thresholdsArr },
  );

  observer.observe(responsibility);

  const getTopOfItems = () => {
    const rect = responsItems.getBoundingClientRect();
    return rect.y + (window.pageY || document.documentElement.scrollTop);
  };

  const thresholdRes = Array.from({ length: 20 }, (_, i) => i * 0.05);

  const resObserver = new IntersectionObserver(
    (entries) => {
      const offset = getTopOfItems();
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          offsetLines.forEach((lineOffset, index) => {
            if (offset > lineOffset && responsibilitySlider) {
              responsibilitySlider.slideTo(index);
            }
          });
        }
      });
    },
    { threshold: thresholdRes },
  );

  resLines.forEach((line) => resObserver.observe(line));
  resTriggers.forEach((trigger) => resObserver.observe(trigger));

  const resLeft = document.querySelector(".res__left");
  if (resLeft) resObserver.observe(resLeft);

  window.addEventListener("resize", setHeightOfWrapper);

  document.querySelectorAll(".res-control-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextIndex = responsibilitySlider.activeIndex % 5;
      lenis.scrollTo(`.responsibility__line--${nextIndex + 1}`, { offset: 10 });
    });
  });

  setHeightOfWrapper();
}
