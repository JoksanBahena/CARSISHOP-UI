<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <admin-subcategory-form-component />
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
    title: "Subcategorías",
    disabled: false,
    href: "/admin/subcategories",
  },
  {
    title: "Agregar nueva subcategoría",
    disabled: true,
    href: "/admin/subcategories/add",
  },
];
</script>
