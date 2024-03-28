<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.user="{ item }">
        <v-list color="transparent">
          <v-list-item
            :color="colors.white"
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.img="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`/src/assets/imgs/${item.img}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>

      <template v-slot:item.actions>
        <v-row cols="12" md="6" justify="center" class="align-center">
          <v-col>
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-eye"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn>
            <v-btn
              class="mr-2 ml-2 mt-2 mb-2"
              variant="outlined"
              :style="{ borderColor: colors.primary }"
            >
              <v-icon
                icon="mdi-check"
                :color="colors.primary_dark"
                class="text-h4"
              />
            </v-btn>
            <v-btn variant="outlined" :style="{ borderColor: colors.primary }">
              <v-icon
                icon="mdi-close"
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
  { title: "Usuario", key: "user", align: "start" },
  { title: "CURP", key: "curp", align: "start" },
  { title: "RFC ", key: "rfc", align: "start" },
  { title: "Telefono", key: "phoneNumber", align: "start" },
  { title: "Identificacion", key: "img", align: "center" },
  { title: "Acciones", key: "actions", align: "center" },
]);
const items = [
  {
    id: 1,
    user: "",
    curp: "OIDB930313HDFLNS09",
    rfc: " VECJ880326VVE",
    phoneNumber: "1234567890",
    img: "ine.png",
    actions: "",
  },
  {
    id: 2,
    user: "",
    curp: "OIDB930313HDFLNS09",
    rfc: " VECJ880326VVE",
    phoneNumber: "1234567890",
    img: "ine.png",
    actions: "",
  },
];
</script>
