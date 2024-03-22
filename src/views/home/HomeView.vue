<template>
  <default-layout>
    <v-parallax src="@/assets/imgs/background.png">
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <div class="text-center text-wrap mb-16">
          <h2 class="font-weight-bold my-16 text-h2">
            TU ESTILO NUESTRA PASIÓN
          </h2>
          <p class="font-weight-medium text-h6 my-2">
            Moda exclusiva para tu personalidad única
          </p>
        </div>
      </v-layout>
    </v-parallax>

    <categories-component />

    <product-list-component title="Recomendados para ti" />

  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import CategoriesComponent from "@/components/product/CategoriesComponent.vue";
import ProducListComponent from "@/components/common/ProductListComponent.vue";
</script>
