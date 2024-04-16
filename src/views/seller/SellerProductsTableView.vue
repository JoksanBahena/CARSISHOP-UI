<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis productos</p>

    <v-card variant="flat">
      <template v-slot:text>
        <div class="d-flex flex-column flex-lg-row flex-md-row">
          <v-btn
            class="text-none mx-1 my-auto"
            :color="colors.primary_dark"
            variant="flat"
            :to="{ name: 'SellerAddProduct' }"
          >
            Registrar producto
          </v-btn>
          <v-text-field
            v-model="search"
            label="Buscar venta"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            density="compact"
            class="mx-1 my-4"
          />
          <p class="text-subtitle-1 ml-auto my-auto mx-1">
            {{ result }} Resultados obtenidos
          </p>
        </div>
      </template>

      <v-data-table
        v-model:items-per-page="products_per_page"
        :items-length="total_products"
        :loading="loading"
        :headers="headers"
        :items="sales"
        :search="search"
      >
        <template v-slot:item.id="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.product.name="{ item }">
          <product-list-table-component :product="item.product" />
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)">
            {{ item.status.toUpperCase() }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-row class="my-4" justify="center">
            <v-btn
              class="ma-1 text-none"
              color="green"
              variant="outlined"
              :to="{
                name: 'Product',
                params: { id: '1' },
              }"
            >
              <v-tooltip activator="parent" location="top">
                Ver en tienda
              </v-tooltip>
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn
              class="ma-1 text-none"
              :color="colors.primary_dark"
              variant="outlined"
            >
              <v-tooltip activator="parent" location="top"> Editar </v-tooltip>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              class="ma-1 text-none"
              :color="colors.red"
              variant="outlined"
            >
              <v-tooltip activator="parent" location="top">
                Eliminar
              </v-tooltip>
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
  gray: Colors.cs_opacity_gray,
  red: Colors.cs_red,
};

const result = ref(0);

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    to: { name: "ProfileSummary" },
  },
  {
    title: "Ventas",
    href: "/profile/sales/summary",
  },
  {
    title: "Mis productos",
  },
];

const search = ref("");
const products_per_page = ref(10);
const total_products = ref(0);

const getStatusColor = (status) => {
  switch (status) {
    case "Activo":
      return "green";
    case "Inactivo":
      return "red";
    default:
      return "default";
  }
};

const headers = [
  {
    key: "id",
    title: "#",
    align: "start",
    sortable: false,
  },
  { key: "product.name", title: "Producto" },
  { key: "price", title: "Precio" },
  { key: "category", title: "Categoría" },
  { key: "subcategory", title: "Subcategoría" },
  { key: "stock", title: "Stock total" },
  { key: "status", title: "Estado", align: "center" },
  {
    key: "actions",
    title: "Acciones",
    align: "center",
    sortable: false,
  },
];

const sales = [
  {
    product: {
      img: "https://via.placeholder.com/150",
      name: "Producto",
      description: "Descripción del producto",
    },
    price: "$121",
    category: "hombre",
    subcategory: "sudadera",
    stock: 10,
    status: "Activo",
  },
  {
    product: {
      img: "https://via.placeholder.com/150",
      name: "Pantalón de mezclilla",
      description: "Descripción del producto",
    },
    price: "$259",
    category: "hombre",
    subcategory: "pantalón",
    stock: 5,
    status: "Inactivo",
  },
  {
    product: {
      img: "https://via.placeholder.com/150",
      name: "Producto",
      description: "Descripción del producto",
    },
    price: "$499",
    category: "mujer",
    subcategory: "sudadera",
    stock: 1,
    status: "Inactivo",
  },
];
</script>
