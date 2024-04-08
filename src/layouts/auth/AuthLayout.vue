<template>
  <navbar-component />
  <v-main>
    <v-row class="ma-0 oa-0">
      <v-col cols="12" lg="7" md="7" :style="{ background: colors.secondary }">
        <v-parallax src="@/assets/imgs/background_auth.png">
          <v-layout class="d-flex flex-column align-center text-black">
            <h4
              class="text-h4 font-weight-medium text-center d-flex d-md-none my-16"
            >
              {{ page_title }}
            </h4>
          </v-layout>
        </v-parallax>
      </v-col>
      <v-col cols="12" lg="5" md="5" class="d-flex align-center">
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
  page_title: {
    type: String,
    default: "CarsiShop",
  },
});
</script>
