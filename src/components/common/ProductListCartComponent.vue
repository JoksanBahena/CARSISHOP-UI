<template>
  <div class="d-flex justify-end mt-4">
    <v-btn variant="flat" icon="mdi-close" @click="deleteItem(id)"/>
  </div>
  <v-row class="mt-2 mb-4 align-center">
    <v-col cols="12" lg="6" md="6">
      <v-row class="align-center">
        <v-col cols="12" lg="6" md="6" class="py-2">
          <v-img :src="image" width="120" class="mx-auto" />
        </v-col>
        <v-col>
          <p class="text-h6">{{ product }}</p>
          <p class="text-subtitle-1 my-1">{{ description }}</p>
          <p class="text-subtitle-1 my-1">Talla: {{ size }}</p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="7" lg="3" md="3">
      <div class="text-subtitle-1 font-weight-medium">Cantidad:</div>
      <v-text-field
        type="number"
        v-model="state.amount"  class="mt-2" dense outlined></v-text-field>
      <div class="d-flex">
        <p class="text-subtitle-1 mt-2 mb-8 ml-2">${{ price }}MX</p>
      </div>
    </v-col>
    <v-col cols="5" lg="3" md="3" align="center">
      <p class="text-subtitle-1 font-weight-medium">Subtotal:</p>
      <p class="text-h5 font-weight-medium mt-2 mb-8">${{ price * state.amount }}MX</p>
    </v-col>
    <v-divider class="mt-12 mb-2" />
  </v-row>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import {reactive} from "vue";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  deleteItem: {
    type: Function
  },
  id: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "@/assets/imgs/item.webp",
  },
  product: {
    type: String,
    default: "Producto",
  },
  description: {
    type: String,
    default: "Descripción en proceso",
  },
  size: {
    type: String,
    default: "M",
  },
  price: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 1,
  },
});

const state = reactive({...props})

</script>
