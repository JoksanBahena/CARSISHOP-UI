<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="subcategories"
      :items-per-page="itemsPerPage"
    >
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
                @click="onDisableOrEnableSubcategory(item.id, item.status)"
              />
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useSubcategoryStore } from "@/store/SubcategoryStore";
import Swal from "sweetalert2";

const { subcategories, disableSubcategory } = useSubcategoryStore();
const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: "Subcategoria", key: "name", align: "start" },
  { title: "Estado", key: "status", align: "start" },
  { title: "Acciones", key: "actions", align: "center" },
]);

const onDisableOrEnableSubcategory = (id, status) => {
  try {
    let successMessage;
    let confirmButtonText;

    console.log(status);
    if (status) {
      successMessage = "La subcategoria ha sido desactivada.";
      confirmButtonText = "Sí, desactivar!";
    } else {
      successMessage = "La subcategoria ha sido activada.";
      confirmButtonText = "Sí, activar!";
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a ${
        status ? "desactivar" : "activar"
      } la subcategoria seleccionada!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          disableSubcategory(id);
          Swal.fire("¡Hecho!", successMessage, "success");
          location.reload();
        } catch (error) {
          Swal.fire("¡Error!", "Ha ocurrido un error", "error");
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
const itemsPerPage = ref(10);
</script>
