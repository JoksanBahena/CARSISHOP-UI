<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="categoryData" :items-per-page="10">
      <template v-slot:item.id="{ item, index }">
        <div :class="item.status ? '' : 'text-disabled'">
          {{ index + 1 }}
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.status ? 'green' : 'red'"
            :text="item.status ? 'Activo' : 'Inactivo'"
          ></v-chip>
        </div>
      </template>

      <template v-slot:item.name="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">
          {{ item.name }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row>
          <v-col>
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-pencil"
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
    </v-data-table>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @update:page="loadCategoryData"
    ></v-pagination>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { findAllCategories } from "@/services/CategoryService.js";
import { onMounted } from "vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: "Categoria", key: "name", align: "start" },
  { title: "Estado", key: "status", align: "start" },
  { title: "Acciones", key: "actions", align: "center" },
]);

const categoryData = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);

onMounted(async () => {
  loadCategoryData();
});

const loadCategoryData = async () => {
  try {
    const response = await findAllCategories(currentPage.value - 1);

    categoryData.value = response.data;
    totalPages.value = response.meta.totalPages;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
  }
};
</script>
