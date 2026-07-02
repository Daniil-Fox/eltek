import "./core/lenis.js";
import { initPreloader } from "./core/preloader.js";
import { initAos } from "./core/aos.js";
import { initLazyMedia } from "./core/lazy-media.js";
import { initMainPage } from "./modules/main-page.js";

initPreloader();
initAos();
initLazyMedia();
initMainPage();
