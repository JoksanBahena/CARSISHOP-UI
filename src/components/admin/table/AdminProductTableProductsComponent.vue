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
    </v-data-table-server>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";
import Swal from "sweetalert2";

const { findAllClothes } = useClotheStore();

const itemsPerPage = ref(5);
const serverItems = ref([]);
const totalItems = ref(0);
const search = ref("");
const loading = ref(true);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
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
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  const indexPage = page - 1;
  await findAllClothes(indexPage, itemsPerPage, sortBy);
  const { clothes } = useClotheStore();
  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = clothes.slice();
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

loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script>
