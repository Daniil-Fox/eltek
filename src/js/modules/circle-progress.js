export function initCircleProgress() {
  const circles = document.querySelectorAll(".progress");
  if (!circles.length) return;

  const update = () => {
    circles.forEach((circle) => {
      const percentage = parseInt(circle.dataset.percents, 10);
      const host = circle.closest(".circle-img");
      if (!host || Number.isNaN(percentage)) return;

      const radius = parseInt(window.getComputedStyle(host).width, 10) / 2;
      const length = 2 * Math.PI * radius + 5;

      circle.setAttribute("stroke-dasharray", String(length));
      circle.setAttribute(
        "stroke-dashoffset",
        String(length - (length * percentage) / 100),
      );
    });
  };

  window.addEventListener("resize", update);
  update();
}
