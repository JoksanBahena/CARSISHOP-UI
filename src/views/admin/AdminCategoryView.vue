<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Categorías</p>

    <admin-category-table-component  />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/store/CategoryStore.js";

const { findAllCategories } = useCategoryStore();

const loading = ref(true);

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

// onMounted(async () => {
//   try {
//     await findAllCategories(0, 100, { sortBy: "name", order: "asc" });
//   } catch (error) {
//     console.log("error al cargar las categorias");
//   } finally {
//     loading.value = false;
//   }
// });
</script>
