<template>
  <breadcrumbs-component :items="items" />

  <header-admin-component :is-visible="false" :href="'/'" :title="'Ventas'" />
  <admin-salles-table-component />
</template>

<script setup>
const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Ventas",
    disabled: true,
    href: "/admin/salles",
  },
];
</script>
