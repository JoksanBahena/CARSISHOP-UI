import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";
import { Logger } from "sass";
import Swal from "sweetalert2";

const routes = [
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/error/NotFoundView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/HomeView.vue"),
    meta: { roles: ["CUSTOMER"] },
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
    path: "/confirm/:token",
    name: "Confirm",
    component: () => import("@/views/auth/ConfirmView.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPasswordView.vue"),
  },
  {
    path: "/reset-password/:token",
    name: "ForgotPasswordConfirm",
    component: () => import("@/views/auth/ForgotPasswordConfirmView.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/cart/CartView.vue"),
    meta: { requiresAuth: true, roles: ["CUSTOMER", "SELLER"] },
  },
  {
    path: "/cart/payment",
    name: "Payment",
    component: () => import("@/views/cart/PaymentView.vue"),
    meta: { requiresAuth: true, roles: ["CUSTOMER", "SELLER"] },
  },
  {
    path: "/category/:category",
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
    path: "/admin",
    name: "Admin",
    redirect: { name: "AdminUsers" },
    component: () => import("@/views/admin/AdminView.vue"),
    meta: { requiresAuth: true, roles: ["ADMIN"] },
    children: [
      {
        path: "seller",
        name: "AdminUsers",
        component: () => import("@/views/admin/AdminSellerView"),
      },
      {
        path: "users/add",
        name: "AdminAddUser",
        component: () => import("@/views/admin/AdminAddUserView.vue"),
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("@/views/admin/AdminProductView.vue"),
      },

      {
        path: "salles",
        name: "AdminSalles",
        component: () => import("@/views/admin/AdminSallesView.vue"),
      },
      {
        path: "categories",
        name: "AdminCategories",
        component: () => import("@/views/admin/AdminCategoryView.vue"),
      },
      {
        path: "categories/add",
        name: "AdminAddCategory",
        component: () => import("@/views/admin/AdminAddCategoryView.vue"),
      },
      {
        path: "subcategories",
        name: "AdminSubCategories",
        component: () => import("@/views/admin/AdminSubCategoryView.vue"),
      },
      {
        path: "subcategories/add",
        name: "AdminAddSubCategory",
        component: () => import("@/views/admin/AdminAddSubcategoryView.vue"),
      },
      {
        path: "admin",
        name: "AdminAdmin",
        component: () => import("@/views/admin/AdminAdminView.vue"),
      },
    ],
  },

  {
    path: "/profile",
    name: "Profile",
    redirect: { name: "ProfileSummary" },
    component: () => import("@/views/profile/ProfileView.vue"),
    meta: { requiresAuth: true, roles: ["CUSTOMER", "SELLER"] },
    children: [
      {
        path: "summary",
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
        path: "addresses/edit/:id",
        name: "ProfileEditAddress",
        component: () => import("@/views/profile/ProfileEditAddressView.vue"),
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
        name: "Sales",
        component: () => import("@/views/seller/SellerView.vue"),
        children: [
          {
            path: "",
            name: "SellerSales",
            component: () => import("@/views/seller/SellerSalesView.vue"),
          },
          {
            path: "request",
            name: "SellerRequest",
            component: () => import("@/views/seller/SellerRequestView.vue"),
          },
          {
            path: "summary",
            name: "SellerResumen",
            component: () => import("@/views/seller/SellerSummaryView.vue"),
          },
          {
            path: "my-sales",
            name: "SellerMySales",
            component: () => import("@/views/seller/SellerSalesTableView.vue"),
          },
          {
            path: "my-products",
            name: "SellerProducts",
            component: () =>
              import("@/views/seller/SellerProductsTableView.vue"),
          },
          {
            path: "my-products/add",
            name: "SellerAddProduct",
            component: () => import("@/views/seller/SellerAddProductView.vue"),
          },
        ],
      },
    ],
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (useAuthStore().isAuthenticated) {
      useAuthStore().verifyTokenExp();
      if (to.meta.roles) {
        if (to.meta.roles.includes(useAuthStore().user)) {
          next();
          return;
        } else {
          if (useAuthStore().user === "CUSTOMER") next({ name: "Home" });
          if (useAuthStore().user === "ADMIN") next({ name: "Admin" });
        }
      }
    } else {
      next({ name: "Login" });
      return;
    }
  } else if (
    useAuthStore().isAuthenticated &&
    (to.name === "Login" ||
      to.name === "Register" ||
      to.name === "ForgotPassword" ||
      to.name === "ForgotPasswordConfirm" ||
      to.name === "Confirm")
  ) {
    next({ name: "Home" });
    return;
  } else {
    if (useAuthStore().user === "ADMIN") {
      next({ name: "Admin" });
      return;
    }
    next();
    return;
  }
});

export default router;
