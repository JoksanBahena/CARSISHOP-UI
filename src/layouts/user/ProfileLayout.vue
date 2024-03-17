<template>
  <div class="h-screen">
    <navbar-component />

 <v-row no-gutters>
  <col cols="2">

      <v-list class="container" :style="{ 'background-color': colors.gray }">
        <div class="px-4 ">
          <v-list-item  >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-account-outline mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-h6 mb-0">Nombre</p>
                    <p class="text-body-2 mt-0">Correo</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item   class="mt-4" >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-history mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Resumen</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
            <v-list-item class="mt-4"  >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-shopping-outline mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Pedidos y devoluciones</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
            <v-list-item class="mt-4" >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-account-outline mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Mi cuenta</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
            <v-list-item  class="mt-4" >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-google-maps mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Mis direcciones</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
            <v-list-item  class="mt-4" >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-credit-card-outline mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Mis pagos</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
            <v-list-item  class="mt-4" >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-currency-usd mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Ventas</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
                   <v-divider class="mt-4"></v-divider>

                     <v-list-item class="mt-8"  >
            <v-row align="center">
              <v-col cols="auto">
                <div class="d-flex align-center">
                  <v-icon class="mdi mdi-logout mr-2"></v-icon>
                  <div class="ml-4">
                    <p class="text-subtitle-1 mb-0">Cerrar sesión</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>

        </div>
      </v-list>
      </col>
      <v-col>

        <main class="ma-2 ">
          <slot></slot>

        </main>
      </v-col>


    </v-row>

    <footer-component />
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_secondary,
};
</script>

<style scoped>
.container {
  width: 300px;
  height: 100%;
}
</style>



