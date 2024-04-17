<template>
  <v-card
    class="ma-1"
    variant="flat"
    min-width="280"
    max-width="280"
    :color="colors.secondary"
    :href="`/product/${item.id}`"
  >
    <v-img
      class="mb-4"
      height="280"
      :src="item.images[0]?.url || defaultImage"
    />

    <v-card-title class="text-h6 pl-4">
      {{ item.name }}
    </v-card-title>

    <v-card-item>
      {{ truncateDescription(item.description) }}
    </v-card-item>

    <v-card-actions>
      <p class="font-weight-bold text-h5 mr-2" :style="{ color: colors.red }">
        {{ "$" + item.stock[0].price + "MX" }}
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
};
const defaultImage = "https://via.placeholder.com/500";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

function truncateDescription(description) {
  const maxLength = 50; 
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...'; 
  }
  return description;
}
</script>
