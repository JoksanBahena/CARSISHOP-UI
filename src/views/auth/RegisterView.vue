div
<template>
  <auth-layout page_title="REGISTRO">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          REGISTRO
        </h4>
      </v-layout>

      <v-card class="mx-10" variant="flat">
        <v-card-title class="text-subtitle-1 font-weight-regular pa-0 mb-2">
          <v-avatar :color="colors.primary_dark" size="24" v-text="step" />
          <span class="mx-2">{{ current_title }}</span>
        </v-card-title>

        <v-progress-linear
          :model-value="progress"
          :color="colors.primary_dark"
          class="mb-6"
          height="6"
          rounded
        />

        <v-window v-model="step">
          <v-form @keyup.enter="checkStep">
            <v-slide-y-transition tag="v-alert">
              <v-alert
                v-if="error.message"
                variant="tonal"
                class="mb-8"
                icon="mdi-alert-circle-outline"
                type="error"
                :text="error.message"
              />
            </v-slide-y-transition>

            <v-window-item :value="1">
              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">Nombres(s)</div>
                <v-text-field
                  density="compact"
                  placeholder="Nombres(s)"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  v-model="state.name"
                  @blur="v$.name.$touch"
                  @input="v$.name.$touch"
                  :error-messages="v$.name.$errors.map((e) => e.$message)"
                />
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">Apellidos</div>
                <v-text-field
                  density="compact"
                  placeholder="Apellidos"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  v-model="state.surname"
                  @blur="v$.surname.$touch"
                  @input="v$.surname.$touch"
                  :error-messages="v$.surname.$errors.map((e) => e.$message)"
                />
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">
                  Número de telefono
                </div>
                <v-text-field
                  v-model="state.phone"
                  density="compact"
                  placeholder="Número de telefono"
                  prepend-inner-icon="mdi-phone-outline"
                  variant="outlined"
                  type="number"
                  hide-spin-buttons
                  counter="10"
                  @blur="v$.phone.$touch"
                  @input="v$.phone.$touch"
                  :error-messages="v$.phone.$errors.map((e) => e.$message)"
                />
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">Género</div>
                <v-select
                  v-model="state.gender"
                  density="compact"
                  placeholder="Género"
                  prepend-inner-icon="mdi-account-outline"
                  :items="genders"
                  item-title="gender"
                  item-value="id_gender"
                  variant="outlined"
                  @blur="v$.gender.$touch"
                  @input="v$.gender.$touch"
                  :error-messages="v$.gender.$errors.map((e) => e.$message)"
                />
              </div>
              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">
                  Fecha de nacimiento
                </div>
                <v-text-field
                  v-model="state.birthdate"
                  density="compact"
                  placeholder="2001-01-01"
                  variant="outlined"
                  type="date"
                  @blur="v$.birthdate.$touch"
                  @input="v$.birthdate.$touch"
                  :error-messages="v$.birthdate.$errors.map((e) => e.$message)"
                />
              </div>
            </v-window-item>
            <v-window-item :value="2">
              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">
                  Correo electrónico
                </div>
                <v-text-field
                  v-model="state.username"
                  density="compact"
                  placeholder="Correo electrónico"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  type="email"
                  @blur="v$.username.$touch"
                  @input="v$.username.$touch"
                  :error-messages="v$.username.$errors.map((e) => e.$message)"
                />
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
                <v-text-field
                  v-model="state.password"
                  :append-inner-icon="
                    pass_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                  "
                  :type="pass_visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  hide-details
                  @click:append-inner="pass_visible = !pass_visible"
                  @blur="v$.password.$touch"
                  @input="v$.password.$touch"
                />

                <div class="d-flex align-center mt-2">
                  <v-list-item-title class="text-subtitle-2 mr-auto">
                    • La contraseña es obligatoria
                  </v-list-item-title>
                  <v-icon v-if="state.password" size="xsmall">
                    mdi-check
                  </v-icon>
                </div>
                <div class="d-flex align-center mb-6">
                  <v-list-item-title class="text-subtitle-2 mr-auto">
                    • Ingrese al menos 8 caracteres
                  </v-list-item-title>
                  <v-icon
                    v-if="state.password && !v$.password.$errors.length"
                    size="xsmall"
                  >
                    mdi-check
                  </v-icon>
                </div>
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">
                  Confirmar contraseña
                </div>
                <v-text-field
                  v-model="state.confirm_password"
                  :append-inner-icon="
                    confirm_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                  "
                  :type="confirm_visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Confirmar contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="confirm_visible = !confirm_visible"
                  @blur="v$.confirm_password.$touch"
                  @input="v$.confirm_password.$touch"
                  :error-messages="
                    v$.confirm_password.$errors.map((e) => e.$message)
                  "
                />
              </div>
            </v-window-item>

            <v-window-item :value="3">
              <div
                class="d-flex flex-column justify-center align-center mb-4 text-center"
              >
                <v-avatar size="160" :color="colors.primary_dark">
                  <v-img
                    v-if="img_view"
                    :src="img_view"
                    alt="profile picture"
                  />
                  <v-icon v-else size="80"> mdi-account </v-icon>
                </v-avatar>
                <p class="text-h6 mt-4">Bienvenido {{ state.name }}</p>
                <p class="text-subtitle-1">
                  ¡Estás a un paso de disfrutar tu cuenta!
                </p>
              </div>

              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">
                  Subir foto de perfil
                </div>
                <v-file-input
                  v-model="state.profilepic"
                  density="compact"
                  type="file"
                  accept="image/png, image/jpeg, image/bmp"
                  variant="outlined"
                  prepend-icon="mdi-camera-outline"
                  clear-icon="mdi-close"
                  show-size
                  chips
                  @change="onFileChange"
                  @blur="v$.profilepic.$touch"
                  @input="v$.profilepic.$touch"
                  :error-messages="v$.profilepic.$errors.map((e) => e.$message)"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template
                      v-for="(fileName, index) in fileNames"
                      :key="fileName"
                    >
                      <v-chip
                        class="me-2"
                        :color="colors.primary_dark"
                        size="small"
                        label
                      >
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </div>

              <div class="mb-2">
                <div class="text-subtitle-1 font-weight-medium">
                  No soy un robot
                </div>
                <div class="d-flex flex-row">
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    readonly
                    @blur="v$.captcha_token.$touch"
                    @input="v$.captcha_token.$touch"
                    :error-messages="
                      v$.captcha_token.$errors.map((e) => e.$message)
                    "
                  >
                    <div
                      ref="captchaContainer"
                      class="frc-captcha"
                      data-sitekey="FCMII3HVVFND9QOH"
                      data-lang="es"
                    />
                  </v-text-field>
                </div>
              </div>
            </v-window-item>
          </v-form>
        </v-window>

        <v-card-actions class="my-4 mx-0 pa-0">
          <v-btn
            v-if="step > 1"
            variant="outlined"
            class="text-none"
            @click="backStep"
            :disabled="v$.$errors.length > 0"
          >
            Regresar
          </v-btn>
          <v-btn
            v-if="step < 3"
            @click="checkStep"
            class="text-none flex-grow-1"
            :color="colors.primary_dark"
            variant="flat"
            :disabled="v$.$errors.length > 0"
          >
            Continuar
          </v-btn>
          <v-btn
            v-if="step === 3"
            @click="submit"
            :loading="loading"
            class="text-none flex-grow-1"
            :color="colors.primary_dark"
            variant="flat"
            :disabled="v$.$errors.length > 0"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/AuthLayout.vue";
