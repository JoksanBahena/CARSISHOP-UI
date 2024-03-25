<template>
  <v-card variant="flat">
    <v-divider class="mb-4 d-flex d-md-none" />
    <v-card-title> Detalles de la compra (19 productos) </v-card-title>
    <v-card-item class="mb-4">
      <div class="d-flex flex-fow text-subtitle-1 mt-2">
        <p>Subtotal</p>
        <p class="font-weight-bold ml-auto">{{ subtotal }}</p>
      </div>
      <div class="d-flex flex-row text-subtitle-1 mt-2">
        <p>Descuento</p>
        <p class="font-weight-bold ml-auto">{{ discount }}</p>
      </div>
      <div class="d-flex flex-row text-subtitle-1 mt-2">
        <p>Total</p>
        <p class="font-weight-bold ml-auto">{{ total }}</p>
      </div>
    </v-card-item>
    <v-divider />
  </v-card>
</template>

<script setup>
const props = defineProps({
  subtotal: {
    type: String,
    default: "$0.00 MX",
  },
  discount: {
    type: String,
    default: "$0.00 MX",
  },
  total: {
    type: String,
    default: "$0.00 MX",
  },
});
</script>
