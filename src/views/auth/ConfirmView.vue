<script setup>

import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import colors from "@/utils/Colors";
</script>

<template>
  <default-layout page-title="CONFIRMA TU CUENTA">
    <v-parallax src="@/assets/imgs/background.png">
      <v-layout class="d-flex flex-column align-center text-black h-screen">
        <h2 class="font-weight-medium mt-12 text-h2">Gracias por confirmar tu cuenta</h2>
        <p class="font-weight-medium text-h6 my-4">
          ¡Tu cuenta ha sido activada ahora puedes iniciar sesión!
        </p>
        <v-btn
          class="mb-8 text-none"
          :color="colors.primary_dark"
          variant="flat"
          :to="{ name: 'Login' }"
        >
          Inicia sesión
        </v-btn>
      </v-layout>
    </v-parallax>
  </default-layout>

</template>

<script>
import {useAuthStore} from "@/store/AuthStore";

const {confirm} = useAuthStore();
import {ref} from "vue";
import {useRoute} from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const loading = ref(false);
const error = ref({error: ""})
const submit = async () => {
  try {
    const response = await confirm(route.params.token);
    console.log(response)
    if (response.status === 200) {
      showAlert();
    }
  } catch (error) {
    console.log(error)
  }
}

const showAlert = () => {
  Swal.fire({
    title: "Error al confirmar tu cuenta",
    text: 'Al parecer algo falló, por favor solicita un nuevo correo de confirmación',
    icon: 'error',
    confirmButtonText: 'Solicitar confirmación'
  });
};

</script>
