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
        Ver todos los productos <v-icon>mdi-chevron-right</v-icon>
      </router-link>
    </div>

    <template v-if="isLoading">
      <v-progress-linear indeterminate color="primary" class="my-4" />
    </template>

    <template v-else-if="products.length > 0">
      <v-slide-group v-model="model" class="my-4" show-arrows>
        <v-slide-group-item v-for="(product, index) in products" :key="index">
          <product-card-component :item="product" />
        </v-slide-group-item>
      </v-slide-group>
    </template>

    <div v-else class="text-center mt-4">
      <p>No se encontraron productos.</p>
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps } from "vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const model = ref(null);
const isLoading = ref(false);

const props = defineProps({
  products: {
    type: Object,
    default: () => {},
  },

  title: {
    type: String,
    default: "Productos",
  },
  details: {
    type: Boolean,
    default: false,
  },
});

const products = ref(props.products);

watch(
  () => props.products,
  () => {
    isLoading.value = true;
    products.value = props.products;
    isLoading.value = false;
  }
);
</script>
