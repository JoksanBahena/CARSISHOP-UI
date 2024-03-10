# CarsiShop-UI (Vue3 + Vuetify + Vite)

Desarrollo frontend del proyecto CarsiShop

## ✔️ Buenas prácticas de desarrollo

- Realizar el desarrollo de un componente en una rama destinada

- La estructura de los commit debe cumplir la nomenclatura:
  "[PREFIJO] comentario descriptivo a los cambios"

- Consultar la guía de desarrollo para más detalles 

## ✔️ Configuración del proyecto

- El desarrollo está escrito en inglés

- El nombre de los directorios se conforma de minúsculas
- El nombre de los componentes sigue el estilizado PascalCase
- El nombre de las variables siguen el estilizado snake_case

- La importación de componentes se utilizan rutas dinamicas

## ❗️ Documentación oficial de vuetify

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Instalación

Utilizar el siguiente comando para instalar las dependencias:

| Package Manager                                           | Command       |
| --------------------------------------------------------- | ------------- |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install) | `npm install` |

Después de completar la instalación, el entorno estará listo para el desarrollo.


## 💡 Uso


### Iniciar el servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecutar el siguiente comando. El servidor será accesible en:
[http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

> NODE_OPTIONS='--no-warnings' is added to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.


### Building para producción

Para construir su proyecto para producción, usar:

```bash
npm run build
```
