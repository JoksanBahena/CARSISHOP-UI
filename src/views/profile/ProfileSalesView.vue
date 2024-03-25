<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mis ventas</p>

      <orders-not-found-component
        advise="Actualmente no eres un vendedor"
        recomendation="Puedes solicitar ser vendedor para empezar a comercializar tus productos"
        action="Solicitar ser vendedor"
        to="/profileSalesRequest"
      />
    </v-container>
  </profile-layout>
</template>

<script setup>
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
    title: "Mis ventas",
    disabled: true,
    href: "/profileSales",
  },
];

</script>
