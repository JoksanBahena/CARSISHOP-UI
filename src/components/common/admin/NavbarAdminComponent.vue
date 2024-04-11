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
              <a
                class="text-decoration-none"
                :style="{ color: toolbar.primary_dark }"
                rel="noopener noreferrer"
                :href="category.to"
              >
                {{ category.name }}
              </a>
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
          :href="category.to"
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
      />
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import Colors from "@/utils/Colors.js";

const toolbar = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const categories = ref([
  {
    name: "Vendedores",
    to: "/admin/seller",
  },
  {
    name: "Productos",
    to: "/admin/products",
  },
  {
    name: "Ventas",
    to: "/admin/salles",
  },
  {
    name: "Compras",
    to: "/",
  },
  {
    name: "Cateogrias ",
    to: "/admin/categories",
  },
  {
    name: "Subcategorias",
    to: "/admin/subcategories",
  },
]);

const actions = ref([
  {
    icon: "mdi-login-variant",
    to: "/login",
  },
]);
</script>