import Colors from "@/utils/Colors.js";
import { ref, computed, reactive, watch, onMounted, onUnmounted } from "vue";
import { WidgetInstance } from "friendly-challenge";
import { useAuthStore } from "@/store/AuthStore.js";
import { useVuelidate } from "@vuelidate/core";
import { getErrorMessage } from "@/utils/Errors";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import router from "@/router";
import Swal from "sweetalert2";
import { encryptAES } from "@/utils/Crypto";
const { captcha, register } = useAuthStore();
const { withMessage, regex } = helpers;

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });
const pass_visible = ref(false);
const confirm_visible = ref(false);
const genders = [
  { gender: "Masculino", id_gender: "1" },
  { gender: "Femenino", id_gender: "2" },
  { gender: "Otro", id_gender: "3" },
];
const today = new Date().toISOString().split("T")[0];
const max_size = 1;
const img_view = ref(null);
const loading = ref(false);

let progress = ref(3);
let step = ref(1);

const current_title = computed(() => {
  switch (step.value) {
    case 1:
      return "Tu información personal";
    case 2:
      return "Registra tu cuenta";
    case 3:
      return "¡Ya casi listo!";
    default:
      return "Algo salió mal";
  }
});

const imgSizeValidate = () => {
  return (value) => {
    return value.every((image) => image.size / 1024 / 1024 <= max_size);
  };
};

const user = {
  name: "",
  surname: "",
  phone: "",
  gender: null,
  birthdate: new Date().toISOString().substr(0, 10),
  username: "",
  password: "",
  confirm_password: "",
  profilepic: [],
  captcha_token: "",
};

const state = reactive({ ...user });

