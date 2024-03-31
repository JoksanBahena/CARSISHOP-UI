<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2 text-decoration-none">
      Añadir Categoria
    </p>

    <v-card variant="flat" class="mt-4">
      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" lg="9">
              <div>
                <div class="text-subtitle-1 font-weight-medium">Categoria</div>
                <v-text-field
                  v-model="state.category"
                  density="compact"
                  placeholder="Ingresa el nombre de la categoria"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  @blur="v$.category.$touch"
                  @input="v$.category.$touch"
                  :error-messages="v$.category.$errors.map((e) => e.$message)"
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
import { createCategory } from "@/services/CategoryService.js";
import Swal from "sweetalert2";
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

const category = {
  category: "",
};

const state = reactive({ ...category });

const rules = {
  category: {
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

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;
  try {
    const response = await createCategory(state.category);
    Swal.fire({
      icon: "success",
      title: "Categoria creada",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.history.back();
    });
  } catch (error) {
    console.error("Error al crear la categoría", error);
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
  state.category = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(category)) {
    state[key] = value;
  }
};
</script>
