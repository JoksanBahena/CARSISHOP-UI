<template>
  <v-app-bar elevation="0" border>
    <v-toolbar :color="toolbar.white">
      <v-slide-group show-arrows>
        <v-btn
          v-for="subcategory in subcategories"
          :key="subcategory.name"
          class="text-none"
          variant="plain"
          :to="subcategory.to"
        >
          {{ subcategory.name }}
        </v-btn>
      </v-slide-group>
    </v-toolbar>
  </v-app-bar>
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

const subcategories = ref([
  {
    name: "Todo",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "todo" },
    },
  },
  {
    name: "Partes Superiores",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "parte-superior" },
    },
  },
  {
    name: "Partes Inferiores",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "parte-inferior" },
    },
  },
  {
    name: "Calzado",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "calzado" },
    },
  },
  {
    name: "Accesorios",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "accesorio" },
    },
  },
  {
    name: "Ropa Interior",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "ropa-interior" },
    },
  },
  {
    name: "Ropa de Dormir",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "ropa-de-dormir" },
    },
  },
  {
    name: "Ropa Deportiva",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "ropa-deportiva" },
    },
  },
  {
    name: "Ropa Formal",
    to: {
      name: "CategorizedProducts",
      params: { subcategory: "ropa-formal" },
    },
  },
]);
</script>
