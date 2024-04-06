<template>
  <navbar-component />
  <v-main class="h-100">
    <v-row class="align-center justify-center ma-0 pa-0">
      <v-col cols="12" lg="7" :style="{ background: colors.secondary }">
        <v-parallax src="@/assets/imgs/background_auth.png">
          <v-layout
            class="d-flex flex-column fill-height align-center text-black"
          >
            <h4
              class="font-weight-bold text-center text-wrap d-flex d-md-none my-16 text-h4"
            >
              {{ pageTitle }}
            </h4>
          </v-layout>
        </v-parallax>
      </v-col>
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
  </v-main>
  <footer-component />
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";

import Colors from "@/utils/Colors.js";

const colors = {
  secondary: Colors.cs_secondary,
};

defineProps({
  pageTitle: {
    type: String,
    default: "CarsiShop",
  },
});
</script>
