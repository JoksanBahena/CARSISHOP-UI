<template>
  <v-card variant="flat">
    <v-divider></v-divider>
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
        <v-card flat>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" rounded="0" size="125">
              <v-img :src="'/src/assets/imgs/item.webp'"></v-img>
            </v-avatar>
            <div>
              <v-card-title> {{ item.name }} </v-card-title>

              <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </template>
      <template v-slot:item.seller="{ item }">
        <v-list-item :color="colors.white">
          <v-avatar v-if="item.seller.user.profilepic" :size="40">
            <img :src="item.seller.user.profilepic" alt="Avatar" />
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.seller.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{
              item.seller.user.username
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:item.size="{ item }">
        <v-list>
          <v-list-item v-for="stockItem in item.stock" :key="stockItem.id">
            <v-list-item-content>
              <v-chip color="primary" class="" small outlined>
                {{ stockItem.size.name }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:item.price="{ item }">
        <v-list>
          <v-list-item v-for="stockItem in item.stock" :key="stockItem.id">
            <v-list-item-content>
              <v-chip color="success" class="" small outlined>
                {{ "$" + stockItem.price }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:item.stock="{ item }">
        <v-list>
          <v-list-item v-for="stockItem in item.stock" :key="stockItem.id">
            <v-list-item-content>
              <v-chip color="primary" class="" small outlined>
                {{ stockItem.quantity }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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

const { finAllClothes } = useClotheStore();

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
  { title: "#", key: "id", align: "start" },
  { title: "Producto", key: "product", align: "start" },
  { title: "Vendedor", key: "seller", align: "start" },
  { title: "Talla", key: "size", align: "start" },
  { title: "Stock", key: "stock", align: "star" },
  { title: "Precio ", key: "price", align: "start" },
  { title: "Categoria", key: "category", align: "start" },
  { title: "Subcategoria", key: "subcategory", align: "star" },
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  const indexPage = page - 1;
  await finAllClothes(indexPage, itemsPerPage, sortBy);
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
