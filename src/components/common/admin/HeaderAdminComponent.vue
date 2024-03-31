<template>
  <v-container>
    <h2>{{ title }}</h2>
    <v-row class="pl-md-6">
      <v-col cols="12" md="6" lg="3" v-if="isVisible">
        <v-btn
          variant="flat"
          class="mb-8 mt-6 text-none"
          :color="colors.primary_dark"
          :href="href"
          append-icon="mdi-chevron-right"
        >
          {{ buttonText }}
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
        class="text-md-right ml-auto mb-md-auto mt-md-auto"
      >
        <v-row>
          <v-col cols="8" md="6" class="pr-2">
            <v-text-field
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              clearable
              type="search"
            ></v-text-field>
          </v-col>
          <v-col cols="4" md="6" class="mb-auto mt-auto pl-2">
            <p class="text-md-right">{{ result }} Resultados obtenidos</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  href: {
    type: String,
    default: "/",
  },
  buttonText: {
    type: String,
    default: "Agregar nuevo administrador",
  },
  title: {
    type: String,
    default: "Usuarios",
  },
  result: {
    type: Number,
    default: 0,
  },
});

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
