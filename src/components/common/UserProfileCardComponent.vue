<template>
  <v-list min-width="200">
    <v-list-item
      :prepend-avatar="user.avatar"
      :title="user.name"
      :subtitle="user.email"
    />
  </v-list>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
    default: {
      name: "Maximiliano Carsi",
      email: "carsimax@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
});
</script>
