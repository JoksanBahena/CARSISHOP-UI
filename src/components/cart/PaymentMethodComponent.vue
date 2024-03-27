<template>
  <v-card variant="flat" class="mt-4">
    <v-card-title>Método de pago</v-card-title>
    <v-card-item>
      <template v-slot:prepend>
        <v-img
          src="@/assets/imgs/mc.webp"
          width="50"
          height="50"
          class="mr-2"
        />
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
      >
        Eliminar tarjeta
      </v-btn>
      <v-btn
        variant="outlined"
        class="ma-0 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-pencil"
      >
        Editar tarjeta
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  user: {
    type: String,
    default: "Dueño de la tarjeta",
  },
  last_four: {
    type: String,
    default: "1234",
  },
  resume: {
    type: Boolean,
    default: false,
  },
});
</script>
