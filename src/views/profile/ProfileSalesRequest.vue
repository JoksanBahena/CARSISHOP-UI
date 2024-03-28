<template>
<<<<<<< HEAD
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mis ventas</p>
      <v-form>
        <p class="text-h6 font-weight-medium mb-2">Solicitud de vendedor</p>
        <v-row>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">CURP</div>
              <v-text-field
                density="compact"
                placeholder="Nombre(s)"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              />
            </div>
          </v-col>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Correo</div>
              <v-text-field
                density="compact"
                placeholder="Apellidos"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              />
            </div>
          </v-col>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">RFC</div>
              <v-text-field
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-calendar-month-outline"
                variant="outlined"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Direccion</div>
              <v-text-field
                density="compact"
                placeholder="Genero"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              />
            </div>
          </v-col>

          <v-col cols="4">
            <div class="text-subtitle-1 font-weight-medium">Identificacion</div>
            <v-file-input
              density="compact"
              type="file"
              accept="image/png, image/jpeg, image/bmp"
              variant="outlined"
              prepend-icon="mdi-camera-outline"
              chips
              show-size
              @change="onFileChange"
            />
          </v-col>
        </v-row>

        <v-btn
          class="mb-8 text-none"
          variant="outlined"
          :color="colors.primary_dark"
          prepend-icon="mdi-send"
          size="large"
          block
        >
          Enviar solicitud
        </v-btn>
      </v-form>
    </v-container>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import Colors from "@/utils/Colors.js";
=======
  <breadcrumbs-component :items="items" />
  <sales-form-component />
</template>

<script setup>
import SalesFormComponent from "@/components/profile/Form/SalesFormComponent.vue";
>>>>>>> 08c929c ([MODIFY] eliminación de default-layout, implentación de breadcrumbs-component y redireccionamiento de rutas con :to + nombre de la ruta)

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
    title: "Ventas",
    to: { name: "ProfileSales" },
  },
  {
    title: "Solicitud de vendedor",
  },
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
