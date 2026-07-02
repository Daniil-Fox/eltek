import lenis from "../core/lenis.js";

export function initUi() {
  document.querySelector(".hero__btn-down")?.addEventListener("click", (e) => {
    e.preventDefault();
    lenis.scrollTo("#services", { offset: -80 });
  });

  document.querySelector(".up-page-btn")?.addEventListener("click", () => {
    lenis.scrollTo(".site-container");
  });
}
