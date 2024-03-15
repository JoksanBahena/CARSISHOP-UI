<template>
  <auth-layout>
    <v-container>
      <p class="mb-8 text-h4 font-weight-medium text-center">RESTABLECER CONTRASEÑA</p>
      <p class=' mb-8  font-weight-medium text-center'>Se te enviará un correo electrónico a la dirección que  proporciones para restablecer tu contraseña.</p>
      <form action="" class="mx-16">
        <v-alert
          v-show="!error"
          class="mb-8"
          variant="tonal"
          icon="mdi-alert-circle-outline"
          type="error"
          :text="error.message"
          closable
        />

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
          :style="{
            background: colors.primary_dark,
            color: colors.white,
          }"
          size="large"
          block
          href="/forgotPasswordConfirm"

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
