<template>
  <v-container>
    <v-row v-for="item in items" :key="item.id">
      <h4 class="mt-4">TIENDA/VENDEDOR</h4>
      <v-divider :thickness="3" class="mb-5 mt-2" />
      <v-card width="100%">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-col lg="3" md="6">
            <v-img
              :aspect-ratio="1"
              class="bg-white"
              width="300"
              cover
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            ></v-img>
          </v-col>
          <v-col lg="9" md="6">
            <v-row align="end">
              <v-col lg="8" md="6" class="d-flex flex-column justify-center">
                <v-card-title class="text-h5">{{ item.title }}</v-card-title>
                <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                <v-card-text class="text-h6">{{ item.price }}</v-card-text>
                <v-card-text class="text-h6"
                  >Talla: {{ item.size }}</v-card-text
                >
              </v-col>
              <v-col lg="4" md="6" class="text-center">
                <v-row>
                  <v-col>
                    <h4>Cantidad:</h4>
                    <v-select
                      :items="['1', '2', '3', '4', '5']"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col>
                    <h4>Subtotal:</h4>
                    <p>$ 615 MX</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import Colors from "@/utils/Colors.js";

const items = [
  {
    id: 1,
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    size: "M",
    image: "@/assets/imgs/item.webp",
  },
  {
    id: 2,
    title: "Item 2",
    description: "Lorem ipsum dolor sit amet consectetur.",
    price: "$615 MX",
    size: "M",
    image: "@/assets/imgs/item.webp",
  },
    {
        id: 3,
        title: "Item 3",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 4,
        title: "Item 4",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 5,
        title: "Item 5",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 6,
        title: "Item 6",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 7,
        title: "Item 7",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 8,
        title: "Item 8",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 9,
        title: "Item 9",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    },
    {
        id: 10,
        title: "Item 10",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "$615 MX",
        size: "M",
        image: "@/assets/imgs/item.webp",
    }
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const props = defineProps({});
</script>
<style lang=""></style>
