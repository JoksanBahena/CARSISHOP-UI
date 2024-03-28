<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

    <payment-method-component />

    <v-btn
      variant="flat"
      class="mb-8 mt-10 text-none"
      :color="colors.primary_dark"
      block
      prepend-icon="mdi-plus"
      :to="{ name: 'ProfileAddPayment' }"
    >
      Agregar nueva tarjeta
    </v-btn>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    title: "Metodos de pago",
  },
];
</script>
