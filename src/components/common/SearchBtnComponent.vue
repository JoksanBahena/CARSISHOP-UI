<template>
  <v-dialog transition="dialog-top-transition" fullscreen :height="size">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon
        v-bind="activatorProps"
        :style="{ color: colors.primary_dark }"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="pa-2">
        <v-card-actions class="justify-end ma-0 pa-0">
          <v-btn icon @click="isActive.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>

        <v-container>
          <v-card-title
            class="text-center text-h4 font-weight-bold mb-2"
            :style="{ color: colors.primary_dark }"
          >
            CarsiShop
          </v-card-title>

          <v-card-item class="mx-auto">
            <div class="text-subtitle-1 font-weight-medium">
              Buscar producto
            </div>
            <v-text-field
              v-model="search"
              placeholder="Buscar producto"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              autofocus
            />
          </v-card-item>

          <v-progress-linear v-if="isLoading" color="primary" indeterminate />

          <product-seach-list-component
            v-else-if="productSeached.length > 0"
            :products="productSeached"
            title="Resultados de tu búsqueda"
          />

          <div v-else class="text-center mt-4">
            <p>No se encontraron productos.</p>
          </div>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import ProductSeachListComponent from "@/components/common/ProductSeachListComponent.vue";
import Colors from "@/utils/Colors.js";
import { useClotheStore } from "@/store/ClotheStore";

const { findByClotheName } = useClotheStore();

const colors = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const search = ref("");
const size = ref("20rem");
const productSeached = ref([]);
const isLoading = ref(false);

watch(search, async (name, value) => {
  if (name) {
    isLoading.value = true;
    const response = await findByClotheName(name);
    productSeached.value = response.data;
    size.value = "100%";
    isLoading.value = false;
  } else {
    size.value = "20rem";
    productSeached.value = [];
  }
});
</script>
