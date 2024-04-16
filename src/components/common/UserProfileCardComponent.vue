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
import { onMounted, ref, watch } from "vue";
import { useProfileStore } from "@/store/ProfileStore";

const { profile } = useProfileStore();

const user = ref({
  name: "Bienvenido",
  email: "tucorreo@dominio.com",
  avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
});

onMounted(() => {
  user.value.name = profile.name + " " + profile.surname;
  user.value.email = profile.username;
  user.value.avatar = profile.profilepic;
});
</script>
