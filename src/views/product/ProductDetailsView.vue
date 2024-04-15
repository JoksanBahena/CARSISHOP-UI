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
import ProductReviewsComponent from "@/components/product/ProductReviewsComponent.vue";
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
    title: "Product name",
  },
];
</script>
