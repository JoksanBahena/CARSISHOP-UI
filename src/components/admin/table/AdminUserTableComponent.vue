<!-- <template>
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
      |<template v-slot:item.seller="{ item }">
        <v-list-item
          :color="colors.white"
          :prepend-avatar="item.user.profilePic"
          :subtitle="item.user.username"
          :title="item.user.name"
        >
        </v-list-item>
      </template>
      <template v-slot:item.curp="{ item }">
        {{ item.curp }}
      </template>
      <template v-slot:item.rfc="{ item }">
        {{ item.rfc }}
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.user.email }}
      </template>
      <template v-slot:item.phoneNumber="{ item }">
        {{ item.user.phone }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)">
          {{ item.status ? "ACTIVO" : "INACTIVO" }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
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
          <v-col>
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
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
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useSellerStore } from "@/store/SellerStore";

const { findAllActiveSeller } = useSellerStore();
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
  { title: "Curp", key: "curp", align: "start" },
  { title: "RFC", key: "email", align: "start" },
  { title: "Correo electronico ", key: "email", align: "start" },
  { title: "Telefono", key: "phoneNumber", align: "start" },
  { title: "Estado", key: "status", align: "center" },
  { title: "Acciones", key: "actions", align: "center" },
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const indexPage = page - 1;
  await findAllActiveSeller(indexPage, indexPage, sortBy);
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

loadItems({ page: 1, itemsPerPage: 5, sortBy: [] });
</script> -->

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

      <template v-slot:item.seller="{ item }">
        <v-list-item
          :color="colors.white"
          :prepend-avatar="item.user.profilePic"
          :subtitle="item.user.username"
          :title="item.user.name"
        >
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
            <v-spacer />
            <!-- <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-eye"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn> -->
          </v-col>
          <v-col>
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
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
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useSellerStore } from "@/store/SellerStore";
import Swal from "sweetalert2";

const { findAllActiveSeller, approveSeller, rejectedSeller } = useSellerStore();

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
