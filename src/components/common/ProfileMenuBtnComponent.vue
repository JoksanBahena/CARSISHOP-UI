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
        <user-profile-card-component />
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

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const { logout } = useAuthStore();

const logoutSession = () => {
  logout();
};
</script>
