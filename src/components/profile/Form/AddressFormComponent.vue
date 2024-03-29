<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Agregar nueva dirección</p>

    <v-card variant="flat" class="mt-4">
      <v-card-title>Dirección de envío</v-card-title>
      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">
                Codigo Postal
              </div>
              <v-text-field
                density="compact"
                placeholder="Codigo Postal"
                prepend-inner-icon="mdi-pound"
                variant="outlined"
                type="number"
                hide-spin-buttons
                :counter="5"
                v-model="state.cp"
                @blur="v$.cp.$touch"
                @input="v$.cp.$touch"
                :error-messages="v$.cp.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="6" md="4">
              <div class="text-subtitle-1 font-weight-medium">Estado</div>
              <v-select
                clearable
                placeholder="Estado"
                :items="states"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-map-marker-outline"
                v-model="state.state"
                @blur="v$.state.$touch"
                @input="v$.state.$touch"
                :error-messages="v$.state.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="6" md="4">
              <div class="text-subtitle-1 font-weight-medium">Ciudad</div>
              <v-select
                clearable
                placeholder="Estado"
                :items="towns"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-map-marker-outline"
                v-model="state.town"
                @blur="v$.town.$touch"
                @input="v$.town.$touch"
                :error-messages="v$.town.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field
                density="compact"
                placeholder="Calle"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                v-model="state.suburb"
                @blur="v$.suburb.$touch"
                @input="v$.suburb.$touch"
                :error-messages="v$.suburb.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field
                density="compact"
                placeholder="Calle"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                v-model="state.street"
                @blur="v$.street.$touch"
                @input="v$.street.$touch"
                :error-messages="v$.street.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="6" md="2">
              <div class="text-subtitle-1 font-weight-medium">
                Número exterior
              </div>
              <v-text-field
                density="compact"
                placeholder="Núm. ext."
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                type="number"
                hide-spin-buttons
                v-model="state.extnumber"
                @blur="v$.extnumber.$touch"
                @input="v$.extnumber.$touch"
                :error-messages="v$.extnumber.$errors.map((e) => e.$message)"
              />
            </v-col>
            <v-col cols="6" md="2">
              <div class="text-subtitle-1 font-weight-medium">
                Número interior
              </div>
              <v-text-field
                density="compact"
                placeholder="Núm. int."
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                type="number"
                hide-spin-buttons
                v-model="state.intnumber"
                @blur="v$.intnumber.$touch"
                @input="v$.intnumber.$touch"
                :error-messages="v$.intnumber.$errors.map((e) => e.$message)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                variant="flat"
                class="text-none"
                :color="colors.primary"
                block
                prepend-icon="mdi-close-circle-outline"
                @click="clear()"
                >Cancelar</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                variant="flat"
                class="mb-8 text-none"
                :color="colors.primary_dark"
                block
                append-icon="mdi-check-circle-outline"
                @click="submitForm()"
                >Guardar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
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
  cp: {
    required: withMessage("El codigo postal es requerido", required),
    integer: withMessage("El codigo postal debe ser un número", integer),
    regex: withMessage(
      "El codigo postal solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      minLength(5)
    ),
    maxLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      maxLength(5)
    ),
  },
  state: {
    required: withMessage("El estado es requerido", required),
  },
  town: {
    required: withMessage("La ciudad es requerida", required),
  },
  extnumber: {
    required: withMessage("El número exterior es requerido", required),
    integer: withMessage("El número exterior debe ser un número", integer),
    regex: withMessage(
      "El número exterior solo debe contener números",
      regex(/^\d+$/)
    ),
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
    integer: withMessage("El número interior debe ser un número", integer),
    regex: withMessage(
      "El número interior solo debe contener números",
      regex(/^\d+$/)
    ),
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
  v$.value.$reset();

  for (const [key, value] of Object.entries(address)) {
    state[key] = value;
  }
  state.street = "";
  state.suburb = "";
  state.extnumber = "";
  state.intnumber = "";
  state.cp = "";
  state.state = null;
  state.town = null;
};
</script>
