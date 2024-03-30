import Colors from '@/utils/Colors.js';
<template>
  <v-container class="">
    <v-tabs v-model="tab" :color="colors.primary_dark">
      <v-tab value="1">LISTA DE productos</v-tab>
      <v-tab value="2">SOLICITUD DE productos</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="1">
        <v-container fluid>
          <admin-product-table-products-component />
        </v-container>
      </v-window-item>
      <v-window-item value="2">
        <v-container fluid>
          <admin-request-product-table-products-component />
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors";
import { ref } from "vue";

const tab = ref(null);
const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
