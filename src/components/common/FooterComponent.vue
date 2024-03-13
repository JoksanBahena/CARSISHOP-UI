<template>
  <div>
    <div
      class="px-4 py-2 text-center w-100"
      :style="{ background: colors.primary, color: colors.primary_dark }"
    >
      <strong> {{ new Date().getFullYear() }} — CarsiShop </strong>
    </div>
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
