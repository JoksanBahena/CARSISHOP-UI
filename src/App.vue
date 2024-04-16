<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { useAuthStore } from "@/store/AuthStore.js";
import { useProfileStore } from './store/ProfileStore.js';
import { onMounted } from 'vue';

const { isAuthenticated } = useAuthStore();
const { fetchProfile } = useProfileStore();

onMounted(async() => {
  if (isAuthenticated) {
    await fetchProfile();
  }
});  

</script>