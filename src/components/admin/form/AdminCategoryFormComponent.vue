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
      console.log("Entra");
      console.log("Mensaje", response.message);
      // alert(response.message);
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.error("Error al crear la categoría", error);
    Swal.fire({
      icon: "error",
      title: "Error al crear la categoría",
      text: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
      timer: 1500,
    });
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
