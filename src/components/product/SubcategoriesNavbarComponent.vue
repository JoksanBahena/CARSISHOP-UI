<template>
  <v-app-bar elevation="0" border>
    <v-toolbar :color="toolbar.white">
      <v-slide-group show-arrows>
        <v-btn
          v-for="category in filterCategories(categories)"
          :key="category.index"
          :color="toolbar.primary_dark"
          class="text-none"
          variant="plain"
          :to="{
            name: 'CategorizedProducts',
            params: { category: category.name },
          }"
        >
          {{ category.name }}
        </v-btn>
      </v-slide-group>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import { onMounted } from "vue";
import Colors from "@/utils/Colors.js";
import { useCategoryStore } from "@/store/CategoryStore.js";

const { findAllCategories } = useCategoryStore();
const categories = useCategoryStore().categories;

const findCategories = async () => {
  try {
    await findAllCategories(0, 100, "name");
  } catch (error) {
    console.log(error);
  }
};

const filterCategories = (categories) => {
  return categories.filter(
    (category) =>
      category.name !== "Mujer" &&
      category.name !== "Hombre" &&
      category.name !== "Niño"
  );

  return categories;
};

onMounted(() => {
  findCategories();
});

const toolbar = {
  bg_color: Colors.cs_primary,
  secondary: Colors.cs_secondary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
