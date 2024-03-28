<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">{{ product }}</p>

    <v-row>
      <v-col cols="12" lg="8">
        <seller-card-component details>
          <product-list-card-component details />
        </seller-card-component>

        <address-component
          user="Cristopher Soto Ventura"
          state="Morelos"
          town="Emiliano Zapata"
          suburb="Tetacalita"
          street="Calle del Déposito"
          extrnumber="S/N"
          intnumber="132"
          cp="62768"
          details
        />

        <v-card variant="flat">
          <v-card-item>
            <div class="mt-3 d-flex justify-content-end align-items-center">
              <v-card-title class="mb-3 text-h5">
                Detalles de envio
              </v-card-title>
            </div>
            <v-row class="mt-4 mb-16">
              <v-timeline align="start" side="end" truncate-line="both">
                <v-timeline-item class="mt-10" :dot-color="colors.primary_dark">
                  <div>
                    <div class="text-h6">Pagado</div>
                    <p>
                      Tu prenda ha sido pagada exitosamente y está en proceso de
                      preparación para su envío
                    </p>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mt-10" :dot-color="colors.primary_dark">
                  <div>
                    <div class="text-h6">En proceso</div>
                    <p>
                      Tu prenda están siendo seleccionados, empacados y
                      preparados para su envío.
                    </p>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mt-10" :dot-color="colors.primary_dark">
                  <div>
                    <div class="text-h6">En tránsito</div>
                    <p>
                      Tu prenda ha sido enviado y se encuentra en camino hacia
                      tu dirección de entrega.
                    </p>
                  </div>
                </v-timeline-item>

                <v-timeline-item class="mt-10" :dot-color="colors.primary_dark">
                  <div>
                    <div class="text-h6">Entregado</div>
                    <p>
                      Tu prenda ha sido entregado con éxito en la dirección
                      especificada.
                    </p>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <order-summary-component />

        <payment-method-component resume />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    title: "Pedidos y devoluciones",
    to: { name: "ProfileOrders" },
  },
  {
    title: "Detalles del pedido",
  },
];

const props = defineProps({
  product: {
    type: String,
    default: "Producto",
  },
});
</script>
