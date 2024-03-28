<template>
  <admin-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <header-admin-component
      :is-visible="true"
      :href="'/profileAddPayment'"
      :button-text="'Agregar nuevo administrador'"
      :title="'Usuarios'"
    />

    <admin-table-component />
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
    title: "Usuarios",
    disabled: true,
    href: "/adminUsers",
  },
];
</script>
