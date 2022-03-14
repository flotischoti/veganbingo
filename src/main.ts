import { createApp } from "vue";
import App from "./App.vue";

import AOS from "aos";
import "aos/dist/aos.css";

import { createI18n } from "vue-i18n";
import { messages } from "./assets/messages";

AOS.init();

const allowedLanguages = ["de", "en"];
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.has("lang") && urlParams.get("lang");

const i18n = createI18n({
  locale:
    lang && allowedLanguages.includes(lang)
      ? lang
      : navigator.language.substring(0, 2),
  fallbackLocale: "en",
  warnHtmlInMessage: "off",
  messages,
});

const app = createApp(App);

app.use(i18n);

app.mount("#app");
