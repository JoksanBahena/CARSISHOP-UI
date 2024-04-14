<template>
  <v-container>
    <v-card variant="flat">
      <v-divider></v-divider>
      <v-data-table-server
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :search="search"
        no-data-text="No se encontraron vendedores"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      >
        <template v-slot:item.id="{ index }">
          {{ index + 1 }}
        </template>
        <!-- E -->
        <template v-slot:item.seller="{ item }">
          <v-list-item :color="colors.white">
            <v-avatar v-if="item.user.profilepic" :size="40">
              <img :src="item.user.profilepic" alt="Avatar" />
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.user.username
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)">
            {{ item.status ? "ACTIVO" : "INACTIVO" }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row>
            <v-col>
              <v-btn
                variant="outlined"
                :style="{ borderColor: colors.primary }"
                @click="onDisableOrEnableSeller(item.id, item.status)"
              >
                <v-tooltip activator="parent" location="top">
                  {{ item.status ? "DESACTIVAR" : "ACTVAR" }}
                </v-tooltip>

                <v-icon
                  :icon="
                    item.status ? 'mdi-delete-outline' : 'mdi-delete-restore'
                  "
                  :color="colors.primary_dark"
                  class="text-h4"
                />
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useSellerStore } from "@/store/SellerStore";
import Swal from "sweetalert2";

const { findAllActiveSeller, disbleSeller } = useSellerStore();

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
  { title: "Vendedor", key: "seller", align: "start" },
  { title: "CURP", key: "curp", align: "start" },
  { title: "RFC ", key: "rfc", align: "start" },
  { title: "Telefono", key: "user.phone", align: "start" },
  { title: "Correo electronico ", key: "user.username", align: "start" },
  { title: "Estado", key: "status", align: "center" },
  { title: "Acciones", key: "actions", align: "center" },
]);
const getStatusColor = (status) => {
  return status === true ? "success" : "error";
};
const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  const indexPage = page - 1;
  await findAllActiveSeller(indexPage, itemsPerPage, sortBy);
  const { activeSellers } = useSellerStore();
  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = activeSellers.slice();
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

const onDisableOrEnableSeller = (id, status) => {
  try {
    let successMessage;
    let confirmButtonText;

    if (status) {
      successMessage = "El vendedor ha sido desactivado.";
      confirmButtonText = "Confirmar";
    } else {
      successMessage = "El vendedor ha sido activado.";
      confirmButtonText = "Confirmar";
    }

    Swal.fire({
      title: "Estás seguro?",
      text: "Desactivarás el vendedor seleccionado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        disbleSeller(id);
        Swal.fire("Hecho", successMessage, "success");
        location.reload();
      }
    });
  } catch (error) {
    console.error(error);
  }
};

loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script>
