<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Mis direcciones']"></v-breadcrumbs>
    <h1 class='ml-5'>Resumen</h1>

    <v-container class="ml-0" style="width: 80%;">
      <v-row class="pl-7" rows="12" md="4">
        <v-card variant="flat" width="100%">
          <v-card-item>
            <div class="mt-3 d-flex justify-content-end align-items-center">
              <v-card-title class="mb-3 ">
                <v-icon size="30" class="mdi mdi-account-outline mr-3"></v-icon>Mi cuenta
              </v-card-title>

              <a href="/profileAccount" class="text-subtitle-1 ml-auto cursor-pointer text-decoration-none"
                style="color: #372A5E;">Editar</a>

            </div>

            <V-divider></v-divider>
            <v-row class="mt-3">
              <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                  subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
              </v-list>

            </v-row>

          </v-card-item>
        </v-card>

        <v-card variant="flat" width="100%">
          <v-card-item>
            <div class="mt-3 d-flex justify-content-end align-items-center">
              <v-card-title class="mb-3 ">
                <v-icon size="30" class="mdi mdi-account-outline mr-3"></v-icon>Ultima compra
              </v-card-title>

              <a  href="/profileReturnsOrders" class="text-subtitle-1 ml-auto cursor-pointer	text-decoration-none" style="color: #372A5E;">Ver más</a>
            </div>

            <V-divider></v-divider>

            <v-row>
              <v-col>
                <v-card-item>
                  <template v-slot:prepend>
                    <v-img src="@/assets/imgs/item.webp" width="100" height="100" class="mr-2"></v-img>
                  </template>
                  <v-card-title class="mb-3 ml-4">ITEM</v-card-title>
                  <v-card-text class="py-0 mb-4 text-h7">STATUS (ENTREGADO/CANCELADO/DEVUELTO) -
                    DD/MM/AAAA</v-card-text>
                  <v-card-text class="py-1">Option selected - description</v-card-text>
                </v-card-item>
              </v-col>
              <v-col>
                <v-card-actions class="flex-column">
                  <v-btn variant="flat" append-icon="mdi-chevron-right" class="mb-8 text-none"
                    :color="colors.primary_dark">
                    Detalles de compra
                  </v-btn>
                  <v-btn variant="outlined" append-icon="mdi-chevron-right" class="mb-8 text-none"
                    :color="colors.primary_dark">
                    Solicitar devolución
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>

          </v-card-item>
        </v-card>

        <v-card variant="flat" width="100%">
          <v-card-item>
            <div class="mt-3 d-flex justify-content-end align-items-center">
              <v-card-title class="mb-3 ">
                <v-icon size="30" class="mdi mdi-account-outline mr-3"></v-icon>Mis direcciones
              </v-card-title>

              <a href="/profileAddress" class="text-subtitle-1 ml-auto cursor-pointer text-decoration-none	" style="color: #372A5E;">Ver
                más</a>
            </div>

            <V-divider></v-divider>

            <v-row>
              <v-col>
                <v-card variant="flat" width="100%">
                  <v-card-item>


                    <v-card-subtitle class="mt-1 text-h6">Cristopher Soto</v-card-subtitle>
                  </v-card-item>
                  <v-card-text>
                    Morelos, Tetecalita, Calle del Depósito S/N 62768 </v-card-text>

                </v-card>
              </v-col>

            </v-row>

          </v-card-item>
        </v-card>

        <v-card variant="flat" width="100%">
          <v-card-item>
            <div class="mt-3 d-flex justify-content-end align-items-center">
              <v-card-title class="mb-3 ">
                <v-icon size="30" class="mdi mdi-account-outline mr-3"></v-icon>Mis Metodos de pago
              </v-card-title>

              <a href="/profilePayment" class="text-subtitle-1 ml-auto cursor-pointer text-decoration-none	" style="color: #372A5E;">Ver
                más</a>
            </div>

            <V-divider></v-divider>

            <v-row>
              <v-col>
                <v-card variant="flat" width="100%">
                  <v-card-item>

                    <template v-slot:prepend>
                      <v-img src="@/assets/imgs/mc.webp" width="50" height="50" class="mr-2"></v-img>
                    </template>
                    <v-card-text class="py-0">Cristopher Soto Ventura</v-card-text>
                    <v-card-text class="py-1">
                      ···· ···· ···· 1412
                    </v-card-text>
                  </v-card-item>

                </v-card>
              </v-col>

            </v-row>

          </v-card-item>
        </v-card>


      </v-row>


    </v-container>

  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

</script>
