<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <admin-category-form-component />
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
    title: "Categorias",
    disabled: false,
    href: "/admin/categories",
  },
  {
    title: "Agregar nueva categoría",
    disabled: true,
    href: "/admin/categories/add",
  },
];
</script>
