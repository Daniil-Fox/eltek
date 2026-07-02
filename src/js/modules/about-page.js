import { Swiper } from "swiper/bundle";
import { Navigation } from "swiper";

Swiper.use([Navigation]);

function initAboutProdSlider() {
  const sliderEl = document.querySelector(".about-prod__slider");
  if (!sliderEl) return null;

  return new Swiper(sliderEl, {
    slidesPerView: 1.4,
    centeredSlides: true,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".prod-control__btn--next",
      prevEl: ".prod-control__btn--prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.2,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 2.6,
        spaceBetween: 40,
      },
    },
  });
}

export function initAboutPage() {
  if (!document.querySelector(".about-hero")) return;

  initAboutProdSlider();
}
