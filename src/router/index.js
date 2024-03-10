import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
