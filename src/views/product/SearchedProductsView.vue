<template>
  <default-layout>
    <v-breadcrumbs :items="['Inicio', 'Hombres', 'Chamarras', 'ITEM NAME']" />
    <v-container>
      <span>34 resultados para tu búsqueda</span>
      <p class="text-h3 font-weight-medium my-2">"GORRA"</p>

      <filter-products-component />

      <div class="d-flex flex-wrap justify-center justify-lg-start mb-16">
        <product-card-component v-for="i in 10" :key="i" />
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors";
import { ref } from "vue";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const drawer = ref(false);
const selected = ref([]);
</script>
