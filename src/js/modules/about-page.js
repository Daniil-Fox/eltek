import { Swiper } from "swiper/bundle";
import { EffectCoverflow, Navigation } from "swiper";

Swiper.use([EffectCoverflow, Navigation]);

function initAboutProdSlider() {
  const sliderEl = document.querySelector(".about-prod__slider");
  if (!sliderEl) return null;

  return new Swiper(sliderEl, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    loopAdditionalSlides: 2,
    speed: 650,
    spaceBetween: 0,
    coverflowEffect: {
      rotate: 0,
      stretch: -16,
      depth: 120,
      modifier: 1.05,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".prod-control__btn--next",
      prevEl: ".prod-control__btn--prev",
    },
    breakpoints: {
      768: {
        coverflowEffect: {
          stretch: -22,
          depth: 150,
          modifier: 1.12,
        },
      },
      1200: {
        coverflowEffect: {
          stretch: -28,
          depth: 180,
          modifier: 1.18,
        },
      },
    },
  });
}

export function initAboutPage() {
  if (!document.querySelector(".about-hero")) return;

  initAboutProdSlider();
}
