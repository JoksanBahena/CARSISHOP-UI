<template>
  <default-layout>
    <v-parallax
      src="@/assets/imgs/background.png"
      :style="{ zoom: '60%' }"
      height="100%"
    >
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <div class="text-center text-wrap">
          <h1 class="font-weight-bold mb-4 text-h1">
            TU ESTILO NUESTRA PASIÓN
          </h1>
          <h2 class="subheading px-16">
            Moda exclusiva para tu personalidad única
          </h2>
        </div>
      </v-layout>
    </v-parallax>
    <div>
      <h2>Explora nuestras categorías</h2>
      <v-row class="mt-5">
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="344" variant="flat">
            <v-img
              height="auto"
              src="@/assets/imgs/girl_card.webp"
              cover
            ></v-img>

            <v-card-actions>
              <p class="font-weight-medium">Mujeres</p>
              <v-spacer></v-spacer>
              <v-btn
                variant="outlined"
                :style="{ borderColor: colors.primary }"
              >
                <v-icon icon="mdi-chevron-right" class="text-h4"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="344" variant="flat">
            <v-img
              height="auto"
              src="@/assets/imgs/men_card.webp"
              cover
            ></v-img>

            <v-card-actions>
              <p class="font-weight-medium">Hombres</p>
              <v-spacer></v-spacer>
              <v-btn
                variant="outlined"
                :style="{ borderColor: colors.primary }"
              >
                <v-icon icon="mdi-chevron-right" class="text-h4"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="344" variant="flat">
            <v-img
              height="auto"
              src="@/assets/imgs/kids_card.webp"
              cover
            ></v-img>

            <v-card-actions>
              <p class="font-weight-medium">Niños</p>
              <v-spacer></v-spacer>
              <v-btn
                variant="outlined"
                :style="{ borderColor: colors.primary }"
              >
                <v-icon icon="mdi-chevron-right" class="text-h4"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <ProducListComponent title="Recomendados para ti"></ProducListComponent>
    <!-- <product-card-component /> -->
  </default-layout>
</template>

<script setup>
import { ref } from "vue";
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import ProducListComponent from "@/components/common/ProductListComponent.vue";
import ProductCardComponent from "@/components/common/ProductCardComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });
</script>
