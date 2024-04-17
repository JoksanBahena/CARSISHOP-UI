<template>
  <v-card
    class="ma-1"
    variant="flat"
    min-width="280"
    max-width="280"
    min-height="450"
    max-height="450"
    :color="colors.secondary"
    :to="{ name: 'Product', params: { id: encryptedId } }"
  >
    <v-img
      class="mb-4"
      height="280"
      :src="item.images[0]?.url || defaultImage"
    />

    <v-card-title class="text-h5 pl-4">
      {{ item.name }}
    </v-card-title>

    <p class="mx-4">
      {{ item.description }}
    </p>

    <v-card-actions class="align-end">
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
import { encryptAES } from "@/utils/Crypto";

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
const encryptedId = encryptAES(props.item.id.toString());
</script>
