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
                v-model="state.name"
                @input="v$.name.$touch"
                @blur="v$.name.$touch"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
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
                v-model="state.surname"
                @input="v$.surname.$touch"
                @blur="v$.surname.$touch"
                :error-messages="v$.surname.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <!-- <v-col cols="12" md="4">
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
                v-model="state.birthdate"
                @input="v$.birthdate.$touch"
                @blur="v$.birthdate.$touch"
                :error-messages="v$.birthdate.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col> -->
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Genero</div>
              <v-select
                density="compact"
                placeholder="Genero"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                clearable
                chips
                :items="generes"
                :disabled="is_disabled"
                v-model="state.genere"
                @input="v$.genere.$touch"
                @blur="v$.genere.$touch"
                :error-messages="v$.genere.$errors.map((e) => e.$message)"
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
                type="number"
                :disabled="is_disabled"
                v-model="state.phone"
                @input="v$.phone.$touch"
                @blur="v$.phone.$touch"
                :error-messages="v$.phone.$errors.map((e) => e.$message)"
                :counter="10"
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
              v-model="state.email"
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
            />
          </v-col>
        </v-row>
        <v-row>
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

          <v-col v-if="!is_disabled" cols="6">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-pencil"
              class="text-none"
              :color="colors.primary_dark"
              size="large"
              block
              @click="onCancel()"
            >
              Cancelar
            </v-btn>
          </v-col>
          <v-col :cols="is_disabled ? '12' : '6'">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-pencil"
              class="text-none"
              :color="colors.primary_dark"
              size="large"
              block
              @click="is_disabled ? onEdit() : submitForm()"
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
import { ref, reactive } from "vue";
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

const generes = ["Masculino", "Femenino", "Otro"];

const user = {
  name: "",
  suranme: "",
  birthdate: "",
  genere: null,
  phone: "",
  email: "",
  photo: "",
};
const state = reactive({ ...user });

const rules = {
  name: {
    required: withMessage("El nombre es requerido", required),
    minLength: withMessage(
      "El nombre debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre debe tener menos de 10 caracteres",
      maxLength(50)
    ),
    regex: withMessage(
      "El nombre solo puede contener letras, acentos, espacios y dierecis",
      regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    ),
  },
  surname: {
    required: withMessage("El apellido es requerido", required),
    minLength: withMessage(
      "El apellido debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El apellido debe tener menos de 10 caracteres",
      maxLength(50)
    ),
    regex: withMessage(
      "El apellido solo puede contener letras, acentos, espacios y dierecis",
      regex(/^[a-zA-ZÀ-ÿ\s]+$/)
    ),
  },
  // birthdate: {
  //   required: withMessage("La fecha de nacimiento es requerida", required),
  // },
  genere: {
    required: withMessage("El genero es requerido", required),
  },
  phone: {
    required: withMessage("El telefono es requerido", required),
    integer: withMessage("El telefono debe ser un número", integer),
    minLength: withMessage(
      "El telefono debe tener al menos 10 caracteres",
      minLength(10)
    ),
    maxLength: withMessage(
      "El telefono debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  email: {
    required: withMessage("El correo es requerido", required),
    email: withMessage("El correo no es válido", regex(/^.+@.+\..+$/)),
  },
};

const v$ = useVuelidate(rules, state);

const is_disabled = ref(true);

const onEdit = () => {
  is_disabled.value = false;
};

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    return;
  } else {
    console.log(v$.value.$error);
    alert(JSON.stringify(state));
    is_disabled.value = true;
  }
};

const onCancel = () => {
  is_disabled.value = true;
  v$.value.$reset();

  for (const [key, value] of Object.entries(user)) {
    state[key] = value;
  }
};
</script>
