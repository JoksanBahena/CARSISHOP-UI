<template>
  <v-card outlined>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="items" :items-per-page="5">
      <template v-slot:item.user="{ item }">
        <v-list color="transparent">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
            :class="item.status ? '' : 'text-disabled'"
          >
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:item.role="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">{{ item.role }}</div>
      </template>
      <template v-slot:item.email="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">{{ item.email }}</div>
      </template>
      <template v-slot:item.phoneNumber="{ item }">
        <div :class="item.status ? '' : 'text-disabled'">
          {{ item.phoneNumber }}
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <div class="text-end">
          <v-chip
            :color="item.status ? 'green' : 'red'"
            :text="item.status ? 'Activo' : 'Inactivo'"
          ></v-chip>
        </div>
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
  { title: "Rol", key: "role", align: "start" },
  { title: "Correo electronico ", key: "email", align: "start" },
  { title: "Telefono", key: "phoneNumber", align: "start" },
  { title: "Estado", key: "status", align: "center" },
  { title: "Acciones", key: "actions", align: "center" },
]);
const items = [
  {
    id: 1,
    user: "",
    role: "Administrador",
    email: "admin@admin.com",
    phoneNumber: "1234567890",
    status: true,
    actions: "",
  },
  {
    id: 2,
    user: "",
    role: "Administrador",
    email: "admin@admin.com",
    phoneNumber: "1234567890",
    status: false,
    actions: "",
  },
];
</script>
