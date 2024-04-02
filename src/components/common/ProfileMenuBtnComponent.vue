<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :style="{ color: colors.primary_dark }"
        icon="mdi-account-outline"
      />
      <!-- :to="{ name: 'Login' }" -->
    </template>
    <v-list>
      <user-profile-card-component />
      <v-list-item
        class="mt-3"
        v-for="item in items"
        :key="item.index"
        :title="item.title"
        :to="item.to"
      />
    </v-list>
  </v-menu>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const items = [
  {
    title: "Mi perfil",
    to: { name: "Profile" },
  },
];
</script>
