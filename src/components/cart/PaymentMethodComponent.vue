<template>
  <v-card variant="flat" :class="!resume & !details ? 'mt-4' : 'mb-4'">
    <v-card-item>
      <div
        v-if="!resume & !details"
        class="d-flex align-center text-body-2 text-none font-weight-bold mb-1"
      >
        <v-icon size="20" class="mr-1"> mdi-credit-card-outline</v-icon>
        Método de pago:
      </div>
    </v-card-item>

    <v-card-item class="my-0 py-0">
      <template v-slot:prepend>
        <v-img src="@/assets/imgs/mc.webp" width="50" height="50" />
      </template>
      <div class="d-flex flex-fow text-subtitle-1">
        <p>{{ user }}</p>
      </div>
      <div class="d-flex flex-fow text-subtitle-1">
        <p>•••• •••• •••• {{ last_four }}</p>
      </div>
    </v-card-item>

    <v-card-actions
      v-if="!resume & !details"
      class="flex-column align-start flex-lg-row flex-md-row"
    >
      <v-btn
        variant="outlined"
        class="mb-4 mr-4 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-delete-outline"
        @click="onDeleteHandle(id)"
      >
        Eliminar tarjeta
      </v-btn>
    </v-card-actions>
    <v-card-actions
      v-else
      class="flex-column align-start flex-lg-row flex-md-row"
    >
      <v-btn
        v-if="!resume"
        variant="outlined"
        class="mb-4 mr-4 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-swap-horizontal"
      >
        Cambiar tarjeta
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-divider v-if="!resume" />
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  id: {
    type: String,
  },
  user: {
    type: String,
  },
  last_four: {
    type: String,
  },
  resume: {
    type: Boolean,
    default: false,
  },
  details: {
    type: Boolean,
    default: false,
  },
  onDeleteHandle: Function,
});
</script>
