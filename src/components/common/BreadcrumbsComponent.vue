<template>
  <v-breadcrumbs :items="items" :style="{ color: colors.primary_dark }">
    <template v-slot:prepend>
      <v-icon
        icon="mdi-home-outline"
        size="small"
        :color="colors.primary_dark"
      />
    </template>

    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right" :color="colors.primary_dark" />
    </template>
  </v-breadcrumbs>
</template>

<script setup>
import Colors from "@/utils/Colors";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  items: {
    type: Array,
    default: [
      {
        title: "Inicio",
        to: { name: "Home" },
      },
      {
        title: "Página actual",
      },
    ],
  },
});
</script>
