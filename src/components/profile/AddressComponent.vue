<template>
  <v-card variant="flat" class="mb-4">
    <v-card-item>
      <div>
        <div
          v-if="!resume & !details"
          class="d-flex align-center text-body-2 text-none font-weight-bold mb-1"
        >
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

    <v-card-actions
      v-if="!resume & !details"
      class="flex-column align-start flex-lg-row flex-md-row"
    >
      <v-btn
        variant="outlined"
        class="mb-4 mr-4 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-delete-outline"
        @click="onDeleteHandle(id)"
      >
        Eliminar dirección
      </v-btn>
      <v-btn
        variant="outlined"
        class="ma-0 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-pencil"
        :to="{ name: 'ProfileEditAddress', params: { id: encrypt_id } }"
      >
        Editar dirección
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-divider v-if="!resume" />
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { encryptAES, decryptValue } from "@/utils/Crypto";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  id: {
    type: String,
  },
  user: {
    type: String,
  },
  state: {
    type: String,
  },
  town: {
    type: String,
  },
  suburb: {
    type: String,
  },
  street: {
    type: String,
  },
  extrnumber: {
    type: String,
  },
  intnumber: {
    type: String,
  },
  cp: {
    type: String,
  },
  resume: {
    type: Boolean,
    default: false,
  },
  details: {
    type: Boolean,
    default: false,
  },
  onDeleteHandle: Function,
});

const encrypt_id = encryptAES(props.id.toString());

</script>
