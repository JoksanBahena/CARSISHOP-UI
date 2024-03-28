<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>

  <header-admin-component
    :is-visible="true"
    :href="'/profileAddPayment'"
    :button-text="'Agregar nuevo administrador'"
    :title="'Usuarios'"
  />
</template>

<script setup>
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
