<template>
  <v-container>
    <p class="text-h4 font-weight-medium mb-2">Métodos de pago</p>

    <v-card variant="flat" class="mt-4">
      <v-card-title>Solicitud de vendedor</v-card-title>
      <v-card-item>
        <v-form>
          <v-row>
            <v-col cols="12" lg="4">
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">CURP</div>
                <v-text-field
                  density="compact"
                  placeholder="CURP"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  :counter="18"
                  @keyup="uppercase"
                  v-model="state.curp"
                  @blur="v$.curp.$touch"
                  @input="v$.curp.$touch"
                  :error-messages="v$.curp.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>

            <v-col cols="12" lg="4">
              <div class="mb-4">
                <div class="text-subtitle-1 font-weight-medium">RFC</div>
                <v-text-field
                  density="compact"
                  placeholder="RFC"
                  prepend-inner-icon="mdi-calendar-month-outline"
                  variant="outlined"
                  @keyup="uppercase"
                  :counter="13"
                  v-model="state.rfc"
                  @blur="v$.rfc.$touch"
                  @input="v$.rfc.$touch"
                  :error-messages="v$.rfc.$errors.map((e) => e.$message)"
                />
              </div>
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-subtitle-1 font-weight-medium">
                Identificacion
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
                v-model="state.img"
                :error-messages="v$.img.$errors.map((e) => e.$message)"
              />
            </v-col>
          </v-row>
          <div
            v-if="image_url"
            class="d-flex flex-column justify-center align-center mb-6"
            :style="{ border: '2px dashed' + colors.gray }"
          >
            <div class="text-subtitle-1 font-weight-medium ma-3 mr-auto">
              Imagen cargada:
            </div>
            <v-avatar size="160" rounded="0">
              <v-img :src="image_url" alt="profile picture" class="mb-4" />
            </v-avatar>
          </div>
          <v-btn
            class="mb-8 text-none"
            variant="flat"
            :color="colors.primary_dark"
            prepend-icon="mdi-send"
            size="large"
            block
            @click="submitForm"
          >
            Enviar solicitud
          </v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import Colors from "@/utils/Colors.js";
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";

const colors = {
  primary: Colors.cs_primary,
  primary_dark: Colors.cs_primary_dark,
  white: Colors.cs_white,
  gray: Colors.cs_opacity_gray,
};

const { withMessage, regex } = helpers;

const seller = {
  curp: "",
  rfc: "",
  img: null,
  imageName: "",
};

const state = reactive({ ...seller });

const rules = {
  curp: {
    required: withMessage("El CURP es requerido", required),
    minLength: withMessage("El CURP debe tener 18 caracteres", minLength(18)),
    maxLength: withMessage("El CURP debe tener 18 caracteres", maxLength(18)),
    regex: withMessage(
      "El CURP no es válido",
      regex(
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      )
    ),
  },
  rfc: {
    required: withMessage("El RFC es requerido", required),
    minLength: withMessage("El RFC debe tener 13 caracteres", minLength(13)),
    maxLength: withMessage("El RFC debe tener 13 caracteres", maxLength(13)),
    regex: withMessage(
      "El RFC no es válido",
      regex(
        /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
      )
    ),
  },
  img: {
    required: withMessage("La identificación es requerida", required),
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$touch();
  if (v$.value.$error) return;

  alert(JSON.stringify(state));
};

const uppercase = () => {
  state.rfc = state.rfc.toUpperCase();
  state.curp = state.curp.toUpperCase();
};

const image_url = ref("");

const onFileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    if (file.size > 2_000_000) {
      state.img = null;
      Swal.fire({
        title: "Error!",
        text: "La imagen no debe pesar más de 2MB",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    state.imageName = file.name;
    image_url.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
