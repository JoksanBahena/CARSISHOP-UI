<template>
  <div class="h-screen">
    <navbar-component />

    <main>
      <slot></slot>
    </main>
    <footer-component />
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
</script>
