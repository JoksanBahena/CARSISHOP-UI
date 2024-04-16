<template>
  <default-layout>
    <breadcrumbs-component :items="items" />
    <v-container>
      <span>
        {{ category.length > 0 ? "" : "" }}
      </span>
      <p class="text-h3 font-weight-medium my-2">Todos los productos</p>

      <!-- <filter-products-component /> -->

      <div
        class="d-flex flex-wrap justify-center justify-lg-start justify-md-start mb-16"
      >
        <v-row>
          <template v-if="clothes?.length > 0">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(clothe, index) in clothes"
              :key="index"
            >
              <product-card-component :item="clothe" />
            </v-col>
          </template>
          <template v-else>
            <p>No hay productos en esta categoría.</p>
          </template>
        </v-row>
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import { useClotheStore } from "@/store/ClotheStore";
const { findAllClothesHome } = useClotheStore();
const clothes = ref([]);
onMounted(async () => {
  try {
    await findAllClothesHome();
    clothes.value = useClotheStore().clothes;
  } catch (error) {
    console.log(error);
  }
});
const props = defineProps({
  category: {
    type: String,
    default: "Categoría",
  },
  subcategory: {
    type: String,
    default: "Subcategoría",
  },
});
const model = ref(null);

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Todos los productos",
  },
];
</script>
