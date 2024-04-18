<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Ventas</p>

    <orders-not-found-component
      :icon="info.icon"
      :advise="info.advise"
      :recomendation="info.recomendation"
      :action="info.action"
      :to="info.to"
    />
  </v-container>
</template>

<script setup>
import BreadcrumbsComponent from "@/components/common/BreadcrumbsComponent.vue";
import OrdersNotFoundComponent from "@/components//profile/OrdersNotFoundComponent.vue";
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/store/ProfileStore";
import router from "@/router";

const { profile } = useProfileStore();

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
    title: "Ventas",
  },
];

const info = ref({
  icon: "mdi-cart-outline",
  advise: "Actualmente no eres un vendedor",
  recomendation:
    "Puedes solicitar ser vendedor para empezar a comercializar tus productos",
  action: "Solicitar ser vendedor",
  to: { name: "SellerRequest" },
});

onMounted(() => {
  if (profile.seller?.request_status === "APPROVED") {
    info.value.icon = "mdi-cart-check";
    info.value.advise = "¡Ya eres un vendedor!";
    info.value.recomendation = "Ahora puedes comenzar a vender tus productos";
    info.value.action = "Ir a mi resumen de vendedor";
    router.push({ name: "SellerResumen" });
  } else if (profile.seller?.request_status === "PENDING") {
    info.value.icon = "mdi-cart-check";
    info.value.advise = "Tu solicitud ha entrado en proceso";
    info.value.recomendation =
      "Un administrador revisará tu solicitud y podrás empezar a vender tus productos";
    info.value.action = "Ver mi solicitud";
    info.value.to = { name: "SellerRequest" };
  } else if (profile.seller?.request_status === "REJECTED") {
    info.value.icon = "mdi-cart-remove";
    info.value.advise = "Tu solicitud ha sido rechazada";
    info.value.recomendation =
      "Un administrador ha revisado tu solicitud y ha decidido rechazarla";
    info.value.action = "Ver mi solicitud";
    info.value.to = { name: "SellerRequest" };
  }
});
</script>
