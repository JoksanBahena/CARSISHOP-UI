<template>
  <default-layout>
    <breadcrumbs-component :items="items" />
    <v-container>
      <product-info-component />
      <!-- <product-reviews-component /> -->
      <v-divider class="my-12" />
      <product-list-component title="Productos relacionados" />
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductInfoComponent from "@/components/product/ProductInfoComponent.vue";
import ProductListComponent from "@/components/common/ProductListComponent.vue";

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
    title: "Categoría",
    to: {
      name: "CategorizedProducts",
      params: { category: "hombre" },
    },
  },

  {
    title: "Producto",
  },
];
</script>
