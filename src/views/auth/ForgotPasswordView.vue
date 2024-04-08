<template>
  <auth-layout page_title="RESTABLECER CONTRASEÑA">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-2 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          RESTABLECER CONTRASEÑA
        </h4>
      </v-layout>

      <v-form @submit.prevent="submitForm" class="mx-10">
        <p class="mb-8 font-weight-medium text-center">
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </p>

        <v-slide-y-transition tag="v-alert">
          <v-alert
            v-if="alert.message"
            class="mb-8"
            variant="tonal"
            :type="getAlertType(alert.status)"
            :icon="
              alert.status === 200
                ? 'mdi-check-circle-outline'
                : 'mdi-alert-circle-outline'
            "
            :text="alert.message"
          />
        </v-slide-y-transition>

        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">
            Correo electrónico
          </div>
          <v-text-field
            v-model="state.email"
            density="compact"
            placeholder="Correo electrónico"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            hide-details="auto"
            autofocus
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
          />
        </div>

        <v-btn
          class="my-10 text-none"
          :color="colors.primary_dark"
          :loading="loading"
          variant="flat"
          block
          @click="submitForm"
          :disabled="v$.$errors.length > 0"
        >
          Continuar
        </v-btn>
      </v-form>
    </v-container>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import Colors from "@/utils/Colors.js";
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useAuthStore } from "@/store/AuthStore";
import { getErrorMessage } from "@/utils/Errors";

const { withMessage, regex } = helpers;
const { forgotPassword } = useAuthStore();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const alert = ref({ error: "", message: "" });
const loading = ref(false);

const form = {
  email: "",
};

const rules = {
  email: {
    required: withMessage("El correo electrónico es requerido", required),
    email: withMessage(
      "El correo electrónico no es válido",
      regex(/^.+@.+\..+$/)
    ),
  },
};

const state = reactive({ ...form });
const v$ = useVuelidate(rules, state);

const getAlertType = (status) => {
  if (status === 200) return "success";
  return "error";
};

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  alert.value = { error: "", message: "" };
  loading.value = true;

  try {
    alert.value = await forgotPassword(state.email);
  } catch (error) {
    alert.value = getErrorMessage(error);
  } finally {
    loading.value = false;
  }
};
</script>
