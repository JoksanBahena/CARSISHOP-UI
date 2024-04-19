<template>
  <v-card variant="flat" class="mt-4">
    <v-card-item>
      <div
        class="d-flex align-center text-body-2 text-none font-weight-bold mb-1"
      >
        <v-icon size="20" class="mr-1"> mdi-map-marker-outline</v-icon>
        Dirección de envio:
      </div>
      <div class="text-h6 mb-1">
        <p>{{ user.toLocaleUpperCase() }}</p>
      </div>
      {{ cp }}, {{ state }}, {{ town }}, {{ suburb }} {{ street }}
      {{ extrnumber }},
      {{ intnumber }}
    </v-card-item>

    <v-card-actions class="flex-column align-start flex-lg-row flex-md-row">
      <v-btn
        variant="outlined"
        class="ma-0 text-none"
        :color="colors.primary_dark"
        prepend-icon="mdi-pencil"
        :to="{ name: 'ProfileEditAddress', params: { id: encrypt_id } }"
      >
        Editar dirección
      </v-btn>

      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            variant="outlined"
            class="mb-4 mr-4 text-none"
            :color="colors.primary_dark"
            prepend-icon="mdi-autorenew"
          >
            Cambiar dirección
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Tus direcciones">
            <v-card-text>
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn text="Close Dialog" @click="isActive.value = false" />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
  <v-divider />
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { encryptAES } from "@/utils/Crypto";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  user: {
    type: String,
    default: "Tu nombre",
  },
  state: {
    type: String,
    default: "Tu estado",
  },
  town: {
    type: String,
    default: "municipio",
  },
  suburb: {
    type: String,
    default: "colonia",
  },
  street: {
    type: String,
    default: "y calle",
  },
  extrnumber: {
    type: String,
    default: "S/N",
  },
  intnumber: {
    type: String,
    default: "S/N",
  },
  cp: {
    type: String,
    default: "00000",
  },
  details: {
    type: Boolean,
    default: false,
  },
  onDeleteHandle: {
    type: Function,
    default: () => {},
  },
});

const encrypt_id = encryptAES(props.id.toString());
</script>
