<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2 text-decoration-none">
      Añadir subcategoria
    </p>

    <v-card variant="flat" class="mt-4">
      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" lg="8">
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
            <v-col cols="12" lg="8">
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
            <v-col cols="12" lg="8">
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
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import Swal from "sweetalert2";
import { useSubcategoryStore } from "@/store/SubcategoryStore";
const { createSubcategory } = useSubcategoryStore();
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
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;
  try {
    const response = await createSubcategory(state.subcategory);
    Swal.fire({
      icon: "success",
      title: "Subcategoria creada",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.history.back();
    });
  } catch (error) {
    console.error("Error al crear la subcategoria", error);
    Swal.fire({
      icon: "error",
      title: "Error al crear la subcategoria",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    clear();
  }
};

const clear = () => {
  state.subcategory = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(subcategory)) {
    state[key] = value;
  }
};
</script>
