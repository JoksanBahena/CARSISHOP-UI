<template>
  <navbar-component />
  <sidebar-component />
  <v-main class="h-100">
    <slot></slot>
  </v-main>
  <footer-component />
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import SidebarComponent from "@/components/profile/SidebarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
</script>
