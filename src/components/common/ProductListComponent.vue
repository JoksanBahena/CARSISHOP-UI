<template>
  <v-container :class="details ? '' : 'mt-12'" fluid>
    <div class="d-flex align-center" v-if="!details">
      <h2>{{ title }}</h2>
      <v-spacer />
      <router-link
        class="text-subtitle-2 text-right text-decoration-none"
        :style="{ color: colors.primary_dark }"
        to="/search/searched-products"
      >
        Ver más <v-icon>mdi-chevron-right</v-icon>
      </router-link>
    </div>
    <v-slide-group v-model="model" class="my-4" show-arrows>
      <v-slide-group-item v-for="n in 15" :key="n">
        <product-card-component />
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const model = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
  details: {
    type: Boolean,
    default: false,
  },
});
</script>
