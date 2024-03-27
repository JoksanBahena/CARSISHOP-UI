<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <payment-form-component></payment-form-component>
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
    title: "Metodos de pago",
    disabled: false,
    href: "/profilePayment",
  },
  {
    title: "Agregar metodo de pago",
    disabled: true,
    href: "/profileAddPayment",
  },
];
</script>
