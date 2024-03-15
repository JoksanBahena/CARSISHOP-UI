<template>
  <navbar-component />
  <main>
    <v-row align="center" justify="center" class="ma-0 pa-0">
      <v-col cols="7" :style="{ background: colors.secondary }">
        <v-img src="@/assets/imgs/background_auth.png"></v-img>
      </v-col>
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
  </main>
  <footer-component />
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";

import Colors from "@/utils/Colors.js";

const colors = {
  secondary: Colors.cs_secondary,
};
</script>
