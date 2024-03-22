<template>
  <div
    class="text-center font-weight-bold w-100 py-2"
    :style="{ background: colors.primary, color: colors.primary_dark }"
  >
    {{ new Date().getFullYear() }} — CarsiShop
  </div>
</template>

<script setup>
import Colors from "@/utils/Colors";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  secondary: Colors.cs_secondary,
};
</script>
