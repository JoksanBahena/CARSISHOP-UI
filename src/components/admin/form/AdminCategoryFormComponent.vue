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
      >
        Guardar
      </v-btn>
    </v-form>
    <v-dialog v-model="dialog2">
      <v-card>
        <v-alert
          v-if="state.alertMessage"
          :value="true"
          :type="state.alertType"
          variant="tonal"
          >{{ state.alertMessage }}</v-alert
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";

import { ref } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useCategoryStore } from "@/store/CategoryStore";
const { createCategory } = useCategoryStore();
const { withMessage, regex } = helpers;
import { shallowRef } from "vue";

const dialog2 = shallowRef(false);
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
    if (response.error === false) {
      showAlertInDialog(response.message, "success");
    } else {
      showAlertInDialog(response.message, "error");
    }
  } catch (error) {
    console.error("Error al crear la categoría", error);
    showAlertInDialog("Error al crear la categoría", "error");
  } finally {
    clear();
    loading.value = false;
    location.reload();
  }
};

const clear = () => {
  state.category = "";

  v$.value.$reset();

  for (const [key, value] of Object.entries(category)) {
    state[key] = value;
  }
};

const showAlertInDialog = (message, type) => {
  state.alertMessage = message;
  state.alertType = type;
  dialog2.value = true;

  setTimeout(() => {
    hideAlert();
  }, 4500);
};

const hideAlert = () => {
  state.alertMessage = "";
  state.alertType = "";
};
</script>
