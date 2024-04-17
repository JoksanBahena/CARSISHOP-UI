<template>
  <v-list min-width="200">
    <v-list-item :title="user.rfc" :subtitle="user.curp" />
  </v-list>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
    default: {
      rfc: "Maximiliano Carsi",
      curp: "carsimax@gmail.com",
    },
  },
});
</script>
