<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>

    <address-component
      user="Cristopher Soto Ventura"
      state="Morelos"
      town="Emiliano Zapata"
      suburb="Tetacalita"
      street="Calle del Déposito"
      extrnumber="S/N"
      intnumber="132"
      cp="62768"
    />
    <address-component />

    <v-btn
      variant="flat"
      class="my-10 text-none"
      :color="colors.primary_dark"
      block
      prepend-icon="mdi-plus"
      :to="{ name: 'ProfileAddAddress' }"
    >
      Agregar nueva dirección
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
    to: { name: "ProfileAddresses" },
  },
  {
    title: "Mis direcciones",
  },
];
</script>
