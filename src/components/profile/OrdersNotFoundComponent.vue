<template>
  <v-container class="d-flex align-center justify-start flex-column h-screen">
    <v-icon class="mdi mdi-cart-outline" size="64" />
    <h2 class="text-center mt-4">{{ props.advise }}</h2>
    <p class="text-center mt-4">{{ props.recomendation }}</p>
    <v-btn
      append-icon="mdi-chevron-right"
      :style="{ 'border-color': colors.primary, color: colors.primary_dark }"
      variant="outlined"
      class="text-none mt-5"
      :href="props.to"
    >
      {{ action }}
    </v-btn>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  advise: {
    type: String,
    default: "Actualmente no cuentas con esa información",
  },
  recomendation: {
    type: String,
    default: "Puedes consultar las preguntas frecuentes para más información",
  },
  action: {
    type: String,
    default: "Volver a la tienda",
  },
  to: {
    type: String,
    default: "/",
  },
});
</script>
