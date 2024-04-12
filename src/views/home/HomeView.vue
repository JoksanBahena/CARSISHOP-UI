<template>
  <default-layout>
    <v-parallax src="@/assets/imgs/background.png">
      <v-layout class="d-flex flex-column text-center text-black h-screen">
        <h2 class="font-weight-medium mt-12 text-h2">
          TU ESTILO NUESTRA PASIÓN
        </h2>
        <p class="font-weight-medium text-h5 my-4">
          Moda exclusiva para tu personalidad única
        </p>
      </v-layout>
    </v-parallax>

    <categories-component />

    <product-list-component title="Recomendados para ti" />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductListComponent from "@/components/common/ProductListComponent.vue";
</script>
