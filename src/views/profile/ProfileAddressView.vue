<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

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
        href="/profileAddAddress"
        prepend-icon="mdi-plus"
      >
        Agregar nueva dirección
      </v-btn>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

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
    disabled: true,
    href: "/profileAddress",
  },
];
const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
