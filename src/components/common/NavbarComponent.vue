<template>
  <v-toolbar :elevation="2" :color="toolbar.bg_color">
    <v-btn
      :style="{ color: toolbar.color }"
      class="text-none"
      variant="plain"
      to="/"
    >
      Mujeres
    </v-btn>

    <v-btn
      :style="{ color: toolbar.color }"
      class="text-none"
      variant="plain"
      to="/"
    >
      Hombres
    </v-btn>

    <v-btn
      :style="{ color: toolbar.color }"
      class="text-none"
      variant="plain"
      to="/"
    >
      Niños
    </v-btn>

    <v-spacer />

    <v-toolbar-title :style="{ color: toolbar.color }">
      <b>CarsiShop</b>
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon :style="{ color: toolbar.color }">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon :style="{ color: toolbar.color }">
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

    <v-btn icon :style="{ color: toolbar.color }" to="login">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const toolbar = {
  bg_color: Colors.cs_primary,
  color: Colors.cs_primary_dark,
};
</script>
