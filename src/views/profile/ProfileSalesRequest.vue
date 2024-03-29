<template>
  <breadcrumbs-component :items="items" />
  <sales-form-component />
</template>

<script setup>
import SalesFormComponent from "@/components/profile/Form/SalesFormComponent.vue";

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
    title: "Ventas",
    to: { name: "ProfileSales" },
  },
  {
    title: "Solicitud de vendedor",
  },
];
</script>
