<template>
  <div class="d-flex align-center my-3">
    <!-- <v-img :src="product.image" width="80" /> -->
    <v-list min-width="120">
      <v-list-item
        :title="product.name"
        :subtitle="product.description"
        lines="three"
      />
    </v-list>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    default: {
      name: "Tu producto",
      description: "Descripción en proceso",
      image: "/src/assets/imgs/item.webp",
    },
  },
});
</script>
