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

        <v-container class="my-0 mx-16 pa-0">
          <v-card-title
            class="text-center text-h4 font-weight-bold mb-2"
            :style="{ color: colors.primary_dark }"
          >
            CarsiShop
          </v-card-title>

          <v-card-item class="mx-16">
            <div class="text-subtitle-1 font-weight-medium">
              Buscar producto
            </div>
            <v-text-field
              v-model="search"
              placeholder="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
            />
          </v-card-item>

          <v-card-item class="mx-16">
            <product-list-component
              v-if="search"
              title="Resultados de la búsqueda:"
            />
          </v-card-item>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import ProductListComponent from "@/components/common/ProductListComponent.vue";
import Colors from "@/utils/Colors.js";
import { ref, watch } from "vue";

const colors = {
  bg_color: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const search = ref("");
const size = ref("20rem");

watch(search, (value) => {
  if (value) {
    size.value = "100%";
  } else {
    size.value = "20rem";
  }
});
</script>
