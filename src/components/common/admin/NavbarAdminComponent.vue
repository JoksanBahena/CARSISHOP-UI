<template>
  <v-app-bar>
    <v-toolbar :elevation="2" :color="toolbar.bg_color">
      <v-menu class="d-flex d-sm-none">
        <template v-slot:activator="{ props }">
          <v-btn
            class="d-flex d-sm-none"
            v-bind="props"
            :style="{ color: toolbar.primary_dark }"
            icon="mdi-menu"
          />
        </template>

        <v-list>
          <v-list-item v-for="category in categories" :key="category.index">
            <v-list-item-title>
              <router-link
                class="text-decoration-none"
                :style="{ color: toolbar.primary_dark }"
                :to="category.to"
              >
                {{ category.name }}
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          v-for="category in categories"
          :key="category.index"
          :color="toolbar.primary_dark"
          class="text-none"
          variant="plain"
          :to="category.to"
        >
          {{ category.name }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer class="d-none d-sm-flex" />

      <v-toolbar-title>
        <a
          class="text-h6 font-weight-bold text-right text-decoration-none"
          :style="{ color: toolbar.primary_dark }"
          rel="noopener noreferrer"
          href="/"
        >
          CarsiShop
        </a>
      </v-toolbar-title>

      <v-spacer class="d-none d-sm-flex" />

      <v-btn
        v-for="action in actions"
        :key="action.index"
        :style="{ color: toolbar.primary_dark }"
        :icon="action.icon"
        :href="action.to"
        @click="action.click"
      />
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useAuthStore } from "@/store/AuthStore.js";
const { logout } = useAuthStore();
const toolbar = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const categories = ref([
  {
    name: "Vendedores",
    to: { name: "AdminUsers" },
  },
  {
    name: "Productos",
    to: { name: "AdminProducts" },
  },
  {
    name: "Ventas",
    to: { name: "AdminSalles" },
  },
  {
    name: "Administradores",
    to: { name: "AdminAdmin" },
  },
  {
    name: "Categorías",
    to: { name: "AdminCategories" },
  },
  {
    name: "Subcategorias",
    to: { name: "AdminSubCategories" },
  },
]);

const actions = ref([
  {
    icon: "mdi-login-variant",
    click: logout,
    to: "/login",
  },
]);
</script>
