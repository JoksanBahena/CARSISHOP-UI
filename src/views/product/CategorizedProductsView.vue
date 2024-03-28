<template>
  <default-layout>
    <subcategories-navbar-component />
    <breadcrumbs-component :items="items" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">
        {{ $route.params.subcategory }} para {{ $route.params.category }}
      </p>

      <filter-products-component />

      <div class="d-flex flex-wrap justify-center justify-lg-start justify-md-start mb-16">
        <product-card-component v-for="i in 11" :key="i" />
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import SubcategoriesNavbarComponent from "@/components/product/SubcategoriesNavbarComponent.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import FilterProductsComponent from "@/components/product/FilterProductsComponent.vue";

const props = defineProps({
  category: {
    type: String,
    default: "Categoría",
  },
  subcategory: {
    type: String,
    default: "Subcategoría",
  },
});

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: props.category,
    to: {
      name: "CategorizedProducts",
      params: { category: props.category, subcategory: "todo" },
    },
  },
  {
    title: props.subcategory,
    to: {
      name: "CategorizedProducts",
      params: { category: props.category, subcategory: "subcategory" },
    },
  },
];
</script>
