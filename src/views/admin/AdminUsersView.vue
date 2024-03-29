<template>
  <breadcrumbs-component :items="items" />

  <header-admin-component
    :is-visible="true"
    :href="'/profileAddPayment'"
    :button-text="'Agregar nuevo administrador'"
    :title="'Usuarios'"
  />

  <admin-table-component />
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
    title: "Usuarios",
    disabled: true,
    href: "/adminUsers",
  },
];
</script>
