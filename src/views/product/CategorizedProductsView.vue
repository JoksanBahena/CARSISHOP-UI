<template>
  <default-layout>
    <subcategories-navbar-component />
    <breadcrumbs-component :items="breadcrumbItems" />
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">
        {{ category }}
      </p>

      <template v-if="isLoading">
        <v-progress-linear indeterminate color="primary" class="my-4" />
      </template>

      <template v-else>
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
      </template>
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
const isLoading = ref(true);
const model = ref(0);
let category = params.category;

onMounted(async () => {
  try {
    await findAllClothesByCategory(category);
    clothesByCategory.value = useClotheStore().clothesByCategory;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});

watch(
  () => route.params.category,
  async (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      category = newCategory;
      isLoading.value = true;
      try {
        await findAllClothesByCategory(newCategory);
        clothesByCategory.value = useClotheStore().clothesByCategory;
        isLoading.value = false;
        updateBreadcrumbItems(newCategory);
      } catch (error) {
        console.error(error);
        isLoading.value = false;
      }
    }
  }
);

const getCategoryFromUrl = () => {
  const segments = window.location.pathname.split("/");
  return segments[segments.length - 1];
};

const updateBreadcrumbItems = (newCategory) => {
  breadcrumbItems.value[1].title = newCategory;
  breadcrumbItems.value[1].to.params.category = newCategory;
};

const breadcrumbItems = ref([
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
]);
</script>
