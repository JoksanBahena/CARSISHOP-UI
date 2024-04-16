<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Resumen de ventas</p>

    <resumen-card-component
      title="Mi información"
      action="Editar"
      :to="{ name: 'ProfileAccount' }"
    >
      <v-row class="mt-2">
        <v-col cols="12" lg="6" md="6">
          <div class="text-subtitle-1 font-weight-medium">CURP</div>
          <v-text-field
            v-model="profile_info.curp"
            density="compact"
            placeholder="Nombre(s)"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            readonly
          />
        </v-col>
        <v-col cols="12" lg="6" md="6">
          <div class="text-subtitle-1 font-weight-medium">RFC</div>
          <v-text-field
            v-model="profile_info.rfc"
            density="compact"
            placeholder="RFC"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            readonly
          />
        </v-col>
      </v-row>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-shopping-outline"
      title="Última venta"
      :to="{ name: 'SellerMySales' }"
    >
      <v-list>
        <v-list-item title="Pedido #123456" subtitle="Hace 2 días" />
      </v-list>
    </resumen-card-component>

    <resumen-card-component
      icon="mdi-tshirt-crew-outline"
      title="Productos publicados"
      :to="{ name: 'SellerProducts' }"
    >
      <product-list-component details />
    </resumen-card-component>
  </v-container>
</template>

<script setup>
import ResumenCardComponent from "@/components/profile/ResumenCardComponent.vue";
import { useProfileStore } from "@/store/ProfileStore.js";
import { onMounted, ref } from "vue";

const { profile } = useProfileStore();

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
    title: "Ventas",
    href: "/profile/sales/summary",
  },
  {
    title: "Resumen",
  },
];

const profile_info = ref({
  curp: "",
  rfc: "",
});

onMounted(() => {
  profile_info.value.curp = profile.seller.curp;
  profile_info.value.rfc = profile.seller.rfc;
});
</script>
