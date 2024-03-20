<template>
  <default-layout>
    <v-breadcrumbs :items="['Inicio', 'Hombres', 'Chamarras', 'ITEM NAME']" />
    <v-container>
      <product-info-component />
      <product-reviews-component />
      <v-divider class="my-12" />
      <product-list-component title="Productos relacionados" />
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductInfoComponent from "@/components/product/ProductInfoComponent.vue";
import ProductReviewsComponent from "@/components/product/ProductReviewsComponent.vue";
import ProductListComponent from "@/components/common/ProductListComponent.vue";
import Colors from "@/utils/Colors.js";
</script>
