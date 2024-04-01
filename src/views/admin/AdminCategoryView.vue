<template>
  <breadcrumbs-component :items="items" />
  <header-admin-component
    :is-visible="true"
    :href="'categories/add'"
    :button-text="'Agregar nueva categoría'"
    :title="'Categorias'"
  />
  <v-container>
    <admin-category-table-component :categories="categories" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/store/CategoryStore.js";

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Categorias",
    disabled: true,
    href: "/admin/categories",
  },
];
onMounted(async () => {
  await findAllCategories(0, 10);
});
const { categories, findAllCategories } = useCategoryStore();
console.log("Categorias en AdminCategoryView", categories);
</script>
