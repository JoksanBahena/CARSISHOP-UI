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
            {{ totalItems }} Resultados obtenidos
          </p>
        </div>
      </template>

      <!-- <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :search="search"
        no-data-text="No se encontraron categorías"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      >
        <template
          :class="item.status ? 'text-disabled' : ''"
          v-slot:item.id="{ index }"
        >
          {{ index + 1 }}
        </template>

        <template
          :class="item.status ? 'text-disabled' : ''"
          v-slot:item.name="{ item }"
        >
          {{ item.name }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)">
            {{ item.status ? "ACTIVO" : "INACTIVO" }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-row class="my-4" justify="center">
            <v-btn
              class="ma-1 text-none"
              :color="colors.primary_dark"
              variant="outlined"
              @click="onEdit(item)"
              :disabled="item.status ? false : true"
            >
              <v-tooltip activator="parent" location="top"> Editar </v-tooltip>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              class="ma-1 text-none"
              :color="item.status ? colors.red : colors.primary_dark"
              variant="outlined"
              @click="onDisableOrEnableCategory(item.id, item.status)"
            >
              <v-tooltip activator="parent" location="top">
                {{ item.status ? "Desactivar" : "Activar" }}
              </v-tooltip>
              <v-icon>
                {{ item.status ? "mdi-delete" : "mdi-delete-restore" }}
              </v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table-server> -->
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useCategoryStore } from "@/store/CategoryStore.js";
import Swal from "sweetalert2";

const { findAllCategories, disableCategory } = useCategoryStore();

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
  { title: "Categoria", key: "name" },
  { title: "Estado", key: "status", align: "center", sortable: false },
  { title: "Acciones", key: "actions", align: "center", sortable: false },
]);

const getStatusColor = (status) => {
  return status === true ? "success" : "error";
};

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  const indexPage = page - 1;
  await findAllCategories(indexPage, itemsPerPage, sortBy);

  const { categories } = useCategoryStore();

  const start = indexPage * itemsPerPage;
  const end = start + itemsPerPage;
  const items = categories.slice();

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

const onEdit = (item) => {
  selectedCategory.value = item;
  isEditModalOpen.value = true;
};

const onDisableOrEnableCategory = (id, status) => {
  try {
    let successMessage;
    let confirmButtonText;

    if (status) {
      successMessage = "La categoría ha sido desactivada.";
      confirmButtonText = "Confirmar";
    } else {
      successMessage = "La categoría ha sido activada.";
      confirmButtonText = "Confirmar";
    }

    Swal.fire({
      title: "Estás seguro?",
      text: "Desactivarás la categoría seleccionada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        disableCategory(id);
        Swal.fire("Hecho", successMessage, "success");
        location.reload();
      }
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
