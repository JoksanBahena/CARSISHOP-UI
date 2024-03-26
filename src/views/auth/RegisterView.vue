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
                  v-model="form.name"
                  density="compact"
                  placeholder="Nombres(s)"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                />
              </div>

              <div class="mb-1">
                <div class="text-subtitle-1 font-weight-medium">Apellidos</div>
                <v-text-field
                  v-model="form.surname"
                  density="compact"
                  placeholder="Apellidos"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                />
              </div>

              <div class="mb-1">
                <div class="text-subtitle-1 font-weight-medium">
                  Número de telefono
                </div>
                <v-text-field
                  v-model="form.phone"
                  density="compact"
                  placeholder="Número de telefono"
                  prepend-inner-icon="mdi-phone-outline"
                  variant="outlined"
                  type="number"
                />
              </div>

              <div class="mb-1">
                <div class="text-subtitle-1 font-weight-medium">Genero</div>
                <v-select
                  v-model="form.gender"
                  density="compact"
                  placeholder="Selecciona una opción"
                  :items="['Masculino', 'Femenino', 'Otro']"
                  variant="outlined"
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
                v-model="form.cp"
                density="compact"
                placeholder="CP"
                prepend-inner-icon="mdi-map-marker-outline"
                variant="outlined"
                type="number"
              />
            </div>

            <v-row>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">Estado</div>
                  <v-text-field
                    v-model="form.estate"
                    density="compact"
                    placeholder="Estado"
                    variant="outlined"
                  />
                </div>
              </v-col>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Municipio
                  </div>
                  <v-text-field
                    v-model="form.town"
                    density="compact"
                    placeholder="Municipio"
                    variant="outlined"
                  />
                </div>
              </v-col>
            </v-row>

            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">Colonia</div>
              <v-text-field
                v-model="form.suburb"
                density="compact"
                placeholder="Colonia"
                variant="outlined"
              />
            </div>

            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">Calle</div>
              <v-text-field
                v-model="form.street"
                density="compact"
                placeholder="Calle"
                variant="outlined"
              />
            </div>

            <v-row>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Núm. Exterior
                  </div>
                  <v-text-field
                    v-model="form.num_ext"
                    density="compact"
                    placeholder="#"
                    variant="outlined"
                    type="number"
                  />
                </div>
              </v-col>
              <v-col>
                <div class="mb-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Núm. Interior
                  </div>
                  <v-text-field
                    v-model="form.num_int"
                    density="compact"
                    placeholder="#"
                    variant="outlined"
                    type="number"
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
                v-model="form.email"
                density="compact"
                placeholder="Correo electrónico"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              />
            </div>

            <div class="mb-1">
              <div class="text-subtitle-1 font-weight-medium">Contraseña</div>
              <v-text-field
                v-model="form.password"
                :append-inner-icon="
                  pass_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                :type="pass_visible ? 'text' : 'password'"
                density="compact"
                placeholder="Contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="pass_visible = !pass_visible"
              />

              <div class="text-subtitle-1 font-weight-medium">
                Confirmar contraseña
              </div>
              <v-text-field
                v-model="form.confirm_password"
                :append-inner-icon="
                  confirm_visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                :type="confirm_visible ? 'text' : 'password'"
                density="compact"
                placeholder="Confirmar contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="confirm_visible = !confirm_visible"
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
            @click="step++"
            class="text-none flex-grow-1"
            :color="colors.primary_dark"
            variant="flat"
          >
            Continuar
          </v-btn>
          <v-btn
            v-if="step === 4"
            @click="register"
            class="text-none flex-grow-1"
            :color="colors.primary_dark"
            variant="flat"
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
import {ref, computed} from "vue";
import {userRegister} from "@/services/AuthService";

const pass_visible = ref(false);
const confirm_visible = ref(false);

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
};

const error = ref({ error: "", message: "" });

const step = ref(1);

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

const form = ref({
  name: "",
  surname: "",
  phone: "",
  gender:"",
  cp: "",
  estate:"",
  town:"",
  suburb:"",
  street:"",
  num_ext:"",
  num_int:"",
  email: "",
  password: "",
  confirm_password: "",
})


</script>
