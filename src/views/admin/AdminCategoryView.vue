<template>
  <v-container>
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-card outlined v-if="!loading">
      <breadcrumbs-component :items="items" />
      <header-admin-component
        :is-visible="true"
        :href="'categories/add'"
        :button-text="'Agregar nueva categoría'"
        :title="'Categorias'"
      />
      <v-container>
        <admin-category-table-component />
      </v-container>
    </v-card>
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
onMounted(async () => {
  await findAllCategories(0, 10);
  loading.value = false;
});
</script>
