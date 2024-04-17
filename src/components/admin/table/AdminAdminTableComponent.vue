<template>
  <v-container>
    <v-card variant="flat">
      <template v-slot:text>
        <div class="d-flex flex-column flex-lg-row flex-md-row">
          <modal-component
            btn_title="Registrar administrador"
            modal_title="Registrar administrador"
          >
            <admin-admin-form-component />
          </modal-component>

          <admin-update-category-form-component
            v-model="isEditModalOpen"
            :selectedCategory="selectedCategory"
          />
        </div>
      </template>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :search="search"
        no-data-text="No se encontraron administradores"
        :loading="loading"
        item-value="role"
        @update:options="loadItems"
      >
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useProfileStore } from "@/store/ProfileStore";

const { findAllAdmins } = useProfileStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  red: Colors.cs_red,
};

const itemsPerPage = ref(5);
const search = ref("");
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const headers = ref([
  { title: "#", key: "id", align: "start", sortable: false },
  { title: "Nombre", key: "name", sortable: false },
  { title: "Apellidos", key: "surname", align: "center", sortable: false },
  { title: "Correo", key: "username", align: "center", sortable: false },
  { title: "Telefono", key: "phone", align: "center", sortable: false },
]);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const indexPage = page - 1;
  await findAllAdmins(indexPage, itemsPerPage, sortBy);

  const { admins } = useProfileStore();

  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = admins.slice();

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
const isEditModalOpen = ref(false);
const selectedCategory = ref({});
</script>
