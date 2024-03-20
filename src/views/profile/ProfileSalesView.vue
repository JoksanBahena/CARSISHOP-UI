<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mi Cuenta']"></v-breadcrumbs>

    <h1 class='ml-5'>Mis ventas</h1>
    <v-container class="d-flex align-center justify-center flex-column">
      <v-icon class='mdi mdi-cart-outline ' size="x-large"></v-icon>
      <h2 class="text-center mt-4">Actualmente no eres un vendedor</h2>
      <p class="text-center mt-4">Puedes solicitar ser un vendedor</p>
      <v-btn append-icon="mdi-chevron-right" :style="{ 'border-color': colors.primary, 'color':colors.primary_dark }" variant='outlined' href="/profileSalesRequest" class="mt-5">Solicitar ser vendedor</v-btn>
    </v-container>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import Colors from '@/utils/Colors.js';

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};
</script>
