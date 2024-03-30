<template>
  <breadcrumbs-component :items="items" />

  <header-admin-component
    :is-visible="true"
    :href="'/'"
    :button-text="'Agregar nuevo administrador'"
    :title="'Usuarios'"
  />

  <admin-user-tab-component />
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
    href: "/admin/users",
  },
];
</script>
