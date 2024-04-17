<template>
  <v-card variant="flat">
    <v-divider />
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

      <template v-slot:item.user="{ item }">
        <user-card-list-component :user="item.user" />
      </template>

      <template v-slot:item.img="{ item }">
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-card v-bind="activatorProps" class="my-4">
              <v-img :src="item.image" height="64" />
            </v-card>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Identificación" max-width="550">
              <v-card-text>
                <v-img :src="item.image" height="450" />
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-row class="my-4" justify="center">
          <v-btn
            class="ma-1 text-none"
            :color="colors.primary_dark"
            variant="outlined"
            @click="
              approveSellerReq(item.id, item.rfc, item.curp, item.user.id)
            "
          >
            <v-tooltip activator="parent" location="top"> Aprobar </v-tooltip>
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            class="ma-1 text-none"
            :color="colors.red"
            variant="outlined"
            @click="
              rejectedSellerReq(item.id, item.rfc, item.curp, item.user.id)
            "
          >
            <v-tooltip activator="parent" location="top"> Rechazar </v-tooltip>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useSellerStore } from "@/store/SellerStore";
import Swal from "sweetalert2";
import { encryptAES } from "@/utils/Crypto";
import { Toast } from "@/utils/Alerts";

const { findAllRequestSeller, approveSeller, rejectedSeller } =
  useSellerStore();

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
  { title: "#", key: "id", align: "start" },
  { title: "Usuario", key: "user", align: "start" },
  { title: "CURP", key: "curp", align: "start" },
  { title: "RFC ", key: "rfc", align: "start" },
  { title: "Telefono", key: "user.phone", align: "start" },
  { title: "Identificacion", key: "img", align: "center" },
  { title: "Acciones", key: "actions", align: "center" },
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  const indexPage = page - 1;
  await findAllRequestSeller(indexPage, itemsPerPage, sortBy);
  const { sellers } = useSellerStore();
  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = sellers.slice();
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

const approveSellerReq = async (id, rfc, curp, user) => {
  try {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas aprobar este vendedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        approveSeller(id, encryptAES(rfc), encryptAES(curp), user);
        Toast.fire({
          icon: "success",
          title: "Vendedor aprobado",
        });
        window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error al aprobar",
    });
  }
};

const rejectedSellerReq = async (id, rfc, curp, user) => {
  try {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas rechazar este vendedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectedSeller(id, encryptAES(rfc), encryptAES(curp), user);
        Toast.fire({
          icon: "success",
          title: "Vendedor rechazado",
        });
        window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error al rechazar",
    });
  }
};

loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script>
