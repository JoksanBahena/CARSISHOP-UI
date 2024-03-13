import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
