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
    <v-slide-group v-model="model" class="my-4" show-arrows>
      <v-slide-group-item v-for="(clothe, index) in clothes" :key="index">
        <product-card-component :item="clothe" />
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";

const { finAllClothesHome } = useClotheStore();

const clothes = ref([]);

onMounted(async () => {
  try {
    await finAllClothesHome();
    clothes.value = useClotheStore().clothes;
  } catch (error) {
    console.log(error);
  }
});

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const model = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
  details: {
    type: Boolean,
    default: false,
  },
});
</script>
