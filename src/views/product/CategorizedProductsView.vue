<template>
  <default-layout>
    <subcategories-navbar-component />
    <breadcrumbs-component :items="items" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">
        {{ $route.params.category }}
      </p>

      <!-- <filter-products-component /> -->
      <v-row>
        <template v-if="clothesByCategory?.length > 0">
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(clothe, index) in clothesByCategory"
            :key="index"
          >
            <product-card-component :item="clothe" />
          </v-col>
        </template>
        <template v-else>
          <p>No hay productos en esta categoría.</p>
        </template>
      </v-row>
    </v-container>
  </default-layout>
</template>

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import SubcategoriesNavbarComponent from "@/components/product/SubcategoriesNavbarComponent.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import { useClotheStore } from "@/store/ClotheStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { params } = route;
const { findAllClothesByCategory } = useClotheStore();

const clothesByCategory = ref([]);
const model = ref(0);
const category = params.category;
console.log(category);
onMounted(async () => {
  try {
    console.log(category);
    await findAllClothesByCategory(category);

    clothesByCategory.value = useClotheStore().clothesByCategory;
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => route.params.category,
  async (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      try {
        await findAllClothesByCategory(newCategory);
        clothesByCategory.value = useClotheStore().clothesByCategory;
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
    title: category,
    to: {
      name: "CategorizedProducts",
      params: { category: category },
    },
  },
];
</script>
