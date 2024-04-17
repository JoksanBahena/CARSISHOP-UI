<template>
  <v-container>
    <v-form class="ma-2">
      <div class="mb-4">
        <div>
          <div class="text-subtitle-1 font-weight-medium">Nombre(s)</div>
          <v-text-field
            density="compact"
            placeholder="Nombre(s)"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            v-model="state.name"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
          />
        </div>
        <div class="text-subtitle-1 font-weight-medium">Apellidos</div>
        <v-text-field
          density="compact"
          placeholder="Apellidos"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="state.surname"
          @input="v$.surname.$touch"
          @blur="v$.surname.$touch"
          :error-messages="v$.surname.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Correo</div>
        <v-text-field
          density="compact"
          placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="state.username"
          @input="v$.username.$touch"
          @blur="v$.username.$touch"
          :error-messages="v$.username.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Teléfono</div>
        <v-text-field
          density="compact"
          placeholder="Teléfono"
          prepend-inner-icon="mdi-phone-outline"
          variant="outlined"
          type="number"
          hide-spin-buttons
          v-model="state.phone"
          @input="v$.phone.$touch"
          @blur="v$.phone.$touch"
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
          :counter="10"
        />

        <div class="text-subtitle-1 font-weight-medium">
          Fecha de nacimiento
        </div>

        <v-text-field
          v-model="state.birthdate"
          density="compact"
          placeholder="2001-01-01"
          variant="outlined"
          type="date"
          @input="v$.birthdate.$touch"
          @blur="v$.birthdate.$touch"
          :error-messages="v$.birthdate.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Género</div>
        <v-select
          v-model="state.gender"
          density="compact"
          placeholder="Género"
          :items="genders"
          item-title="gender"
          item-value="id_gender"
          variant="outlined"
          @input="v$.gender.$touch"
          @blur="v$.gender.$touch"
          :error-messages="v$.gender.$errors.map((e) => e.$message)"
        />
        <div class="mb-2">
          <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
          <v-text-field
            v-model="state.password"
            :append-inner-icon="
              pass_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="pass_visible ? 'text' : 'password'"
            density="compact"
            placeholder="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            hide-details
            @click:append-inner="pass_visible = !pass_visible"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
          />

          <div class="d-flex align-center mt-2">
            <v-list-item-title class="text-subtitle-2 mr-auto">
              • La contraseña es obligatoria
            </v-list-item-title>
            <v-icon v-if="state.password" size="xsmall"> mdi-check </v-icon>
          </div>
          <div class="d-flex align-center mb-6">
            <v-list-item-title class="text-subtitle-2 mr-auto">
              • Ingrese al menos 8 caracteres
            </v-list-item-title>
            <v-icon
              v-if="state.password && !v$.password.$errors.length"
              size="xsmall"
            >
              mdi-check
            </v-icon>
          </div>
        </div>
        <div class="text-subtitle-1 font-weight-medium">
          Confirmar contraseña
        </div>
        <v-text-field
          density="compact"
          placeholder="Confirmar contraseña"
          variant="outlined"
          :append-inner-icon="
            confirm_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :type="confirm_visible ? 'text' : 'password'"
          @click:append-inner="confirm_visible = !confirm_visible"
          v-model="state.confirmpassword"
          @input="v$.confirmpassword.$touch"
          @blur="v$.confirmpassword.$touch"
          :error-messages="v$.confirmpassword.$errors.map((e) => e.$message)"
        />
      </div>
      <v-btn
        variant="flat"
        class="text-none"
        :color="colors.primary_dark"
        append-icon="mdi-check-circle-outline"
        @click="submitForm()"
        block
      >
        Guardar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

import { ref, shallowRef } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useProfileStore } from "@/store/ProfileStore";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { encryptAES } from "@/utils/Crypto";
import { Toast } from "@/utils/Alerts";

const { withMessage, regex } = helpers;

const { createAdmin } = useProfileStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
const genders = [
  { gender: "Masculino", id_gender: "1" },
  { gender: "Femenino", id_gender: "2" },
  { gender: "Otro", id_gender: "3" },
];
const pass_visible = ref(false);
const confirm_visible = ref(false);

const admin = {
  name: "",
  surname: "",
  username: "",
  phone: "",
  birthdate: new Date().toISOString().substr(0, 10),
  password: "",
  confirmpassword: "",
  gender: null,
};

const state = reactive({ ...admin });
const today = new Date().toISOString().split("T")[0];

const rules = {
  name: {
    required: withMessage("El nombre es requerido", required),
    regex: withMessage(
      "El nombre no puede tener caracteres especiales",
      regex(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
      )
    ),
    minLength: withMessage("El nombre mínimo de 3 caracteres", minLength(3)),
    maxLength: withMessage("El nombre máximo de 50 caracteres", maxLength(50)),
  },
  surname: {
    required: withMessage("El apellido es requerido", required),
    regex: withMessage(
      "El apellido no puede tener carácteres especiales",
      regex(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
      )
    ),
    minLength: withMessage("El apellido mínimo de 3 caracteres", minLength(3)),
    maxLength: withMessage(
      "El apellido máximo de 50 caracteres",
      maxLength(50)
    ),
  },
  phone: {
    required: withMessage("El teléfono es requerido", required),
    integer: withMessage("El teléfono debe ser un número", integer),
    regex: withMessage("El teléfono debe ser un número", regex(/^\d+$/)),
    minLength: withMessage("El teléfono debe tener 10 digitos", minLength(10)),
    maxLength: withMessage("El teléfono debe tener 10 digitos", maxLength(10)),
  },
  gender: {
    required: withMessage("El genero es requerido", required),
  },
  username: {
    required: withMessage("El correo electrónico es requerido", required),
    username: withMessage(
      "El correo electrónico no es válido",
      regex(/^.+@.+\..+$/)
    ),
  },
  password: {
    required: withMessage("La contraseña es requerida", required),
    minLength: withMessage(
      "La contraseña debe tener al menos 8 caracteres",
      minLength(8)
    ),
    maxLength: withMessage(
      "La contraseña debe tener menos de 50 caracteres",
      maxLength(50)
    ),
  },
  confirmpassword: {
    required: withMessage(
      "La confirmación de contraseña es requerida",
      required
    ),
    sameAs: withMessage(
      "Las contraseñas no coinciden",
      (value) => value === state.password
    ),
  },
  birthdate: {
    required: withMessage("La fecha es requerida", required),
    maxDate: withMessage(
      "La fecha no debe ser mayor a la actual",
      (value) => value < today
    ),
    minDate: withMessage("Debes ser mayor de 18 años", (value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const eighteenYearsAgo = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return birthDate <= eighteenYearsAgo;
    }),
    maxDate: withMessage("Debes ser menor de 120 años", (value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const oneHundredTwentyYearsAgo = new Date(
        currentDate.getFullYear() - 120,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return birthDate >= oneHundredTwentyYearsAgo;
    }),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;
  try {
    const response = await createAdmin(
      encryptAES(state.name),
      encryptAES(state.surname),
      encryptAES(state.username),
      encryptAES(state.phone),
      encryptAES(state.birthdate),
      encryptAES(state.password),
      state.gender
    );
    Toast.fire({
      icon: "success",
      title: response.message,
    });
    location.reload();
  } catch (error) {
    console.error("Error al crear el admin", error);
    Toast.fire({
      icon: "error",
      title: "Error al crear el admin",
    });
    location.reload();
  } finally {
    clear();
  }
};
const clear = () => {
  state.admin = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(admin)) {
    state[key] = value;
  }
};

const props = defineProps({
  dialog: {
    type: Object,
    default: null,
  },
});
</script>
