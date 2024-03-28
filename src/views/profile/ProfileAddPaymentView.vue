<template>
<<<<<<< HEAD
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <h1 class='ml-5'>Metodos de pagos</h1>

    <v-container>
      <h4>Datos bancarios</h4>
      <v-form>

      <v-row class="mt-5">
        <v-col cols="8" md="4">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Nombre(s)
            </div>
            <v-text-field
              density="compact"
              placeholder="Nombre(s)"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />
          </div>
        </v-col>
        <v-col cols="8" md="4">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Apellidos
            </div>
            <v-text-field
              density="compact"
              placeholder="Apellidos"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />
          </div>
        </v-col>

      </v-row>
      <v-row class="mt-5">
        <v-col cols="8">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Numero de tarjeta
            </div>
            <v-text-field
              density="compact"
              placeholder="Numero de tarjeta"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="8" md="4">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Fecha de vencimiento
            </div>
            <v-text-field
              density="compact"
              placeholder="Fecha de vencimiento"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />
          </div>
        </v-col>
        <v-col cols="8" md="4">
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              CCV
            </div>
            <v-text-field
              density="compact"
              placeholder="CCV"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />
          </div>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="8">
          <v-btn
            variant="outlined"
            class="mb-8  text-none"
            :color="colors.primary_dark"
            block
            href="/profilePayment"
            prepend-icon="mdi-plus"
          >Guardar</v-btn>
        </v-col>
      </v-row>
            </v-form>

    </v-container>

  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

 const items = [
  {
    title: 'Inicio',
    disabled: false,
    href: '/',
  },
  {
    title: 'Perfil',
    disabled: false,
    href: '/profileAccount',
  },
  {
    title: 'Metodos de pago',
    disabled: false,
    href: '/profilePayment',

  },
  {
    title: 'Agregar metodo de pago',
    disabled: true,
    href: '/profileAddPayment',

  }
=======
  <breadcrumbs-component :items="items" />
  <payment-form-component />
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
    title: "Metodos de pago",
    to: { name: "ProfilePayments" },
  },
  {
    title: "Agregar metodo de pago",
  },
>>>>>>> 08c929c ([MODIFY] eliminación de default-layout, implentación de breadcrumbs-component y redireccionamiento de rutas con :to + nombre de la ruta)
];
const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

</script>
