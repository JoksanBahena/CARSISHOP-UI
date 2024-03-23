<template>
  <v-app>
    <v-app-bar>
      <navbar-component />
    </v-app-bar>
    <sidebar-component />

    <v-main>
      <slot></slot>
    </v-main>
    <footer-component />
  </v-app>
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import SidebarComponent from "@/components/common/SidebarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};
</script>

<style scoped>
.container {
  width: 300px;
  height: 100%;
}
</style>
