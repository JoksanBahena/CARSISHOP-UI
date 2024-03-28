<template>
  <v-container>
    <v-row v-for="item in props.data" :key="item.id">
      <h4 class="mt-4">{{ props.typemodule == 'cart' ? item.vendedor : 'Último pedido' }}</h4>
      <v-divider :thickness="3" class="mb-5 mt-2" />
      <v-card class="mt-2" v-for="product in item.products" :key="product.id" width="100%">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-col lg="3" md="6">
            <v-img :aspect-ratio="1" class="bg-white" width="300" cover
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
          </v-col>
          <v-col lg="9" md="6">
            <v-row v-if="props.typemodule == 'cart'" align="end">
              <v-col lg="8" md="6" class="d-flex flex-column justify-center">
                <v-card-title class="text-h5">{{ product.title }}</v-card-title>
                <v-card-subtitle>{{ product.description }}</v-card-subtitle>
                <v-card-text class="text-h6">${{ product.price }} MXN</v-card-text>
                <v-card-text class="text-h6">Talla: {{ product.size }}</v-card-text>
              </v-col>
              <v-col lg="4" md="6" class="text-center">
                <v-row>
                  <v-col>
                    <h4>Cantidad:</h4>
                    <v-select v-model="product.cantidad" :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                      outlined dense></v-select>
                  </v-col>
                  <v-col>
                    <h4>Subtotal:</h4>
                    <p>$ {{ calculateSubtotal(product) }} MX</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col lg="7" md="6" class="d-flex flex-column justify-center">
                <v-card-title class="text-h5">{{ product.title }}</v-card-title>
                <v-card-subtitle>Estado: {{ product.status }}</v-card-subtitle>
              </v-col>
              <v-col lg="5" md="6">
                <v-btn class="mt-5 mb-5" :color="colors.primary_dark" append-icon="">
                  Detalles de compra
                </v-btn>
                <v-btn class="mt-5 mb-5" variant="outlined" :color="colors.primary_dark">
                  Solicitar devolución
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import Colors from "@/utils/Colors.js";

function calculateSubtotal(product) {
  return product.cantidad * parseFloat(product.price.replace('$', ''));
}

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  secondary: Colors.cs_secondary,
};

const props = defineProps({
  data: Object,
  typemodule: String
});
</script>
<style lang=""></style>
