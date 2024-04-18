<template>
  <breadcrumbs-component :items="items" />
  <address-edit-form-component />
</template>

<script setup>
import AddressFormComponent from "@/components/profile/Form/AddressEditFormComponent.vue";

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    to: { name: "ProfileSummary" },
  },
  {
    title: "Mis direcciones",
    to: { name: "ProfileAddresses" },
  },
  {
    title: "Editar direccion",
  },
];
</script>
