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

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
