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

          <v-text-field
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
            >
              <v-tooltip activator="parent" location="top"> Editar </v-tooltip>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              class="ma-1 text-none"
              :color="colors.red"
              variant="outlined"
              @click="onDisableOrEnableSubcategory(item.id, item.status)"
            >
              <v-tooltip activator="parent" location="top">
                Eliminar
              </v-tooltip>
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Colors from "@/utils/Colors.js";
import Swal from "sweetalert2";
import { useSubcategoryStore } from "@/store/SubcategoryStore";

const { subcategories, findAllsubcategories, disableSubcategory } =
  useSubcategoryStore();

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

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
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
};
const isEditModalOpen = ref(false);
const selectedSubcategory = ref({});

const onEdit = (item) => {
  isEditModalOpen.value = true;
  selectedSubcategory.value = item;
  console.log("selectedSubcategory", selectedSubcategory.value);
};

const onDisableOrEnableSubcategory = (id, status) => {
  try {
    let successMessage;
    let confirmButtonText;

    if (status) {
      successMessage = "The category has been deactivated.";
      confirmButtonText = "Yes, deactivate!";
    } else {
      successMessage = "The category has been activated.";
      confirmButtonText = "Yes, activate!";
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        status ? "deactivate" : "activate"
      } the selected category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        disableSubcategory(id);
        Swal.fire("Done!", successMessage, "success");
        location.reload();
      }
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
