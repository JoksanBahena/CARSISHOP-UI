<template>
  <breadcrumbs-component :items="items" />
  <address-form-component />
</template>

<script setup>
import AddressFormComponent from "@/components/profile/Form/AddressFormComponent.vue";

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
    title: "Agregar nueva direccion",
  },
];
</script>
