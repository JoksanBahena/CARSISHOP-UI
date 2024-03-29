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
            v-model="state.email"
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
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
          Continuar
        </v-btn>
      </form>
    </v-container>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import Colors from "@/utils/Colors.js";
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
const { withMessage, regex } = helpers;

const visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });

const form = {
  email:""
}

const rules= {
  email: {
    required: withMessage("El correo electrónico es requerido", required),
    email: withMessage("El correo electrónico no es válido", regex(/^.+@.+\..+$/)),
  }
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
