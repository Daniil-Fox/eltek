export function initProjectCards() {
  const projectCards = document.querySelectorAll(".projects-card");
  if (!projectCards.length) return;

  const toggleDetails = (card, open) => {
    const details = card.querySelector(".projects-card__details");
    if (!details) return;

    if (open) {
      details.classList.add("active");
      details.style.maxHeight = `${details.scrollHeight}px`;
    } else {
      details.classList.remove("active");
      details.style.maxHeight = null;
    }
  };

  const getSlideIndex = (media, clientX, count) => {
    const { left, width } = media.getBoundingClientRect();
    const ratio = (clientX - left) / width;
    const index = Math.floor(ratio * count);
    return Math.max(0, Math.min(count - 1, index));
  };

  const initGallery = (card) => {
    const media = card.querySelector(".projects-card__media");
    if (!media) return;

    const slides = [...media.querySelectorAll(".projects-card__slide")];
    const count = slides.length;

    if (count <= 1) return;

    media.style.setProperty("--slides-count", String(count));

    const indexEl = document.createElement("div");
    indexEl.className = "projects-card__index";
    indexEl.setAttribute("aria-hidden", "true");

    const dots = slides.map((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("is-active");
      indexEl.appendChild(dot);
      return dot;
    });

    media.appendChild(indexEl);

    const setSlide = (index) => {
      const next = Math.max(0, Math.min(count - 1, index));

      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === next);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === next);
      });

      media.style.setProperty("--active-zone", String(next));
    };

    const updateFromPointer = (clientX) => {
      setSlide(getSlideIndex(media, clientX, count));
    };

    media.addEventListener("mousemove", (e) => {
      updateFromPointer(e.clientX);
    });

    media.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      if (touch) updateFromPointer(touch.clientX);
    }, { passive: true });

    media.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      if (touch) updateFromPointer(touch.clientX);
    }, { passive: true });

    media.addEventListener("mouseleave", () => {
      setSlide(0);
    });
  };

  projectCards.forEach((card) => {
    initGallery(card);
  });

  if (window.matchMedia("(max-width: 850px)").matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          toggleDetails(entry.target, entry.isIntersecting);
        });
      },
      { threshold: [0.7, 1] },
    );

    projectCards.forEach((card) => observer.observe(card));
    return;
  }

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => toggleDetails(card, true));
    card.addEventListener("mouseleave", () => toggleDetails(card, false));
  });
}
