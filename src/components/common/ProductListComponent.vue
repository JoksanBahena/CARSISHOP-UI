<template>
  <v-sheet class="mt-12">
    <div class="d-flex align-center">
      <h2>{{ title }}</h2>
      <v-spacer />
      <a
        class="text-subtitle-2 text-right text-decoration-none"
        :style="{ color: colors.primary_dark }"
        href="/search/query"
        rel="noopener noreferrer"
      >
        Ver más <v-icon>mdi-chevron-right</v-icon>
      </a>
    </div>
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-group-item v-for="n in 15" :key="n">
        <product-card-component />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";
import { ref } from "vue";

const model = ref(null);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
});
</script>
