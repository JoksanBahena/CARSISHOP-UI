<template>
  <auth-layout page-title="REGISTRO">
    <v-container>
      <v-layout class="d-flex flex-column fill-height align-center text-black">
        <h4
          class="mb-8 text-h4 font-weight-medium text-center d-none d-md-flex"
        >
          REGISTRO
        </h4>
      </v-layout>

      <v-alert
        v-show="!error"
        class="mb-2"
        variant="tonal"
        icon="mdi-alert-circle-outline"
        type="error"
        :text="error.message"
        closable
      />

      <v-card class="mx-10" variant="flat">
        <v-card-title class="text-subtitle-1 font-weight-regular pa-0 mb-4">
          <v-avatar :color="colors.primary_dark" size="24" v-text="step" />
          <span class="mx-2">{{ current_title }}</span>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <form>
              <div class="mb-1">
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

              <div class="mb-1">
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

              <div class="mb-1">
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
                  @blur="v$.phone.$touch"
                  @input="v$.phone.$touch"
                  :error-messages="v$.phone.$errors.map((e) => e.$message)"
                />
              </div>

              <div class="mb-1">
                <div class="text-subtitle-1 font-weight-medium">Genero</div>
                <v-select
                  v-model="state.gender"
                  density="compact"
                  placeholder="Selecciona una opción"
                  :items="['Masculino', 'Femenino', 'Otro']"
                  variant="outlined"
                  @blur="v$.gender.$touch"
                  @input="v$.gender.$touch"
                  :error-messages="v$.gender.$errors.map((e) => e.$message)"
                />
              </div>
            </form>
          </v-window-item>

          <v-window-item :value="2">
            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">
                Código postal
              </div>
              <v-text-field
                v-model="state.cp"
                density="compact"
                placeholder="CP"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                type="number"
                @blur="v$.cp.$touch"
                @input="v$.cp.$touch"
                :error-messages="v$.cp.$errors.map((e) => e.$message)"
              />
            </div>

            <v-row>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">Estado</div>
                  <v-select
                    v-model="state.estate"
                    clearable
                    placeholder="Estado"
                    :items="states"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker-outline"
                    @blur="v$.estate.$touch"
                    @input="v$.estate.$touch"
                    :error-messages="v$.estate.$errors.map((e) => e.$message)"
                  />

<!--                  <v-text-field-->
<!--                    v-model="state.estate"-->
<!--                    density="compact"-->
<!--                    placeholder="Estado"-->
<!--                    variant="outlined"-->
<!--                    @blur="v$.estate.$touch"-->
<!--                    @input="v$.estate.$touch"-->
<!--                    :error-messages="v$.estate.$errors.map((e) => e.$message)"-->
<!--                  />-->
                </div>
              </v-col>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Municipio
                  </div>
                  <v-select
                    v-model="state.town"
                    clearable
                    placeholder="Municipio"
                    :items="towns"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker-outline"
                    @blur="v$.town.$touch"
                    @input="v$.town.$touch"
                    :error-messages="v$.town.$errors.map((e) => e.$message)"
                  >

                  </v-select>
