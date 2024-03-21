<template>
  <v-toolbar :elevation="2" :color="toolbar.bg_color">
    <v-btn
      :color="toolbar.primary_dark"
      class="text-none"
      variant="plain"
      to="/mujeres/all"
    >
      Mujeres
    </v-btn>

    <v-btn
      :color="toolbar.primary_dark"
      class="text-none"
      variant="plain"
      to="/hombres/all"
    >
      Hombres
    </v-btn>

    <v-btn
      :color="toolbar.primary_dark"
      class="text-none"
      variant="plain"
      to="/kids/all"
    >
      Niños
    </v-btn>

    <v-spacer />

    <v-toolbar-title :style="{ color: toolbar.primary_dark }">
      <h1 class="text-h6 font-weight-bold">CarsiShop</h1>
    </v-toolbar-title>

    <v-spacer />

    <search-btn-component />

    <v-btn icon :style="{ color: toolbar.primary_dark }">
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

    <v-btn icon :style="{ color: toolbar.primary_dark }" to="login">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";
import Colors from "@/utils/Colors.js";

const toolbar = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};
</script>
