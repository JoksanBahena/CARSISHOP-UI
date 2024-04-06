<template>
  <navbar-admin-component />
  <v-main class="h-100">
    <slot></slot>
  </v-main>
  <footer-component />
</template>

<script setup>
import NavbarAdminComponent from "../../components/common/admin/NavbarAdminComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
</script>
