import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
    path: "/forgotPasswordConfirm",
    name: "ForgotPasswordConfirm",
    component: () => import("@/views/auth/ForgotPasswordConfirmView.vue")
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
  {
    path: "/profileAccount",
    name: "ProfileAccount",
    component: () => import("@/views/profile/ProfileAccountView.vue")

  },
  {
    path: "/profileSales",
    name: "ProfileSales",
    component: () => import("@/views/profile/ProfileSalesView.vue")

  },
  {
    path: "/profileSalesRequest",
    name: "ProfileSalesRequest",
    component: () => import("@/views/profile/ProfileSalesRequest.vue")

  },
  {
    path: "/profileAddress",
    name: "ProfileAddress",
    component: () => import("@/views/profile/ProfileAddressView.vue")
  },
  {
    path: "/profileAddAddress",
    name: "ProfileAddAddress",
    component: () => import("@/views/profile/ProfileAddAddressView.vue")
  },
  {
    path: "/profileReturnsOrders",
    name: "profileReturnsOrders",
    component: () => import("@/views/profile/ProfileOrdersReturnsView.vue")
  },
  {
    path: "/profilePayment",
    name: "ProfilePayment",
    component: () => import("@/views/profile/ProfilePaymentView.vue")
  },
  {
    path: "/profileAddPayment",
    name: "ProfileAddPayment",
    component: () => import("@/views/profile/ProfileAddPaymentView.vue")
  },
  {
    path: "/profileResume",
    name: "ProfileResume",
    component: () => import("@/views/profile/ProfileResumeView.vue")
  },
  {
    path: "/profileOrderDetail",
    name: "ProfileOrderDetail",
    component: () => import("@/views/profile/ProfileOrderDetailsView.vue")
  },
  {
    path: "/adminUsers",
    name: "AdminUsers",
    component: () => import("@/views/admin/AdminUsersView.vue")
  },
  {
    path: "/adminProducts",
    name: "AdminProducts",
    component: () => import("@/views/admin/AdminProductView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
