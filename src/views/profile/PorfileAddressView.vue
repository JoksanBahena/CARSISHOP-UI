<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mis direcciones']"></v-breadcrumbs>
    <h1 class='ml-5'>Mis direcciones</h1>

    <v-container>
      <v-row class="pl-7" rows="12" md="4">
        <v-card
        variant="flat"
        width="100%">
      <v-card-item>
        <v-card-title>Dirección de envio:</v-card-title>

        <v-card-subtitle class="mt-1">Nombre</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        Direccion
      </v-card-text>
      <v-card-actions>
        <v-btn
        variant="outlined"
        class="mb-8 text-none"
        :color="colors.primary_dark"
        >Editar direccion</v-btn>

      </v-card-actions>
    </v-card>
    <V-divider></v-divider>
      <v-btn
        variant="outlined"
        class="mb-8 mt-10 text-none"
        :color="colors.primary_dark"
        block
        href="/profileAddAddress"
        >Agregar nueva direccion</v-btn>
      </v-row>


    </v-container>

  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

</script>
