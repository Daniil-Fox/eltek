const YMAPS_API_KEY = "8c9bb3f5-07ef-4aa2-8a70-b84bc9e8879b";
const YMAPS_SRC = `https://api-maps.yandex.ru/v3/?apikey=${YMAPS_API_KEY}&lang=ru_RU`;

function loadYmapsScript() {
  if (window.ymaps3) {
    return Promise.resolve();
  }

  const existing = document.querySelector(`script[src^="https://api-maps.yandex.ru/v3"]`);

  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = YMAPS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function getMapZoom() {
  if (window.matchMedia("(max-width: 425px)").matches) return 15;
  if (window.matchMedia("(min-width: 2560px)").matches) return 16;
  return 15;
}

export async function initContactsMap() {
  const mapEl = document.getElementById("contacts-map");

  if (!mapEl) return;

  const lng = parseFloat(mapEl.dataset.lng) || 39.85391;
  const lat = parseFloat(mapEl.dataset.lat) || 57.617739;

  try {
    await loadYmapsScript();
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapControls, YMapDefaultFeaturesLayer } = ymaps3;
    const { YMapDefaultMarker } = await ymaps3.import("@yandex/ymaps3-markers@0.0.1");

    const map = new YMap(mapEl, {
      location: {
        center: [lng, lat],
        zoom: getMapZoom(),
      },
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapControls({ position: "right" }));
    map.addChild(new YMapDefaultFeaturesLayer({ id: "features" }));
    map.addChild(
      new YMapDefaultMarker({
        coordinates: [lng, lat],
        color: "#e53935",
        title: "Эльтек Групп",
        subtitle: "Пн–Вс, 9:00–21:00",
      }),
    );
  } catch (error) {
    console.error("Contacts map init failed:", error);
  }
}
