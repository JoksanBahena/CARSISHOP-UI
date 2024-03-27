<template>
  <auth-layout page-title="INICIAR SESIÓN">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          INICIAR SESIÓN
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

        <div class="mb-8">
          <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
          <v-text-field
            :append-inner-icon="
              visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          />
          <a
            class="text-subtitle-2 text-decoration-none"
            :style="{ color: colors.primary_dark }"
            rel="noopener noreferrer"
            href="/forgotPassword"
          >
            ¿Olvidaste tu contraseña?</a
          >
        </div>

        <v-btn
          class="mb-8 text-none"
          href="/register"
          :color="colors.primary_dark"
          size="large"
          variant="flat"
          block
        >
          Iniciar sesión
        </v-btn>

        <div class="d-flex align-center">
          <v-divider />
          <p class="text-subtitle-1 mx-4" :style="{ color: colors.gray }">o</p>
          <v-divider />
        </div>

        <v-card-text class="text-center">
          <a
            class="text-subtitle-2 text-decoration-none"
            :style="{ color: colors.primary_dark }"
            rel="noopener noreferrer"
            href="/register"
          >
            Registrate aquí<v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
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
  gray: Colors.cs_opacity_gray,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });
</script>
