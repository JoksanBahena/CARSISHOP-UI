<template>
  <v-row class="mt-2 mb-4 align-center">
    <v-col cols="12" lg="9">
      <v-row class="align-center">
        <v-col cols="12" lg="3" class="py-2">
          <v-img src="@/assets/imgs/item.webp" width="120" class="mx-auto" />
        </v-col>
        <v-col>
          <p class="text-h6 mb-4">{{ product }}</p>

          <p v-if="!details" class="text-subtitle-1">
            <v-chip variant="tonal">
              {{ status }}
            </v-chip>
            - {{ date }}
          </p>  
          <p class="text-subtitle-1">{{ description }}</p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" lg="3">
      <v-btn
        variant="flat"
        append-icon="mdi-chevron-right"
        class="mb-2 text-none"
        :color="colors.primary_dark"
        block
        :href="details ? '/product/1' : '/profileOrderDetail'"
      >
        Detalles de compra
      </v-btn>
      <v-btn
        variant="outlined"
        append-icon="mdi-chevron-right"
        class="text-none"
        block
        :color="colors.primary_dark"
        v-if="!details"
      >
        Solicitar devolución
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  product: {
    type: String,
    default: "Tu producto",
  },
  status: {
    type: String,
    default: "EN PROCESO",
  },
  description: {
    type: String,
    default: "Descripción en proceso",
  },
  date: {
    type: String,
    default: "01/01/2001",
  },
  details: {
    type: Boolean,
    default: false,
  },
});
</script>
