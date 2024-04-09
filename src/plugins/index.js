import vuetify from "@/plugins/vuetify";
import router from "@/router";
import pinia from "@/store";

export function registerPlugins(app) {
  app.use(vuetify);
  app.use(router);
  app.use(pinia);
}
