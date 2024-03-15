<template>
  <auth-layout>
    <v-container>
      <p class="mb-8 text-h4 font-weight-medium text-center">RESTABLECER CONTRASEÑA</p>
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

      <div class="mb-8">
          <div class="text-subtitle-1 font-weight-medium">Nueva contraseña</div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          />
        <p class="" :style="{
        color: colors.gray,
        }">· Ingresa un mínimo 8 caracteres.</p>
        </div>
          <div class="mb-8">
          <div class="text-subtitle-1 font-weight-medium">Confirmar Contraseña</div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
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

        >
          Reetablecer contraseña
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
  gray:  Colors.cs_opacity_gray
};

const error = ref({ error: "", message: "" });


</script>
