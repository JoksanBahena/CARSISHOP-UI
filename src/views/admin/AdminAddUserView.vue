<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <admin-user-form-component />
  </v-container>
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
    disabled: false,
    href: "/admin/users",
  },
  {
    title: "Agregar nuevo usuario",
    disabled: true,
    href: "/admin/users/add",
  },
];
</script>
