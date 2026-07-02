import AOS from "aos";
import { ScrollTrigger } from "gsap/all";

export function initLazyMedia() {
  window.addEventListener("load", () => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target;

          if (target.src && target.dataset.imgSrc) {
            target.src = target.dataset.imgSrc;
          }

          if (target.dataset.imgSrcset) {
            target.srcset = target.dataset.imgSrcset;
          }

          if (target.dataset.videoSrc) {
            target.src = target.dataset.videoSrc;
          }

          if (target.dataset.srcBg) {
            target.style.backgroundImage = `url(${target.dataset.srcBg})`;
          }

          obs.unobserve(target);
          AOS.refresh();
          ScrollTrigger.refresh();
        });
      },
      { threshold: 0, rootMargin: "600px 0px" },
    );

    document
      .querySelectorAll(
        "img[data-img-src], source[data-img-srcset], video[data-video-src], [data-src-bg]",
      )
      .forEach((el) => observer.observe(el));

    const videos = document.querySelectorAll("video");
    if (!videos.length) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.4 },
    );

    videos.forEach((video) => videoObserver.observe(video));
  });
}
