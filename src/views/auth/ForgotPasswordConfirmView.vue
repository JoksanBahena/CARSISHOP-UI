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

        <div class="mb-8">
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
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
          />
          <p
            class=""
            :style="{
              color: colors.gray,
            }"
          >
            · Mínimo 8 carácteres
          </p>
        </div>
        <div class="mb-8">
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
          class="mb-8 text-none"
          :color="colors.primary_dark"
          variant="flat"
          size="large"
          block
          @click="submitForm"
          :disabled="v$.$errors.length > 0"
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
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
const route = useRoute();
const { withMessage } = helpers;

console.log(!!route.params.token)
console.log(route.params.token === "123")


const pass_visible = ref(false);
const confirm_visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_opacity_gray,
};

const error = ref({ error: "", message: "" });
const form = {
  password:"",
  confirm_password:""
}

const rules= {
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
    required: withMessage("La confirmación de contraseña es requerida", required),
    sameAs: withMessage("Las contraseñas no coinciden", (value) => value === state.password),
  },
}

const state = reactive({...form})

const v$ = useVuelidate(rules, state)
const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    return;
  }
  alert(JSON.stringify(state))
}

</script>
