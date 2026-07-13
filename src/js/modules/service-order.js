import lenis from "../core/lenis.js";

const SERVICE_ORDERS = {
  apartment: {
    formId: "order-apartment",
    title: "Электромонтаж в квартире",
    lead:
      "Замена проводки, щиты, освещение и&nbsp;розеточные группы&nbsp;&mdash; под вашу планировку, этап ремонта и&nbsp;бюджет.",
    formTitle: "Заявка: квартира",
    formNote: "Уточним площадь, сроки и&nbsp;этап отделки",
    objectType: "apartment",
    image: "./img/chensi/01.jpg",
  },
  house: {
    formId: "order-house",
    title: "Электромонтаж в частном доме",
    lead:
      "Проект, ввод, щитовое оборудование и&nbsp;разводка по&nbsp;этажам&nbsp;&mdash; с&nbsp;учётом мощности и&nbsp;будущих систем.",
    formTitle: "Заявка: частный дом",
    formNote: "Рассчитаем смету под площадь и&nbsp;комплектацию",
    objectType: "house",
    image: "./img/bens/01.jpg",
  },
  commercial: {
    formId: "order-commercial",
    title: "Электромонтаж для коммерческого объекта",
    lead:
      "Офисы, торговые и&nbsp;общественные пространства&nbsp;&mdash; с&nbsp;соблюдением норм и&nbsp;графика работ.",
    formTitle: "Заявка: коммерческий объект",
    formNote: "Подготовим решение под ваш формат и&nbsp;сроки",
    objectType: "commercial",
    image: "./img/catalogue/01-1.jpg",
  },
  industrial: {
    formId: "order-industrial",
    title: "Электромонтаж для промышленного объекта",
    lead:
      "Силовые линии, распределительные щиты и&nbsp;монтаж под нагрузку&nbsp;&mdash; с&nbsp;исполнительной документацией.",
    formTitle: "Заявка: промышленный объект",
    formNote: "Обсудим мощность, сроки и&nbsp;этапы работ",
    objectType: "industrial",
    image: "./img/hero/06.jpg",
  },
};

const ASIDE_GRADIENT =
  "linear-gradient(160deg, rgba(27, 32, 36, 0.96) 0%, rgba(21, 25, 30, 1) 100%)";

function setAsideBackground(aside, image) {
  if (!aside) return;

  if (image) {
    aside.style.backgroundImage = `${ASIDE_GRADIENT}, url("${image}")`;
    aside.style.backgroundSize = "cover";
    aside.style.backgroundPosition = "center";
    aside.style.backgroundRepeat = "no-repeat";
    return;
  }

  aside.style.backgroundImage = "";
  aside.style.backgroundSize = "";
  aside.style.backgroundPosition = "";
  aside.style.backgroundRepeat = "";
}

export function initServiceOrderButtons() {
  const modal = document.querySelector(".modal-form");
  if (!modal) return;

  const titleEl = modal.querySelector(".modal-form__title");
  const leadEl = modal.querySelector(".modal-form__lead");
  const formTitleEl = modal.querySelector(".modal-form__form-title");
  const formNoteEl = modal.querySelector(".modal-form__form-note");
  const asideEl = modal.querySelector(".modal-form__aside");
  const objectSelect = modal.querySelector('[name="object-type"]');
  const hiddenInput = modal.querySelector('[name="service-order"]');

  if (!titleEl || !leadEl || !formTitleEl) return;

  const defaults = {
    title: titleEl.innerHTML,
    lead: leadEl.innerHTML,
    formTitle: formTitleEl.textContent,
    formNote: formNoteEl?.textContent ?? "",
    formId: modal.getAttribute("form-id") ?? "",
    objectType: objectSelect?.value ?? "",
    serviceOrder: hiddenInput?.value ?? "",
  };

  const applyServiceOrder = (key) => {
    const config = SERVICE_ORDERS[key];
    if (!config) return;

    titleEl.textContent = config.title;
    leadEl.innerHTML = config.lead;
    formTitleEl.textContent = config.formTitle;

    if (formNoteEl) {
      formNoteEl.innerHTML = config.formNote;
    }

    if (objectSelect) {
      objectSelect.value = config.objectType;
    }

    if (hiddenInput) {
      hiddenInput.value = key;
    }

    setAsideBackground(asideEl, config.image);
    modal.setAttribute("form-id", config.formId);
  };

  const resetServiceOrder = () => {
    titleEl.innerHTML = defaults.title;
    leadEl.innerHTML = defaults.lead;
    formTitleEl.textContent = defaults.formTitle;

    if (formNoteEl) {
      formNoteEl.textContent = defaults.formNote;
    }

    if (objectSelect) {
      objectSelect.value = defaults.objectType;
    }

    if (hiddenInput) {
      hiddenInput.value = defaults.serviceOrder;
    }

    setAsideBackground(asideEl, null);

    if (defaults.formId) {
      modal.setAttribute("form-id", defaults.formId);
    } else {
      modal.removeAttribute("form-id");
    }
  };

  document.querySelectorAll(".service-order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      applyServiceOrder(btn.dataset.serviceOrder);
      modal.classList.add("active");
      lenis.stop();
    });
  });

  modal.querySelectorAll(".modal__close").forEach((btn) => {
    btn.addEventListener("click", resetServiceOrder);
  });

  modal.addEventListener("click", (e) => {
    if (e.target !== modal) return;
    resetServiceOrder();
  });
}
