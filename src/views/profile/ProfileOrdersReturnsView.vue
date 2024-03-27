<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Pedidos y devoluciones</p>

      <v-tabs v-model="tab" :color="colors.primary_dark">
        <v-tab value="1">Pedidos</v-tab>
        <v-tab value="2">Devoluciones</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="1">
          <v-container fluid>
            <seller-card-component>
              <product-list-card-component />
              <product-list-card-component />
              <product-list-card-component />
            </seller-card-component>
            <seller-card-component>
              <product-list-card-component />
            </seller-card-component>
          </v-container>
        </v-window-item>
        <v-window-item value="2">
          <v-container fluid>
            <orders-not-found-component
              advise="Actualmente no tienes ninguna devolución"
              recomendation="Puedes iniciar una devolución desde el seguimiento de tu pedido"
              action="Ver pedidos"
              to="/profileReturnsOrders"
            />
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import Colors from "@/utils/Colors.js";
import { ref } from "vue";

const tab = ref(null);

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Perfil",
    disabled: false,
    href: "/profileAccount",
  },
  {
    title: "Pedidos y devoluciones",
    disabled: true,
    href: "/profileOrdersReturns",
  },
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
