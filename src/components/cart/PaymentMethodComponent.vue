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
  </v-card>
</template>

<script setup>
const props = defineProps({
  user: {
    type: String,
    default: "Dueño de la tarjeta",
  },
  last_four: {
    type: String,
    default: "1234",
  },
});
</script>
