<template>
  <default-layout page-title="CONFIRMA TU CUENTA">
    <v-parallax src="@/assets/imgs/background.png">
      <v-layout class="d-flex flex-column align-center text-black h-screen">
        <h2 class="font-weight-medium mt-12 text-h2">
          Gracias por confirmar tu cuenta
        </h2>
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

<script setup>
import DefaultLayout from "@/layouts/user/DefaultLayout.vue";
import { useAuthStore } from "@/store/AuthStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import router from "@/router";
import Colors from "@/utils/Colors.js";

const colors = {
  primary_dark: Colors.cs_primary_dark,
};

const { confirm, resend } = useAuthStore();

const route = useRoute();
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  try {
    const response = await confirm(route.params.token);

    if (response.status === 200) {
      await Swal.fire({
        icon: "success",
        timer: 4000,
      });
    }

    if (response.status !== 200) {
      showErrorAlert(response.message);
    }

    if (response.status === 500 || response.status === 403) {
      showSendAlert();
    }
  } catch (error) {
    console.log(error);
    showErrorAlert(error);
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
        text: "Por favor revisa tu bandeja de entrada",
        icon: "success",
      });
    }

    if (response.status !== 200) {
      showErrorAlert(response.message);
    }

    if (response.status === 500 || response.status === 403) {
      showSendAlert();
    }
  } catch (error) {
    showErrorAlert(error);
  } finally {
    loading.value = false;
  }
};

const showErrorAlert = (error) => {
  Swal.fire({
    title: "Error",
    text: error,
    icon: "error",
    confirmButtonText: "Continuar",
    timer: 4000,
    timerProgressBar: true,
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "Login" });
    } else {
      router.push({ name: "Login" });
    }
  });
};

const showSendAlert = () => {
  Swal.fire({
    title: "Error al confirmar tu cuenta",
    text: "Parece que algo falló, pero no es tu culpa, por favor solicita un nuevo correo de confirmación",
    icon: "warning",
    confirmButtonText: "Solicitar confirmación",
    input: "email",
    showLoaderOnConfirm: true,
  }).then((result) => {
    if (result.isConfirmed) {
      resubmit(result.value);
    }
  });
};

const showLoadingAlert = () => {
  Swal.fire({
    title: "Enviando correo de confirmación",
    text: "Por favor espera un momento",
    icon: "info",
    showConfirmButton: false,
    allowOutsideClick: false,
  });
};

onMounted(() => {
  submit();
});
</script>