<!--                  <v-text-field-->
<!--                    v-model="state.town"-->
<!--                    density="compact"-->
<!--                    placeholder="Municipio"-->
<!--                    variant="outlined"-->
<!--                    @blur="v$.town.$touch"-->
<!--                    @input="v$.town.$touch"-->
<!--                    :error-messages="v$.town.$errors.map((e) => e.$message)"-->
<!--                  />-->
                </div>
              </v-col>
            </v-row>

            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field
                v-model="state.suburb"
                density="compact"
                placeholder="Colonia"
                variant="outlined"
                @blur="v$.suburb.$touch"
                @input="v$.suburb.$touch"
                :error-messages="v$.suburb.$errors.map((e) => e.$message)"
              />
            </div>

            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field
                v-model="state.street"
                density="compact"
                placeholder="Calle"
                variant="outlined"
                @blur="v$.street.$touch"
                @input="v$.street.$touch"
                :error-messages="v$.street.$errors.map((e) => e.$message)"
              />
            </div>

            <v-row>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Núm. Exterior
                  </div>
                  <v-text-field
                    v-model="state.num_ext"
                    density="compact"
                    placeholder="#"
                    variant="outlined"
                    type="number"
                    @blur="v$.num_ext.$touch"
                    @input="v$.num_ext.$touch"
                    :error-messages="v$.num_ext.$errors.map((e) => e.$message)"
                  />
                </div>
              </v-col>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Núm. Interior
                  </div>
                  <v-text-field
                    v-model="state.num_int"
                    density="compact"
                    placeholder="#"
                    variant="outlined"
                    type="number"
                    @blur="v$.num_int.$touch"
                    @input="v$.num_int.$touch"
                    :error-messages="v$.num_int.$errors.map((e) => e.$message)"
                  />
                </div>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="3">
            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">
                Correo electrónico
              </div>
              <v-text-field
                v-model="state.email"
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
              />
            </div>

            <div class="mb-1">
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
                @click:append-inner="pass_visible = !pass_visible"
                @blur="v$.password.$touch"
                @input="v$.password.$touch"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
              />

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
                :error-messages="v$.confirm_password.$errors.map((e) => e.$message)"
              />
            </div>
          </v-window-item>

          <v-window-item :value="4">
            <div
              class="d-flex flex-column justify-center align-center mb-4 text-center"
            >
              <v-avatar size="160" :color="colors.primary_dark">
                <v-img
                  v-if="image_url"
                  :src="image_url"
                  alt="profile picture"
                />
                <v-icon v-else size="80"> mdi-account </v-icon>
              </v-avatar>
              <p class="text-h6">Bienvenido { name }</p>
              <p class="text-subtitle-1">
                Ahora puedes disfrutar de tu cuenta y todos los beneficios de
                ella
              </p>
            </div>
            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">
                Subir foto de perfil
              </div>
              <v-file-input
                density="compact"
                type="file"
                accept="image/png, image/jpeg, image/bmp"
                variant="outlined"
                prepend-icon="mdi-camera-outline"
                chips
                show-size
                @change="onFileChange"
              />
            </div>
          </v-window-item>
        </v-window>

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            variant="tonal"
            class="text-none"
            @click="step--"
          >
            Regresar
          </v-btn>
          <v-btn
            v-if="step < 4"
            @click="checkStep"
            class="text-none flex-grow-1"
            :color="colors.primary_dark"
            variant="flat"
            :disabled="v$.$errors.length > 0"
          >
            Continuar
          </v-btn>
          <v-btn
            v-if="step === 4"
            @click="submit"
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
import {ref, computed, reactive} from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const { withMessage, regex } = helpers;

const pass_visible = ref(false);
const confirm_visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });

let step = ref(1);

const image_url = ref('');

