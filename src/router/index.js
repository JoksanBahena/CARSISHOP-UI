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
    component: () => import("@/views/auth/ForgotPasswordConfirmView.vue"),
  },
  {
    path: "/category/:category/:subcategory",
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
    path: "/profile",
    name: "Profile",
    redirect: { name: "ProfileSummary" },
    component: () => import("@/views/profile/ProfileView.vue"),
    children: [
      {
        path: "",
        name: "ProfileSummary",
        component: () => import("@/views/profile/ProfileResumeView.vue"),
      },
      {
        path: "orders",
        name: "ProfileOrders",
        component: () => import("@/views/profile/ProfileOrdersReturnsView.vue"),
      },
      {
        path: "details/:id",
        name: "ProfileOrderDetails",
        component: () => import("@/views/profile/ProfileOrderDetailsView.vue"),
      },
      {
        path: "account",
        name: "ProfileAccount",
        component: () => import("@/views/profile/ProfileAccountView.vue"),
      },
      {
        path: "addresses",
        name: "ProfileAddresses",
        component: () => import("@/views/profile/ProfileAddressView.vue"),
      },
      {
        path: "addresses/add",
        name: "ProfileAddAddress",
        component: () => import("@/views/profile/ProfileAddAddressView.vue"),
      },
      {
        path: "payments",
        name: "ProfilePayments",
        component: () => import("@/views/profile/ProfilePaymentView.vue"),
      },
      {
        path: "payments/add",
        name: "ProfileAddPayment",
        component: () => import("@/views/profile/ProfileAddPaymentView.vue"),
      },
      {
        path: "sales",
        name: "ProfileSales",
        component: () => import("@/views/profile/ProfileSalesView.vue"),
      },
      {
        path: "sales/request",
        name: "ProfileSalesRequest",
        component: () => import("@/views/profile/ProfileSalesRequest.vue"),
      },
    ],


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
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
