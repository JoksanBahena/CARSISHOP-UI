<template>
  <v-navigation-drawer
    v-model="drawer"
    expand-on-hover
    permanent
    :rail="rail"
    @mouseover="rail = false"
    @mouseleave="rail = true"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        class="mt-3"
        v-for="item in nav_items"
        :key="item.index"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        :active="isActive(item.to)"
      />
    </v-list>

    <template v-slot:append>
      <div class="px-2">
        <v-btn
          class="mb-8 text-none"
          :color="colors.primary_dark"
          size="large"
          variant="flat"
          block
        >
          <v-icon>mdi-logout</v-icon>
          <p v-if="!rail">Cerrar sesión</p>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>

import { ref } from "vue";
import Colors from "@/utils/Colors.js";
import { useRoute } from 'vue-router';

const route = useRoute();

const isProfileRoute = route.matched.some(record => record.name.startsWith('Profile'));

const isActive = (to) => {
  if (isProfileRoute && to.name === route.name) {
    return true;
  }
  return false;
};

const drawer = ref(true);
const rail = ref(true);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};

const nav_items = [
  {
    icon: "mdi-history",
    title: "Resumen",
    to: { name: "ProfileSummary" },
  },
  {
    icon: "mdi-shopping-outline",
    title: "Pedidos y devoluciones",
    to: { name: "ProfileOrders" },
  },
  {
    icon: "mdi-account-outline",
    title: "Mi cuenta",
    to: { name: "ProfileAccount" },
  },
  {
    icon: "mdi-map-marker-outline",
    title: "Mis direcciones",
    to: { name: "ProfileAddresses" },
  },
  {
    icon: "mdi-credit-card-outline",
    title: "Metodos de pago",
    to: { name: "ProfilePayments" },
  },
  {
    icon: "mdi-currency-usd",
    title: "Ventas",
    to: { name: "SellerSales" },
  },
];
</script>
