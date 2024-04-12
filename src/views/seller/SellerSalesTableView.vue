<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis ventas</p>

    <v-card variant="flat">
      <template v-slot:text>
        <div class="d-flex align-center">
          <v-text-field
            v-model="search"
            label="Buscar venta"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            density="compact"
          />

          <p class="text-subtitle-1 pl-4">
            {{ result }}
            Resultados obtenidos
          </p>
        </div>
      </template>

      <v-data-table-server
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

        <template v-slot:item.user.name="{ item }">
          <user-profile-card-component :user="item.user" />
        </template>

        <template v-slot:item.product.name="{ item }">
          <product-list-table-component :product="item.product" />
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)">
            {{ item.status.toUpperCase() }}
          </v-chip>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

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
    title: "Mis ventas",
  },
];

const search = ref("");
const products_per_page = ref(10);
const total_products = ref(0);

const getStatusColor = (status) => {
  switch (status) {
    case "Entregado":
      return "green";
    case "Devuelto":
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
  { key: "user.name", title: "Comprador" },
  { key: "product.name", title: "Producto" },
  { key: "category", title: "Categoría" },
  { key: "subcategory", title: "Subcategoría" },
  { key: "price", title: "Precio" },
  { key: "date", title: "Fecha de venta" },
  { key: "status", title: "Estado", align: "center" },
];

const sales = [
  {
    user: {
      name: "Betjader",
      email: "betjaxd@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    product: {
      img: "https://via.placeholder.com/150",
      name: "Producto",
      description: "Descripción del producto",
    },
    category: "hombre",
    subcategory: "sudadera",
    price: "$121",
    date: "2021-09-01",
    status: "Pagado",
  },
  {
    user: {
      name: "Josafat Muñoz Valverde",
      email: "josamv@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    product: {
      img: "https://via.placeholder.com/150",
      name: "Pantalón de mezclilla",
      description: "Descripción del producto",
    },
    category: "hombre",
    subcategory: "pantalón",
    price: "$259",
    date: "2020-09-01",
    status: "Entregado",
  },
  {
    user: {
      name: "Andrea",
      email: "andrea@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    product: {
      img: "https://via.placeholder.com/150",
      name: "Producto",
      description: "Descripción del producto",
    },
    category: "mujer",
    subcategory: "sudadera",
    price: "$499",
    date: "2021-10-01",
    status: "Devuelto",
  },
];
</script>
