<template>
  <auth-layout page-title="RESTABLECER CONTRASEÑA">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          RESTABLECER CONTRASEÑA
        </h4>
      </v-layout>

      <form action="" class="mx-10">
        <v-alert
          v-show="!error"
          class="mb-8"
          variant="tonal"
          icon="mdi-alert-circle-outline"
          type="error"
          :text="error.message"
          closable
        />

        <p class="mb-8 font-weight-medium text-center">
          Se enviará un correo a la dirección para restablecer tu contraseña
        </p>

        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">
            Correo electrónico
          </div>
          <v-text-field
            density="compact"
            placeholder="Correo electrónico"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          />
        </div>

        <v-btn
          class="mb-8 text-none"
          href="/forgotPasswordConfirm"
          :color="colors.primary_dark"
          variant="flat"
          size="large"
          block
        >
          Continuar
        </v-btn>
      </form>
    </v-container>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import Colors from "@/utils/Colors.js";
import { ref } from "vue";

const visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });
</script>
