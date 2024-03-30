<template>
  <breadcrumbs-component :items="items" />
  <header-admin-component
    :is-visible="true"
    :href="'/'"
    :button-text="'Agregar nueva subcategoría'"
    :title="'Subcategorías'"
  />
  <v-container>
    <admin-subcategories-table-component />
  </v-container>
</template>

<script setup>
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
</script>
