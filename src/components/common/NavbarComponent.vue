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
        v-for="action in actions"
        :key="action.index"
        :style="{ color: toolbar.primary_dark }"
        :icon="action.icon"
        :to="action.to"
      />
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import SearchBtnComponent from "@/components/common/SearchBtnComponent.vue";
import Colors from "@/utils/Colors.js";

const toolbar = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const categories = ref([
  {
    name: "Mujeres",
    to: {
      name: "CategorizedProducts",
      params: { category: "mujeres", subcategory: "todo" },
    },
  },
  {
    name: "Hombres",
    to: {
      name: "CategorizedProducts",
      params: { category: "hombres", subcategory: "todo" },
    },
  },
  {
    name: "Niños",
    to: {
      name: "CategorizedProducts",
      params: { category: "kids", subcategory: "todo" },
    },
  },
]);

const actions = ref([
  {
    icon: "mdi-cart-outline",
    to: "/",
  },
  {
    icon: "mdi-login-variant",
    to: { name: "Login" },
  },
]);
</script>
