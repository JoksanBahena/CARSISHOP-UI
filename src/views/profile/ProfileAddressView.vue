<template>
  <breadcrumbs-component :items="items" />

  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>

    <v-expand-transition>
      <v-row v-if="!loading">
        <address-component
          v-for="address in addressData"
          :key="address.id"
          :id="address.id"
          :user="address.name"
          :state="address.state.name"
          :town="address.town.name"
          :suburb="address.suburb"
          :street="address.street"
          :extrnumber="address.extnumber"
          :intnumber="address.intnumber"
          :cp="address.cp"
          :onDeleteHandle="addressDelete"
        />
      </v-row>
    </v-expand-transition>

    <v-row v-if="!loading && addressData.length === 0">
      <orders-not-found-component
        icon="mdi-map-marker-off-outline"
        advise="No tienes direcciones registradas"
        recomendation="Agrega una nueva dirección para poder realizar tus compras"
        disableActions
      />
    </v-row>

    <v-btn
      v-if="!loading"
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
import { reactive, onMounted, ref } from "vue";
import { useProfileStore } from "@/store/ProfileStore";
import { decryptValue } from "@/utils/Crypto";
import { encryptAES } from "@/utils/Crypto";
import { Toast } from "@/utils/Alerts";
import Colors from "@/utils/Colors.js";
import Swal from "sweetalert2";

const { fetchAddressess, deleteAddress } = useProfileStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const addressData = reactive([]);
const loading = ref(true);

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
    title: "Mis direcciones",
  },
];

const getAddresses = async () => {
  try {
    const response = await fetchAddressess();
    addressData.splice(0);
    response.forEach((address) => {
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
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al cargar tus direcciones",
    });
  } finally {
    loading.value = false;
  }
};

const addressDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Está dirección será eliminada permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.primary_dark,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const response = await deleteAddress(encryptAES(String(id)));
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Dirección eliminada correctamente",
        });
      }
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Ocurrió un error al eliminar la dirección",
    });
  } finally {
    getAddresses();
  }
};

onMounted(() => {
  loading.value = true;
  getAddresses();
});
</script>
