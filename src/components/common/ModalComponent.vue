<template>
  <v-btn
    class="text-none mx-1 my-auto"
    :color="colors.primary_dark"
    variant="flat"
    ref="btn"
  >
    {{ btn_title }}
  </v-btn>

  <v-dialog :activator="btn" max-width="600" persistent>
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 ps-2">
            {{ modal_title }}
          </div>

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <slot></slot>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const btn = ref(null);

defineProps({
  btn_title: {
    type: String,
    default: "Registrar",
  },
  modal_title: {
    type: String,
    default: "Registro nuevo",
  },
});
</script>
