<template>
  <default-layout>
    <subcategories-navbar-component />
    <breadcrumbs-component :items="items" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">
        {{ $route.params.category }}
      </p>

      <!-- <filter-products-component /> -->

      <div
        class="d-flex flex-wrap justify-center justify-lg-start justify-md-start mb-16"
      >
        <template v-if="clothesByCategory?.length > 0">
          <v-slide-group v-model="model" class="my-4" show-arrows>
            <v-slide-group-item
              v-for="(clothe, index) in clothesByCategory"
              :key="index"
            >
              <product-card-component :item="clothe" />
            </v-slide-group-item>
          </v-slide-group>
        </template>
        <template v-else>
          <p>No hay productos en esta categoría.</p>
        </template>
      </div>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import SubcategoriesNavbarComponent from "@/components/product/SubcategoriesNavbarComponent.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import FilterProductsComponent from "@/components/product/FilterProductsComponent.vue";
import { useClotheStore } from "@/store/ClotheStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { params } = route;
const { findAllClothesByCategory } = useClotheStore();

const clothesByCategory = ref([]);
const model = ref(0);

onMounted(async () => {
  try {
    const category = params.category;
    await findAllClothesByCategory(category);

    clothesByCategory.value = useClotheStore().clothesByCategory;
    console.log(clothesByCategory.value);
  } catch (error) {
    console.log(error);
  }
});

// Observa cambios en la ruta
watch(
  () => route.params.category,
  async (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      try {
        await findAllClothesByCategory(newCategory);
        clothesByCategory.value = useClotheStore().clothesByCategory;
        console.log(clothesByCategory.value);
      } catch (error) {
        console.log(error);
      }
    }
  }
);

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

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: props.category,
    to: {
      name: "CategorizedProducts",
      params: { category: props.category, subcategory: "todo" },
    },
  },
  {
    title: props.subcategory,
    to: {
      name: "CategorizedProducts",
      params: { category: props.category, subcategory: "subcategory" },
    },
  },
];
</script>
