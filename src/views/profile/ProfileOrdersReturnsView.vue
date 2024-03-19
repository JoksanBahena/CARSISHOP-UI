<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Pedidos y devoluciones']"></v-breadcrumbs>
    <h1 class='ml-5'>Pedidos y devoluciones</h1>

   <v-row class="ml-1 mt-6 pl-4">
      <div class="col-auto mr-4 cursor-pointer" @click="step = 1">
        <h3 class="font-weight-black">Pedidos</h3>
        <div  :class="{ 'line': step === 1 }"/>
      </div>
      <div class="col-auto cursor-pointer" @click="step = 2">
        <h3 class="font-weight-black">Devoluciones</h3>
        <div  :class="{ 'line': step === 2 }"/>
      </div>
    </v-row>

    <v-container>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-row class="pl-7 mt-10 " rows="12" md="4">
    <v-card variant="flat" width="100%">
          <v-card-item>
            <v-card-title class="mb-3">TIENDA / VENDEDOR</v-card-title>
            <V-divider></v-divider>
            <div class=" mt-3 d-flex justify-content-end align-items-center">
              <v-icon class="mdi mdi-close ml-auto"></v-icon>
            </div>
            <v-row>
              <v-col>
                <v-card-item>
                  <template v-slot:prepend>
                    <v-img src="@/assets/imgs/item.webp" width="100" height="100" class="mr-2"></v-img>
                  </template>
                  <v-card-title class="mb-3 ml-4">ITEM</v-card-title>
                  <v-card-text class="py-0 mb-4">Descriccion</v-card-text>
                  <v-card-text class="py-1">Option</v-card-text>
                </v-card-item>
              </v-col>
              <v-col>
                <v-card-actions class="flex-column">
                  <v-btn variant="outlined" class="mb-8 text-none" :color="colors.primary_dark">
                    Detalles de compra
                  </v-btn>
                  <v-btn variant="outlined" class="mb-8 text-none" :color="colors.primary_dark">
                    Solicitar devolución
                  </v-btn>
                </v-card-actions>
              </v-col>

            </v-row>

          </v-card-item>
        </v-card>
                </v-row>
        </v-window-item>

        <v-window-item :value="2">

         <v-container class="d-flex align-center justify-center flex-column">
      <v-icon class='mdi mdi-cart-outline ' size="x-large"></v-icon>
      <h2 class="text-center mt-4">Actualmente no tienes ninguna devolución</h2>
      <p class="text-center mt-4">Puedes iniciar una devolución desde el seguimiento de tu pedido</p>
      <v-btn  :style="{ 'border-color': colors.primary, 'color':colors.primary_dark }" variant='outlined' class="mt-5"   @click="step = 1">Pedidos</v-btn>
    </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import { ref } from "vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

let step = ref(1);
</script>

<style scoped>
.line {
  border: 1px solid black;
}
a {
  color: black;
}
</style>
