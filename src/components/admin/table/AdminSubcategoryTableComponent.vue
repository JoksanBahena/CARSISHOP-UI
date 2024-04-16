<template>
  <v-container>
    <v-card variant="flat">
      <template v-slot:text>
        <div class="d-flex flex-column flex-lg-row flex-md-row">
          <modal-component
            btn_title="Registrar subcategoría"
            modal_title="Registrar registar subcategoría"
          >
            <admin-subcategory-form-component />
          </modal-component>
          <admin-update-subcategory-form-component
            v-model="isEditModalOpen"
            :selectedSubcategory="selectedSubcategory"
          />

          <!-- <v-text-field
            v-model="search"
            label="Buscar subcategoría"
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
           -->
        </div>
      </template>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :search="search"
        no-data-text="No se encontraron subcategorías"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      >
        <template v-slot:item.id="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.name="{ item }">
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
              @click="onDisableOrEnableSubcategory(item.id, item.status)"
            >
              <v-tooltip activator="parent" location="top">
                {{ item.status ? "Desactivar" : "Activar" }}
              </v-tooltip>
              <v-icon>
                {{ item.status ? "mdi-delete-outline" : "mdi-delete-restore" }}
              </v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import Swal from "sweetalert2";
import { useSubcategoryStore } from "@/store/SubcategoryStore";

const { findAllsubcategories, disableSubcategory } = useSubcategoryStore();

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
  { title: "Subcategorías", key: "name" },
  { title: "Estado", key: "status", align: "center", sortable: false },
  { title: "Acciones", key: "actions", align: "center", sortable: false },
]);

const getStatusColor = (status) => {
  return status === true ? "success" : "error";
};
const loadItems = async ({ page, itemsPerPage, sortBy, value }) => {
  if (value) {
    findAllsubcategories({ page, itemsPerPage, sortBy, value });
  } else {
    loading.value = true;
    const indexPage = page - 1;
    await findAllsubcategories(indexPage, itemsPerPage, sortBy);

    const { subcategories } = useSubcategoryStore();

    const start = indexPage * itemsPerPage;
    const end = start + itemsPerPage;
    const items = subcategories.slice();

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
  }
};

const searchByName = async ({ page, itemsPerPage, sortBy, value }) => {};
const isEditModalOpen = ref(false);
const selectedSubcategory = ref({});

const onEdit = (item) => {
  isEditModalOpen.value = true;
  selectedSubcategory.value = item;
};

const onDisableOrEnableSubcategory = (id, status) => {
  try {
    let successMessage;
    let confirmButtonText;

    if (status) {
      successMessage = "La subcategoría ha sido desactivada.";
      confirmButtonText = "Confirmar";
    } else {
      successMessage = "La subcategoría ha sido activada.";
      confirmButtonText = "Confirmar";
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Desactivarás la subcategoría seleccionada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        disableSubcategory(id)
          .then((response) => {
            Swal.fire("Hecho", response.message || successMessage, "success");
            location.reload();
          })
          .catch((error) => {
            console.error("Error al desactivar la subcategoría:", error);
            Swal.fire(
              "Error",
              "Hubo un error al desactivar la subcategoría.",
              "error"
            );
          });
      }
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    Swal.fire("Error", "Hubo un error inesperado.", "error");
  }
};
</script>
