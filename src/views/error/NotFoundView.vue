<template>
  <default-layout page-title="404 NOT FOUND">
    <v-parallax src="@/assets/imgs/background.png">
      <v-layout class="d-flex flex-column align-center text-black h-screen">
        <h2 class="font-weight-medium mt-12 text-h2">ERROR 404</h2>
        <p class="font-weight-medium text-h6 my-4">
          ¡Esta página se ha ido de compras!
        </p>
        <v-btn
          class="mb-8 text-none"
          :color="colors.primary_dark"
          variant="flat"
          :to="{ name: 'Home' }"
        >
          Sigue explorando mientras regresa
        </v-btn>
      </v-layout>
    </v-parallax>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};
</script>
