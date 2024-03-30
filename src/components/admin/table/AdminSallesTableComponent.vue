<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.seller>
        <v-list color="transparent">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.buyer>
        <v-list color="transparent">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.product="{ item }">
        <v-card flat>
          <div class="d-flex flex-no-wrap my-3">
            <v-avatar class="" rounded="0" size="125">
              <v-img :src="`/src/assets/imgs/${item.product}`"></v-img>
            </v-avatar>
            <div>
              <v-card-title> ITEM </v-card-title>

              <v-card-subtitle>Descripción</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </template>
      <template v-slot:item.status="{ item }">
        <div class="text-end">
          <v-chip :color="getStatusColor(item.status)">
            {{ getStatusText(item.status) }}
          </v-chip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: "Vendedor", key: "seller", align: "start" },
  { title: "Comprador", key: "buyer", align: "start" },
  { title: "Producto", key: "product", align: "start" },
  { title: "Categoria", key: "category", align: "start" },
  { title: "Subcategoria", key: "subcategory", align: "center" },
  { title: "Precio", key: "price", align: "start" },
  { title: "Fecha", key: "date", align: "start" },
  { title: "Estado", key: "status", align: "center" },
]);
const items = [
  {
    id: 1,
    category: "Hombre",
    status: 1,
  },
  {
    id: 2,
    seller: "",
    buyer: "",
    product: "item.webp",
    category: "Hombre",
    subcategory: "Chaquetones",
    price: "$499",
    date: "01-01-2001",
    status: 3,
  },
  {
    id: 3,
    seller: "",
    buyer: "",
    product: "item.webp",
    category: "Hombre",
    subcategory: "Chaquetones",
    price: "$499",
    date: "01-01-2001",
    status: 4,
  },
  {
    id: 4,
    seller: "",
    buyer: "",
    product: "item.webp",
    category: "Hombre",
    subcategory: "Chaquetones",
    price: "$499",
    date: "01-01-2001",
    status: 2,
  },
];

const getStatusColor = (status) => {
  return status === 1
    ? "green"
    : status === 2
    ? "blue"
    : status === 3
    ? "purple"
    : status === 4
    ? "red"
    : "grey";
};

const getStatusText = (status) => {
  return status === 1
    ? "Pagado"
    : status === 2
    ? "Enviado"
    : status === 3
    ? "En tránsito"
    : status === 4
    ? "Devuelto"
    : "";
};
</script>
