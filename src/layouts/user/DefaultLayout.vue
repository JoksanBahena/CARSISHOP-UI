<template>
  <div class="h-screen">
    <navbar-component />
    <main class="ma-4">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
</script>
