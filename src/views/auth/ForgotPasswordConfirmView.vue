<template>
  <auth-layout page_title="RESTABLECER CONTRASEÑA">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          RESTABLECER CONTRASEÑA
        </h4>
      </v-layout>

      <v-form @keyup.enter="submitForm" class="mx-10">
        <v-slide-y-transition tag="v-alert">
          <v-alert
            v-if="alert.error"
            class="mb-8"
            variant="tonal"
            type="error"
            icon="mdi-alert-circle-outline"
            :text="alert.message"
          />
        </v-slide-y-transition>

        <div class="mb-6">
          <div class="text-subtitle-1 font-weight-medium">Nueva contraseña</div>
          <v-text-field
            :append-inner-icon="
              pass_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="pass_visible ? 'text' : 'password'"
            density="compact"
            placeholder="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="pass_visible = !pass_visible"
            v-model="state.password"
            hide-details
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
          />

          <div class="d-flex align-center mt-2">
            <v-list-item-title class="text-subtitle-2 mr-auto">
              • La contraseña es obligatoria
            </v-list-item-title>
            <v-icon v-if="state.password" size="xsmall"> mdi-check </v-icon>
          </div>
          <div class="d-flex align-center">
            <v-list-item-title class="text-subtitle-2 mr-auto">
              • Ingrese al menos 8 caracteres
            </v-list-item-title>
            <v-icon
              v-if="state.password && !v$.password.$errors.length"
              size="xsmall"
            >
              mdi-check
            </v-icon>
          </div>
        </div>

        <div class="mb-6">
          <div class="text-subtitle-1 font-weight-medium">
            Confirmar contraseña
          </div>
          <v-text-field
            :append-inner-icon="
              confirm_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="confirm_visible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirmar contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="confirm_visible = !confirm_visible"
            v-model="state.confirm_password"
            @blur="v$.confirm_password.$touch"
            @input="v$.confirm_password.$touch"
            :error-messages="v$.confirm_password.$errors.map((e) => e.$message)"
          />
        </div>

        <v-btn
          class="my-10 text-none"
          :color="colors.primary_dark"
          variant="flat"
          block
          @click="submitForm"
          :disabled="v$.$errors.length > 0"
        >
          Reestablecer contraseña
        </v-btn>
      </v-form>
    </v-container>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import Colors from "@/utils/Colors.js";
import { reactive, ref } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "@/store/AuthStore";
import { useRoute } from "vue-router";
import { getErrorMessage } from "@/utils/Errors";
import { encryptAES } from "@/utils/Crypto";
import { Toast } from "@/utils/Alerts.js";
import router from "@/router";

const { withMessage } = helpers;
const { resetPassword } = useAuthStore();
const route = useRoute();

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_opacity_gray,
  red: Colors.cs_red,
};

const alert = ref({ error: "", message: "" });
const form = {
  password: null,
  confirm_password: null,
};

const pass_visible = ref(false);
const confirm_visible = ref(false);
const loading = ref(false);

const rules = {
  password: {
    required: withMessage("La contraseña es requerida", required),
    minLength: withMessage(
      "La contraseña debe tener al menos 8 caracteres",
      minLength(8)
    ),
    maxLength: withMessage(
      "La contraseña debe tener menos de 50 caracteres",
      maxLength(50)
    ),
  },
  confirm_password: {
    required: withMessage("La contraseña es requerida", required),
    sameAs: withMessage(
      "Las contraseñas no coinciden",
      (value) => value === state.password
    ),
  },
};

const state = reactive({ ...form });
const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  alert.value = { error: "", message: "" };
  loading.value = true;

  try {
    alert.value = await resetPassword(
      route.params.token,
      encryptAES(state.password),
      encryptAES(state.confirm_password)
    );

    if (alert.value.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Contraseña restablecida",
      });
      router.push({ name: "Login" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
