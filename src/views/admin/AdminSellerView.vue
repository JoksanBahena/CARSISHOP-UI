<template>
  <breadcrumbs-component :items="items" />

  <admin-seller-tab-component />
</template>

<script setup>
const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Vendedores",
    disabled: true,
    href: "/admin/seller",
  },
];
</script>
