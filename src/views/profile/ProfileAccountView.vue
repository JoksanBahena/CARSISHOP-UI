<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mi cuenta</p>
      <v-form>
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              lazy-src="@/assets/imgs/men_card.webp"
              src="@/assets/imgs/men_card.webp"
              width="200"
              height="200"
              aspect-ratio="1"
              class="-lighten-2 rounded-circle"
              cover
            >
            </v-img>
          </v-col>
          <v-col cols="12" md="4" class="mt-auto">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Nombre(s)</div>
              <v-text-field
                density="compact"
                placeholder="Nombre(s)"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4" class="mt-auto">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Apellidos</div>
              <v-text-field
                density="compact"
                placeholder="Apellidos"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Fecha de nacimiento
              </div>
              <v-text-field
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-calendar-month-outline"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Genero</div>
              <v-text-field
                density="compact"
                placeholder="Genero"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Telefono</div>
              <v-text-field
                density="compact"
                placeholder="Telefono"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Dirección</div>
              <v-text-field
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-google-maps"
                variant="outlined"
                :disabled="is_disabled"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">Correo</div>
            <v-text-field
              density="compact"
              placeholder="Correo electrónico"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :disabled="is_disabled"
            />
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">Foto de perfil</div>
            <v-file-input
              density="compact"
              type="file"
              accept="image/png, image/jpeg, image/bmp"
              variant="outlined"
              prepend-icon="mdi-camera-outline"
              chips
              show-size
              @change="onFileChange"
              :disabled="is_disabled"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>

          <v-col cols="12">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-pencil"
              class="text-none"
              :color="colors.primary_dark"
              size="large"
              block
              @click="is_disabled ? onEdit() : onSave()"
            >
              {{ is_disabled ? "Editar" : "Guardar" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref } from "vue";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const { withMessage, regex } = helpers;

const items = [
  {
    title: "Inicio",
    disabled: false,
    href: "/",
  },
  {
    title: "Perfil",
    disabled: false,
    href: "/profileAccount",
  },
  {
    title: "Mi perfil",
    disabled: true,
    href: "/profileAccount",
  },
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const image_url = ref("");

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    image_url.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const is_disabled = ref(true);

const onEdit = () => {
  is_disabled.value = false;
};

const onSave = () => {
  is_disabled.value = true;
};
</script>
