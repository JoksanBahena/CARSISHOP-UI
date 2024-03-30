<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.seller>
        <v-list color="transparent">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.buyer>
        <v-list color="transparent">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.product="{ item }">
        <v-card flat>
          <div class="d-flex flex-no-wrap my-3">
            <v-avatar class="" rounded="0" size="125">
              <v-img :src="`/src/assets/imgs/${item.product}`"></v-img>
            </v-avatar>
            <div>
              <v-card-title> ITEM </v-card-title>

              <v-card-subtitle>Descripción</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </template>
      <template v-slot:item.status="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.status ? 'green' : 'red'"
            :text="item.status ? 'Activo' : 'Inactivo'"
          ></v-chip>
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
