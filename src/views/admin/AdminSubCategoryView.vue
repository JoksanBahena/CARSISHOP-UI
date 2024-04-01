<template>
  <v-container>
    <v-card outlined v-if="!loading">
      <breadcrumbs-component :items="items" />

      <header-admin-component
        :is-visible="true"
        :href="'subcategories/add'"
        :button-text="'Agregar nueva subcategoría'"
        :title="'Subcategorías'"
      />
      <v-container>
        <admin-subcategory-table-component />
      </v-container>
    </v-card>
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
