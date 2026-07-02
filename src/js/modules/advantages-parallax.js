import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const CLIP_EXPAND_FROM = "polygon(25% 35%, 75% 35%, 75% 75%, 25% 75%)";
const CLIP_EXPAND_TO = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const PARALLAX = {
  mainY: 16,
  miniY: 28,
  scrub: 0.55,
};

function preloadAdvantageImages(section) {
  section.querySelectorAll(".advantage-block img").forEach((img) => {
    img.loading = "eager";

    if (img.complete) return;

    const preloadSrc = img.currentSrc || img.src;
    if (preloadSrc) {
      const preload = new Image();
      preload.src = preloadSrc;
    }
  });
}

export function initAdvantagesParallax() {
  const section = document.querySelector(".benefits-house");
  const reveal = document.querySelector(".advantages-reveal");
  const media = document.querySelector(".advantages-reveal__media");
  const shade = document.querySelector(".advantages-reveal__shade");
  const content = document.querySelector(".benefits-house__content");
  const blocks = gsap.utils.toArray(".advantage-block");

  if (!section || !reveal || !media || !blocks.length) return;

  preloadAdvantageImages(section);

  requestAnimationFrame(() => {
    if (prefersReducedMotion) {
      gsap.set(media, { clipPath: CLIP_EXPAND_TO });
      if (shade) gsap.set(shade, { opacity: 1 });
      content?.classList.add("is-stage-visible");
      blocks.forEach((block) => block.classList.add("is-revealed"));

      ScrollTrigger.create({
        trigger: reveal,
        start: "top top",
        endTrigger: section,
        end: "bottom bottom",
        pin: reveal,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      return;
    }

    gsap.set(media, { clipPath: CLIP_EXPAND_FROM });
    if (shade) gsap.set(shade, { opacity: 0 });

    const expandTimeline = gsap.timeline();

    expandTimeline
      .to(media, {
        clipPath: CLIP_EXPAND_TO,
        ease: "none",
        duration: 1,
      })
      .to(shade, { opacity: 1, ease: "power1.inOut", duration: 0.35 }, 0.35)
      .call(() => content?.classList.add("is-stage-visible"), null, 0.85);

    ScrollTrigger.create({
      trigger: reveal,
      start: "top top",
      endTrigger: section,
      end: "bottom bottom",
      pin: reveal,
      pinSpacing: false,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });

    ScrollTrigger.create({
      animation: expandTimeline,
      trigger: reveal,
      start: "top top",
      end: "+=55%",
      scrub: 0.35,
      invalidateOnRefresh: true,
    });

    blocks.forEach((block) => {
      const isReverse = block.classList.contains("advantage-block--reverse");
      const items = block.querySelectorAll(".js-advantage-item");
      const mainFigure = block.querySelector(".js-advantage-figure-main");
      const miniFigure = block.querySelector(".js-advantage-figure-mini");
      const mainPicture = mainFigure?.querySelector(".advantage-block__img-main");
      const miniPicture = miniFigure?.querySelector(".advantage-block__img-mini");
      const mainImg = mainPicture?.querySelector("img");
      const miniImg = miniPicture?.querySelector("img");

      const mainSlideFrom = isReverse ? -104 : 104;
      const miniSlideFrom = 36;

      gsap.set(items, { y: 48, opacity: 0 });

      if (mainPicture) {
        gsap.set(mainPicture, { xPercent: mainSlideFrom });
      }

      if (miniPicture) {
        gsap.set(miniPicture, { yPercent: miniSlideFrom });
      }

      if (mainImg) {
        gsap.set(mainImg, { scale: 1.1, opacity: 0 });
      }

      if (miniImg) {
        gsap.set(miniImg, { scale: 1.12, opacity: 0 });
      }

      const revealTimeline = gsap.timeline({ paused: true });

      revealTimeline.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.11,
        ease: "power4.out",
      });

      if (mainPicture) {
        revealTimeline.to(
          mainPicture,
          {
            xPercent: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.55",
        );
      }

      if (mainImg) {
        revealTimeline.to(
          mainImg,
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "<0.12",
        );
      }

      if (miniPicture) {
        revealTimeline.to(
          miniPicture,
          {
            yPercent: 0,
            duration: 1.05,
            ease: "power3.out",
          },
          "-=0.78",
        );
      }

      if (miniImg) {
        revealTimeline.to(
          miniImg,
          {
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: "power2.out",
          },
          "<0.1",
        );
      }

      ScrollTrigger.create({
        trigger: block,
        start: "top 82%",
        onEnter: () => {
          block.classList.add("is-revealed");
          revealTimeline.play();
        },
        onLeaveBack: () => {
          block.classList.remove("is-revealed");
          revealTimeline.reverse();
        },
      });

      const parallaxConfig = {
        trigger: block,
        start: "top bottom",
        end: "bottom top",
        scrub: PARALLAX.scrub,
        invalidateOnRefresh: true,
      };

      if (mainImg) {
        gsap.fromTo(
          mainImg,
          { yPercent: PARALLAX.mainY },
          {
            yPercent: -PARALLAX.mainY,
            ease: "none",
            scrollTrigger: parallaxConfig,
          },
        );
      }

      if (miniImg) {
        gsap.fromTo(
          miniImg,
          { yPercent: PARALLAX.miniY },
          {
            yPercent: -PARALLAX.miniY,
            ease: "none",
            scrollTrigger: {
              ...parallaxConfig,
              scrub: PARALLAX.scrub * 0.85,
            },
          },
        );
      }
    });

    ScrollTrigger.refresh();
  });
}
