<template>
    <v-card variant="flat">
      <v-layout>
        <v-navigation-drawer

        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="Sandra Adams"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-history" title="Resumen" value="resumen" href="/"></v-list-item>
            <v-list-item prepend-icon="mdi-shopping-outline" title="Pedidos y devoluciones" value="shared" href="/profileReturnsOrders"></v-list-item>
            <v-list-item prepend-icon="mdi-account-outline" title="Mi cuenta" value="starred" href="/profileAccount"></v-list-item>
            <v-list-item prepend-icon="mdi-google-maps" title="Mis direcciones" value="starred" href="/profileAddress"></v-list-item>
            <v-list-item prepend-icon="mdi-credit-card-outline" title="Mis pagos" value="starred" href="/profilePayment"></v-list-item>
            <v-list-item prepend-icon="mdi-currency-usd" title="Ventas" value="starred" href="/profileSales" ></v-list-item>
          </v-list>
           <template v-slot:append>
          <div class="pa-2">
             <v-btn
          class="mb-8 text-none"
          :color="colors.primary_dark"
          size="large"
          block

        >
      Cerrar sesión
        </v-btn>
          </div>
        </template>
        </v-navigation-drawer>

        <v-main :style="{'height': '500px'}"></v-main>
        <!-- <v-main :style="{ 'height': '100%' }"></v-main> -->
      <!-- <v-main style="height: 90%"></v-main> -->

      </v-layout>
    </v-card>
  </template>
<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import Colors from '@/utils/Colors.js';

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
</script>
