export function initProjectGallery() {
  const mainImage = document.querySelector(".project-detail__gallery-main img");
  const thumbs = document.querySelectorAll(".project-detail__gallery-thumb");

  if (!mainImage || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const image = thumb.querySelector("img");
      if (!image) return;

      mainImage.src = image.currentSrc || image.src;
      thumbs.forEach((item) => item.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}
