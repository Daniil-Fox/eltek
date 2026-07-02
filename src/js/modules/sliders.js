import { Swiper } from "swiper/bundle";
import { Navigation, Autoplay, EffectFade } from "swiper";

Swiper.use([Navigation, Autoplay, EffectFade]);

export function initHeroSlider() {
  const sliderEl = document.querySelector(".hero__slider");
  if (!sliderEl) return null;

  const resetKenBurns = () => {
    sliderEl.querySelectorAll(".hero__img--ken img").forEach((img) => {
      img.style.animation = "none";
    });

    requestAnimationFrame(() => {
      const activeImg = sliderEl.querySelector(".swiper-slide-active .hero__img--ken img");
      if (activeImg) activeImg.style.animation = "";
    });
  };

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 1,
    loop: sliderEl.querySelectorAll(".swiper-slide").length > 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    on: {
      init: resetKenBurns,
      slideChangeTransitionEnd: resetKenBurns,
    },
  });

  return swiper;
}

export function initResponsibilitySlider() {
  const sliderEl = document.querySelector(".responsibility__items");
  if (!sliderEl) return null;

  return new Swiper(sliderEl, {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

export function initSliders() {
  initHeroSlider();

  const responsibilitySlider = initResponsibilitySlider();
  if (responsibilitySlider) {
    window.__responsibilitySlider = responsibilitySlider;
  }
}
