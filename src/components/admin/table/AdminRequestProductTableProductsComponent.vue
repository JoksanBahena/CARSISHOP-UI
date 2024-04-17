<template>
  <v-card variant="flat">
    <v-divider />
    <v-data-table-server
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :search="search"
      no-data-text="No se encontraron productos"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:item.id="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:item.product="{ item }">
        <product-list-table-component :product="item" />
      </template>

      <template v-slot:item.seller="{ item }">
        <seller-card-list-component :user="item.seller" />
      </template>

      <template v-slot:item.size="{ item }">
        <div v-for="stock in item.stock" :key="stock.id">
          <v-chip :color="colors.primary_dark" class="my-2">
            {{ stock.size.name }}
          </v-chip>
        </div>
      </template>

      <template v-slot:item.price="{ item }">
        <div v-for="stockItem in item.stock" :key="stockItem.id">
          <v-chip color="success" class="my-2">
            {{ "$" + stockItem.price }}MX
          </v-chip>
        </div>
      </template>

      <template v-slot:item.stock="{ item }">
        <div v-for="stockItem in item.stock" :key="stockItem.id">
          <v-chip color="primary" class="my-2">
            {{ stockItem.quantity }}
          </v-chip>
        </div>
      </template>

      <template v-slot:item.category="{ item }">
        {{ item.category.name }}
      </template>

      <template v-slot:item.subcategory="{ item }">
        {{ item.subcategory.name }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-row>
          <v-col cols="12">
            <v-btn
              class="mx-1 text-none"
              :color="colors.primary_dark"
              variant="outlined"
              @click="aproveClotheReq(item.id)"
            >
              <v-tooltip activator="parent" location="top"> Aprobar </v-tooltip>
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              class="mx-1 text-none"
              :color="colors.red"
              variant="outlined"
              @click="rejectClotheReq(item.id)"
            >
              <v-tooltip activator="parent" location="top">
                Rechazar
              </v-tooltip>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";
import Swal from "sweetalert2";
import { Toast } from "@/utils/Alerts";

const { findAllRequestClothe, approveClothe, rejectClothe } = useClotheStore();

const itemsPerPage = ref(5);
const serverItems = ref([]);
const totalItems = ref(0);
const search = ref("");
const loading = ref(true);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  red: Colors.cs_red,
};
const headers = ref([
  { title: "#", key: "id" },
  { title: "Producto", key: "product" },
  { title: "Vendedor", key: "seller" },
  { title: "Talla", key: "size", align: "center" },
  { title: "Stock", key: "stock", align: "star", align: "center" },
  { title: "Precio ", key: "price", align: "center" },
  { title: "Categoría", key: "category", align: "center" },
  { title: "Subategoría", key: "subcategory" },
  { title: "Acciones", key: "actions", align: "center" },
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  const indexPage = page - 1;
  await findAllRequestClothe(indexPage, itemsPerPage, sortBy);
  const { pendingClothes } = useClotheStore();
  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = pendingClothes.slice();
  if (sortBy.length) {
    const sortKey = sortBy[0].key;
    const sortOrder = sortBy[0].order;
    items.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });
  }
  const paginated = items.slice(start, end);
  serverItems.value = paginated;
  totalItems.value = items.length;
  loading.value = false;
};

const aproveClotheReq = async (id) => {
  try {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas aprobar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClothe(id);
        Toast.fire({
          icon: "success",
          title: "Producto aprobado",
        });
        location.reload();
      }
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error al aprobar el producto",
    });
  }
};

const rejectClotheReq = async (id) => {
  try {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas rechazar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectClothe(id);

        Toast.fire({
          icon: "success",
          title: "Producto rechazado",
        });
        window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error al rechazar el producto",
    });
  }
};
loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script>
