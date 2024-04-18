<template>
  <v-container class="d-flex align-center justify-start flex-column">
    <v-icon size="64"> {{ icon }} </v-icon>
    <h2 class="text-center mt-4">{{ advise }}</h2>
    <p class="text-center mt-4">{{ recomendation }}</p>

    <div v-if="!disableActions" class="mt-5">
      <router-link :to="to">
        <v-btn
          append-icon="mdi-chevron-right"
          :color="colors.primary_dark"
          variant="outlined"
          class="text-none"
        >
          {{ action }}
        </v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  icon: {
    type: String,
    default: "mdi-cart-outline",
  },
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
    type: Object,
    default: { name: "Home" },
  },
  disableActions: {
    type: Boolean,
    default: false,
  },
});
</script>
