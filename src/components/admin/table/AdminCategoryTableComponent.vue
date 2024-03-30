<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.id="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">
          {{ item.id }}
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

      <template v-slot:item.category="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">
          {{ item.category }}
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
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: "Categoria", key: "category", align: "start" },
  { title: "Estado", key: "status", align: "start" },
  { title: "Acciones", key: "actions", align: "center" },
]);
const items = [
  {
    id: 1,
    category: "Hombre",
    status: true,
    actions: true,
  },
  {
    id: 2,
    category: "Mujer",
    status: false,
    actions: true,
  },
];
</script>
