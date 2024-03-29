<template>
  <breadcrumbs-component :items="items" />
  <header-admin-component
    :is-visible="false"
    :href="'/profileAddPayment'"
    :title="'Productos'"
  />

  <admin-table-products-component />
</template>

<script setup>
import AdminLayout from "../../layouts/admin/AdminLayout.vue";

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "productos",
    disabled: true,
    href: "/adminProducts",
  },
];
</script>
