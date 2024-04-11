<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :style="{ color: colors.primary_dark }"
        icon="mdi-account-outline"
      />
    </template>
    <v-list>
      <v-list-item>
        <user-profile-card-component v-bind:user="userData"/>
      </v-list-item>

      <v-divider />

      <v-list-item
        class="mt-3"
        title="Mi perfil"
        :to="{ name: 'Profile' }"
        prepend-icon="mdi-account-outline"
      />
      <v-list-item>
        <v-btn
          variant="outlined"
          class="text-none"
          :color="colors.primary_dark"
          append-icon="mdi-logout-variant"
          block
          @click="logoutSession"
          href="/"
        >
          Cerrar sesión
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useAuthStore } from "@/store/AuthStore.js";
import Colors from "@/utils/Colors.js";
import { onMounted, reactive } from "vue";
import { useProfileStore } from '@/store/ProfileStore';

const { fetchProfile } = useProfileStore();

const userData = reactive({
  name: '',
  email: '',
  avatar: ''
});

const getUserInfo = async () => {
  try {
    const response = await fetchProfile();
    userData.name = response.name + ' ' + response.surname;
    userData.email = response.username;
    userData.avatar = response.profilepic;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getUserInfo();
});

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const { logout } = useAuthStore();

const logoutSession = () => {
  logout();
};
</script>
