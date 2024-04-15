<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Subcategorías</p>
    <admin-subcategory-table-component />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSubcategoryStore } from "@/store/SubcategoryStore.js";
const { findAllsubcategories } = useSubcategoryStore();

const loading = ref(true);
const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Usuarios",
    disabled: true,
    href: "/admin/categories",
  },
];

onMounted(async () => {
  await findAllsubcategories(0, 10);
  loading.value = false;
});
</script>
