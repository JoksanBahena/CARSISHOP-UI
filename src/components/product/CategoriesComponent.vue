<template>
  <v-container class="mt-12">
    <h2>Explora nuestras categorias</h2>
    <v-row class="mt-2 justify-center justify-space-center">
      <v-col
        v-for="category in categories"
        :key="category.index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="344" variant="flat">
          <v-img height="auto" :src="category.img" cover />
          <v-card-actions>
            <p class="font-weight-medium">{{ category.title }}</p>
            <v-spacer />
            <v-btn
              variant="outlined"
              :style="{ borderColor: colors.primary }"
              :href="category.title"
            >
              <v-icon icon="mdi-chevron-right" class="text-h4" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const categories = ref([
  {
    title: "Mujeres",
    img: "/src/assets/imgs/girl_card.webp",
  },
  {
    title: "Hombres",
    img: "/src/assets/imgs/men_card.webp",
  },
  {
    title: "Niños",
    img: "/src/assets/imgs/kids_card.webp",
  },
]);
</script>
