import { header, heroSection, mobileMenu } from "../_vars";
import lenis from "../core/lenis.js";

const SCROLL_OFFSET = 72;

export function initHeaderScroll() {
  if (!header) return;

  let lastScroll = 0;

  const updateMobileMenu = (scrollY) => {
    if (!mobileMenu || !heroSection) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (scrollY >= heroBottom - 120) {
      mobileMenu.style.opacity = "1";
      mobileMenu.style.zIndex = "20";
    } else {
      mobileMenu.style.opacity = null;
      mobileMenu.style.zIndex = null;
    }
  };

  const updateHeader = (scrollY, direction) => {
    updateMobileMenu(scrollY);

    if (scrollY <= SCROLL_OFFSET) {
      header.classList.remove("is-scrolled", "is-hide");
      lastScroll = scrollY;
      return;
    }

    header.classList.add("is-scrolled");

    if (direction === 1 && scrollY > lastScroll) {
      header.classList.add("is-hide");
    }

    if (direction === -1) {
      header.classList.remove("is-hide");
    }

    lastScroll = scrollY;
  };

  lenis.on("scroll", ({ scroll, direction }) => {
    updateHeader(scroll, direction);
  });

  updateHeader(lenis.scroll || window.scrollY || 0, 0);
}
