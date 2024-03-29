<template>
  <breadcrumbs-component :items="items" />
  <payment-form-component />
</template>

<script setup>
import PaymentFormComponent from '@/components/profile/Form/PaymentFormComponent.vue';
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
    title: "Metodos de pago",
    to: { name: "ProfilePayments" },
  },
  {
    title: "Agregar metodo de pago",
  },
];
</script>
