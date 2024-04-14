<template>
  <breadcrumbs-component :items="items" />

  <admin-products-tab-component />
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
