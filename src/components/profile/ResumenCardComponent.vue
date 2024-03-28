<template>
  <v-card variant="flat">
    <v-card-item>
      <div class="d-flex align-center mb-2">
        <v-card-title>
          <v-icon size="20"> {{ icon }} </v-icon>
          {{ title }}
        </v-card-title>

        <v-spacer />

        <router-link
          class="text-subtitle-1 text-decoration-none"
          :style="{ color: colors.primary_dark }"
          :to="to"
        >
          {{ action }}
        </router-link>
      </div>
      <v-divider class="mb-1" />
      <slot></slot>
    </v-card-item>
  </v-card>
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
    default: "mdi-account-outline",
  },
  title: {
    type: String,
    default: "Resumen",
  },
  action: {
    type: String,
    default: "Ver más",
  },
  to: {
    type: Object,
    default: {
      name: "ProfileSummary",
    },
  },
});
</script>
