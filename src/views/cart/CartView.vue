<template>
  <default-layout>
    <v-breadcrumbs :items="['Inicio', 'Carrito']" />
    <v-container>
      <v-row>
        <v-col cols="9">
          <h2>Carrito</h2>
          <ItemProduct v-bind:data="items" v-bind:typemodule="typemodule"/>
        </v-col>
        <v-col class="text-center mt-2" cols="3">
          <h2>Resumen de compras</h2>
          <p>Total ({{ totalItems }} productos): ${{ totalPrice }} MXN</p>
          <v-divider class="mt-5 mb-5" :thickness="3" />
          <v-btn :color="colors.primary_dark">
            Continuar compra
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </default-layout>
</template>
<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ItemProduct from "@/components/common/ItemProduct.vue";
import Colors from "@/utils/Colors.js";

const items = [
  {
    id: 1,
    vendedor: "PUC",
    products: [
      {
        id: 1,
        title: "Item 1",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "615",
        size: "M",
        image: "@/assets/imgs/item.webp",
        cantidad: 2
      },
      {
        id: 2,
        title: "Item 2",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "115",
        size: "M",
        image: "@/assets/imgs/item.webp",
        cantidad: 4
      }
    ]
  },
  {
    id: 2,
    vendedor: "Betyader",
    products: [
      {
        id: 1,
        title: "Item 1",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "615",
        size: "M",
        image: "@/assets/imgs/item.webp",
        cantidad: 1
      },
    ]
  },
  {
    id: 3,
    vendedor: "Amazon",
    products: [
      {
        id: 1,
        title: "Item 1",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "215",
        size: "M",
        image: "@/assets/imgs/item.webp",
        cantidad: 6
      },
      {
        id: 2,
        title: "Item 2",
        description: "Lorem ipsum dolor sit amet consectetur.",
        price: "425",
        size: "M",
        image: "@/assets/imgs/item.webp",
        cantidad: 2
      },
    ]
  },
];

const typemodule = "cart"

const totalItems = items.reduce((total, item) => {
  return total + item.products.reduce((subtotal, product) => subtotal + product.cantidad, 0);
}, 0);

const totalPrice = items.reduce((total, item) => {
  return total + item.products.reduce((subtotal, product) => {
    const priceNumber = parseFloat(product.price);
    return subtotal + (priceNumber * product.cantidad);
  }, 0);
}, 0);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};
</script>
<style lang=""></style>
