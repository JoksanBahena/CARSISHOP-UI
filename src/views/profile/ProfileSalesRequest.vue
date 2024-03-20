<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mi Cuenta']"></v-breadcrumbs>
    <h1 class='ml-5'>Ventas</h1>
    <h4 class='ml-5'>Solicitud de vendedor</h4>

    <v-container class="ml-0" style="width: 80%;">
      <v-form>
        <v-row>

          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                CURP
              </div>
              <v-text-field density="compact" placeholder="Nombre(s)" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>

          </v-col>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Correo
              </div>
              <v-text-field density="compact" placeholder="Apellidos" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>
          </v-col>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                RFC
              </div>
              <v-text-field density="compact" placeholder="Correo electrónico"
                prepend-inner-icon="mdi-calendar-month-outline" variant="outlined" />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Direccion
              </div>
              <v-text-field density="compact" placeholder="Genero" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>

          </v-col>

          <v-col cols="4">
            <div class="text-subtitle-1 font-weight-medium">
              Identificacion
            </div>
            <v-file-input density="compact" type="file" accept="image/png, image/jpeg, image/bmp" variant="outlined"
              prepend-icon="mdi-camera-outline" chips show-size @change="onFileChange" />
          </v-col>
        </v-row>

        <v-btn class="mb-8 text-none" variant="outlined" :color="colors.primary_dark" prepend-icon="mdi-send" size="large" block>
          Enviar solicitud
        </v-btn>
      </v-form>

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
};
</script>
