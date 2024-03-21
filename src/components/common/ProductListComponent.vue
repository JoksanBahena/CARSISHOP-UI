<template>
  <v-sheet class="mt-12">
    <h2>{{ title }}</h2>
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-group-item v-for="n in 15" :key="n">
        <product-card-component />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import { ref } from "vue";

const model = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: "Productos",
  },
});
</script>
