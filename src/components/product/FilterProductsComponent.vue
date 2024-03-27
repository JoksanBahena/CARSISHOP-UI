<template>
  <v-btn
    class="text-none flex-grow-1 my-4"
    prepend-icon="mdi-filter-variant"
    :color="colors.primary_dark"
    variant="outlined"
    @click.stop="drawer = !drawer"
  >
    Filtros
  </v-btn>

  <v-navigation-drawer
    :color="colors.secondary"
    v-model="drawer"
    location="right"
    width="400"
    temporary
  >
    <v-container>
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-h5 font-weight-bold">Filtros</p>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click.stop="drawer = !drawer"
        />
      </div>

      <v-divider />

      <v-list class="mt-6">
        <v-radio-group>
          <p class="text-subtitle-1 font-weight-medium mb-2">Ordenar por</p>
          <v-radio label="Recomedados" value="one" />
          <v-radio label="Precio mayor" value="two" />
          <v-radio label="Precio menor" value="three" />
        </v-radio-group>
      </v-list>

      <v-list>
        <p class="text-subtitle-1 font-weight-medium mb-2">Categorias</p>
        <v-radio label="Mujeres" value="one" />
        <v-radio label="Hombres" value="two" />
        <v-radio label="Niñas" value="three" />
        <v-radio label="Niños" value="three" />
      </v-list>

      <v-list class="mt-6">
        <p class="text-subtitle-1 font-weight-medium mb-2">Subcategorias</p>
        <v-radio label="Mujeres" value="one" />
        <v-radio label="Hombres" value="two" />
        <v-radio label="Niñas" value="three" />
        <v-radio label="Niños" value="three" />
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";

const colors = {
  primary_dark: Colors.cs_primary_dark,
  secondary: Colors.cs_secondary,
};

const drawer = ref(false);
</script>
