<template>
  <v-container>
    <v-form class="ma-2">
      <div class="mb-4">
        <div class="text-subtitle-1 font-weight-medium">
          Nombre de la categoría
        </div>

        <v-text-field
          v-model="state.category"
          density="compact"
          placeholder="Nombre"
          prepend-inner-icon="mdi-tag-outline"
          variant="outlined"
          @blur="v$.category.$touch"
          @input="v$.category.$touch"
          :error-messages="v$.category.$errors.map((e) => e.$message)"
        />
      </div>
      <v-btn
        :loading="loading"
        variant="flat"
        class="text-none"
        :color="colors.primary_dark"
        append-icon="mdi-check-circle-outline"
        @click="submitForm()"
        block
        :disabled="v$.category.$error || state.category.trim() === ''"
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
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useCategoryStore } from "@/store/CategoryStore";
import { Toast } from "@/utils/Alerts";

const { createCategory } = useCategoryStore();
const { withMessage, regex } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const category = {
  category: "",
};
const loading = ref(false);

const state = reactive({ ...category });

const rules = {
  category: {
    required: withMessage("El nombre de la categoría es obligatorio", required),
    minLength: withMessage(
      "El nombre de la categoría debe tener al menos 3 carácteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre de la categoría no debe tener más de 20 carácteres",
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
    const response = await createCategory(state.category);
    if (response.status === 201 || response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Categoría creada  correctamente",
      });
      clear();
      location.reload();
    } else {
      Toast.fire({
        icon: "error",
        title: response.response.data.message,
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      Toast.fire({
        icon: "error",
        title: errorMessage,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error al crear la categoría",
      });
    }
  } finally {
    clear();
    loading.value = false;
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
