<template>
  <v-card variant="flat" class="mb-4">
    <v-card-item>
      <div class="d-flex align-center mb-2">
        <v-spacer />
        <p
          v-if="!details && !cart"
          class="text-subtitle-1"
          :style="{ color: colors.gray }"
        >
          {{ date }}
        </p>
      </div>
      <v-divider v-if="!details" />
      <slot></slot>
    </v-card-item>
    <v-divider v-if="details" />
  </v-card>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
  gray: Colors.cs_opacity_gray,
};

const props = defineProps({
  date: {
    type: String,
    default: "01/01/2001",
  },
  details: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Boolean,
    default: false,
  },
});
</script>
