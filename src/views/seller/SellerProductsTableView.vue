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
            {{ total }} Resultados obtenidos
          </p>
        </div>
      </template>

      <v-data-table
        v-model:items-per-page="products_per_page"
        :items-length="total_products"
        :headers="headers"
        :items="clothes"
        :search="search"
        no-data-text="No se encontraron productos"
      >
        <template v-slot:item.id="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.name="{ item }">
          <seller-product-list-table-component :product="item" />
        </template>

        <template v-slot:item.category="{ item }">
          {{ item.category.name }}
        </template>

        <template v-slot:item.subcategory="{ item }">
          {{ item.subcategory.name }}
        </template>

        <template v-slot:item.request_status="{ item }">
          <v-chip :color="getRequestsColor(item.request_status)">
            {{ getRequestsStatus(item.request_status) }}
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            variant="flat"
            size="small"
            :color="getStatusColor(item.status)"
          >
            <v-icon>
              {{ item.status ? "mdi-check" : "mdi-close" }}
            </v-icon>
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
                params: { id: encryptAES(item.id.toString()) },
              }"
            >
              <v-tooltip activator="parent" location="top">
                Ver en tienda
              </v-tooltip>
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
            <!-- <v-btn
              class="ma-1 text-none"
              :color="colors.primary_dark"
              variant="outlined"
            >
              <v-tooltip activator="parent" location="top"> Editar </v-tooltip>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn> -->
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
import { onMounted, ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";
import { useProfileStore } from "@/store/ProfileStore";
import { encryptAES } from "@/utils/Crypto";

const { fetchClothesBySellerId } = useClotheStore();
const { profile } = useProfileStore();

const clothes = ref([]);
const total = ref(0);

onMounted(async () => {
  try {
    const response = await fetchClothesBySellerId(profile.seller.id);
    clothes.value = response.data;
    total.value = response.total;
  } catch (error) {
    console.log(error);
  }
});

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
    case true:
      return "green";
    case false:
      return "red";
    default:
      return "default";
  }
};

const getRequestsStatus = (status) => {
  switch (status) {
    case "REJECTED":
      return "Rechazado";
    case "APPROVED":
      return "Aprobado";
    case "PENDING":
      return "Pendiente";
    default:
      return "Desconocido";
  }
};

const getRequestsColor = (status) => {
  switch (status) {
    case "REJECTED":
      return "red";
    case "APPROVED":
      return "green";
    case "PENDING":
      return "blue";
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
  { key: "name", title: "Producto" },
  { key: "category", title: "Categoría" },
  { key: "subcategory", title: "Subcategoría" },
  { key: "request_status", title: "Estado" },
  { key: "status", title: "Activo" },
  {
    key: "actions",
    title: "Acciones",
    align: "center",
    sortable: false,
  },
];
</script>
