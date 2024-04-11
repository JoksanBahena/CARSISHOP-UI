<template>
  <v-card outlined>
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

      <template v-slot:item.user="{ item }">
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

      <template v-slot:item.img="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="item.image" height="64" cover></v-img>
        </v-card>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row
          cols="12"
          xl="12"
          lg="8"
          md="6"
          justify="center"
          class="align-center my-1"
        >
          <v-col cols="12" xl="12" lg="8" md="6">
            <!-- <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-eye"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn> -->
            <v-btn
              class="my-1 mx-1"
              variant="outlined"
              :style="{ borderColor: colors.primary }"
              @click="
                approveSellerReq(item.id, item.rfc, item.curp, item.user.id)
              "
            >
              <v-tooltip activator="parent" location="top"> Aprobar </v-tooltip>
              <v-icon
                icon="mdi-check"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn>

            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-tooltip activator="parent" location="top">
                Rechazar
              </v-tooltip>

              <v-icon
                icon="mdi-close"
                :color="colors.primary_dark"
                class="text-h4"
                @click="
                  rejectedSellerReq(item.id, item.rfc, item.curp, item.user.id)
                "
              />
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
import { useSellerStore } from "@/store/SellerStore";
import Swal from "sweetalert2";

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
        approveSeller(id, rfc, curp, user);
        Swal.fire("Aprobado", "El vendedor ha sido aprobado", "success");
        window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
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
        rejectedSeller(id, rfc, curp, user);
        Swal.fire("Aprobado", "El vendedor ha sido rechazado", "success");
        window.location.reload();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script>
