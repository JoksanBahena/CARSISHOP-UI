<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis ventas</p>

    <orders-not-found-component
      advise="Actualmente no eres un vendedor"
      recomendation="Puedes solicitar ser vendedor para empezar a comercializar tus productos"
      action="Solicitar ser vendedor"
      :to="{ name: 'ProfileSalesRequest' }"
    />
  </v-container>
</template>

<script setup>
const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    to: { name: "ProfileSummary" },
  },
  {
    title: "Mis ventas",
  },
];
</script>
