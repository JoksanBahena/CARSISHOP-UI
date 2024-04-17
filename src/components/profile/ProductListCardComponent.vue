<template>
  <v-row class="mt-2 mb-4 align-center">
    <v-col cols="12" lg="9">
      <v-row class="align-center">
        <v-col cols="12" lg="3" class="py-2">
          <v-img :src="image" width="120" class="mx-auto" />
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
        :to="
          details
            ? { name: 'Product', params: { id: 1 } }
            : { name: 'ProfileOrderDetails', params: { id: 1 } }
        "
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
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  details: {
    type: Boolean,
    default: false,
  },
});
</script>
