<template>
  <div class="mt-5">
    <h2>{{ title }}</h2>

    <v-row class="mt-5">
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto" max-width="326" variant="flat" :color="colors.secondary">
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
            <v-btn :style="{ backgroundColor: colors.primary_dark }">
              <v-icon :color="colors.white" class="text-h5" icon="mdi-pencil"></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const items = [
  { id: 1, title: "Item 1", description: "Lorem ipsum dolor sit amet consectetur.", price: "$615 MX", image: "@/assets/imgs/item.webp" },
  { id: 2, title: "Item 2", description: "Lorem ipsum dolor sit amet consectetur.", price: "$615 MX", image: "@/assets/imgs/item.webp" },
  { id: 3, title: "Item 3", description: "Lorem ipsum dolor sit amet consectetur.", price: "$615 MX", image: "@/assets/imgs/item.webp" },
  { id: 4, title: "Item 4", description: "Lorem ipsum dolor sit amet consectetur.", price: "$615 MX", image: "@/assets/imgs/item.webp" },
  { id: 4, title: "Item 4", description: "Lorem ipsum dolor sit amet consectetur.", price: "$615 MX", image: "@/assets/imgs/item.webp" },
];

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
})
</script>
