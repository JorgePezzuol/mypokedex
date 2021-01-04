import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/nes.min.css";
import "./assets/nes.font.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
