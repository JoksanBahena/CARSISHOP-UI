import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/error/NotFoundView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/RegisterView.vue"),
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPasswordView.vue"),
  },
  {
    path: "/forgotPasswordConfirm/:token",
    name: "ForgotPasswordConfirm",
    component: () => import("@/views/auth/ForgotPasswordConfirmView.vue"),
  },
  {
    path: "/:category/:subCategory",
    name: "CategorizedProducts",
    component: () => import("@/views/product/CategorizedProductsView.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("@/views/product/SearchedProductsView.vue"),
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("@/views/product/ProductDetailsView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {

  if(to.matched.some (route => route.meta.requiresAuth)){
    if (localStorage.getItem('token')) {
      //logica para verificar si el token es valido
      next();
    }else{
      next({name: 'Login'})
    }
  }else{
    next();
  }
});


export default router;
