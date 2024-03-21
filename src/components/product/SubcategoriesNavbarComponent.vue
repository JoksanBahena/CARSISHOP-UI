<template>
  <v-toolbar :color="toolbar.white" border>
    <v-btn
      v-for="subcagory in subcagories"
      :key="subcagory.name"
      class="text-none"
      variant="plain"
      :to="subcagory.route"
    >
      {{ subcagory.name }}
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const toolbar = {
  bg_color: Colors.cs_primary,
  secondary: Colors.cs_secondary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const subcagories = ref([
  {
    name: "Todo",
    route: "/hombre/all",
  },
  {
    name: "Partes Superiores",
    route: "/hombre/partes-superiores",
  },
  {
    name: "Partes Inferiores",
    route: "/hombre/partes-inferiores",
  },
  {
    name: "Ropa de Punto",
    route: "/hombre/ropa-de-punto",
  },
  {
    name: "Ropa Interior",
    route: "/hombre/ropa-interior",
  },
  {
    name: "Ropa de Dormir",
    route: "/hombre/ropa-de-dormir",
  },
  {
    name: "Ropa Deportiva",
    route: "/hombre/ropa-deportiva",
  },
  {
    name: "Ropa Formal",
    route: "/hombre/ropa-formal",
  },
]);
</script>
