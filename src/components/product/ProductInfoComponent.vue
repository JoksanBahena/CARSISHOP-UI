<template>
  <v-row class="justify-center mb-16">
    <v-col cols="auto" class="ma-0 pa-0">
      <v-img
        v-for="n in 5"
        :key="n"
        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        aspect-ratio="1"
        class="bg-grey-lighten-2 my-3"
        width="80"
        cover
        @mouseenter="updateMainImage(n)"
        @mouseover="hoverImage = n"
        :style="{
          border: hoverImage === n ? '3px solid ' + colors.bg_color : 'none',
        }"
      >
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular :color="colors.bg_color" indeterminate />
          </v-row>
        </template>
      </v-img>
    </v-col>
    <v-col cols="auto">
      <v-img
        :aspect-ratio="1"
        class="bg-grey-lighten-2"
        :src="mainImage"
        width="450"
        cover
      >
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular color="grey-lighten-5" indeterminate />
          </v-row>
        </template>
      </v-img>
    </v-col>
    <v-col>
      <h4 class="text-h4 font-weight-medium">Chamarra Capitonada Marino</h4>
      <div class="d-flex mb-4">
        <span class="my-2">{{ rating }}</span>
        <v-rating
          v-model="rating"
          class="ma-1"
          density="compact"
          color="yellow-darken-3"
        />
      </div>

      <div class="d-flex align-end mb-2">
        <h4
          class="text-h4 font-weight-medium mr-2"
          :style="{ color: colors.red }"
        >
          $320MX
        </h4>
        <p
          class="text-subtitle-1 font-weight-medium text-decoration-line-through"
          :style="{ color: colors.gray }"
        >
          $499MX
        </p>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div class="my-4">
        <p class="text-subtitle-1 font-weight-bold">Talla</p>
        <v-chip-group
          v-model="selection"
          selected-class="text-white bg-indigo-darken-4"
          mandatory
        >
          <v-chip
            v-for="size in sizes"
            :key="size.id"
            :value="size.size"
            :disabled="size.disabled"
            :variant="getChipVariant(size)"
            class="px-4"
          >
            {{ size.size }}
          </v-chip>
        </v-chip-group>
      </div>

      <v-btn
        class="text-none flex-grow-1"
        prepend-icon="mdi-cart-outline"
        :color="colors.primary_dark"
        variant="flat"
      >
        Agregar al carrito
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const mainImage = ref("https://cdn.vuetifyjs.com/images/parallax/material.jpg");
const hoverImage = ref(null);
const rating = ref(4);
const selection = ref(null);

const colors = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  red: Colors.cs_red,
  gray: Colors.cs_opacity_gray,
};

const sizes = [
  { id: 1, size: "XS", disabled: false },
  { id: 2, size: "S", disabled: false },
  { id: 3, size: "M", disabled: true },
  { id: 4, size: "L", disabled: true },
  { id: 5, size: "XL", disabled: false },
];

const getChipVariant = (size) => {
  return selection.value === size.size ? "flat" : "outlined";
};

const updateMainImage = (n) => {
  mainImage.value = `https://picsum.photos/500/300?image=${n * 5 + 10}`;
};
</script>
