<template>
  <auth-layout>
    <v-container>
      <p class="mb-8 text-h4 font-weight-medium text-center">INICIAR SESIÓN</p>
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

        <div class="mb-8">
          <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          />
          <a
            class="text-caption text-right text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            ¿Olvidaste tu contraseña?</a
          >
        </div>

        <v-btn
          class="mb-8 text-none"
          :color="colors.primary_dark"
          size="large"
          block
        >
          Iniciar sesión
        </v-btn>

        <v-row>
          <v-col><v-divider /></v-col>
          <p class="text-subtitle-1 text-medium-emphasis" color="grey-darken-3">
            o
          </p>
          <v-col><v-divider /></v-col>
        </v-row>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
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
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });


</script>
