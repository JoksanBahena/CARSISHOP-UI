<template>
  <v-card variant="flat">
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.product="{ item }">
        <v-card flat>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" rounded="0" size="125">
              <v-img :src="`/src/assets/imgs/${item.product}`"></v-img>
            </v-avatar>
            <div>
              <v-card-title> ITEM </v-card-title>

              <v-card-subtitle>Descripción</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </template>
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
      <template v-slot:item.price="{ item }">
        <div class="text-end">
          <v-chip color="green" :text="item.price"></v-chip>
        </div>
      </template>

      <template v-slot:item.actions>
        <v-row>
          <v-col>
            <v-spacer />
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-eye"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn>
          </v-col>
        </v-row>
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
  { title: "Producto", key: "product", align: "start" },
  { title: "Vendedor", key: "seller", align: "start", width: "100%" },
  { title: "Precio ", key: "price", align: "start" },
  { title: "Categoria", key: "category", align: "start" },
  { title: "Subcategoria", key: "subcategory", align: "star" },
  { title: "Stock", key: "stock", align: "star" },
  { title: "Vista previa", key: "actions", align: "center" },
]);
const items = [
  {
    id: 1,
    product: "item.webp",
    seller: "",
    price: "200$mx",
    category: "Hombre",
    subcategory: "Chaquetones",
    stock: "69",
    actions: "",
  },
];
</script>
