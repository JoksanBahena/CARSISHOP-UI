<template>
  <p class="text-h4 font-weight-medium mb-2">Añadir administrador</p>
  <v-card variant="flat">
    <v-card-item>
      <v-form>
        <v-row>
          <v-col cols="12" lg="8" md="8">
            <v-row>
              <v-col cols="12" lg="6">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    Nombre(s)
                  </div>
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
              </v-col>
              <v-col cols="12" md="6">
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
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-medium">Correo</div>
            <v-text-field
              density="compact"
              placeholder="Correo electrónico"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="state.email"
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
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
          </v-col>

          <v-col cols="12" md="4">
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
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
              :error-messages="v$.password.$errors.map((e) => e.$message)"
            />
          </v-col>
          <v-col cols="12" md="4">
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
              v-model="state.confirm_password"
              @input="v$.confirm_password.$touch"
              @blur="v$.confirm_password.$touch"
              :error-messages="
                v$.confirm_password.$errors.map((e) => e.$message)
              "
            />
          </v-col>
          <v-divider />

          <v-col cols="6">
            <v-btn
              variant="flat"
              prepend-icon="mdi-close-circle-outline"
              class="text-none"
              :color="colors.primary"
              size="large"
              block
              @click="clear()"
            >
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              variant="flat"
              append-icon="mdi-check-circle-outline"
              class="text-none"
              :color="colors.primary_dark"
              size="large"
              block
              @click="submitForm()"
            >
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import Swal from "sweetalert2";
const { withMessage, regex } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};
const pass_visible = ref(false);
const confirm_visible = ref(false);

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
    title: "Mi cuenta",
  },
];

const generes = ["Masculino", "Femenino", "Otro"];

const user = {
  name: "",
  surname: "",
  genere: null,
  phone: "",
  email: "",
  img: null,
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

  phone: {
    required: withMessage("El teléfono es requerido", required),
    integer: withMessage("El teléfono debe ser un número", integer),
    regex: withMessage(
      "El teléfono solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El teléfono debe tener al menos 10 caracteres",
      minLength(10)
    ),
    maxLength: withMessage(
      "El teléfono debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  email: {
    required: withMessage("El correo es requerido", required),
    email: withMessage("El correo no es válido", regex(/^.+@.+\..+$/)),
  },
  password: {
    required: withMessage("La contraseña es requerida", required),
    minLength: withMessage(
      "La contraseña debe tener al menos 8 caracteres",
      minLength(8)
    ),
    maxLength: withMessage(
      "La contraseña debe tener menos de 20 caracteres",
      maxLength(20)
    ),
  },
  confirm_password: {
    required: withMessage(
      "La confirmación de la contraseña es requerida",
      required
    ),
    sameAs: withMessage(
      "Las contraseñas no coinciden",
      (value) => value === state.password
    ),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    return;
  } else {
    alert(JSON.stringify(state));
  }
};

const clear = () => {
  v$.value.$reset();

  for (const [key, value] of Object.entries(user)) {
    state[key] = value;
  }
};
</script>
