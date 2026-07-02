export function initFaqAccordion() {
  const items = document.querySelectorAll(".faq__item");
  if (!items.length) return;

  const setPanelState = (item, open) => {
    const panel = item.querySelector(".faq__panel");
    const trigger = item.querySelector(".faq__trigger");
    if (!panel || !trigger) return;

    item.classList.toggle("active", open);
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0";
  };

  const closeAll = () => {
    items.forEach((item) => setPanelState(item, false));
  };

  items.forEach((item, index) => {
    const trigger = item.querySelector(".faq__trigger");
    if (!trigger) return;

    if (index === 0) {
      setPanelState(item, true);
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      closeAll();

      if (!isOpen) {
        setPanelState(item, true);
      }
    });
  });

  const refreshOpenPanel = () => {
    const openItem = document.querySelector(".faq__item.active");
    if (!openItem) return;

    const panel = openItem.querySelector(".faq__panel");
    if (panel) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  };

  window.addEventListener("resize", refreshOpenPanel);
}
