<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Resumen</p>

      <resumen-card-component
        icon="mdi-account-outline"
        title="Mi cuenta"
        to="Editar"
        link="/profileAccount"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          />
        </v-list>
      </resumen-card-component>

      <resumen-card-component
        icon="mdi-shopping-outline"
        title="Ultima compra"
        link="/profileReturnsOrders"
      >
        <product-list-card-component />
      </resumen-card-component>

      <resumen-card-component
        icon="mdi-map-marker-outline"
        title="Mi dirección"
        link="/profileReturnsOrders"
      >
        <address-component
          user="Cristopher Soto Ventura"
          state="Morelos"
          town="Emiliano Zapata"
          suburb="Tetacalita"
          street="Calle del Déposito"
          extrnumber="S/N"
          intnumber="132"
          cp="62768"
          resume
        />
      </resumen-card-component>

      <resumen-card-component
        icon="mdi-credit-card-outline"
        title="Métodos de pago"
        link="/profileReturnsOrders"
      >
        <payment-method-component />
      </resumen-card-component>
    </v-container>
  </profile-layout>
</template>

<script setup>
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import ResumenCardComponent from "@/components/profile/ResumenCardComponent.vue";

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
    title: "Resumen",
    disabled: true,
    href: "/profileResume",
  },
];
</script>
