<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mi Cuenta']"></v-breadcrumbs>
    <h1 class='ml-5'>Mi cuenta</h1>

    <v-container class="ml-0" style="width: 80%;">
      <v-form>
        <v-row>


          <v-col cols="12" md="4">
            <v-img lazy-src="@/assets/imgs/men_card.webp" src="@/assets/imgs/men_card.webp" width="200" height="200"
              aspect-ratio="1" class="bg-grey-lighten-2 rounded-circle" cover>
            </v-img>
          </v-col>
          <v-col cols="12" md="4" class="mt-auto">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Nombre(s)
              </div>
              <v-text-field density="compact" placeholder="Nombre(s)" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>
          </v-col>
          <v-col cols="12" md="4" class="mt-auto">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Apellidos
              </div>
              <v-text-field density="compact" placeholder="Apellidos" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Fecha de nacimiento
              </div>
              <v-text-field density="compact" placeholder="Correo electrónico"
                prepend-inner-icon="mdi-calendar-month-outline" variant="outlined" />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Genero
              </div>
              <v-text-field density="compact" placeholder="Genero" prepend-inner-icon="mdi-account-outline"
                variant="outlined" />
            </div>

          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Telefono
              </div>
              <v-text-field density="compact" placeholder="Telefono" prepend-inner-icon="mdi-phone-outline"
                variant="outlined" />
            </div>
          </v-col>

        </v-row>
        <v-row>


          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Dirección
              </div>
              <v-text-field density="compact" placeholder="Correo electrónico" prepend-inner-icon="mdi-google-maps"
                variant="outlined" />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">
              Correo
            </div>
            <v-text-field density="compact" placeholder="Correo electrónico" prepend-inner-icon="mdi-email-outline"
              variant="outlined" />
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">
              Foto de perfil
            </div>
            <v-file-input density="compact" type="file" accept="image/png, image/jpeg, image/bmp" variant="outlined"
              prepend-icon="mdi-camera-outline" chips show-size @change="onFileChange" />
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>

          <v-col cols="12">
            <v-btn variant="outlined" prepend-icon="mdi-pencil" class="text-none" :color="colors.primary_dark"
              size="large" block>
              Editar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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
