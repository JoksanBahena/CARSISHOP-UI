<template>
  <default-layout>
    <subcategories-navbar-component />
    <v-breadcrumbs :items="['Inicio', 'Hombres']" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">
        {subcategory} para {category}
      </p>

      <filter-products-component />

      <div class="d-flex flex-wrap justify-center justify-lg-start mb-16">
        <product-card-component v-for="i in 11" :key="i" />
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import SubcategoriesNavbarComponent from "@/components/product/SubcategoriesNavbarComponent.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
</script>
