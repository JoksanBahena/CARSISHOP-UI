<template>
  <v-container>
    <a
      href="javascript:history.go(-1)"
      class="text-h4 font-weight-medium mb-2 text-decoration-none"
      style="color: black"
    >
      <v-icon>mdi-chevron-left</v-icon> Añadir subcategoria
    </a>

    <v-card variant="flat" class="mt-4">
      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" lg="9">
              <div>
                <div class="text-subtitle-1 font-weight-medium">
                  Subcategoria
                </div>
                <v-text-field
                  v-model="state.subcategory"
                  density="compact"
                  placeholder="Ingresa el nombre de la subcategiria"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  @blur="v$.subcategory.$touch"
                  @input="v$.subcategory.$touch"
                  :error-messages="
                    v$.subcategory.$errors.map((e) => e.$message)
                  "
                />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" lg="9">
              <v-btn
                variant="flat"
                class="text-none"
                :color="colors.primary"
                block
                append-icon="mdi-close-circle-outline"
                @click="clear()"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6" lg="9">
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
</template>

<script setup>
import Colors from "@/utils/Colors.js";

import { ref } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { createCategory } from "@/services/categoryService";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const { withMessage, regex } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const subcategory = {
  subcategory: "",
};

const state = reactive({ ...subcategory });

const rules = {
  subcategory: {
    required: withMessage("El campo es requerido", required),
    minLength: withMessage(
      "El campo debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El campo debe tener menos de 50 caracteres",
      maxLength(50)
    ),
    regex: withMessage(
      "El campo solo puede contener letras, acentos y espacios",
      regex("^[a-zA-ZÀ-ÿ\u00f1\u00d1\\s]*$")
    ),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  alert(JSON.stringify(state));
};

const clear = () => {
  state.subcategory = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(card)) {
    state[key] = value;
  }
};
</script>
