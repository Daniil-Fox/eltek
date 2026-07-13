import lenis from "../core/lenis.js";

export function initModals() {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".main-menu");
  const favoritesBtn = document.querySelector(".favorites-btn");

  if (menuBtn && menu) {
    const closeBtn = menu.querySelector(".menu__close-btn");
    const menuLinks = menu.querySelectorAll('a[href^="#"]');

    const closeMenu = () => {
      menu.classList.add("menu-disabled");
      setTimeout(() => {
        menu.classList.remove("menu-active");
        favoritesBtn?.classList.remove("disabled");
        document.body.style.overflow = null;
        lenis.start();
      }, 500);
    };

    const openMenu = (e) => {
      e.stopPropagation();
      favoritesBtn?.classList.add("disabled");
      menu.classList.add("menu-active");
      menu.classList.remove("menu-disabled");
      document.body.style.overflow = "hidden";
      lenis.stop();
    };

    menuBtn.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  const openForm = (formId) => {
    const modalForm = document.querySelector(".modal-form");
    if (!modalForm) return;

    modalForm.classList.add("active");
    lenis.stop();

    if (formId) {
      modalForm.setAttribute("form-id", formId);
    }
  };

  document.querySelector(".phone-btn")?.addEventListener("click", (e) => {
    openForm(e.currentTarget.dataset.formId);
  });

  document.querySelector(".office__btn")?.addEventListener("click", () => {
    openForm("contact-form");
  });

  document.querySelector(".contacts-page__form-btn")?.addEventListener("click", (e) => {
    openForm(e.currentTarget.dataset.formId);
  });

  document
    .querySelector(".mobile-menu__btn--call")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      const phoneModal = document.querySelector(".modal-phone");
      if (!phoneModal) return;

      phoneModal.classList.add("active");
      lenis.stop();
    });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target !== modal) return;

      modal.classList.remove("active");

      const video = modal.querySelector(".modal-window__video");
      if (video) video.setAttribute("src", "");

      const gallery = modal.querySelector(".gallery__window");
      if (gallery) {
        gallery.querySelectorAll(".swiper-slide").forEach((slide) => slide.remove());
      }

      document.body.classList.remove("dis-scroll");
      lenis.start();
    });
  });

  document.querySelectorAll(".modal__close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const modal = btn.closest(".modal");
      if (!modal) return;

      modal.classList.remove("active");

      const video = modal.querySelector(".modal-window__video");
      if (video) video.setAttribute("src", "");

      const gallery = modal.querySelector(".gallery__window");
      if (gallery) {
        gallery.querySelectorAll(".swiper-slide").forEach((slide) => slide.remove());
      }

      document.body.classList.remove("dis-scroll");
      lenis.start();
    });
  });
}
