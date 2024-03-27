<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>
      <v-form>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Nombre y apellidos
              </div>
              <v-text-field
                density="compact"
                placeholder="Nombre(s)"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              />
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
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
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field
                density="compact"
                placeholder="Colonia"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              />
            </div>
          </v-col>
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
              <div class="text-subtitle-1 font-weight-medium">Estado</div>
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
              class="mb-8 text-none"
              :color="colors.primary_dark"
              block
              href="/profileAddAddress"
              prepend-icon="mdi-plus"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    disabled: false,
    href: "/profileAddress",
  },
  {
    title: "Agregar nueva direccion",
    disabled: true,
    href: "/profileAddAddress",
  },
];
</script>
