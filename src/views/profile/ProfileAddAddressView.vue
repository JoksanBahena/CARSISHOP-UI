<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mi Cuenta']"></v-breadcrumbs>
    <h1 class='ml-5'>Mis dirrecciones</h1>

    <v-container>
      <h4>Direccion de envio:</h4>
<v-form>

  <v-row class="mt-5">
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Nombre(s)
        </div>
        <v-text-field
        density="compact"
        placeholder="Nombre(s)"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Apellidos
        </div>
        <v-text-field
        density="compact"
        placeholder="Apellidos"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>

  </v-row>
  <v-row class="mt-5">
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Calle
        </div>
        <v-text-field
        density="compact"
        placeholder="Calle"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Colonia
        </div>
        <v-text-field
        density="compact"
        placeholder="Colonia"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>

  </v-row>
  <v-row class="mt-5">
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Codigo Postal
        </div>
        <v-text-field
        density="compact"
        placeholder="Codigo Postal"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Estado
        </div>
        <v-text-field
        density="compact"
        placeholder="Estado"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        />
      </div>
    </v-col>

  </v-row>
  <v-row>
    <v-col cols="8">
      <v-btn
      variant="outlined"
      class="mb-8  text-none"
      :color="colors.primary_dark"
      block
      href="/profileAddAddress"
      >Guardar</v-btn>
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
