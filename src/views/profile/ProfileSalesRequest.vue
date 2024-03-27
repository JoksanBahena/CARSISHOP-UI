<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <sales-form-component></sales-form-component>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import SalesFormComponent from "@/components/profile/Form/SalesFormComponent.vue";

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Perfil",
    disabled: false,
    href: "/profileAccount",
  },
  {
    title: "Ventas",
    disabled: false,
    href: "/profileSales",
  },
  {
    title: "Solicitud de vendedor",
    disabled: true,
    href: "/profileSalesRequest",
  },
];
</script>
