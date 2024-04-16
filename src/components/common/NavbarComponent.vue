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
        <router-link
          :to="{ name: 'Home' }"
          class="text-h6 font-weight-bold text-right text-decoration-none"
          :style="{ color: toolbar.primary_dark }"
        >
          CarsiShop
        </router-link>
      </v-toolbar-title>

      <v-spacer class="d-none d-sm-flex" />

      <search-btn-component />

      <v-btn
        :style="{ color: toolbar.primary_dark }"
        icon="mdi-cart-outline"
        :to="{ name: 'Cart' }"
      />

      <v-btn
        v-if="!isAuthenticated"
        :style="{ color: toolbar.primary_dark }"
        icon="mdi-login-variant"
        :to="{ name: 'Login' }"
      />

      <profile-menu-btn-component v-else />
    </v-toolbar>
  </v-app-bar>
</template>
<script setup>
import { onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore.js";
import Colors from "@/utils/Colors.js";

const { isAuthenticated } = useAuthStore();

const toolbar = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const categories = ref([
  {
    name: "Mujeres",
    to: {
      name: "CategorizedProducts",
      params: { category: "Mujer", subcategory: "todo" },
    },
  },
  {
    name: "Hombres",
    to: {
      name: "CategorizedProducts",
      params: { category: "Hombre", subcategory: "todo" },
    },
  },
  {
    name: "Niños",
    to: {
      name: "CategorizedProducts",
      params: { category: "Niño", subcategory: "todo" },
    },
  },
]);

onBeforeRouteUpdate(() => {
  console.log("Route updated");
});
</script>
