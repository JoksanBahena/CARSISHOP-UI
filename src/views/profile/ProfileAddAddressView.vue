<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <address-form-component></address-form-component>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import AddressFormComponent from "@/components/profile/Form/AddressFormComponent.vue";

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
    title: "Mis direcciones",
    disabled: false,
    href: "/profileAddress",
  },
  {
    title: "Agregar nueva direccion",
    disabled: true,
    href: "/profileAddAddress",
  },
];
</script>
