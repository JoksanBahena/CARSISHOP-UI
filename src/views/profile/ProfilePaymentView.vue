<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mi Cuenta']"></v-breadcrumbs>
    <h1 class='ml-5'>Metodos de pago</h1>

  <v-container class="ml-0" style="width: 80%;">
      <v-row class="pl-7" rows="12" md="4">
        <v-card
        variant="flat"
        width="100%">
        <v-card-title>Metodo de pago:</v-card-title>
        <v-card-item>

        <template v-slot:prepend>
          <v-img src="@/assets/imgs/mc.webp" width="50" height="50" class="mr-2"></v-img>
        </template>
        <v-card-text class="py-0">Nombre</v-card-text>
        <v-card-text class="py-1">
       Numero
        </v-card-text>
      </v-card-item>
      <v-card-actions>
        <v-btn
        variant="outlined"
        class="mb-8 text-none"
        :color="colors.primary_dark"
        >Editar tarjeta</v-btn>

      </v-card-actions>
    </v-card>
    <V-divider></v-divider>
      <v-btn
        variant="outlined"
        class="mb-8 mt-10 text-none"
        :color="colors.primary_dark"
        block=""
        href="/profileAddPayment"
        >Agregar nueva tarjeta</v-btn>
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

const image_url = ref("");

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    image_url.value = e.target.result;
  };

  reader.readAsDataURL(file);
};
</script>
