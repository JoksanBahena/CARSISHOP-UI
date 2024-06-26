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

    <template v-if="isLoading">
      <v-progress-linear indeterminate color="primary" class="my-4" />
    </template>

    <div v-else-if="clothes.length === 0 && !details" class="my-4">
      No hay productos disponibles en este momento.
    </div>

    <template v-else>
      <v-slide-group v-model="model" class="my-4" show-arrows>
        <v-slide-group-item v-for="(clothe, index) in clothes" :key="index">
          <product-card-component :item="clothe" />
        </v-slide-group-item>
      </v-slide-group>
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";

const { findAllClothesHome } = useClotheStore();

const clothes = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    await findAllClothesHome();
    clothes.value = useClotheStore().clothes;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const model = ref(null);

const props = defineProps({
  product: {
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

watch(
  () => props.product,
  () => {
    clothes.value = props.product;
  }
);
</script>
