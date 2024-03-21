<template>
  <div class="mt-10">
    <h2>{{ title }}</h2>
    <v-sheet class="mt-5">
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item v-for="n in 15" :key="n">
          <product-card-component />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template> 

<script setup>
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import { ref } from "vue";

const model = ref(null);
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const items = [
  {
    id: 1,
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    image: "@/assets/imgs/item.webp",
  },
  {
    id: 2,
    title: "Item 2",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    image: "@/assets/imgs/item.webp",
  },
  {
    id: 3,
    title: "Item 3",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    image: "@/assets/imgs/item.webp",
  },
  {
    id: 4,
    title: "Item 4",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    image: "@/assets/imgs/item.webp",
  },
  {
    id: 4,
    title: "Item 4",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    image: "@/assets/imgs/item.webp",
  },
];

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
});
</script>
