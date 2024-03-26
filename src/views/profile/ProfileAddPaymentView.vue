<template>
  <profile-layout>
    <v-breadcrumbs :items="items"></v-breadcrumbs>

    <v-container>
      <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

      <v-card variant="flat" class="mt-4">
        <v-card-title>Datos bancarios</v-card-title>
        <v-card-item>
          <v-form>
            <v-row>
              <v-col cols="12" lg="9">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    Nombre en la tarjeta
                  </div>
                  <v-text-field
                    v-model="state.owner"
                    density="compact"
                    placeholder="Nombre en la tarjeta"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    @blur="v$.owner.$touch"
                    @input="v$.owner.$touch"
                    :error-messages="v$.owner.$errors.map((e) => e.$message)"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="9">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    Numero de tarjeta
                  </div>
                  <v-text-field
                    v-model="state.number"
                    density="compact"
                    placeholder="Numero de tarjeta"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :counter="16"
                    type="number"
                    hide-spin-buttons
                    @blur="v$.number.$touch"
                    @input="v$.number.$touch"
                    :error-messages="v$.number.$errors.map((e) => e.$message)"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" lg="3">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    Mes de vencimiento
                  </div>
                  <v-select
                    v-model="state.expiration_month"
                    density="compact"
                    placeholder="Mes de vencimiento"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :items="months"
                    @blur="v$.expiration_month.$touch"
                    @input="v$.expiration_month.$touch"
                    :error-messages="
                      v$.expiration_month.$errors.map((e) => e.$message)
                    "
                  />
                </div>
              </v-col>
              <v-col cols="6" lg="3">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    Año de vencimiento
                  </div>
                  <v-select
                    v-model="state.expiration_year"
                    density="compact"
                    placeholder="Año de vencimiento"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :items="years"
                    @blur="v$.expiration_year.$touch"
                    @input="v$.expiration_year.$touch"
                    :error-messages="
                      v$.expiration_year.$errors.map((e) => e.$message)
                    "
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="3">
                <div>
                  <div class="text-subtitle-1 font-weight-medium">CCV</div>
                  <v-text-field
                    v-model="state.cvv"
                    density="compact"
                    placeholder="CCV"
                    variant="outlined"
                    :counter="3"
                    type="number"
                    hide-spin-buttons
                    :append-inner-icon="
                      visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                    "
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                    @blur="v$.cvv.$touch"
                    @input="v$.cvv.$touch"
                    :error-messages="v$.cvv.$errors.map((e) => e.$message)"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="9">
                <v-btn
                  variant="flat"
                  class="text-none"
                  :color="colors.primary_dark"
                  block
                  append-icon="mdi-check-circle-outline"
                  @click="submitForm()"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-item>
      </v-card>
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
    title: "Metodos de pago",
    disabled: false,
    href: "/profilePayment",
  },
  {
    title: "Agregar metodo de pago",
    disabled: true,
    href: "/profileAddPayment",
  },
];

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const visible = ref(false);

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const current_year = new Date().getFullYear();
const years = Array.from({ length: 21 }, (_, i) => current_year + i);

const card = {
  owner: "",
  number: "",
  expiration_month: months[0],
  expiration_year: years[0],
  expiration_date: "",
  cvv: "",
};

const state = reactive({ ...card });

const rules = {
  owner: {
    required: withMessage("El nombre en la tarjeta es obligatorio", required),
    regex: withMessage(
      "El nombre en la tarjeta no puede contener caracteres especiales",
      regex(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
      )
    ),
  },
  number: {
    required: withMessage("El número de tarjeta es obligatorio", required),
    integer: withMessage("El número de tarjeta debe ser un número", integer),
    regex: withMessage("El número de tarjeta debe ser un número", regex(/^\d+$/)),
    minLength: withMessage(
      "Numero de tarjeta debe tener 16 digitos",
      minLength(16)
    ),
    maxLength: withMessage(
      "Numero de tarjeta debe tener 16 digitos",
      maxLength(16)
    ),
  },
  expiration_month: {
    required: withMessage("Mes de vencimiento obligatorio", required),
  },
  expiration_year: {
    required: withMessage("Año de vencimiento obligatorio", required),
  },
  cvv: {
    required: withMessage("CCV obligatorio", required),
    integer: withMessage("El CCV debe ser un número", integer),
    regex: withMessage("El CCV debe ser un número", regex(/^\d+$/)),
    minLength: withMessage("CCV debe tener 3 digitos", minLength(3)),
    maxLength: withMessage("CCV debe tener 3 digitos", maxLength(3)),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  state.expiration_date = `${state.expiration_month}/${state.expiration_year}`;
  // delete card.expiration_month;
  // delete card.expiration_year;

  alert(JSON.stringify(state));
};
</script>
