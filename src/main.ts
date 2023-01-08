import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyload from "vue-lazyload";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
});

app.mount("#app");
