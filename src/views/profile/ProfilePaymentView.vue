<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

      <payment-method-component />

      <v-btn
        variant="flat"
        class="mb-8 mt-10 text-none"
        :color="colors.primary_dark"
        block=""
        href="/profileAddPayment"
        prepend-icon="mdi-plus"
      >
        Agregar nueva tarjeta
      </v-btn>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    disabled: true,
    href: "/profilePayment",
  },
];
</script>
