<template>
  <default-layout>
    <breadcrumbs-component :items="items" />
    <v-container>
      <span>34 resultados para tu búsqueda</span>
      <p class="text-h3 font-weight-medium my-2">
        "{{ $route.params.query.toUpperCase() }}"
      </p>

      <filter-products-component />

      <div
        class="d-flex flex-wrap justify-center justify-lg-start justify-md-start mb-16"
      >
        <product-card-component v-for="i in 10" :key="i" />
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";

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
    title: "Subcategory",
    to: {
      name: "CategorizedProducts",
      params: { category: props.category, subcategory: props.subcategory },
    },
  },
  {
    title: "Products list",
  },
];
</script>
