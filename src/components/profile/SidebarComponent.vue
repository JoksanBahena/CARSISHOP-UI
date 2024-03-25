<template>
  <v-navigation-drawer
    :color="colors.gray"
    permanent
    :rail="rail"
    @click="rail = false"
  >
    <v-list color="transparent">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-history"
        title="Resumen"
        value="resumen"
        href="/profileResume"
      />
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-shopping-outline"
        title="Pedidos y devoluciones"
        value="shared"
        href="/profileReturnsOrders"
      />
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-account-outline"
        title="Mi cuenta"
        value="starred"
        href="/profileAccount"
      />
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-map-marker-outline"
        title="Mis direcciones"
        value="starred"
        href="/profileAddress"
      />
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-credit-card-outline"
        title="Metodos de pago"
        value="starred"
        href="/profilePayment"
      />
      <v-list-item
        class="mt-3"
        prepend-icon="mdi-currency-usd"
        title="Ventas"
        value="starred"
        href="/profileSales"
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

const rail = ref(true);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};
</script>
