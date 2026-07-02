export function initHeaderContact() {
  const contact = document.querySelector(".header-contact");
  if (!contact) return;

  const toggle = contact.querySelector(".header-contact__toggle");

  const close = () => {
    contact.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  toggle?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = contact.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!contact.contains(e.target)) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
}
