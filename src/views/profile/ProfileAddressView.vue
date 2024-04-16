<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>
    <v-row v-if="addressData.length > 0" v-for="address in addressData" :key="address.id">
      <address-component
        :id="address.id"
        :user="address.name"
        :state="address.state.name"
        :town="address.town.name"
        :suburb="address.suburb"
        :street="address.street"
        :extrnumber="address.extnumber"
        :intnumber="address.intnumber"
        :cp="address.cp"
      />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card variant="flat" class="text-center">
          <v-card-title class="text-h6">No tienes direcciones registradas</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      variant="flat"
      class="my-10 text-none"
      :color="colors.primary_dark"
      block
      prepend-icon="mdi-plus"
      :to="{ name: 'ProfileAddAddress' }"
    >
      Agregar nueva dirección
    </v-btn>
  </v-container>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useProfileStore } from "@/store/ProfileStore";
import { decryptValue } from "@/utils/Crypto";
import Colors from "@/utils/Colors.js";

const { fetchAddressess } = useProfileStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const addressData = reactive([])

const items = [
  {
    title: "Inicio",
    to: { name: "Home" },
  },
  {
    title: "Perfil",
    to: { name: "ProfileAddresses" },
  },
  {
    title: "Mis direcciones",
  },
];

const getAddresses = async () => {
  try {
    const response = await fetchAddressess();
    response.forEach(address => {
      addressData.push({
        id: address.id,
        cp: decryptValue(address.cp),
        extnumber: decryptValue(address.extnumber),
        intnumber: decryptValue(address.intnumber),
        state: {
          name: address.state.name,
        },
        street: decryptValue(address.street),
        suburb: decryptValue(address.suburb),
        town: {
          name: address.town.name,
        },
        name: decryptValue(address.name),
      });
    })
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getAddresses();
});
</script>
