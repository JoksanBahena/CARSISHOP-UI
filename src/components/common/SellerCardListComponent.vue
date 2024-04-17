<template>
  <v-list min-width="200">
    <v-list-item
      :title="user.user.name"
      :subtitle="user.user.username"
      :prepend-avatar="user.user.profilepic"
    />
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
      profilepic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
});
</script>
