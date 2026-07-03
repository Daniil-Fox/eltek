export function initPortfolioFilter() {
  const page = document.querySelector(".portfolio-page");

  if (!page) return;

  const buttons = page.querySelectorAll("[data-filter]");
  const cards = page.querySelectorAll(".portfolio-page__card");
  const empty = page.querySelector(".portfolio-page__empty");

  if (!buttons.length || !cards.length) return;

  const applyFilter = (filter) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = card.dataset.categories?.split(" ") ?? [];
      const isVisible = filter === "all" || categories.includes(filter);

      card.classList.toggle("is-hidden", !isVisible);

      if (isVisible) visibleCount += 1;
    });

    empty?.classList.toggle("is-hidden", visibleCount > 0);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      applyFilter(button.dataset.filter || "all");
    });
  });
}
