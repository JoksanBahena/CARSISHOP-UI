<template>
  <default-layout>
    <v-breadcrumbs :items="['Inicio', 'Carrito']" />
    <v-container>
      <v-row>
        <v-col cols="8">
          <h2>Carrito</h2>
          <ItemProduct />
        </v-col>
        <v-col class="text-center mt-2" cols="4">
          <h2>Resumen de compras</h2>
          <p>Total (2 productos): $ 100.00 (USD)</p>
          <v-divider class="mt-5" :thickness="3" />
        </v-col>
      </v-row>
    </v-container>
  </default-layout>
</template>
<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ItemProduct from "@/components/common/ItemProduct.vue";
</script>
<style lang=""></style>
