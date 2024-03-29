<template>
  <admin-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <header-admin-component
      :is-visible="false"
      :href="'/profileAddPayment'"
      :title="'Productos'"
    />

    <admin-table-products-component />
  </admin-layout>
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
