<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Mis direcciones</p>
      <v-form>
        <v-row class="mt-5">
          <v-col cols="12" md="4"> </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field
                density="compact"
                placeholder="Calle"
                prepend-inner-icon="mdi-google-maps"
                variant="outlined"
                v-model="state.street"
                @blur="v$.street.$touch"
                @input="v$.street.$touch"
                :error-messages="v$.street.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field
                density="compact"
                placeholder="Calle"
                prepend-inner-icon="mdi-google-maps"
                variant="outlined"
                v-model="state.suburb"
                @blur="v$.suburb.$touch"
                @input="v$.suburb.$touch"
                :error-messages="v$.suburb.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Numero exterior
              </div>
              <v-text-field
                density="compact"
                placeholder="Numero exterior"
                prepend-inner-icon="mdi-google-maps"
                variant="outlined"
                v-model="state.extnumber"
                @blur="v$.extnumber.$touch"
                @input="v$.extnumber.$touch"
                :error-messages="v$.extnumber.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Numero interior
              </div>
              <v-text-field
                density="compact"
                placeholder="Numero exterior"
                prepend-inner-icon="mdi-google-maps"
                variant="outlined"
                v-model="state.intnumber"
                @blur="v$.intnumber.$touch"
                @input="v$.intnumber.$touch"
                :error-messages="v$.intnumber.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Codigo Postal
              </div>
              <v-text-field
                density="compact"
                placeholder="Codigo Postal"
                prepend-inner-icon="mdi-pound"
                variant="outlined"
                type="number"
                v-model="state.cp"
                @blur="v$.cp.$touch"
                @input="v$.cp.$touch"
                :error-messages="v$.cp.$errors.map((e) => e.$message)"
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Estado</div>

              <v-select
                clearable
                placeholder="Estado"
                :items="states"
                dense
                variant="outlined"
                prepend-inner-icon="mdi-google-maps"
                v-model="state.state"
                @blur="v$.state.$touch"
                @input="v$.state.$touch"
                :error-messages="v$.state.$errors.map((e) => e.$message)"
              ></v-select>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Ciudad</div>

              <v-select
                clearable
                placeholder="Estado"
                :items="towns"
                dense
                variant="outlined"
                prepend-inner-icon="mdi-google-maps"
                v-model="state.town"
                @blur="v$.town.$touch"
                @input="v$.town.$touch"
                :error-messages="v$.town.$errors.map((e) => e.$message)"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              class="text-none"
              :color="colors.primary_dark"
              block
              prepend-icon="mdi-plus"
              @click="clear()"
              >Cancelar</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              class="mb-8 text-none"
              :color="colors.primary_dark"
              block
              prepend-icon="mdi-plus"
              @click="submitForm()"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </profile-layout>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";
import { ref } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const { withMessage, regex } = helpers;

const user = "Crristofer Soto ventura";

const states = ["Morelos"];

const towns = ["Cuernavaca"];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

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
    title: "Mis direcciones",
    disabled: false,
    href: "/profileAddress",
  },
  {
    title: "Agregar nueva direccion",
    disabled: true,
    href: "/profileAddAddress",
  },
];

const address = {
  user: user,
  street: "",
  suburb: "",
  extnumber: "",
  intnumber: "",
  cp: "",
  state: null,
  town: null,
};

const state = reactive({ ...address });

const rules = {
  street: {
    required: withMessage("La calle es requerida", required),
  },
  suburb: {
    required: withMessage("La colonia es requerida", required),
  },
  extnumber: {
    minLength: withMessage(
      "El numero exterior debe tener al menos 1 caracter",
      minLength(1)
    ),
    maxLength: withMessage(
      "El numero exterior debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  intnumber: {
    minLength: withMessage(
      "El numero interior debe tener al menos 1 caracter",
      minLength(1)
    ),
    maxLength: withMessage(
      "El numero interior debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  cp: {
    required: withMessage("El codigo postal es requerido", required),
  },
  state: {
    required: withMessage("El estado es requerido", required),
  },
  town: {
    required: withMessage("La ciudad es requerida", required),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  if (state.intnumber == "") {
    state.intnumber = "S/N";
  }
  if (state.extnumber == "") {
    state.extnumber = "S/N";
  }

  alert(JSON.stringify(state));
};

const clear = () => {
  state.street = "";
  state.suburb = "";
  state.extnumber = "";
  state.intnumber = "";
  state.cp = "";
  state.state = null;
  state.town = null;
};
</script>
