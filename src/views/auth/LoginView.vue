<template>
  <auth-layout page_title="INICIAR SESIÓN">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          INICIAR SESIÓN
        </h4>
      </v-layout>

      <v-form @keyup.enter="submit" class="mx-10">
        <v-slide-y-transition tag="v-alert">
          <v-alert
            v-if="error.message"
            class="mb-8"
            variant="tonal"
            icon="mdi-alert-circle-outline"
            type="error"
            :text="error.message"
          />
        </v-slide-y-transition>

        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">
            Correo electrónico
          </div>
          <v-text-field
            density="compact"
            placeholder="Correo electrónico"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="state.email"
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
          />
        </div>

        <div class="mb-8">
          <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
          <v-text-field
            :append-inner-icon="
              visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="visible ? 'text' : 'password'"
            density="compact"
            class="mb-2"
            placeholder="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="state.password"
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
          />

          <router-link
            class="text-subtitle-2 text-decoration-none"
            :style="{ color: colors.primary_dark }"
            rel="noopener noreferrer"
            :to="{ name: 'ForgotPassword' }"
          >
            ¿Olvidaste tu contraseña?
          </router-link>
        </div>

        <v-btn
          class="mb-4 text-none"
          :color="colors.primary_dark"
          size="large"
          variant="flat"
          block
          @click="submit"
          :disabled="v$.$errors.length > 0"
          :loading="loading"
        >
          Iniciar sesión
        </v-btn>

        <div class="d-flex align-center">
          <v-divider />
          <p class="text-subtitle-1 mx-4" :style="{ color: colors.gray }">o</p>
          <v-divider />
        </div>

        <div class="text-center">
          <router-link
            class="text-subtitle-2 text-decoration-none"
            :style="{ color: colors.primary_dark }"
            rel="noopener noreferrer"
            :to="{ name: 'Register' }"
          >
            Registrate aquí
            <v-icon icon="mdi-chevron-right" />
          </router-link>
        </div>
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
import { useAuthStore } from "@/store/AuthStore.js";
import router from "@/router";
import Swal from "sweetalert2";
import {encryptAES} from "@/utils/Crypto";

const { withMessage, regex } = helpers;
const { login, resend } = useAuthStore();

const visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  gray: Colors.cs_opacity_gray,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });
const loading = ref(false);

const form = {
  email: "",
  password: "",
};

const state = reactive({
  ...form,
});

const rules = {
  email: {
    required: withMessage("El correo electrónico es requerido", required),
    email: withMessage(
      "El correo electrónico no es válido",
      regex(/^.+@.+\..+$/)
    ),
  },
  password: {
    required: withMessage("La contraseña es requerida", required),
  },
};

const v$ = useVuelidate(rules, state);

const submit = async () => {

  v$.value.$touch();
  if (v$.value.$error) return;

  error.value = { error: "", message: "" };
  loading.value = true;

  try {
    const response = await login(encryptAES(state.email), encryptAES(state.password));
    if (response.status === 200) {
      router.push({ name: "Home" });
    }
  } catch (err) {
    console.log(err)
    if (err.data.status === 403) {
      showSendAlert(err.data.message);
    }else{
      error.value = { error: "error", message: err.data.message};
    }
  } finally {
    loading.value = false;
  }
};

const resubmit = async (email) => {
  showLoadingAlert();
  try {
    const response = await resend(email);
    if (response.status === 200) {
      await Swal.fire({
        title: "Correo de confirmación enviado",
        text: 'Por favor revisa tu bandeja de entrada',
        icon: 'success'
      });
    }
  } catch (err) {
    console.log(err)
    if (err.data.status === 403 ){
      showSendAlert(err.data.message);
    } else if (err.data.status === 404) {
      showErrorAlert(err.data.message);
    } else {
      showErrorAlert(err.data.message);
    }
  }finally {
    loading.value = false;
  }
}

const showErrorAlert = (error) => {
  Swal.fire({
    title: "Error",
    text: error,
    icon: 'error',
    confirmButtonText: 'Continuar',
    timer: 4000,
    timerProgressBar: true,
  })
};

const showSendAlert = (error) => {
  Swal.fire({
    title: error,
    text: 'Tu cuenta no ha sido confirmada, por favor solicita un nuevo correo de confirmación',
    icon: 'warning',
    confirmButtonText: 'Solicitar confirmación',
    input: 'email',
  }).then((result) => {
    if (result.isConfirmed) {
      resubmit(result.value);
    }
  });
};

const showLoadingAlert = () => {
  Swal.fire({
    title: "Enviando correo de confirmación",
    text: 'Por favor espera un momento',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false
  });
};
</script>