const current_title = computed(() => {
  switch (step.value) {
    case 1:
      return "Información personal";
    case 2:
      return "Tu dirección";
    case 3:
      return "Registra tu cuenta";
    case 4:
      return "¡Listo!";
    default:
      return "Algo salió mal";
  }
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    image_url.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const states = ["Morelos"];

const towns = ["Cuernavaca"];

const form = {
  name: "",
  surname: "",
  phone: "",
  gender:"",
  cp: "",
  estate:null,
  town:null,
  suburb:"",
  street:"",
  num_ext:"",
  num_int:"",
  email: "",
  password: "",
  confirm_password: "",
};

const state = reactive({ ...form });

const rules = {
  name: {
    required: withMessage("El nombre es requerido", required),
    regex: withMessage("El nombre solo debe contener letras", regex(/^[a-zA-Z\s]*$/)),
    minLength: withMessage(
      "El nombre debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El nombre debe tener menos de 50 caracteres",
      maxLength(50)
    ),
  },
  surname: {
    required: withMessage("El apellido es requerido", required),
    regex: withMessage("El apellido solo debe contener letras", regex(/^[a-zA-Z\s]*$/)),
    minLength: withMessage(
      "El apellido debe tener al menos 3 caracteres",
      minLength(3)
    ),
    maxLength: withMessage(
      "El apellido debe tener menos de 50 caracteres",
      maxLength(50)
    ),
  },
  phone: {
    required: withMessage("El teléfono es requerido", required),
    integer: withMessage("El teléfono debe ser un número", integer),
    regex: withMessage(
      "El teléfono solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El teléfono debe tener al menos 10 digitos",
      minLength(10)
    ),
    maxLength: withMessage(
      "El teléfono debe tener menos de 10 digitos",
      maxLength(10)
    ),
  },
  gender: {
    required: withMessage("El genero es requerido", required),
  },
  cp: {
    required: withMessage("El codigo postal es requerido", required),
    integer: withMessage("El codigo postal debe ser un número", integer),
    regex: withMessage(
      "El codigo postal solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      minLength(5)
    ),
    maxLength: withMessage(
      "El codigo postal debe tener 5 digitos",
      maxLength(5)
    ),
  },
  estate: {
    required: withMessage("El estado es requerido", required),
  },
  town: {
    required: withMessage("La ciudad es requerida", required),
  },
  suburb: {
    required: withMessage("La colonia es requerida", required),
  },
  street: {
    required: withMessage("La calle es requerida", required),
  },
  num_ext: {
    required: withMessage("El número exterior es requerido", required),
    integer: withMessage("El número exterior debe ser un número", integer),
    regex: withMessage(
      "El número exterior solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El numero exterior debe tener al menos 1 caracter",
      minLength(1)
    ),
    maxLength: withMessage(
      "El numero exterior debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  num_int: {
    integer: withMessage("El número interior debe ser un número", integer),
    regex: withMessage(
      "El número interior solo debe contener números",
      regex(/^\d+$/)
    ),
    minLength: withMessage(
      "El numero interior debe tener al menos 1 caracter",
      minLength(1)
    ),
    maxLength: withMessage(
      "El numero interior debe tener menos de 10 caracteres",
      maxLength(10)
    ),
  },
  email: {
    required: withMessage("El correo electrónico es requerido", required),
    email: withMessage("El correo electrónico no es válido", regex(/^.+@.+\..+$/)),
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
    required: withMessage("La confirmación de contraseña es requerida", required),
    sameAs: withMessage("Las contraseñas no coinciden", (value) => value === state.password),
  },
  //regla para imagen
  //  image: {
  //   required: withMessage("La imagen es requerida", required),
  //   size: withMessage("La imagen debe pesar menos de 2mb", (value) => value.size < 2000000),
  //   ext: withMessage("La imagen debe ser un archivo jpg", (value) => value.name.endsWith('.jpg')),
  //  }
};


const v$ = useVuelidate(rules, state);

const checkStep = () => {
  switch (step.value) {
    case 1:
      if (hasErrorsInFields(["name", "surname", "phone", "gender"])) {
      }else{
        step.value++;
      }
      break;
    case 2:
      if (hasErrorsInFields(["cp","estate", "town", "suburb", "street", "num_ext", "num_int"])) {
      }else{
        step.value++;
      }
      break;
    case 3:
      if (hasErrorsInFields(["email", "password", "confirm_password"])) {
      }else{
        step.value++;
      }
      break;
    default:
      break;
  }
}

const hasErrorsInFields = (fields) => {
  for (const fieldsKey in fields) {
    eval(`v$.value.${fields[fieldsKey]}.$touch();`)
  }
  for (const field in v$.value.$errors) {
    const property = v$.value.$errors[field];
    if (fields.includes(property.$property)) {
      return true;
    }
  }
  return false;
};

const submit = () => {
  v$.value.$touch();
  if(v$.value.$error){
    console.log('error')
    return;
  }
  alert(JSON.stringify(state));
};

</script>
