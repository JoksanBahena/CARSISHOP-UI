<template>
  <v-container>
    <v-form class="ma-2">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Nombre de la subcategoría
        </div>
        <v-text-field
          v-model="state.subcategory"
          density="compact"
          placeholder="Nombre"
          prepend-inner-icon="mdi-tag-outline"
          variant="outlined"
          @blur="v$.subcategory.$touch"
          @input="v$.subcategory.$touch"
          :error-messages="v$.subcategory.$errors.map((e) => e.$message)"
        />
      </div>
      <v-btn
        variant="flat"
        class="text-none"
        :color="colors.primary_dark"
        :loading="loading"
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
import { useSubcategoryStore } from "@/store/SubcategoryStore";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
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
const loading = ref(false);
const state = reactive({ ...subcategory });

const rules = {
  subcategory: {
    required: withMessage(
      "El nombre de la subcategoría es obligatorio",
      required
    ),
    minLength: withMessage(
      "El nombre de la subcategoría debe tener al menos 3 carácteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre de la subcategoría no debe tener más de 20 carácteres",
      maxLength(20)
    ),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  loading.value = true;
  v$.value.$touch();
  if (v$.value.$error) return;
  try {
    const response = await createSubcategory(state.subcategory);
    Swal.fire({
      icon: "success",
      title: "subcategoría creada",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error("Error al crear la subcategoría", error);
    Swal.fire({
      icon: "error",
      title: "Error al crear la subcategoría",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    clear();
    loading.value = false;
  }
};

const clear = () => {
  state.subcategory = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(subcategory)) {
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
