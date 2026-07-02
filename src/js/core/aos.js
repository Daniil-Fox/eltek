import AOS from "aos";

export function initAos() {
  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 150,
    delay: 0,
    duration: 500,
    easing: "ease",
    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => AOS.refresh(), 50);
  });
}
