<template>
  <profile-layout>
    <v-breadcrumbs :items="['Inicio', 'Mi perfil', 'Pedidos y devoluciones', 'Dalles de compra' ]"></v-breadcrumbs>
    <h1 class='ml-5'>ITEM NAME</h1>

    <v-container class="ml-0" style="width: 95%;">
      <v-row class="pl-7" rows="12" md="4">
        <v-col cols="8">
          <v-card variant="flat" width="100%">
            <v-card-item>
              <div class="mt-3 d-flex justify-content-end align-items-center">
                <v-card-title class="mb-3 text-h5 ">
                  Tienda/vendedor
                </v-card-title>
                <p class="text-h6 ml-auto ">
                  DD/MM/AAAA</p>
              </div>
              <v-row>
                <v-col>
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-img src="@/assets/imgs/item.webp" width="100" height="100" class="mr-2"></v-img>
                    </template>
                    <v-card-title class="mb-3 ml-4">ITEM</v-card-title>
                    <v-card-text class="py-0 mb-4">STATUS (ENTREGADO/CANCELADO/DEVUELTO) - DD/MM/AAAA</v-card-text>
                    <v-card-text class="py-1">Option selected - description</v-card-text>
                  </v-card-item>
                </v-col>
              </v-row>

            </v-card-item>
          </v-card>
          <v-divider></v-divider>
          <v-card variant="flat" width="100%">
            <v-card-item>
              <v-card-title>Dirección de envio:</v-card-title>
              <v-card-subtitle class="mt-1 ">Nombre</v-card-subtitle>
            </v-card-item>
            <v-card-text>
              Direccion
            </v-card-text>

          </v-card>
          <v-divider></v-divider>
          <v-card variant="flat" width="100%">
            <v-card-item>
              <div class="mt-3 d-flex justify-content-end align-items-center">
                <v-card-title class="mb-3 text-h5 ">
                  Detalles de envio
                </v-card-title>

              </div>
              <v-row>
                <v-col>
                  <v-timeline align="start" side="end"  truncate-line="end">
                    <v-timeline-item class="mt-10" :dot-color="colors.primary_dark">

                      <div>
                        <div class="text-h6">Pagado</div>
                        <p>
                          Tu prenda ha sido pagada exitosamente y está en proceso de preparación para su envío
                        </p>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item  class="mt-10" :dot-color="colors.primary_dark">

                      <div>
                        <div class="text-h6">
                          En proceso
                        </div>
                        <p>
                          Tu prenda están siendo seleccionados, empacados y preparados para su envío. </p>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item  class="mt-10" :dot-color="colors.primary_dark">

                      <div>
                        <div class="text-h6">En tránsito</div>
                        <p>
                          Tu prenda ha sido enviado y se encuentra en camino hacia tu dirección de entrega. </p>
                      </div>
                    </v-timeline-item>

                    <v-timeline-item   class="mt-10" :dot-color="colors.primary_dark">

                      <div>
                        <div class="text-h6">Entregado</div>
                        <p>
                          Tu prenda ha sido entregado con éxito en la dirección especificada. </p>
                      </div>
                    </v-timeline-item>

                  </v-timeline>

                </v-col>
              </v-row>

            </v-card-item>
          </v-card>
        </v-col>


        <v-col cols="4">
          <v-card variant="flat" width="100%">
            <v-card-item>
              <v-card-title class="ml-3">Detalles de la compra:</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <div class="text-subtitle-1 font-weight-medium mt-2">
                      Subtotal(1 Producto)
                    </div>
                    <div class="text-subtitle-1 font-weight-medium mt-2">
                      Descuento
                    </div>
                    <div class="text-subtitle-1 font-weight-medium mt-2">
                      Total
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-subtitle-1 font-weight-bold mt-2">
                      $1,996MX
                    </div>
                    <div class="text-subtitle-1 font-weight-bold mt-2">
                      $206MX
                    </div>
                    <div class="text-subtitle-1 font-weight-bold mt-2">
                      $1,890MX
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card-item>
          </v-card>
          <v-divider></v-divider>
          <v-card variant="flat" width="100%">
            <v-card-title>Metodo de pago:</v-card-title>
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
