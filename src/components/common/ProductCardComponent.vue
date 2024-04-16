<template>
  <v-card
    class="ma-1"
    variant="flat"
    style="width: 280px; height: 400px"
    :color="colors.secondary"
    :href="`/product/${item.id}`"
  >
    <div style="height: 200px; overflow: hidden">
      <v-img
        class="my-0"
        style="height: 100%; width: 100%; object-fit: cover"
        :src="item.images[0]?.url || defaultImage"
      />
    </div>

    <v-card-title class="text-h4">
      {{ item.name }}
    </v-card-title>

    <p class="mx-4">
      {{ item.description }}
    </p>

    <v-card-actions class="align-end">
      <p class="font-weight-bold text-h5 mr-2" :style="{ color: colors.red }">
        {{ "$MX" + item.stock[0].price }}
      </p>
      <v-spacer />
      <v-btn variant="outlined" :style="{ borderColor: colors.primary_dark }">
        <v-icon
          :color="colors.primary_dark"
          class="text-h5"
          icon="mdi-cart-outline"
        />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
  red: Colors.cs_red,
  gray: Colors.cs_opacity_gray,
};
const defaultImage = "https://via.placeholder.com/500";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
