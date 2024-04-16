<template>
  <v-list min-width="200">
    <v-list-item
      :prepend-avatar="user.profilepic"
      :title="user.name"
      :subtitle="user.username"
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
      username: "carsimax@gmail.com",
      profilepic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
});

</script>
