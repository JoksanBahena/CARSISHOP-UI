<template>
  <v-card
    class="mr-2"
    max-width="326"
    variant="flat"
    :color="colors.secondary"
    href="/product/1"
  >
    <v-img height="200px" :src="item.image"></v-img>

    <v-card-title>
      {{ item.title }}
    </v-card-title>
    <p class="mx-4" :style="{ lineBreak: 'auto' }">
      {{ item.description }}
    </p>

    <v-card-actions>
      <p class="font-weight-medium text-h5">{{ item.price }}</p>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" :style="{ borderColor: colors.primary_dark }">
        <v-icon
          :color="colors.primary_dark"
          class="text-h5"
          icon="mdi-cart-outline"
        ></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template> 

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const item = {
  id: 1,
  title: "Item 1",
  description: "Lorem ipsum dolor sit amet consectetur.",
  price: "$615 MX",
  image: "@/assets/imgs/item.webp",
};

</script>
