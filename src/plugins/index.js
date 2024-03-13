import vuetify from './vuetify'
import router from '../router'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(router)
}
