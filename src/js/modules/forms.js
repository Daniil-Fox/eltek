import lenis from "../core/lenis";

export function initConsultButtons() {
  document.querySelectorAll(".consult-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const modalForm = document.querySelector(".modal-form");
      if (!modalForm) return;

      modalForm.classList.add("active");
      lenis.stop();

      if (btn.dataset.formId) {
        modalForm.setAttribute("form-id", btn.dataset.formId);
      }
    });
  });
}

export function initFormLabels() {
  document.querySelectorAll(".form").forEach((form) => {
    const inputs = form.querySelectorAll(".form__input, .form__textarea");
    inputs.forEach((input) => {
      input.addEventListener("click", () => {
        if (!input.classList.contains("focus-visible")) return;

        inputs.forEach((el) => {
          const label = el.closest(".form__label");
          if (label) label.querySelector("span")?.classList.remove("focus");
        });

        const label = input.closest(".form__label");
        if (label) label.querySelector("span")?.classList.add("focus");
      });
    });
  });
}
