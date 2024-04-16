<template>
  <v-card variant="flat" class="mb-4">
    <v-card-item :key="id">
      <div>
        <div v-if="!resume & !details" class="d-flex align-center text-body-2 text-none font-weight-bold mb-1">
          <v-icon size="20" class="mr-1"> mdi-map-marker-outline</v-icon>
          Dirección de envio:
        </div>
        <v-card-title v-else class="mb-2"> Dirección de envio </v-card-title>
        <div class="text-h6 mb-1">
          <p>{{ user }}</p>
        </div>
        <div :class="details ? 'mb-4' : ''">
          {{ state }}, {{ town }}, {{ suburb }}, {{ street }} {{ extrnumber }}
          {{ intnumber }}, {{ cp }}
        </div>
      </div>
    </v-card-item>

    <v-card-actions v-if="!resume & !details" class="flex-column align-start flex-lg-row flex-md-row">
      <v-btn variant="outlined" class="mb-4 mr-4 text-none" :color="colors.primary_dark"
        prepend-icon="mdi-delete-outline" @click="addressDelete(id)" :loading="loading">
        Eliminar dirección
      </v-btn>
      <v-btn variant="outlined" class="ma-0 text-none" :color="colors.primary_dark" prepend-icon="mdi-pencil">
        Editar dirección
      </v-btn>
    </v-card-actions>
    <v-divider v-if="!resume" />
  </v-card>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from 'vue'
import { useProfileStore } from "@/store/ProfileStore";
import { Toast } from "@/utils/Alerts.js";
import { encryptAES } from "@/utils/Crypto";

const { deleteAddress } = useProfileStore();

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const loading = ref(false);

const props = defineProps({
  id: {
    type: String,
  },
  user: {
    type: String,
    default: "Tu nombre",
  },
  state: {
    type: String,
    default: "Estado",
  },
  town: {
    type: String,
    default: "Municipio",
  },
  suburb: {
    type: String,
    default: "Colonia",
  },
  street: {
    type: String,
    default: "Calle",
  },
  extrnumber: {
    type: String,
    default: "Núm exterior",
  },
  intnumber: {
    type: String,
    default: "Núm interior",
  },
  cp: {
    type: String,
    default: "C.P.",
  },
  resume: {
    type: Boolean,
    default: false,
  },
  details: {
    type: Boolean,
    default: false,
  },
});

const addressDelete = async (id) => {
  loading.value = true;
  try {
    const response = await deleteAddress(encryptAES(String(id)));
    console.log(response);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Dirección eliminada correctamente",
      });
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error al eliminar la dirección",
    });
  } finally {
    loading.value = false;
  }
};
</script>
