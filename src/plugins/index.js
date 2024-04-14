import vuetify from "@/plugins/vuetify";
import router from "@/router";
import pinia from "@/store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
export function registerPlugins(app) {
  app.use(vuetify);
  app.use(router);
  app.use(pinia);
  app.use(VueSweetalert2);
}
