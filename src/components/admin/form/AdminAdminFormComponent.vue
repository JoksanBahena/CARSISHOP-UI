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
            @input="v$.admin.$touch"
            :error-messages="v$.admin.$errors.map((e) => e.$message)"
          />
        </div>
        <div class="text-subtitle-1 font-weight-medium">Apellidos</div>
        <v-text-field
          density="compact"
          placeholder="Apellidos"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="state.surname"
          @input="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Correo</div>
        <v-text-field
          density="compact"
          placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="state.username"
          @input="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
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
          @input="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
          :counter="10"
        />

        <div class="text-subtitle-1 font-weight-medium">
          Fecha de nacimiento
        </div>

        <v-text-field
          v-model="state.birthdate"
          density="compact"
          placeholder="Fecha de nacimiento"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          @blur="v$.admin.$touch"
          @input="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Genero</div>
        <v-text-field
          v-model="state.gender"
          density="compact"
          placeholder="Género"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          @blur="v$.admin.$touch"
          @input="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
        />
        <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
        <v-text-field
          density="compact"
          placeholder="Contraseña"
          variant="outlined"
          :append-inner-icon="
            pass_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :type="pass_visible ? 'text' : 'password'"
          @click:append-inner="pass_visible = !pass_visible"
          v-model="state.password"
          @input="v$.admin.$touch"
          @blur="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
        />
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
          v-model="state.confirmPassword"
          @input="v$.admin.$touch"
          @blur="v$.admin.$touch"
          :error-messages="v$.admin.$errors.map((e) => e.$message)"
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

import { ref } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import Swal from "sweetalert2";
import { useProfileStore } from "@/store/ProfileStore";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
const { withMessage, regex } = helpers;

const { createAdmin } = useProfileStore();
const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const pass_visible = ref(false);
const confirm_visible = ref(false);

const admin = {
  name: "",
  surname: "",
  username: "",
  phone: "",
  birthdate: "",
  password: "",
  confirmpassword: "",
  gender: "",
};

const state = reactive({ ...admin });

const rules = {
  admin: {
    name: { required: withMessage("El nombre es requerido", required) },
    surname: { required: withMessage("El apellido es requerido", required) },
    username: { required: withMessage("El correo es requerido", required) },
    phone: { required: withMessage("El teléfono es requerido", required) },
    birthdate: {
      required: withMessage("La fecha de nacimiento es requerida", required),
    },
    password: { required: withMessage("La contraseña es requerida", required) },
    confirmPassword: {
      required: withMessage(
        "La confirmación de la contraseña es requerida",
        required
      ),
      sameAsPassword: withMessage(
        "Las contraseñas no coinciden",
        (value) => value === state.password
      ),
    },
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;
  try {
    const response = await createAdmin(
      state.name,
      state.surname,
      state.username,
      state.phone,
      state.birthdate,
      state.password,
      state.gender
    );
    Swal.fire({
      icon: "success",
      title: "Admin creada",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    console.error("Error al crear el admin", error);
    Swal.fire({
      icon: "error",
      title: "Error al crear la categoría",
      showConfirmButton: false,
      timer: 1500,
    });
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

const closeDialogInAnotherComponent = () => {
  props.dialog.isActive = false;
};
</script>
