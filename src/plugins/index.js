import vuetify from "@/plugins/index";
import router from "@/router";

export function registerPlugins(app) {
  app.use(vuetify);
  app.use(router);
}
