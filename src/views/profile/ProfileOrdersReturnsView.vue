<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Pedidos y devoluciones</p>

    <v-tabs v-model="tab" :color="colors.primary_dark">
      <v-tab value="1">Pedidos</v-tab>
      <v-tab value="2">Devoluciones</v-tab>
    </v-tabs>
    <v-expand-transition>
      <v-window v-model="tab" v-if="!loading">
        <v-window-item value="1">
          <v-container fluid>
            <orders-not-found-component
              icon="mdi-shopping-outline"
              advise="No tienes ninguna compra"
              recomendation="Puedes ver productos en la tienda y realizar una compra"
              action="Ver productos"
              :to="{ name: 'Home' }"
              @click="tab = '1'"
            />
            <!-- <seller-card-component>
            <product-list-card-component />
            <product-list-card-component />
          </seller-card-component>
          <seller-card-component>
            <product-list-card-component />
          </seller-card-component> -->
          </v-container>
        </v-window-item>
        <v-window-item value="2">
          <v-container fluid>
            <orders-not-found-component
              icon="mdi-truck-fast-outline"
              advise="No tienes ninguna devolución"
              recomendation="Puedes iniciar una devolución desde el seguimiento de tu pedido"
              action="Ver pedidos"
              :to="{ name: 'ProfileOrders' }"
              @click="tab = '1'"
            />
          </v-container>
        </v-window-item>
      </v-window>
    </v-expand-transition>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { onMounted, ref } from "vue";

const tab = ref(null);
const loading = ref(true);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    title: "Pedidos y devoluciones",
  },
];

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 50);
});
</script>
