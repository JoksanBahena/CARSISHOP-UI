<template>
  <breadcrumbs-component :items="items" />
  <header-admin-component
    :is-visible="false"
    :href="'/'"
    :title="'Productos'"
  />

  <admin-table-products-component />
</template>

<script setup>
const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "productos",
    disabled: true,
    href: "/admin/products",
  },
];
</script>
