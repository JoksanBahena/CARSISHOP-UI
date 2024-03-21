<template>
  <default-layout>
    <v-parallax
      src="@/assets/imgs/background.png"
      :style="{ zoom: '60%' }"
      height="100%"
    >
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <div class="text-center text-wrap">
          <h1 class="font-weight-bold mb-4 text-h1">
            TU ESTILO NUESTRA PASIÓN
          </h1>
          <h2 class="subheading px-16">
            Moda exclusiva para tu personalidad única
          </h2>
        </div>
      </v-layout>
    </v-parallax>

    <categories-component />

    <ProducListComponent title="Recomendados para ti" />
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import CategoriesComponent from "@/components/product/CategoriesComponent.vue";
import ProducListComponent from "@/components/common/ProductListComponent.vue";
</script>