const rules = {
  name: {
    required: withMessage("El nombre es requerido", required),
    regex: withMessage(
      "El nombre no puede tener caracteres especiales",
      regex(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
      )
    ),
    minLength: withMessage("El nombre mínimo de 3 caracteres", minLength(3)),
    maxLength: withMessage("El nombre máximo de 50 caracteres", maxLength(50)),
  },
  surname: {
    required: withMessage("El apellido es requerido", required),
    regex: withMessage(
      "El apellido no puede tener carácteres especiales",
      regex(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
      )
    ),
    minLength: withMessage("El apellido mínimo de 3 caracteres", minLength(3)),
    maxLength: withMessage(
      "El apellido máximo de 50 caracteres",
      maxLength(50)
    ),
  },
  phone: {
    required: withMessage("El teléfono es requerido", required),
    integer: withMessage("El teléfono debe ser un número", integer),
    regex: withMessage("El teléfono debe ser un número", regex(/^\d+$/)),
    minLength: withMessage("El teléfono debe tener 10 digitos", minLength(10)),
    maxLength: withMessage("El teléfono debe tener 10 digitos", maxLength(10)),
  },
  gender: {
    required: withMessage("El genero es requerido", required),
  },
  birthdate: {
    required: withMessage("La fecha es requerida", required),
    maxDate: withMessage(
      "La fecha no debe ser mayor a la actual",
      (value) => value < today
    ),
    minDate: withMessage("Debes ser mayor de 18 años", (value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const eighteenYearsAgo = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return birthDate <= eighteenYearsAgo;
    }),
    maxDate: withMessage("Debes ser menor de 120 años", (value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const oneHundredTwentyYearsAgo = new Date(
        currentDate.getFullYear() - 120,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return birthDate >= oneHundredTwentyYearsAgo;
    }),
  },
  username: {
    required: withMessage("El correo electrónico es requerido", required),
    username: withMessage(
      "El correo electrónico no es válido",
      regex(/^.+@.+\..+$/)
    ),
  },
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
    required: withMessage(
      "La confirmación de contraseña es requerida",
      required
    ),
    sameAs: withMessage(
      "Las contraseñas no coinciden",
      (value) => value === state.password
    ),
  },
  profilepic: {
    required: withMessage("La foto de perfil es obligatoria", required),
    imgSizeValidate: withMessage(
      `El tamaño de la imagen no debe exceder ${max_size}MB`,
      imgSizeValidate()
    ),
  },
  captcha_token: {
    required: withMessage("El captcha es requerido", required),
  },
};

const v$ = useVuelidate(rules, state);

const backStep = () => {
  step.value--;
  progress.value -= 47;
};

const checkStep = () => {
  switch (step.value) {
    case 1:
      if (
        hasErrorsInFields(["name", "surname", "phone", "gender", "birthdate"])
      ) {
      } else {
        step.value++;
        progress.value += 47;
      }
      break;
    case 2:
      if (hasErrorsInFields(["username", "password", "confirm_password"])) {
      } else {
        step.value++;
        progress.value += 47;
      }
      break;
    case 3:
      if (hasErrorsInFields(["profilepic"])) {
      } else {
      }
      break;
    default:
      break;
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    img_view.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const hasErrorsInFields = (fields) => {
  for (const fields_key in fields) {
    eval(`v$.value.${fields[fields_key]}.$touch();`);
  }
  for (const field in v$.value.$errors) {
    const property = v$.value.$errors[field];
    if (fields.includes(property.$property)) {
      return true;
    }
  }
  return false;
};
const submit = async () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  error.value = { error: "", message: "" };
  loading.value = true;

  try {
    const params = {
      name: encryptAES(state.name),
      surname: encryptAES(state.surname),
      username: encryptAES(state.username),
      phone: encryptAES(state.phone),
      birthdate: encryptAES(state.birthdate),
      password: encryptAES(state.password),
      profilepic: state.profilepic,
      gender: state.gender,
    };

    const response = await register(params);
    if (response.status === 200) {
      showAlert();
    } else {
      error.value = response;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  } catch (err) {
    error.value = getErrorMessage(err);
  } finally {
    loading.value = false;
  }
};

const showAlert = () => {
  Swal.fire({
    title: "Cuenta registrada",
    text: "Ahora solo falta confirmar tu correo electrónico para activar tu cuenta",
    icon: "success",
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

const captchaContainer = ref();
const widget = ref();

const doneCallback = async (solution) => {
  let solutionCaptcha = await captcha(solution);

  if (solutionCaptcha.success === true) {
    state.captcha_token = true;
  } else {
    error.value = { error: "error", message: "Error en el captcha" };
    renderCaptcha();
  }
};

const errorCallback = (error) => {
  console.log("Error en el captcha");
};

const renderCaptcha = () => {
  if (captchaContainer.value) {
    widget.value = new WidgetInstance(captchaContainer.value, {
      startMode: "none",
      doneCallback,
      errorCallback,
    });
  }
};

onMounted(() => {
  renderCaptcha();
});

watch(captchaContainer, () => {
  if (captchaContainer.value) {
    renderCaptcha();
  }
});

onUnmounted(() => {
  if (widget.value) {
    widget.value.destroy();
  }
});
</script>
